import { Calendar, Clock } from "lucide-react";
import moment from "moment";
import React from "react";

export default function InterviewDetailContainer({ interviewDetail }) {
  return (
    <div className="p-5 bg-gray-200 mt-5 rounded-2xl">
      <h2>{interviewDetail?.jobPosition}</h2>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <h2 className="text-sm">Duration</h2>
          <h2 className="flex gap-3 items-center">
            <Clock /> {interviewDetail?.duration}
          </h2>
        </div>

        <div>
          <h2 className="text-sm">Created On</h2>
          <h2 className="flex gap-3 items-center">
            <Calendar />{" "}
            {moment(interviewDetail?.created_at).format("MMM DD, yyyy")}
          </h2>
        </div>

        {interviewDetail?.type && (
          <div>
            <h2 className="text-sm">Type</h2>
            <h2 className="flex gap-3 items-center">
              {JSON.parse(interviewDetail?.type)[0]}
            </h2>
          </div>
        )}
      </div>

      <div className="mt-5">
        <h2>Job Description</h2>
        <p>{interviewDetail?.jobDescription}</p>
      </div>

      <div className="mt-5">
        <h2>Interview Questions</h2>

        <div className="grid grid-cols-2 gap-5 mt-2">
          {
            interviewDetail?.questionList?.map((item, index) =>(
              <h2 className="text-xs" key={index}>{index + 1}. {item?.question }</h2>
            ))
          }
          </div>
      </div>
    </div>
  );
}
