"use client";

import moment from "moment";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";
import { Copy, Send, Eye } from "lucide-react";

export default function InterviewCard({ interview, viewDetail = false }) {
  const url = `${process.env.NEXT_PUBLIC_HOST_URL}/${interview?.interview_id}`;

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    toast.success("Interview link copied to clipboard!");
  };

  const onSend = () => {
    window.location.href = `mailto:recruiter@company.com?subject=AI Recruiter Interview Link&body=Interview Link: ${url}`;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-lg shadow">
            {interview?.jobPosition?.[0] || "A"}
          </div>
          <div>
            <h2 className="font-semibold text-gray-800 text-lg">
              {interview?.jobPosition || "Untitled Role"}
            </h2>
            <p className="text-sm text-gray-500">
              {moment(interview?.created_at).format("DD MMM YYYY")}
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex justify-between items-center mt-3 text-sm text-gray-600">
        <span className="font-medium">
          Duration:{" "}
          <span className="text-gray-800">{interview?.duration || "N/A"}</span>
        </span>
        <span className="text-gray-500">
          {interview["interview-feedback"]?.length || 0} Candidates
        </span>
      </div>

      {/* Actions */}
      {!viewDetail ? (
        <div className="flex gap-3 mt-5">
          <button
            onClick={copyLink}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition-all duration-200"
          >
            <Copy className="w-4 h-4" />
            Copy Link
          </button>
          <button
            onClick={onSend}
            className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-200 transition-all duration-200"
          >
            <Send className="w-4 h-4 text-blue-600" />
            Send
          </button>
        </div>
      ) : (
        <Link
          href={`/scheduled-interview/${interview?.interview_id}/details`}
          className="block mt-5"
        >
          <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition-all duration-200">
            <Eye className="w-4 h-4" />
            View Detail
          </button>
        </Link>
      )}
    </div>
  );
}
