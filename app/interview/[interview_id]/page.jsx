"use client";

import React, { useEffect, useState } from "react";
import InterviewHeader from "../_components/InterviewHeader";
import Image from "next/image";
import { Clock, Video } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { supabase } from "@/services/supabaseClient";
import { toast } from "sonner";

export default function Interview() {
  const { interview_id } = useParams();

  const [interviewData, setInterviewData] = useState();
  const [userName, setUserName] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (interview_id) {
      getInterviewDetails();
    }
  }, [interview_id]);

  const getInterviewDetails = async () => {
    setLoading(true);
    const { data: Interviews, error } = await supabase
      .from("Interviews")
      .select("jobPosition, jobDescription, duration, type")
      .eq("interview_id", interview_id);

    if (error) {
      console.error("Supabase fetch error:", error);
      setLoading(false);
      toast("incorrect interview link");
    } else {
      setInterviewData(Interviews[0]);
      setLoading(false);
      console.log("Fetched interview data:", Interviews);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="px-10 md:px-28 lg:px-48 mt-20 bg-white">
        <Image
          src={"/logo.jpeg"}
          alt="logo"
          className="w-[100px] p-7px"
          width={100}
          height={100}
        />
        <h2>AI Powered Interview Platform</h2>

        <Image
          src={"/interview.jpg"}
          alt="interview"
          height={500}
          width={500}
          className="w-[350px] my-6"
        />

        <h2>{interviewData?.jobPosition}</h2>

        <h2 className="flex items-center gap-3 text-gray-300 mt-3">
          <Clock /> {interviewData?.duration}
        </h2>

        <div className="w-full">
          <h2>Enter your full name</h2>
          <Input placeholder="e.g. John Smith" onChange={(e)=>setUserName(event.target.value)} />
        </div>

        <div>
          <h2>Before start</h2>
          <ul>
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor sit.</li>
            <li>Lorem ipsum dolor sit amet.</li>
          </ul>

          <Button className="mt-5 w-full" disabled={loading || !userName}>
            <Video /> Join Interview
          </Button>
        </div>
      </div>
    </div>
  );
}
