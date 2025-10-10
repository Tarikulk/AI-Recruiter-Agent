"use client";

import React, { useState } from "react";
import InterviewHeader from "./_components/InterviewHeader";
import { InterViewDataContext } from "@/context/InterviewDataContext";

export default function InterviewLayout({ children }) {
  const [interviewInfo, setInterviewInfo] = useState();

  return (
    <InterViewDataContext.Provider value={{ interviewInfo, setInterviewInfo }}>
      <div className="bg-secondary">
        <InterviewHeader />
        {children}
      </div>
    </InterViewDataContext.Provider>
  );
}
