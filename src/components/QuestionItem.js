import React from 'react';

function QuestionItem({ question, onDelete, onUpdateCorrectAnswer }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <p className="font-semibold text-lg text-gray-800">{question.prompt}</p>
      <ul className="list-disc pl-6 my-2 text-gray-600">
        {question.answers.map((answer, index) => (
          <li key={index}>{answer}</li>
        ))}
      </ul>
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <label
            htmlFor={`correctIndex-${question.id}`}
            className="mr-2 font-medium text-gray-700"
          >
            Correct Answer:
          </label>
          <select
            id={`correctIndex-${question.id}`}
            value={question.correctIndex}
            onChange={(e) => onUpdateCorrectAnswer(question.id, e.target.value)}
            className="p-1 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            {question.answers.map((_, index) => (
              <option key={index} value={index}>
                Answer {index + 1}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={() => onDelete(question.id)}
          className="bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default QuestionItem;