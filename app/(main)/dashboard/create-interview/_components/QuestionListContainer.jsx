import React from "react";

export default function QuestionListContainer({ questionList }) {
  return (
    <div className="mt-6">
      <h2 className="font-bold text-2xl text-gray-800 mb-4">
        Generated Interview Questions
      </h2>

      <div className="flex flex-col gap-4">
        {questionList.map((item, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <h3 className="font-semibold text-gray-800 mb-1">
              {index + 1}. {item.question}
            </h3>
            <p className="text-gray-500 text-sm">Type: {item?.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
