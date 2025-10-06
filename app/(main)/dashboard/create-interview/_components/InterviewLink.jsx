import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Calendar, Clock, Copy, List, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

export default function InterviewLink({ interview_id, formData }) {

    console.log(interview_id)
  const url = process.env.NEXT_PUBLIC_HOST_URL + "/" + interview_id.interview_id;
  const getInterviewUrl = () => {
    return url;
  };

  const onCopyLink = async () => {
    await navigator.clipboard.writeText(url);
    toast("Link Copied");
  };

  return (
    <div className="flex flex-col items-center w-full justify-center mt-10">
      <Image
        src={"/tick.png"}
        alt="green tick"
        className="w-[50px] h-[50px]"
        width={200}
        height={100}
      />
      <h2 className="font-bold text-lg mt-4">Your AI Interview Is Ready</h2>
      <p className="mt-4">Share this link with your candidate.</p>

      <div className="w-full p-7 mt-6 rounded-2xl bg-gray-100">
        <div className="flex justify-between items-center">
          <h2 className="font-bold">Interview link</h2>
          <h2 className="p-1 px-2 text-primary bg-blue-50 rounded-2xl">
            Valid For thirty days
          </h2>
        </div>

        <div className="mt-5 flex gap-2">
          <Input defaultValue={getInterviewUrl()} disabled={true} />
          <Button onClick={() => onCopyLink()}>
            {" "}
            <Copy /> Copy Link
          </Button>
        </div>
        <hr className="my-5" />

        <div className="flex gap-5">
          <h2 className="text-xs text-gray-500 flex gap-3 items-center">
            <Clock /> {formData?.duration}
          </h2>
          <h2 className="text-xs text-gray-500 flex gap-3 items-center">
            <List /> 10 Questions
          </h2>
          <h2 className="text-xs text-gray-500 flex gap-3 items-center">
            <Calendar /> {formData?.duration || 30}
          </h2>
        </div>
      </div>

      <div className="mt-7 bg-gray-100 p-5 rounded-lg w-full">
        <h2 className="font-bold">Share Via</h2>
        <div className="flex gap-5 mt-5 justify-between">
          <Button>
            <Mail />
          </Button>
          <Button>
            <Mail />
          </Button>
          <Button>
            <Mail />
          </Button>
        </div>
      </div>

      <div className="flex gap-4 w-full mt-6">
        <Link href={"/dashboard"}>
          <Button>
            <ArrowLeft /> Back To Dashboard
          </Button>
        </Link>
        <Link href="/create-interview">
          <Button>
            <ArrowLeft /> Create new interview
          </Button>
        </Link>
      </div>
    </div>
  );
}
