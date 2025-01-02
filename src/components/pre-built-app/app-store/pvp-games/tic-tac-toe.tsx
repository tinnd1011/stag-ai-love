"use client"

import React, { useState } from 'react';

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<Array<'X' | 'O' | null>>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0 });

  const calculateWinner = (squares: Array<'X' | 'O' | null>) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (const line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i: number) => {
    if (calculateWinner(board) || board[i]) return;

    const newBoard = board.slice();
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);

    const winner = calculateWinner(newBoard);
    if (winner) {
      setScores(prev => ({
        ...prev,
        [winner]: prev[winner as keyof typeof prev] + 1
      }));
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const resetScores = () => {
    setScores({ X: 0, O: 0 });
    resetGame();
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && !board.includes(null);
  const status = winner 
    ? `Winner: ${winner}` 
    : isDraw 
    ? "It's a draw!" 
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {/* Score Board */}
      <div className="bg-transparent p-3 rounded-lg w-full max-w-[300px] shadow-sm">
        <div className="flex justify-between text-lg font-semibold">
          <span>Player X: {scores.X}</span>
          <span>Player O: {scores.O}</span>
        </div>
      </div>

      {/* Status */}
      <div className="text-xl font-bold mb-2">{status}</div>

      {/* Game Board */}
      <div className="grid grid-cols-3 gap-2 bg-transparent p-2 rounded-lg">
        {board.map((value, i) => (
          <button
            key={i}
            className={`w-[90px] h-[90px] text-3xl font-bold rounded 
              ${value ? 'bg-white' : 'bg-gray-100 hover:bg-gray-50'} 
              ${value === 'X' ? 'text-blue-500' : 'text-red-500'}
              transition-colors duration-200`}
            onClick={() => handleClick(i)}
          >
            {value}
          </button>
        ))}
      </div>

      {/* Control Buttons */}
      <div className="flex gap-4 mt-2">
        <button
          onClick={resetGame}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          New Game
        </button>
        <button
          onClick={resetScores}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          Reset Scores
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;