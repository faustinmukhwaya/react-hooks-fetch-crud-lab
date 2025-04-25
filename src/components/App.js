import React, { useState, useEffect } from 'react';
import AdminNavbar from './AdminNavbar';
import QuestionForm from './QuestionForm';
import QuestionList from './QuestionList';

function App() {
  const [questions, setQuestions] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // GET /questions - Fetch all questions on component mount
  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error('Error fetching questions:', err));
  }, []);

  // Toggle form visibility
  const handleNewQuestionClick = () => {
    setShowForm(!showForm);
  };

  // Handle form cancellation
  const handleCancel = () => {
    setShowForm(false);
  };

  // POST /questions - Add new question
  const handleAddQuestion = (newQuestion) => {
    fetch('http://localhost:4000/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newQuestion),
    })
      .then((res) => res.json())
      .then((data) => {
        setQuestions([...questions, data]);
        setShowForm(false);
      })
      .catch((err) => console.error('Error creating question:', err));
  };

  // DELETE /questions/:id - Delete a question
  const handleDeleteQuestion = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setQuestions(questions.filter((q) => q.id !== id));
      })
      .catch((err) => console.error('Error deleting question:', err));
  };

  // PATCH /questions/:id - Update correct answer
  const handleUpdateCorrectAnswer = (id, newCorrectIndex) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ correctIndex: parseInt(newCorrectIndex) }),
    })
      .then((res) => res.json())
      .then((updatedQuestion) => {
        setQuestions(
          questions.map((q) => (q.id === id ? updatedQuestion : q))
        );
      })
      .catch((err) => console.error('Error updating question:', err));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar onNewQuestionClick={handleNewQuestionClick} />
      <div className="container mx-auto p-4">
        {showForm && <QuestionForm onSubmit={handleAddQuestion} onCancel={handleCancel} />}
        <QuestionList
          questions={questions}
          onDelete={handleDeleteQuestion}
          onUpdateCorrectAnswer={handleUpdateCorrectAnswer}
        />
      </div>
    </div>
  );
}

export default App;