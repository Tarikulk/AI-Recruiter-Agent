"use client";
import { InterviewType } from "@/services/Constant";
import { ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function FormContainer({ onHandleInputChange, GoToNext }) {
  const [interviewType, setInterviewType] = useState([]);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    onHandleInputChange("type", interviewType);
  }, [interviewType]);

  useEffect(() => {
    onHandleInputChange("jobPosition", jobPosition);
  }, [jobPosition]);

  useEffect(() => {
    onHandleInputChange("jobDescription", jobDescription);
  }, [jobDescription]);

  useEffect(() => {
    onHandleInputChange("duration", duration);
  }, [duration]);

  const toggleInterviewType = (title) => {
    if (!interviewType.includes(title)) {
      setInterviewType((prev) => [...prev, title]);
    } else {
      setInterviewType((prev) => prev.filter((item) => item !== title));
    }
  };

  return (
    <div className="p-6 bg-white rounded-3xl shadow-md border border-gray-100 space-y-6">
      {/* Job Position */}
      <div>
        <label className="text-gray-700 text-sm font-medium">Job Position</label>
        <input
          type="text"
          value={jobPosition}
          onChange={(e) => setJobPosition(e.target.value)}
          placeholder="e.g., Full Stack Developer"
          className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        />
      </div>

      {/* Job Description */}
      <div>
        <label className="text-gray-700 text-sm font-medium">Job Description</label>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Enter job description"
          rows={4}
          className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 resize-none"
        />
      </div>

      {/* Interview Duration */}
      <div>
        <label className="text-gray-700 text-sm font-medium">Interview Duration</label>
        <br />
        <select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        >
          <option value="">Select Duration</option>
          <option value="5">5 Minutes</option>
          <option value="15">15 Minutes</option>
          <option value="30">30 Minutes</option>
          <option value="45">45 Minutes</option>
          <option value="60">60 Minutes</option>
        </select>
      </div>

      {/* Interview Type */}
      <div>
        <label className="text-gray-700 text-sm font-medium">Interview Type</label>
        <div className="flex gap-3 flex-wrap mt-2">
          {InterviewType.map((type, index) => (
            <button
              key={index}
              type="button"
              onClick={() => toggleInterviewType(type.title)}
              className={`flex items-center gap-2 px-3 py-2 border rounded-lg text-sm transition 
                ${
                  interviewType.includes(type.title)
                    ? "bg-blue-100 border-blue-400 text-blue-700"
                    : "bg-blue-50 border-gray-300 hover:bg-blue-100 text-gray-700"
                }`}
            >
              <type.icon className="w-4 h-4" />
              <span>{type.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Next Button */}
      <div className="flex justify-end">
        <button
          onClick={GoToNext}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-medium transition"
        >
          Generate Questions <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
