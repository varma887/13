import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import rosesImg from "./assets/roses1.png";

function CardGame() {
  const [flipped, setFlipped] = useState({
    first: false,
    second: false,
    third: false,
  });

  const [firstChoice, setFirstChoice] = useState(null);
  const [secondChoiceMade, setSecondChoiceMade] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const navigate = useNavigate();

  const handleFlip = (cardName) => {
    if (!firstChoice) {
      setFirstChoice(cardName);
      setFlipped((prev) => ({ ...prev, [cardName]: !prev[cardName] }));

      if (cardName === "second" || cardName === "third") {
        setTimeout(() => setShowMessage(true), 2500); // show message after 2s
      }
      return;
    }

    if (firstChoice === "first") {
      if (!secondChoiceMade && (cardName === "second" || cardName === "third")) {
        setFlipped((prev) => ({ ...prev, [cardName]: !prev[cardName] }));
        setSecondChoiceMade(true);

        setTimeout(() => setShowMessage(true), 3000); // message delay for this case
      }
    }
  };

  // Show button 5s after message appears
  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => setShowButton(true), 5000);
      return () => clearTimeout(timer); // cleanup
    }
  }, [showMessage]);

  return (
    <div>
      <h1 className="pick-title">Pick One</h1>

      <div className="card-container">
        {/* Card 1 */}
        <div className="card-outer" onClick={() => handleFlip("first")}>
          <div className={`card-inner ${flipped.first ? "flipped" : ""}`}>
            <div className="card-face front"></div>
            <div className="card-face back pixel-text">
              Ayoo!! <br />NO, NOT THIS ONE
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="card-outer" onClick={() => handleFlip("second")}>
          <div className={`card-inner ${flipped.second ? "flipped" : ""}`}>
            <div className="card-face front"></div>
            <div className="card-face back">
              <img src={rosesImg} alt="Roses1" className="rose1-img" />
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="card-outer" onClick={() => handleFlip("third")}>
          <div className={`card-inner ${flipped.third ? "flipped" : ""}`}>
            <div className="card-face front"></div>
            <div className="card-face back">
              <img src={rosesImg} alt="Roses1" className="rose1-img" />
            </div>
          </div>
        </div>
      </div>

      {/* Message and Continue button */}
      {showMessage && (
        <div className="roses-message-container">
          <p className="roses-message">
            Roses are red, violets are blue, your endless arguments achieve… nothing new
          </p>
          {showButton && (
            <button className="btn" onClick={() => navigate("/cake")}>
              Click Me
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default CardGame;
