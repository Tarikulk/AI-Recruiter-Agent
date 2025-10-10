"use client";

import { useUser } from "@/app/provider";
import { supabase } from "@/services/supabaseClient";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import InterviewDetailContainer from "./_components/InterviewDetailContainer";
import CandidatesList from "./_components/CandidatesList";

export default function InterviewDetails() {
  const { interview_id } = useParams();

  const [interviewDetail, setInterviewDetail] = useState();

  const { user } = useUser();

  useEffect(() => {
    if (user) {
      getInterviewDetails();
    }
  }, [user]);

  const getInterviewDetails = async () => {
    const result = await supabase
      .from("Interviews")
      .select(
        `jobPosition, jobDescription, type, questionList, duration, interview_id, created_at, interview-feedback(userEmail, userName, feedback, created_at)`
      )
      .eq("userEmail", user?.email)
      .eq("interview_id", interview_id);

    setInterviewDetail(result?.data[0]);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
          Interview Details
        </h1>
        <p className="text-gray-500 mt-1">
          View job description, questions, and candidate feedback
        </p>
      </div>
      <InterviewDetailContainer interviewDetail={interviewDetail} />
      <CandidatesList
        candidatesList={interviewDetail?.["interview-feedback"]}
      />
    </div>
  );
}
