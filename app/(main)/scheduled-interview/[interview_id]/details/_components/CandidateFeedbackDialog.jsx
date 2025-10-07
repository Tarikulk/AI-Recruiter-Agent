import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@radix-ui/react-progress";

export default function CandidateFeedbackDialog({ candidate }) {
  const feedback = candidate?.feedback?.feedback;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View Report</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Feedback?</DialogTitle>
          <DialogDescription>
            <div className="mt-4">
              <div className="flex gap-3 items-center justify-between">
                <div>
                  <h2 className="bg-primary text-white p-3 rounded-full">
                    {candidate.userName[0]}
                  </h2>
                  <div>
                    <h2>{candidate?.userName}</h2>
                    <h2>Completed ON: {candidate?.userEmail}</h2>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <h2>34</h2>
                </div>
                <h2>Skills Assesment</h2>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div>
                  <h2>
                    Technical Skills:{" "}
                    <span>{feedback?.rating?.techicalSkills}/10</span>
                  </h2>
                  <Progress
                    value={feedback?.rating?.techicalSkills * 10}
                    className="mt-3"
                  />
                </div>
                <div>
                  <h2>
                    Communicatioin Skills{" "}
                    <span>{feedback?.rating?.communication} /10</span>
                  </h2>
                  <Progress
                    value={feedback?.rating?.communication * 10}
                    className="mt-3"
                  />
                </div>
                <div>
                  <h2>
                    Problem Solving Skills{" "}
                    <span>{feedback?.rating?.problemSolving}/10</span>
                  </h2>
                  <Progress
                    value={feedback?.rating?.problemSolving * 10}
                    className="mt-3"
                  />
                </div>
                <div>
                  <h2>
                    Expertise Skills{" "}
                    <span>{feedback?.rating?.experince}/10</span>
                  </h2>
                  <Progress
                    value={feedback?.rating?.experince * 10}
                    className="mt-3"
                  />
                </div>
              </div>

              <div className="bg-gray-200 rounded-2xl p-5">
                <h2>Performance Summery</h2>
                <p>{feedback?.summery}</p>
              </div>

              <div
                className={`p-5 ${
                  feedback?.Recommendation == "Not Recommended"
                    ? "bg-red-500"
                    : "bg-green-500 rounded-md mt-5"
                }`}
              >
                {console.log(feedback)}
                <div>
                <h2>Recommendation MSG:</h2>
                <p>{feedback?.RecommendationMsg}</p>
                </div>
                <Button className={"mt-4"}>Send Message</Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
