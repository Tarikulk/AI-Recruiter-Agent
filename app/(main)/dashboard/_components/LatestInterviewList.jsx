"use client";

import { useUser } from "@/app/provider";
import { supabase } from "@/services/supabaseClient";
import { Video } from "lucide-react";
import React, { useEffect, useState } from "react";
import InterviewCard from "./InterviewCard";

export default function LatestInterviewList() {
  const [interviewList, setInterviewList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      getInterviewList();
    }
  }, [user]);

  const getInterviewList = async () => {
    let { data: Interviews, error } = await supabase
      .from("Interviews")
      .select("*")
      .eq("userEmail", user?.email)
      .order("id", { ascending: false })
      .limit(6);

    setInterviewList(Interviews);
  };

  return (
    <div className="my-5">
      <h2 className="text-2xl font-bold text-gray-800 mb-5">
        Latest Interviews
      </h2>

      {interviewList?.length === 0 && (
        <div className="flex flex-col gap-4 items-center justify-center p-8 bg-gray-100 rounded-2xl">
          <Video className="h-12 w-12 text-blue-500" />
          <h2 className="text-gray-700 font-semibold">
            You haven't created any interviews yet!
          </h2>
          <button className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            Create New Interview
          </button>
        </div>
      )}

      {interviewList?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {interviewList.map((interview, index) => (
            <div
              key={index}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <InterviewCard interview={interview} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
