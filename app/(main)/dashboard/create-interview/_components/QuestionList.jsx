"use client";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import QuestionListContainer from "./QuestionListContainer";
import { supabase } from "@/services/supabaseClient";
import { useUser } from "@/app/provider";
import { v4 as uuidv4 } from "uuid";

export default function QuestionList({ formData, onCreateLink }) {
  const [loading, setLoading] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const [saveLoading, setSaveLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (formData) {
      generateQuestionList();
    }
  }, [formData]);

  const generateQuestionList = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/ai-model", { ...formData });

      // The AI response structure is { role, content }
      const content = result.data.content;

      // Clean the markdown formatting
      const cleaned = content.replace(/```json\n?/, "").replace(/```/, "");

      // Parse JSON and extract questions
      const parsed = JSON.parse(cleaned);
      setQuestionList(parsed.interviewQuestions);
    } catch (error) {
      console.error("Error parsing AI response:", error);
      toast("Server Error, Try Again!");
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async () => {
    setSaveLoading(true);
    const interview_id = uuidv4();

    try {
      const { data } = await supabase
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

      await supabase
        .from("Users")
        .update({ credits: Number(user?.credits) - 1 })
        .eq("email", user?.email)
        .select();

      onCreateLink({ interview_id });
      console.log(data);
    } catch (error) {
      console.error(error);
      toast("Failed to save interview.");
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Loading AI Message */}
      {loading && (
        <div className="p-5 bg-blue-50 rounded-xl border border-blue-200 flex gap-5 items-center">
          <Loader2 className="animate-spin w-6 h-6 text-blue-500" />
          <div>
            <h2 className="font-semibold text-gray-700">
              Generating Interview Questions...
            </h2>
            <p className="text-gray-500 text-sm">
              Our AI is crafting personalized questions based on your job
              position.
            </p>
          </div>
        </div>
      )}

      {/* Question List */}
      {questionList?.length > 0 && (
        <div>
          <QuestionListContainer questionList={questionList} />
        </div>
      )}

      {/* Finish Button */}
      <div className="flex justify-end">
        <button
          onClick={onFinish}
          disabled={saveLoading}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition ${
            saveLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {saveLoading ? (
            <Loader2 className="animate-spin w-5 h-5" />
          ) : (
            "Create Interview Link & Finish"
          )}
        </button>
      </div>
    </div>
  );
}
