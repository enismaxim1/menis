import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';
import './CountryCluesHome.css';

function CountryCluesHome() {
  const [gameId, setGameId] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const createGame = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/game/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Response headers:', Object.fromEntries(response.headers));
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData}`);
      }
      
      const data = await response.json();
      navigate(`/country_clues/${data.game_id}`);
    } catch (error) {
      console.error('Error creating game:', error);
      setError(error.message);
    }
  };

  const joinGame = async () => {
    if (gameId.trim()) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/game/${gameId}/state`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Game not found');
          }
          throw new Error('Error joining game');
        }
        
        navigate(`/country_clues/${gameId}`);
      } catch (error) {
        console.error('Error joining game:', error);
        setError(error.message);
      }
    }
  };

  return (
    <div className="home-container">
      <div className="content-wrapper">
        <h1 className="title">Country Clues</h1>
        <p className="subtitle">A multiplayer geography guessing game</p>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <div className="actions-container">
          <button
            onClick={createGame}
            className="action-button create-button"
          >
            Create New Game
          </button>

          <div className="divider">
            <span>or</span>
          </div>

          <div className="join-container">
            <input
              type="text"
              value={gameId}
              onChange={(e) => setGameId(e.target.value)}
              placeholder="Enter Game ID"
              className="game-id-input"
            />
            <button
              onClick={joinGame}
              className="action-button join-button"
            >
              Join Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountryCluesHome; 