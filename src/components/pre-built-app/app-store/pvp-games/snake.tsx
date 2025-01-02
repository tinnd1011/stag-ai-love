"use client"

import React, { useState, useEffect, useCallback } from 'react';

type Position = { x: number; y: number };

const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('RIGHT');
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const moveSnake = useCallback(() => {
    if (isGameOver || !isGameStarted) return;

    const newSnake = [...snake];
    const head = { ...newSnake[0] };

    switch (direction) {
      case 'UP':
        head.y -= 1;
        break;
      case 'DOWN':
        head.y += 1;
        break;
      case 'LEFT':
        head.x -= 1;
        break;
      case 'RIGHT':
        head.x += 1;
        break;
    }

    // Check collision with walls
    if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) {
      setIsGameOver(true);
      if (score > highScore) {
        setHighScore(score);
      }
      return;
    }

    // Check collision with self
    if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
      setIsGameOver(true);
      if (score > highScore) {
        setHighScore(score);
      }
      return;
    }

    newSnake.unshift(head);

    // Check if snake ate food
    if (head.x === food.x && head.y === food.y) {
      setScore(prevScore => prevScore + 10);
      setFood({
        x: Math.floor(Math.random() * 20),
        y: Math.floor(Math.random() * 20)
      });
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }, [snake, direction, food, isGameOver, isGameStarted, score, highScore]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isGameStarted || isGameOver) return;
      
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    const gameLoop = setInterval(moveSnake, 200);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      clearInterval(gameLoop);
    };
  }, [moveSnake, direction, isGameStarted, isGameOver]);

  const startNewGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 5, y: 5 });
    setDirection('RIGHT');
    setIsGameOver(false);
    setScore(0);
    setIsGameStarted(true);
  };

  const renderGameState = () => {
    if (!isGameStarted) {
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Snake Game</h2>
            <button 
              onClick={startNewGame}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Start Game
            </button>
          </div>
        </div>
      );
    }

    if (isGameOver) {
      return (
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
      );
    }

    return null;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="bg-gray-800 p-4 w-full max-w-md">
        <div className="flex justify-between text-white mb-2">
          <span>Score: {score}</span>
          <span>High Score: {highScore}</span>
        </div>
      </div>
      
      <div className="w-[400px] h-[400px] bg-gray-900 relative rounded-lg border-2 border-gray-700">
        {snake.map((segment, i) => (
          <div
            key={i}
            className="absolute w-5 h-5 bg-green-500 rounded-sm"
            style={{
              left: segment.x * 20,
              top: segment.y * 20
            }}
          />
        ))}
        <div
          className="absolute w-5 h-5 bg-red-500 rounded-full"
          style={{
            left: food.x * 20,
            top: food.y * 20
          }}
        />
        {renderGameState()}
      </div>
    </div>
  );
};

export default SnakeGame;