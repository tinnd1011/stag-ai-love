"use client";

import React, { useState, useCallback, useEffect } from 'react';

const PointClickGame: React.FC = () => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [bullets, setBullets] = useState(10);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [gameActive, setGameActive] = useState(true);
  const [timeLeft, setTimeLeft] = useState(1000);

  const spawnNewDot = useCallback(() => {
    setPosition({
      x: Math.random() * (380 - 20),
      y: Math.random() * (280 - 20)
    });
    setIsVisible(true);
    setTimeLeft(1000);
  }, []);

  const startNewGame = () => {
    setBullets(10);
    setScore(0);
    setGameActive(true);
    spawnNewDot();
  };

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!gameActive || !isVisible) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    
    const dotX = position.x;
    const dotY = position.y;
    
    const distance = Math.sqrt(Math.pow(clickX - dotX, 2) + Math.pow(clickY - dotY, 2));
    
    if (distance < 15) {
      setScore(prev => prev + 1);
      spawnNewDot();
    }
    
    setBullets(prev => prev - 1);
    
    if (bullets <= 1) {
      setGameActive(false);
      setIsVisible(false);
      if (score > highScore) {
        setHighScore(score);
      }
    }
  }, [position, bullets, score, gameActive, isVisible, spawnNewDot, highScore]);

  useEffect(() => {
    if (!gameActive || !isVisible) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 100) {
          setIsVisible(false);
          spawnNewDot();
          return 1000;
        }
        return prev - 100;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [gameActive, isVisible, spawnNewDot]);

  return (
    <div className="flex flex-col items-center gap-4 bg-gray-800">
      <div className="bg-gray-800 p-4 rounded-lg w-full max-w-md">
        <div className="flex justify-between text-white">
          <span>Bullets: {bullets}</span>
          <span>Score: {score}</span>
          <span>High Score: {highScore}</span>
        </div>
      </div>
      
      <div 
        className="relative w-[400px] h-[300px] bg-gray-900 cursor-crosshair rounded-lg border-2 border-gray-700"
        onClick={handleClick}
      >
        {isVisible && (
          <>
            <div 
              className="absolute w-[20px] h-[20px] bg-red-500 rounded-full transition-transform hover:scale-90"
              style={{ 
                left: position.x - 10,
                top: position.y - 10,
                transform: `scale(${timeLeft / 1000})`
              }}
            />
            <div
              className="absolute h-1 bg-green-500 transition-all duration-100"
              style={{
                width: `${(timeLeft / 1000) * 100}%`,
                top: 0,
                left: 0
              }}
            />
          </>
        )}
        
        {!gameActive && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Game Over!</h2>
              <p className="text-white mb-4">Final Score: {score}</p>
              <button 
                onClick={startNewGame}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PointClickGame;