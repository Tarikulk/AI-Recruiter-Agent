"use client";

import { Calendar, Clock } from "lucide-react";
import moment from "moment";
import React from "react";

export default function InterviewDetailContainer({ interviewDetail }) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-md border border-gray-100 mt-6 transition-all duration-300 hover:shadow-lg">
      {/* Job Position */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
        {interviewDetail?.jobPosition}
      </h2>

      {/* Meta Info */}
      <div className="mt-5 flex flex-col md:flex-row md:justify-between gap-6">
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Duration</span>
          <span className="flex items-center gap-2 mt-1 text-gray-700 font-medium">
            <Clock className="w-4 h-4 text-blue-500" />
            {interviewDetail?.duration}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Created On</span>
          <span className="flex items-center gap-2 mt-1 text-gray-700 font-medium">
            <Calendar className="w-4 h-4 text-green-500" />
            {moment(interviewDetail?.created_at).format("MMM DD, yyyy")}
          </span>
        </div>

        {interviewDetail?.type && (
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Type</span>
            <span className="mt-1 text-gray-700 font-medium">
              {JSON.parse(interviewDetail?.type)[0]}
            </span>
          </div>
        )}
      </div>

      {/* Job Description */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Job Description
        </h3>
        <p className="text-gray-600">{interviewDetail?.jobDescription}</p>
      </div>

      {/* Interview Questions */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Interview Questions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {interviewDetail?.questionList?.map((item, index) => (
            <div
              key={index}
              className="p-3 bg-gray-50 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <span className="text-sm text-gray-700 font-medium">
                {index + 1}. {item?.question}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
