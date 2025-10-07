import { Button } from "@/components/ui/button";
import moment from "moment";
import React from "react";
import { toast } from "sonner";

export default function InterviewCard({ interview, viewDetail=false }) {

    const url = process.env.NEXT_PUBLIC_HOST_URL+"/"+interview?.interview_id

    const copyLink = () =>{
        navigator.clipboard.writeText(url)
        toast("Copied") 
      }

    const onSend = () =>{
        window.location.href="mailto:accounts@obayedullahkhan986@gmail.com?subject=AI Recruiter Interview Link & body=interview Link:" + url
    }

  return (
    <div className="p-5 bg-gray-100 rounded-lg border">
      <div className="flex items-center justify-between">
        <div className="h-[40px] w-[40px] rounded-full bg-primary"></div>
        <h2>{moment(interview?.created_at).format("DD MMM yyy")}</h2>
      </div>
      <h2 className="mt-3 text-lg">{interview?.jobPosition}</h2>
      <h2 className="mt-3 text-lg flex justify-between">{interview?.duration} 
        <span>{interview['interview-feedback']?.length} Candidates</span>
      </h2>

     {
        !viewDetail ?  <div className="flex gap-3">
        <Button className={"w-1/2"} onClick={copyLink}>Copy Link</Button>
        <Button className={"w-1/2"} onClick={onSend}>Send</Button>
      </div>: <Button className={"w-full"}>View Detail</Button>
     }
    </div>
  );
}
