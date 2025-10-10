"use client";

import { useUser } from "@/app/provider";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabaseClient";
import { Video } from "lucide-react";
import React, { useEffect, useState } from "react";
import InterviewCard from "../dashboard/_components/InterviewCard";

export default function ScheduledInterview() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState();

  useEffect(() => {
    if (user) {
      getInterviewList();
    }
  }, [user]);

  const getInterviewList = async () => {
    const result = await supabase
      .from("Interviews")
      .select(
        "jobPosition, duration, interview_id, interview-feedback(userEmail)"
      )
      .eq("userEmail", user?.email)
      .order("id", { ascending: false });

    setInterviewList(result?.data);
    console.log(result?.data);
  };

  return (
    <div className="mt-5">
      <h2 className="text-2xl font-bold text-gray-800 mb-5">
        Previously Created Interviews
      </h2>

      {interviewList?.length == 0 && (
        <div className="p-5 flex flex-col gap-3 items-center bg-gray-100">
          <Video className="h-10 w-10 text-primary" />
          <h2>You don't have any interview created!</h2>
          <Button>Create new interview</Button>
        </div>
      )}

      {interviewList && (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
          {interviewList?.map((interview, index) => (
            <InterviewCard
              interview={interview}
              key={index}
              viewDetail={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}
