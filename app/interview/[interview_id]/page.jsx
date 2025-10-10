"use client";

import React, { useContext, useEffect, useState } from "react";
import InterviewHeader from "../_components/InterviewHeader";
import Image from "next/image";
import { Clock, LoaderIcon, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/services/supabaseClient";
import { toast } from "sonner";
import { InterViewDataContext } from "@/context/InterviewDataContext";
import Vapi from "@vapi-ai/web";

export default function Interview() {
  const { interview_id } = useParams();

  const [interviewData, setInterviewData] = useState();
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const { interviewInfo, setInterviewInfo } = useContext(InterViewDataContext);
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (interview_id) {
      getInterviewDetails();
    }
  }, [interview_id]);

  const getInterviewDetails = async () => {
    setLoading(true);
    const { data: Interviews, error } = await supabase
      .from("Interviews")
      .select("jobPosition, jobDescription, duration, type")
      .eq("interview_id", interview_id);

    if (error) {
      console.error("Supabase fetch error:", error);
      setLoading(false);
      toast("Incorrect interview link");
    } else {
      setInterviewData(Interviews[0]);
      setLoading(false);
    }
  };

  const onJoinInterview = async () => {
    setLoading(true);
    const { data: Interviews, error } = await supabase
      .from("Interviews")
      .select("*")
      .eq("interview_id", interview_id);

    if (error || !Interviews?.length) {
      toast("Unable to fetch interview data");
      setLoading(false);
      return;
    }

    setInterviewInfo({
      userName,
      userEmail,
      interviewData: Interviews[0],
    });

    router.push("/interview/" + interview_id + "/start");
    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-10">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8 md:p-10 border border-gray-100">
        <div className="flex justify-center">
          <Image
            src="/logo.jpeg"
            alt="logo"
            className="w-[80px] mb-4 rounded-full"
            width={80}
            height={80}
          />
        </div>

        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          AI Powered Interview Platform
        </h1>

        <div className="flex justify-center">
          <Image
            src="/interview.jpg"
            alt="interview"
            height={400}
            width={400}
            className="rounded-xl shadow-md mb-6 w-[300px] md:w-[350px]"
          />
        </div>

        <h2 className="text-xl font-bold text-gray-700 text-center mb-2">
          {interviewData?.jobPosition || "Loading..."}
        </h2>

        <div className="flex justify-center items-center gap-2 text-gray-500 mb-6">
          <Clock className="w-4 h-4" />
          <span>Total Duration: {interviewData?.duration || "..."} Minutes</span>
        </div>

        {/* Name Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter your full name
          </label>
          <input
            type="text"
            placeholder="e.g. John Smith"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

        {/* Email Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter your email
          </label>
          <input
            type="email"
            placeholder="e.g. john@gmail.com"
            onChange={(e) => setUserEmail(e.target.value)}
            value={userEmail}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

        {/* Instructions */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-6">
          <h3 className="font-semibold text-gray-700 mb-2">Before you start:</h3>
          <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
            <li>Ensure a quiet environment for your interview.</li>
            <li>Check your camera and microphone are working.</li>
            <li>Stay confident and answer honestly.</li>
          </ul>
        </div>

        {/* Join Button */}
        <button
          onClick={onJoinInterview}
          disabled={loading || !userName}
          className={`w-full flex items-center justify-center gap-2 py-3 px-4 text-white font-medium rounded-xl transition-all duration-200 ${
            loading || !userName
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98]"
          }`}
        >
          <Video className="w-5 h-5" />
          {loading && <LoaderIcon className="animate-spin w-4 h-4" />}
          {loading ? "Joining..." : "Join Interview"}
        </button>
      </div>
    </div>
  );
}
