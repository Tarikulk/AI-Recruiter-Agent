"use client";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import FormContainer from "./_components/FormContainer";
import QuestionList from "./_components/QuestionList";
import { toast } from "sonner";
import InterviewLink from "./_components/InterviewLink";
import { useUser } from "@/app/provider";

export default function CreateInterview() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState();
  const [interviewId, setInterviewId] = useState();
  const {user} = useUser();

  console.log("formdata", formData);

  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const OnGoToNext = () => {
    if(user?.credits <= 0 ){
      toast("Please Add Credits")
      return;
    }
    if (
      !formData?.jobPosition ||
      !formData?.jobDescription ||
      !formData?.duration ||
      !formData?.type
    ) {
      toast("Please enter all details");
      return;
    }
    setStep(step + 1);
  };
  
  const onCreateLink = (interview_id) =>{
    setInterviewId(interview_id);
    setStep(step + 1);
  }

  return (
    <div className="mt-10 px-10 md:px-24 lg:px-44 xl:px-66">
      <div className="flex items-center gap-5">
        <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
        <h2 className="font-bold text-2xl">Create new interview</h2>
      </div>
      <Progress value={step * 33.33} className="my-5" />
      {step == 1 ? (
        <FormContainer
          onHandleInputChange={onHandleInputChange}
          GoToNext={() => OnGoToNext()}
        />
      ) : step == 2 ? (
        <QuestionList formData={formData} onCreateLink={(interview_id)=> onCreateLink(interview_id)}/>
      ) : null}{" "}
      {step === 3 ? <InterviewLink interview_id={interviewId} formData={formData} /> : null}
    </div>
  );
}
