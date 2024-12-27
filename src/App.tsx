import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CountryCluesHome from './pages/CountryCluesHome';
import GameRoom from './pages/GameRoom';
import Layout from './components/Layout';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Layout />} />
        <Route path="/country_clues" element={<CountryCluesHome />} />
        <Route path="/country_clues/:gameId" element={<GameRoom />} />
      </Routes>
    </Router>
  );
};

export default App;