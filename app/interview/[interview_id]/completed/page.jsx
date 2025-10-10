"use client";

import { CheckCircle2, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function InterviewCompleted() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 px-6 py-16 text-center">
      {/* Success Icon */}
      <CheckCircle2 className="w-24 h-24 text-green-500 mb-6 drop-shadow-md" />

      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
        Interview Completed 🎉
      </h1>

      {/* Subtitle */}
      <p className="mt-3 text-gray-600 max-w-md">
        Thank you for completing your AI-powered interview. <br />
        Our recruitment team will review your responses soon.
      </p>

      {/* Button */}
      <button
        onClick={() => router.push("/")}
        className="mt-8 flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 hover:scale-105 transition-all duration-200"
      >
        <Home className="w-5 h-5" />
        Back to Home
      </button>

      {/* Footer */}
      <p className="mt-10 text-sm text-gray-400">
        © {new Date().getFullYear()} AI Recruiter — Empowering Smarter Hiring
      </p>
    </div>
  );
}
