import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { InterviewType } from "@/services/Constant";
import { ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function FormContainer({ onHandleInputChange, GoToNext }) {
  const [interviewType, setInterviewType] = useState([]);

  useEffect(() => {
    if (interviewType) {
      onHandleInputChange("type", interviewType);
    }
  }, [interviewType]);


  const AddInterviewType = (title) => {
    if (!interviewType.includes(title)) {
      setInterviewType((prev) => [...prev, title]);
    } else {
      const result = interviewType.filter((item) => item !== title);
      setInterviewType(result);
    }
  };
  

  return (
    <div className="p-5 bg-gray-100">
      <div>
        <h2 className="text-sm mt-5">Job Position</h2>
        <Input
          onChange={(event) =>
            onHandleInputChange("jobPosition", event.target.value)
          }
          placeholder="e.g full stack developer"
          className="mt-2"
        />
      </div>

      <div>
        <h2 className="text-sm mt-5">Job Descriptioin</h2>
        <Textarea
          onChange={(event) =>
            onHandleInputChange("jobDescription", event.target.value)
          }
          placeholder="e.g enter job description"
          className="mt-5"
        />
      </div>

      <div>
        <h2 className="text-sm mt-5">Interview Duration</h2>
        <Select
          onValueChange={(value) => onHandleInputChange("duration", value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5 Minutes</SelectItem>
            <SelectItem value="15">15 Minutes</SelectItem>
            <SelectItem value="30">30 Minutes</SelectItem>
            <SelectItem value="45">45 Minutes</SelectItem>
            <SelectItem value="60">60 Minutes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h2 className="text-sm mt-5">Interview type</h2>

        <div className="flex gap-3 flex-wrap mt-2 justify-center items-center">
          {InterviewType.map((type, index) => (
            <div
              key={index}
              className={`flex gap-2 p-1 px-2 items-center bg-blue-50 rounded border border-gray-300 hover:bg-secondary 
                ${
                  interviewType.includes(type.title) &&
                  "bg-blue-100 text-primary"
                }`}
              onClick={() => AddInterviewType(type.title)}
            >
              <type.icon />
              <span>{type.title}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end" onClick={() => GoToNext()}>
      <Button className="mt-5 flex justify-end">
        Generate Question <ArrowRight />
      </Button>
      </div>
    </div>
  );
}
