import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CountryTile from '../components/CountryTile';
import QuestionForm from '../components/QuestionForm';
import { API_BASE_URL } from '../config/api';
import './GameRoom.css';

function GameRoom() {
  const { gameId } = useParams();
  const [gameState, setGameState] = useState(null);
  const [error, setError] = useState(null);
  const [userColor, setUserColor] = useState(null);
  const [hasAskedQuestion, setHasAskedQuestion] = useState(false);
  const navigate = useNavigate();

  const fetchGameState = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/game/${gameId}/state`);
      if (!response.ok) throw new Error('Game not found');
      const data = await response.json();
      setGameState(data);
      setHasAskedQuestion(data.current_turn === userColor && data.has_asked_question);
    } catch (error) {
      setError(error.message);
    }
  }, [gameId, userColor]);

  useEffect(() => {
    fetchGameState();
    const interval = setInterval(fetchGameState, 500);
    return () => clearInterval(interval);
  }, [gameId, fetchGameState]);

  const handleColorSelect = (color) => {
    if (color === 'red' && gameState.red_taken) return;
    if (color === 'blue' && gameState.blue_taken) return;
    setUserColor(color);
  };

  const isUserTurn = () => {
    return gameState?.current_turn === userColor;
  };

  const revealCountry = async (country) => {
    if (!isUserTurn()) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/game/${gameId}/reveal`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country, user_color: userColor }),
      });
      const data = await response.json();
      
      if (data.revealed_tiles[country] !== userColor) {
        // If revealed wrong color, end turn
        endTurn();
      }
      
      setGameState(prevState => ({
        ...prevState,
        revealed_tiles: data.revealed_tiles
      }));
    } catch (error) {
      console.error('Error revealing country:', error);
    }
  };

  const endTurn = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/game/${gameId}/end-turn`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_color: userColor }),
      });
      
      if (!response.ok) throw new Error('Could not end turn');
      
      setHasAskedQuestion(false);
      fetchGameState();
    } catch (error) {
      console.error('Error ending turn:', error);
      setError('Failed to end turn');
    }
  };

  if (error) return <div>Error: {error}</div>;
  if (!gameState) return <div>Loading...</div>;
  console.log(gameState);
  return (
    <div className="game-container">
      {!userColor && (
        <div className="team-select-overlay">
          <div className="team-select-modal">
            <h2>Choose your team</h2>
            <div className="team-buttons">
              <button 
                className="team-button red-team"
                onClick={() => handleColorSelect('red')}
                disabled={gameState.red_taken}
              >
                Join Red Team {gameState.red_taken && '(Taken)'}
              </button>
              <button 
                className="team-button blue-team"
                onClick={() => handleColorSelect('blue')}
                disabled={gameState.blue_taken}
              >
                Join Blue Team {gameState.blue_taken && '(Taken)'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="game-header">
        <h2 className="game-title">Game Room: {gameId}</h2>
        <div className="game-info">
          {userColor ? (
            <>
              <span className="current-turn">
                {isUserTurn() ? "Your Turn" : `${gameState.current_turn.toUpperCase()} Team's Turn`}
              </span>
              <span className="team-indicator" style={{ backgroundColor: userColor }}>
                Your Team: {userColor.toUpperCase()}
              </span>
            </>
          ) : (
            <span className="select-team-prompt">Select a team to begin playing</span>
          )}
        </div>
        <button 
          onClick={() => navigate('/country_clues')}
          className="leave-button"
        >
          Leave Game
        </button>
      </div>

      {userColor && (
        <button 
          onClick={endTurn}
          className="end-turn-button"
          disabled={!isUserTurn()}
        >
          End Turn
        </button>
      )}
      
      <div className="country-grid">
        {gameState.countries.map((country) => (
          <CountryTile
            key={country}
            country={country}
            revealed={country in gameState.revealed_tiles}
            color={gameState.revealed_tiles[country]}
            onReveal={() => revealCountry(country)}
            disabled={!userColor || !isUserTurn()}
          />
        ))}
      </div>

      {userColor && (
        <QuestionForm 
          gameId={gameId} 
          userColor={userColor}
          isUserTurn={isUserTurn()}
          hasAskedQuestion={hasAskedQuestion}
          onQuestionAsked={() => setHasAskedQuestion(true)}
          questionHistory={gameState.question_history || []}
        />
      )}
    </div>
  );
}

export default GameRoom; 