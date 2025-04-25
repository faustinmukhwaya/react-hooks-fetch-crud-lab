

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../components/App';

// Mock fetch to return an empty array of questions
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
);

describe('App', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders App component with Question Manager title', () => {
    render(<App />);
    expect(screen.getByText('Question Manager')).toBeInTheDocument();
  });

  test('renders New Question button', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /new question/i })).toBeInTheDocument();
  });

  test('displays no questions message when questions are empty', () => {
    render(<App />);
    expect(screen.getByText(/no questions available/i)).toBeInTheDocument();
  });
});