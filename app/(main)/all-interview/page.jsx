"use client";

import { useUser } from "@/app/provider";
import { supabase } from "@/services/supabaseClient";
import { Video } from "lucide-react";
import React, { useEffect, useState } from "react";
import InterviewCard from "../dashboard/_components/InterviewCard";

export default function AllInterview() {
  const [interviewList, setInterviewList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      getInterviewList();
    }
  }, [user]);

  const getInterviewList = async () => {
    const { data: Interviews, error } = await supabase
      .from("Interviews")
      .select(`
        *,
        interview-feedback (id)
      `)
      .eq("userEmail", user?.email)
      .order("id", { ascending: false });

    if (error) console.error(error);

    setInterviewList(Interviews);
  };

  return (
    <div className="my-8 px-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-5">All Created Interviews</h2>

      {interviewList?.length === 0 && (
        <div className="p-8 flex flex-col gap-4 items-center bg-gray-50 rounded-2xl border border-gray-200 shadow-md">
          <Video className="h-12 w-12 text-blue-500" />
          <h2 className="text-lg text-gray-700">You don't have any interview created!</h2>
          <button
            onClick={() => window.location.href = "/create-interview"}
            className="mt-3 bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            Create New Interview
          </button>
        </div>
      )}

      {interviewList?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {interviewList.map((interview, index) => (
            <InterviewCard interview={interview} key={index} />
          ))}
        </div>
      )}
    </div>
  );
}
