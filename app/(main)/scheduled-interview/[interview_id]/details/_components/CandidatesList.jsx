"use client";

import moment from "moment";
import React from "react";
import CandidateFeedbackDialog from "./CandidateFeedbackDialog";

export default function CandidatesList({ candidatesList }) {
  // Helper function to calculate total score of a candidate
  const getTotalScore = (feedback) => {
    if (!feedback?.rating) return 0;
    const ratings = Object.values(feedback.rating); // [techicalSkills, communication, problemSolving, experince]
    return ratings.reduce((acc, val) => acc + val, 0); // Sum of all ratings
  };

  return (
    <div className="p-6 bg-white rounded-3xl shadow-md border border-gray-100 mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-5">
        Candidates ({candidatesList?.length || 0})
      </h2>

      <div className="flex flex-col gap-4">
        {candidatesList?.map((candidate, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            {/* Candidate Info */}
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 text-white font-bold text-lg">
                {candidate.userName?.[0] || "U"}
              </div>
              <div>
                <h3 className="text-gray-800 font-semibold">{candidate?.userName}</h3>
                <p className="text-gray-500 text-sm">
                  Completed on: {moment(candidate?.created_at).format("MMM DD, yyyy")}
                </p>
              </div>
            </div>

            {/* Candidate Stats & Feedback */}
            <div className="flex items-center gap-4 mt-3 md:mt-0">
              <span className="text-gray-700 font-medium bg-green-100 px-3 py-1 rounded-full text-sm">
                {getTotalScore(candidate?.feedback?.feedback)}
              </span>
              <CandidateFeedbackDialog candidate={candidate} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
