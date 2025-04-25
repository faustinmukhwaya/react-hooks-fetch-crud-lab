import React from 'react';
import QuestionItem from './QuestionItem';

function QuestionList({ questions, onDelete, onUpdateCorrectAnswer }) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Questions</h2>
      {questions.length === 0 ? (
        <p className="text-gray-500 italic">No questions available. Create one above!</p>
      ) : (
        <div className="space-y-4">
          {questions.map((question) => (
            <QuestionItem
              key={question.id}
              question={question}
              onDelete={onDelete}
              onUpdateCorrectAnswer={onUpdateCorrectAnswer}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default QuestionList;