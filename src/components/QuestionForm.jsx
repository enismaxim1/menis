import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/api';

function QuestionForm({ gameId, userColor, isUserTurn, onQuestionAsked, questionHistory }) {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [askedValidQuestion, setAskedValidQuestion] = useState(false);
  console.log(questionHistory);

  function formatAnswer(answer) {
    if (['yes', 'no'].includes(answer)) {
      return answer.charAt(0).toUpperCase() + answer.slice(1) + '.';
    }
    throw new Error(`Invalid answer: ${answer}. Answer must be 'yes' or 'no'`);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim() || !isUserTurn || (askedValidQuestion)) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/game/${gameId}/question`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          question,
          user_color: userColor
        }),
      });
      const data = await response.json();
      if (!data.answer) {
        setError('❌ Bad question! Please try asking a different yes/no question.');
        setAskedValidQuestion(false);
      } else {
        onQuestionAsked(data.question_history);
        setAskedValidQuestion(true);
      }
    } catch (error) {
      console.error('Error asking question:', error);
      setError('An error occurred while asking the question');
    } finally {
      setLoading(false);
      setQuestion('');
    }
  };

  useEffect(() => {
    setAskedValidQuestion(false);
  }, [isUserTurn]);

  return (
    <div className="question-section">
      {error && (
        <div className="error-message bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="question-form">
        <div className="question-input-wrapper">
          <label htmlFor="question" className="question-label">
            {isUserTurn 
              ? askedValidQuestion
                ? "You've asked your question for this turn. Please wait."
                : "Ask a yes/no question about your target countries"
              : `Waiting for ${userColor === 'red' ? 'blue' : 'red'} team's turn...`}
          </label>
          <input
            id="question"
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g., Are any of my countries in Europe?"
            className="question-input"
            disabled={!isUserTurn || askedValidQuestion}
          />
        </div>
        <button
          type="submit"
          disabled={loading || !isUserTurn || askedValidQuestion}
          className="ask-button"
        >
          {loading ? 'Asking...' : 'Ask'}
        </button>
      </form>

      <div className="question-history-container">
        <h3 className="question-history-title">Question History</h3>
        <div className="question-history-scroll">
          {[...questionHistory].reverse().filter(item => ['yes', 'no'].includes(item.answer)).map((item, index) => (
            <div 
              key={index} 
              className="question-history-item"
            >
              <p className="text-gray-600 mb-2">
                <span className={`team-indicator ${item.team}`}>
                  {item.team.toUpperCase()}:
                </span>
                {' '}{item.question}
              </p>
              <p className="text-gray-800">
                <span className="font-medium">A:</span> {formatAnswer(item.answer)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuestionForm;