"use client";

import Image from "next/image";
import React from "react";

export default function InterviewHeader() {
  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image
            src="/logo.jpeg"
            alt="AI Recruiter Logo"
            width={50}
            height={50}
            className="rounded-lg shadow-sm"
          />
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800 tracking-tight">
            AI Recruiter
          </h1>
        </div>

        {/* Right-side (optional future use: profile/settings) */}
        <div className="hidden md:flex items-center gap-4">
          <span className="text-sm text-gray-500">
            Smarter Interviews. Better Hiring.
          </span>
        </div>
      </div>
    </header>
  );
}
