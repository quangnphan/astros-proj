import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GameDetails from './pages/GameDetails';
import SinglePitchView from './components/SinglePitchView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/game/:gameId" element={<GameDetails />} />
        <Route path="/pitch/:pitchId" element={<SinglePitchView />} />
      </Routes>
    </Router>
  );
}

export default App;
