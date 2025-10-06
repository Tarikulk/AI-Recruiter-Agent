import React from 'react'

export default function QuestionListContainer({questionList}) {
  return (
    <div> 
        <h2 className="font-bold text-lg">Generated Interview Questions</h2>
          <div className="p-5 border border-gray-300 rounded-2xl">
            {questionList.map((item, index) => (
              <div key={index} className="p-3 border border-gray-200">
                <h2 className="font-medium">{item.question}</h2>
                <h2>Type: {item?.type}</h2>
              </div>
            ))}
          </div>
    </div>
  )
}
