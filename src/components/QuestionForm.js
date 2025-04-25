import React, { useState } from 'react';

function QuestionForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    prompt: '',
    answers: ['', '', '', ''],
    correctIndex: 0,
  });

  // Handle input changes
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    if (name === 'answers') {
      const newAnswers = [...formData.answers];
      newAnswers[index] = value;
      setFormData({ ...formData, answers: newAnswers });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.prompt.trim() || formData.answers.some((ans) => !ans.trim())) {
      alert('Please fill out all fields.');
      return;
    }
    const newQuestion = {
      prompt: formData.prompt,
      answers: formData.answers,
      correctIndex: parseInt(formData.correctIndex),
    };
    onSubmit(newQuestion);
    setFormData({
      prompt: '',
      answers: ['', '', '', ''],
      correctIndex: 0,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
      <h2 className="text-xl font-semibold mb-4">Create New Question</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="prompt" className="block mb-2 font-medium text-gray-700">
            Question Prompt
          </label>
          <input
            type="text"
            id="prompt"
            name="prompt"
            value={formData.prompt}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
            placeholder="Enter your question"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">Answers</label>
          {formData.answers.map((answer, index) => (
            <input
              key={index}
              type="text"
              name="answers"
              value={answer}
              onChange={(e) => handleInputChange(e, index)}
              className="w-full p-2 border rounded-md mb-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
              placeholder={`Answer ${index + 1}`}
            />
          ))}
        </div>
        <div className="mb-4">
          <label htmlFor="correctIndex" className="block mb-2 font-medium text-gray-700">
            Correct Answer
          </label>
          <select
            id="correctIndex"
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            {formData.answers.map((_, index) => (
              <option key={index} value={index}>
                Answer {index + 1}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Create Question
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default QuestionForm;