"use client";

import React, { useState } from "react";

export default function CandidateFeedbackDialog({ candidate }) {
  const feedback = candidate?.feedback?.feedback;
  const [isOpen, setIsOpen] = useState(false);

  // Calculate total score
  const totalScore = feedback?.rating
    ? Object.values(feedback.rating).reduce((acc, val) => acc + val, 0)
    : 0;

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-blue-700 transition-colors duration-200"
      >
        View Report
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-200 bg-opacity-50 p-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-3xl p-6 relative overflow-y-auto max-h-[90vh]">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 font-bold text-xl"
            >
              &times;
            </button>

            {/* Header */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Candidate Feedback
            </h2>

            {/* Candidate Info */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 text-white text-lg font-bold">
                {candidate.userName?.[0]}
              </div>
              <div>
                <h3 className="text-gray-800 font-semibold">
                  {candidate?.userName}
                </h3>
                <p className="text-gray-500 text-sm">
                  Email: {candidate?.userEmail}
                </p>
              </div>
              <div className="ml-auto flex flex-col items-end gap-1">
                <span className="text-gray-700 font-medium">
                  Score: {totalScore}
                </span>
                <span className="text-gray-500 text-sm">Skills Assessment</span>
              </div>
            </div>

            {/* Skills Ratings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {feedback?.rating && (
                <>
                  <SkillBar
                    label="Technical Skills"
                    value={feedback?.rating?.technicalSkills}
                  />
                  <SkillBar
                    label="Communication Skills"
                    value={feedback?.rating?.communication}
                  />
                  <SkillBar
                    label="Problem Solving Skills"
                    value={feedback?.rating?.problemSolving}
                  />
                  <SkillBar
                    label="Expertise Skills"
                    value={feedback?.rating?.experince}
                  />
                </>
              )}
            </div>

            {/* Performance Summary */}
            <div className="bg-gray-50 rounded-2xl p-5 mb-6">
              <h3 className="font-semibold text-gray-800 mb-2">
                Performance Summary
              </h3>
              <p className="text-gray-600">{feedback?.summery}</p>
            </div>

            {/* Recommendation */}
            <div
              className={`p-5 rounded-xl ${
                feedback?.Recommendation === "Not Recommended"
                  ? "bg-red-500 text-white"
                  : "bg-green-500 text-white"
              }`}
            >
              <h3 className="font-semibold mb-1">Recommendation:</h3>
              <p>{feedback?.RecommendationMsg}</p>
              <button className="mt-4 bg-white text-gray-800 px-4 py-2 rounded-xl font-medium hover:bg-gray-100 transition-colors duration-200">
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Skill Bar Sub-component
function SkillBar({ label, value }) {
  return (
    <div>
      <div className="flex justify-between text-sm text-gray-700 font-medium mb-1">
        <span>{label}</span>
        <span>{value}/10</span>
      </div>
      <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
        <div
          className="h-3 bg-blue-500 rounded-full"
          style={{ width: `${value * 10}%` }}
        />
      </div>
    </div>
  );
}
