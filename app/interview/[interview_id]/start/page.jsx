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
  const router = useRouter();

  // ✅ Initialize Vapi once
  useEffect(() => {
    vapi.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);

    vapi.current.on("message", (message) => {
      if (message?.conversation) {
        setConversation(message.conversation);
        console.log("🗣️ Conversation received:", message.conversation);
      }
    });

    vapi.current.on("call-start", () => toast("📞 Call Connected..."));
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
    <div className="p-20 lg:px-40">
      {/* Header */}
      <div className="flex justify-between">
        <h2 className="font-bold">AI Interview Session</h2>
        <span className="flex gap-3">
          <Timer /> 12:23:22
        </span>
      </div>

      {/* Interview avatars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
        {/* AI Side */}
        <div className="flex flex-col gap-3 justify-center items-center p-40 bg-gray-100 rounded-2xl border">
          <div className="relative">
            {!activeUser && (
              <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping" />
            )}
            <Image
              src="/female.jpeg"
              alt="AI Recruiter"
              height={100}
              width={100}
              className="w-[60px] h-[60px] rounded-full"
            />
          </div>
          <h2>AI Recruiter</h2>
        </div>

        {/* User Side */}
        <div className="flex flex-col gap-3 justify-center items-center p-40 bg-gray-100 rounded-2xl border">
          <div className="relative">
            {activeUser && (
              <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping" />
            )}
            <h2 className="text-2xl bg-primary text-white rounded-full px-3">
              {interviewInfo?.userName?.[0]}
            </h2>
            <h2>{interviewInfo?.userName}</h2>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-10 justify-center items-center mt-7">
        <Mic className="h-12 w-12 p-3 bg-gray-300 rounded-full" />

        {loading ? (
          <Loader2Icon className="h-12 w-12 text-red-500 animate-spin" />
        ) : (
          <Phone
            onClick={stopInterview}
            className="h-12 w-12 p-3 text-white bg-red-500 rounded-full cursor-pointer hover:opacity-80 transition"
          />
        )}
      </div>
    </div>
  );
}
