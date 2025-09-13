import React, { useState, useEffect } from "react";

function Cake({ onConfettiStart }) {
  const [showCountdown, setShowCountdown] = useState(false);
  const [count, setCount] = useState(0);
  const [showText, setShowText] = useState(false);
  const [blowFlame, setBlowFlame] = useState(false);
  const [showHappyBirthdayText, setShowHappyBirthdayText] = useState(false);
  const [showBlowHarderText, setShowBlowHarderText] = useState(false);
  const [showYayText, setShowYayText] = useState(false);
  const [showFinalHappyBirthdayText, setShowFinalHappyBirthdayText] = useState(false);
  const [showSecondMessage, setShowSecondMessage] = useState(false);
  const [cakeFadeOut, setCakeFadeOut] = useState(false);

  const startCountdown = () => {
    setShowCountdown(true);
    setCount(1);
    
    // Timer to show text after countdown
    setTimeout(() => {
        setShowCountdown(false);
        setCount(0);
        setShowText(true);
        
        // Timer for "Come closer..." text to appear for 5 seconds
        setTimeout(() => {
            setShowText(false); // Hide the "Come closer..." text
            setShowHappyBirthdayText(true); // Show the "Yes, come close and blow" text
            
            // Timer for the "Yes, come close and blow" text to show for 5 seconds before the next text
            setTimeout(() => {
                setShowHappyBirthdayText(false); // Hide the "Yes, come close and blow" text
                setShowBlowHarderText(true); // Show the "Blow harder" text

                // Timer for the flame to blow out after the "Blow harder" text has been shown for 7 seconds
                setTimeout(() => {
                    setBlowFlame(true);
                    
                    // Now, wait for the flame animation to complete before starting confetti
                    setTimeout(() => {
                        setShowBlowHarderText(false); // Hide "Blow harder" text
                        setShowYayText(true); // Show the "Yay!" text
                        
                        // Show "Happy Birthday" after 3 seconds of "Yay!"
                        setTimeout(() => {
                          setShowYayText(false);
                          setShowFinalHappyBirthdayText(true);
                          
                          // After "Happy Birthday" text, show the new message after 2 seconds
                          setTimeout(() => {
                            setShowSecondMessage(true);
                          }, 2000);

                          // After 2 seconds, fade out the cake
                          setTimeout(() => {
                            setCakeFadeOut(true);
                          }, 2000);
                        }, 3000);
                        
                        if (onConfettiStart) {
                            onConfettiStart(true);
                            setTimeout(() => onConfettiStart(false), 16000); // confetti lasts 5s
                        }
                    }, 500); // 500ms delay to allow the flame fade-out animation to finish
                }, 7000); // 7 seconds duration before the flame blows out
            }, 5000); // 5 seconds duration for the "Yes, come close and blow" text
        }, 5000); // 5 seconds duration for the "Come closer..." text
    }, 4000); // 4 seconds total for countdown (4 x 1 second counts)
  };

  useEffect(() => {
    if (!showCountdown) return;

    if (count > 0 && count < 4) {
      const timer = setTimeout(() => setCount((prev) => prev + 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [count, showCountdown]);

  return (
    <div className={`cake-container ${cakeFadeOut ? "fade-out" : ""}`}>
      {!showCountdown && !showText && count === 0 && !showHappyBirthdayText && !showBlowHarderText && !showYayText && !showFinalHappyBirthdayText && (
        <button className="ca" onClick={startCountdown}>
          Are U Ready?
        </button>
      )}

      {showCountdown && count > 0 && count < 4 && (
        <div className="countdown-number">{count}</div>
      )}

      {showText && <div className="blow-text">Come closer and blow the candle</div>}
      
      {showHappyBirthdayText && <div className="blow-text">Yes, come close and blow</div>}
      
      {showBlowHarderText && <div className="blow-text">Blow harder!</div>}
      
      {showYayText && <div className="blow-text">Yay!</div>}
      
      {showFinalHappyBirthdayText && <div className="heading">Happy Birthday!</div>}
      
      {showSecondMessage && <div className="normal-text">Cheers to 25, Luluchuchu! Don’t forget the one person who lives rent-free in your brain… obviously, me.<br></br> Keep that smile wide and your heart wild-Carpe diem!</div>}

      <div className="candle">
        <div className={`flame ${blowFlame ? "blow-out" : ""}`}></div>
      </div>

      <div className="cake-icing"></div>
      <div className="cake-base">
        <div className="cake-frosting"></div>
      </div>
    </div>
  );
}

export default Cake;