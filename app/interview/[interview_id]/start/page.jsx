"use client";

import { InterViewDataContext } from "@/context/InterviewDataContext";
import { Loader2Icon, Mic, Phone, Timer } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";
import { toast } from "sonner";
import axios from "axios";
import { supabase } from "@/services/supabaseClient";
import { useParams, useRouter } from "next/navigation";

export default function Start() {
  const { interviewInfo } = useContext(InterViewDataContext);
  const vapi = useRef(null); // ✅ Persistent instance
  const [activeUser, setActiveUser] = useState(false);
  const [conversation, setConversation] = useState(null);
  const { interview_id } = useParams();
  const [loading, setLoading] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const timerRef = useRef(null);
  const router = useRouter();

    // Format HH:MM:SS
    const formatTime = (secs) => {
      const hrs = Math.floor(secs / 3600)
        .toString()
        .padStart(2, "0");
      const mins = Math.floor((secs % 3600) / 60)
        .toString()
        .padStart(2, "0");
      const secsDisplay = (secs % 60).toString().padStart(2, "0");
      return `${hrs}:${mins}:${secsDisplay}`;
    };

  // ✅ Initialize Vapi once
  useEffect(() => {
    vapi.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);

    vapi.current.on("message", (message) => {
      if (message?.conversation) {
        setConversation(message.conversation);
        console.log("🗣️ Conversation received:", message.conversation);
      }
    });

    vapi.current.on("call-start", () => {
      toast("📞 Call Connected...")
      startTimer();
    });
    vapi.current.on("speech-start", () => setActiveUser(false));
    vapi.current.on("speech-end", () => setActiveUser(true));
    vapi.current.on("call-end", () => {
      toast("Interview Ended");
      generateFeedback();
    });

    return () => {
      vapi.current?.stop();
    };
  }, []);

  // ✅ Start interview when interviewInfo is ready
  useEffect(() => {
    if (interviewInfo) {
      startCall();
    }
  }, [interviewInfo]);

    // ✅ Timer Controls
    const startTimer = () => {
      if (!timerRunning) {
        setTimerRunning(true);
        timerRef.current = setInterval(() => {
          setSecondsElapsed((prev) => prev + 1);
        }, 1000);
      }
    };
  
    const stopTimer = () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setTimerRunning(false);
    };

  // ✅ Start the AI Interview
  const startCall = () => {
    const questionList = interviewInfo?.interviewData?.questionList
      ?.map((item) => item?.question)
      .join(", ");

    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage:
        "Hi " +
        interviewInfo?.userName +
        ", how are you? Ready for your interview on " +
        interviewInfo?.interviewData?.jobPosition +
        "?",
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
      },
      voice: {
        provider: "playht",
        voiceId: "jennifer",
      },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              `
          You are an AI voice assistant conducting interviews.
          Your job is to ask candidates provided interview questions, assess their responses.
          Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
          "Hey there! Welcome to your ` +
              interviewInfo?.interviewData?.jobPosition +
              ` interview. Let’s get started with a few questions!"
          Ask one question at a time and wait for the candidate’s response before proceeding. Keep the questions clear and concise. Below Are the questions ask one by one:
          Questions: ` +
              questionList +
              `
          If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
          "Need a hint? Think about how React tracks component updates!"
          Provide brief, encouraging feedback after each answer. Example:
          "Nice! That’s a solid answer."
          "Hmm, not quite! Want to try again?"
          Keep the conversation natural and engaging—use casual phrases like "Alright, next up..." or "Let’s tackle a tricky one!"
          After 5-7 questions, wrap up the interview smoothly by summarizing their performance. Example:
          "That was great! You handled some tough questions well. Keep sharpening your skills!"
          End on a positive note:
          "Thanks for chatting! Hope to see you crushing projects soon!"
          Key Guidelines:
          ✅ Be friendly, engaging, and witty 
          ✅ Keep responses short and natural, like a real conversation 
          ✅ Adapt based on the candidate’s confidence level
          ✅ Ensure the interview remains focused on React
          `.trim(),
          },
        ],
      },
    };

    vapi.current?.start(assistantOptions);
  };


  // ✅ Stop the call and start feedback
  const stopInterview = async () => {
    setLoading(true);
    try {
      stopTimer();
      await vapi.current?.stop();
      await generateFeedback();
      toast("Ending interview...");
    } catch (err) {
      console.error("Stop error:", err);
      toast.error("Error stopping interview.");
      setLoading(false);
    }
  };

  // ✅ Generate AI Feedback and save to Supabase
  const generateFeedback = async () => {
    try {
      if (!conversation) {
        toast.error("No conversation data available!");
        setLoading(false);
        return;
      }

      // Generate AI feedback
      const result = await axios.post("/api/ai-feedback", {
        conversation,
      });

      console.log("AI Feedback raw:", result?.data);

      let content = result?.data?.content || "";
      const FINAL_CONTENT = content
        ?.replace("```json", "")
        ?.replace("```", "")
        ?.trim();

      console.log("🧠 Parsed Feedback:", FINAL_CONTENT);

      // Try parsing safely
      let feedbackJSON;
      try {
        feedbackJSON = JSON.parse(FINAL_CONTENT);
      } catch (err) {
        console.error("JSON Parse Error:", err);
        toast.error("Invalid feedback format from AI.");
        setLoading(false);
        return;
      }

      // Save to Supabase
      const { data, error } = await supabase
        .from("interview-feedback")
        .insert([
          {
            userName: interviewInfo?.userName,
            userEmail: interviewInfo?.userEmail,
            interview_id,
            feedback: feedbackJSON,
            recommended: false,
          },
        ])
        .select();

      if (error) {
        console.error("Supabase Error:", error);
        toast.error("Failed to save feedback.");
        setLoading(false);
        return;
      }

      console.log("✅ Feedback saved:", data);
      toast.success("Feedback saved successfully!");
      router.replace(`/interview/${interview_id}/completed`);
    } catch (err) {
      console.error("Feedback generation error:", err);
      toast.error("Failed to generate feedback.");
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 p-8 md:p-20 lg:px-40 transition-all duration-300">
  {/* Header */}
  <div className="flex justify-between items-center mb-10 border-b border-gray-200 pb-4">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
      AI Interview Session
    </h2>
    <span className="flex items-center gap-2 text-gray-600 font-medium bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
    <Timer className="w-5 h-5 text-blue-600" /> {formatTime(secondsElapsed)}
    </span>
  </div>

  {/* Interview Avatars */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-5">
    {/* AI Side */}
    <div className="flex flex-col gap-4 justify-center items-center p-16 bg-white rounded-3xl shadow-lg border border-gray-100 relative hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        {!activeUser && (
          <span className="absolute inset-0 rounded-full bg-blue-400 opacity-75 animate-ping" />
        )}
        <Image
          src="/female.jpeg"
          alt="AI Recruiter"
          height={100}
          width={100}
          className="w-[80px] h-[80px] rounded-full border-4 border-blue-100 shadow-md"
        />
      </div>
      <h2 className="text-lg font-semibold text-gray-700">AI Recruiter</h2>
      <p className="text-sm text-gray-500">Your virtual interviewer</p>
    </div>

    {/* User Side */}
    <div className="flex flex-col gap-4 justify-center items-center p-16 bg-white rounded-3xl shadow-lg border border-gray-100 relative hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        {activeUser && (
          <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping" />
        )}
        <div className="flex flex-col items-center">
          <div className="flex justify-center items-center w-[80px] h-[80px] rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-2xl font-bold shadow-md">
            {interviewInfo?.userName?.[0] || "U"}
          </div>
          <h2 className="mt-3 text-lg font-semibold text-gray-700">
            {interviewInfo?.userName || "You"}
          </h2>
        </div>
      </div>
    </div>
  </div>

  {/* Controls */}
  <div className="flex gap-10 justify-center items-center mt-10">
    <div className="group relative">
      <Mic className="h-14 w-14 p-3 bg-white border border-gray-200 rounded-full shadow-md cursor-pointer hover:bg-blue-50 hover:scale-105 transition-all duration-200" />
      <span className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
        Mic
      </span>
    </div>

    {loading ? (
      <Loader2Icon className="h-14 w-14 text-red-500 animate-spin" />
    ) : (
      <div className="group relative">
        <Phone
          onClick={stopInterview}
          className="h-14 w-14 p-3 text-white bg-red-500 rounded-full shadow-md cursor-pointer hover:bg-red-600 hover:scale-105 transition-all duration-200"
        />
        <span className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
          End Call
        </span>
      </div>
    )}
  </div>
</div>

  );
}
