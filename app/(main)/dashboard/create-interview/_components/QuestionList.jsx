"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2, Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import QuestionListContainer from "./QuestionListContainer";
import { supabase } from "@/services/supabaseClient";
import { useUser } from "@/app/provider";
import { v4 as uuidv4 } from "uuid";

export default function QuestionList({ formData, onCreateLink }) {
  const [loading, setLoading] = useState(false);
  const [questionList, setQuestionList] = useState();
  const [saveLoading, setSaveLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (formData) {
      GenerateQuestionList();
    }
  }, [formData]);

  const GenerateQuestionList = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/ai-model", {
        ...formData,
      });

      // The AI response structure is { role, content }
      const content = result.data.content;

      // Clean the markdown formatting
      const cleaned = content.replace(/```json\n?/, "").replace(/```/, "");

      // Parse JSON and extract questions
      const parsed = JSON.parse(cleaned);
      setQuestionList(parsed.interviewQuestions);

      setLoading(false);
    } catch (error) {
      console.error("Error parsing AI response:", error);
      toast("Server Error, Try Again!");
      setLoading(false);
    }
  };

  const onFinish = async () => {
    setSaveLoading(true);
    const interview_id = uuidv4();

    const { data, error } = await supabase
      .from("Interviews")
      .insert([
        {
          ...formData,
          questionList: questionList,
          userEmail: user?.email,
          interview_id: interview_id,
        },
      ])
      .select();

    const userUpdate = await supabase
      .from("Users")
      .update({ credits: Number(user?.credits) - 1 })
      .eq("email", user?.email)
      .select();

      console.log(userUpdate)

    setSaveLoading(false);

    onCreateLink({ interview_id });
    console.log(data);
  };

  return (
    <div>
      {loading && (
        <div className="p-5 bg-blue-50 rounded-xl border border-primary flex gap-5 items-center">
          <Loader2Icon className="animate-spin" />
          <div>
            <h2>Generating Interview Questions...</h2>
            <p>
              Our AI is crafting personalize question based on your job position
            </p>
          </div>
        </div>
      )}

      {questionList?.length > 0 && (
        <div>
          <QuestionListContainer questionList={questionList} />
        </div>
      )}

      <div className="flex justify-end m-10">
        <Button onClick={() => onFinish()} disabled={saveLoading}>
          {saveLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <span>Create interview link & Finish</span>
          )}
        </Button>
      </div>
    </div>
  );
}
