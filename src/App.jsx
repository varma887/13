import React, { useState } from 'react';
import Button from './Button.jsx';
import './App.css';
import Cake from './Cake.jsx';
import Card from './Card.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Confetti from "react-confetti"; // Import Confetti

function App() {
  const [showConfetti, setShowConfetti] = useState(false);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Button />} />
          <Route path="/card" element={<Card />} />
          <Route path="/cake" element={<Cake onConfettiStart={setShowConfetti} />} />
        </Routes>
      </Router>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={600}
          recycle={false}
        />
      )}
    </>
  );
}

export default App;