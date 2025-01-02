"use client";
// src/apps/MemoryGame.tsx
import React, { useState } from 'react';

const COLORS = ['red', 'blue', 'green', 'yellow'];

const MemoryGame: React.FC = () => {
  const [sequence, setSequence] = useState<string[]>([]);
  const [playerSequence, setPlayerSequence] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    const initialColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    setSequence([initialColor]);
    playSequence([initialColor]);
  };

  const playSequence = async (currentSequence: string[]) => {
    setIsPlaying(true);
    for (const color of currentSequence) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const el = document.getElementById(color);
      el?.classList.add('opacity-50');
      await new Promise(resolve => setTimeout(resolve, 500));
      el?.classList.remove('opacity-50');
    }
    setIsPlaying(false);
  };

  const handleColorClick = (color: string) => {
    if (isPlaying || !gameStarted) return;
    
    const newPlayerSequence = [...playerSequence, color];
    setPlayerSequence(newPlayerSequence);

    if (newPlayerSequence[newPlayerSequence.length - 1] !== sequence[newPlayerSequence.length - 1]) {
      window.alert(`Game Over! Score: ${score}`);
      setSequence([]);
      setPlayerSequence([]);
      setGameStarted(false);
      setScore(0);
      return;
    }

    if (newPlayerSequence.length === sequence.length) {
      setScore(prev => prev + 1);
      setPlayerSequence([]);
      const newSequence = [...sequence, COLORS[Math.floor(Math.random() * COLORS.length)]];
      setSequence(newSequence);
      setTimeout(() => playSequence(newSequence), 1000);
    }
  };

  return (
    <div className="w-[300px] h-[400px] p-4 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={startGame}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          disabled={isPlaying}
        >
          {gameStarted ? 'Restart' : 'Start Game'}
        </button>
        <div className="font-bold">Score: {score}</div>
      </div>

      <div className="grid grid-cols-2 gap-2 flex-grow">
        {COLORS.map(color => (
          <button
            key={color}
            id={color}
            className={`w-full h-[100px] rounded transition-opacity ${!gameStarted && 'opacity-50'}`}
            style={{ backgroundColor: color }}
            onClick={() => handleColorClick(color)}
            disabled={isPlaying || !gameStarted}
          />
        ))}
      </div>

      <div className="mt-4 text-center text-sm">
        {!gameStarted && 'Press Start to begin!'}
        {gameStarted && isPlaying && 'Watch the sequence...'}
        {gameStarted && !isPlaying && 'Your turn! Repeat the sequence.'}
      </div>
    </div>
  );
};

export default MemoryGame;