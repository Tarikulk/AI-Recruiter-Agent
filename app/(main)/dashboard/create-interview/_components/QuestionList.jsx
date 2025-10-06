"use client";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function QuestionList({ formData }) {
  const [loading, setLoading] = useState(false);
  const [questionList, setQuestionList] = useState();

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
        <div className="p-5 border border-gray-300 rounded-2xl">
          {questionList.map((item, index) => (
            <div key={index} className="p-3 border border-gray-200">
              <h2 className="font-medium">{item.question}</h2>
              <h2>Type: {item?.type}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
