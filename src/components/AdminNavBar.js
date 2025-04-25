import React from 'react';

function AdminNavbar({ onNewQuestionClick }) {
  return (
    <nav className="bg-gray-900 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-semibold">Question Manager</h1>
        <button
          type="button"
          onClick={onNewQuestionClick}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          New Question
        </button>
      </div>
    </nav>
  );
}

export default AdminNavbar;