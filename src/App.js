import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GameDetails from './pages/GameDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/game/:gameId" element={<GameDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
