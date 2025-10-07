"use client";
import { useUser } from "@/app/provider";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabaseClient";
import { Camera, Video } from "lucide-react";
import React, { useEffect, useState } from "react";
import InterviewCard from "./InterviewCard"; 

export default function LatestInterviewList() {
  const [interviewList, setInterviewList] = useState([]);

  const {user} = useUser();

  useEffect(() =>{
    if(user){
      getInterviewList();
    }
  }, [user])

  const getInterviewList = async () => {
    let { data: Interviews, error } = await supabase
    .from("Interviews")
    .select("*")
    .eq("userEmail", user?.email)
    .order("id", {ascending:false})
    .limit(6)

    setInterviewList(Interviews)

    console.log(Interviews)
  };




  return (
    <div className="my-5">
      <h2>Previously create interview</h2>

      {interviewList?.length == 0 && (
        <div className="p-5 flex flex-col gap-3 items-center bg-gray-100">
          <Video className="h-10 w-10 text-primary" />
          <h2>You don't have any interview created!</h2>
          <Button>Create new interview</Button>
        </div>
      )}

      {
        interviewList && <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
          {
            interviewList.map((interview, index) => (
              <InterviewCard interview={interview} key={index} />
            ))
          }
        </div>
      }
    </div>
  );
}
