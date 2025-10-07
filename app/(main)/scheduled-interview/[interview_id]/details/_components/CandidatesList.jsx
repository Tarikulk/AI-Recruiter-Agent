import { Button } from "@/components/ui/button";
import moment from "moment";
import React from "react"; 
import CandidateFeedbackDialog from "./CandidateFeedbackDialog";

export default function CandidatesList({ candidatesList }) {
  
  return (
    <div className="p-5">
      <h2>Candidates {candidatesList?.length}</h2>
      {candidatesList?.map((candidate, index) => (
        <div key={index} className="flex gap-3 items-center justify-between">
          <div>
            <h2 className="bg-primary text-white p-3 rounded-full">
              {candidate.userName[0]}
            </h2>
            <div>
              <h2>{candidate?.userName}</h2>
              <h2>
                Completed ON:{" "}
                {moment(candidate?.created_at).format("MMM DD, yyy")}
              </h2>
            </div>
          </div>


          <div className="flex gap-4 items-center">
            <h2>6/10</h2>
          <CandidateFeedbackDialog candidate={candidate} />
          </div>
        </div>
      ))}
    </div>
  );
}
