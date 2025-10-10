"use client";

import { ArrowLeft, Calendar, Clock, Copy, List, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

export default function InterviewLink({ interview_id, formData }) {
  const url = process.env.NEXT_PUBLIC_HOST_URL + "/" + interview_id.interview_id;

  const onCopyLink = async () => {
    await navigator.clipboard.writeText(url);
    toast("Link Copied");
  };

  return (
    <div className="flex flex-col items-center w-full justify-center mt-10">
      {/* Tick Image */}
      <Image
        src={"/tick.png"}
        alt="green tick"
        className="w-16 h-16"
        width={200}
        height={200}
      />

      {/* Heading */}
      <h2 className="font-bold text-2xl mt-4 text-center text-gray-800">
        Your AI Interview Is Ready
      </h2>
      <p className="mt-2 text-center text-gray-500">
        Share this link with your candidate.
      </p>

      {/* Interview Link Card */}
      <div className="w-full max-w-2xl p-6 mt-6 rounded-2xl bg-gray-100 border border-gray-200 shadow-sm">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-gray-800">Interview link</h2>
          <span className="text-xs text-blue-600 bg-blue-50 px-3 py-1 rounded-2xl">
            Valid For 30 days
          </span>
        </div>

        {/* Link Input */}
        <div className="mt-5 flex flex-col md:flex-row gap-3">
          <input
            type="text"
            value={url}
            disabled
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
          />
          <button
            onClick={onCopyLink}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Copy className="w-4 h-4" /> Copy Link
          </button>
        </div>

        <hr className="my-5 border-gray-300" />

        {/* Interview Info */}
        <div className="flex justify-around flex-wrap gap-4 text-gray-500 text-sm">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" /> {formData?.duration} Minutes
          </span>
          <span className="flex items-center gap-1">
            <List className="w-4 h-4" /> {formData?.questionList?.length || 10} Questions
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" /> {formData?.duration || 30}
          </span>
        </div>
      </div>

      {/* Share Via Section */}
      <div className="w-full max-w-2xl bg-gray-50 p-5 rounded-2xl shadow-sm border border-gray-200 mt-6">
        <h2 className="font-semibold text-gray-800 mb-3">Share Via</h2>
        <div className="flex gap-4 justify-between">
          <button className="flex-1 flex items-center justify-center py-3 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition">
            <Mail className="w-5 h-5" />
          </button>
          <button className="flex-1 flex items-center justify-center py-3 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition">
            <Mail className="w-5 h-5" />
          </button>
          <button className="flex-1 flex items-center justify-center py-3 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100 transition">
            <Mail className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-2xl mt-6">
        <Link href={"/dashboard"} className="flex-1">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition">
            <ArrowLeft className="w-4 h-4" /> Back To Dashboard
          </button>
        </Link>
        <Link href="/create-interview" className="flex-1">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition">
            <ArrowLeft className="w-4 h-4" /> Create New Interview
          </button>
        </Link>
      </div>
    </div>
  );
}
