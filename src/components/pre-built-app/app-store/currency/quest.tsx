'use client';

import React, { useState } from 'react';

interface QuestModifier {
  name: string;
  icon: string;
  multiplier: number;
  description: string;
  type: 'difficulty' | 'risk' | 'bonus';
}

const QUEST_MODIFIERS: QuestModifier[] = [
  {
    name: "Dragon Territory",
    icon: "🐲",
    multiplier: 2.5,
    description: "Quest takes place in dangerous dragon lands",
    type: "difficulty"
  },
  {
    name: "Dark Magic",
    icon: "🌑",
    multiplier: 2.0,
    description: "Involves handling dark magical forces",
    type: "risk"
  },
  {
    name: "Time Sensitive",
    icon: "⌛",
    multiplier: 1.5,
    description: "Must be completed before next full moon",
    type: "risk"
  },
  {
    name: "Royal Request",
    icon: "👑",
    multiplier: 3.0,
    description: "Direct request from the kingdom",
    type: "bonus"
  },
  {
    name: "Ancient Ruins",
    icon: "🏛️",
    multiplier: 1.8,
    description: "Exploration of dangerous ancient sites",
    type: "difficulty"
  },
  {
    name: "Cursed Area",
    icon: "💀",
    multiplier: 2.2,
    description: "Area is afflicted by powerful curses",
    type: "risk"
  }
];

const QuestRewardsCalculator: React.FC = () => {
  const [baseReward, setBaseReward] = useState<string>('');
  const [selectedModifiers, setSelectedModifiers] = useState<Set<string>>(new Set());
  const [showResult, setShowResult] = useState<boolean>(false);

  const toggleModifier = (modifierName: string) => {
    const newModifiers = new Set(selectedModifiers);
    if (newModifiers.has(modifierName)) {
      newModifiers.delete(modifierName);
    } else {
      newModifiers.add(modifierName);
    }
    setSelectedModifiers(newModifiers);
    setShowResult(false);
  };

  const calculateReward = (): number => {
    let total = parseFloat(baseReward) || 0;
    selectedModifiers.forEach(modifierName => {
      const modifier = QUEST_MODIFIERS.find(m => m.name === modifierName);
      if (modifier) {
        total *= modifier.multiplier;
      }
    });
    return Math.round(total);
  };

  const difficultyLevel = (): string => {
    const totalMultiplier = Array.from(selectedModifiers).reduce((acc, modifierName) => {
      const modifier = QUEST_MODIFIERS.find(m => m.name === modifierName);
      return acc * (modifier?.multiplier || 1);
    }, 1);

    if (totalMultiplier >= 5) return "Legendary";
    if (totalMultiplier >= 3) return "Epic";
    if (totalMultiplier >= 2) return "Rare";
    return "Common";
  };

  return (
    <div className="w-full max-w-[700px] bg-slate-900 text-white p-6 rounded-lg relative">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 animate-pulse rounded-lg" />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2">
            📜 Quest Rewards Calculator 📜
          </h1>
          <p className="text-blue-300">Calculate bounties for dangerous quests</p>
        </div>

        {/* Base Reward Input */}
        <div className="bg-slate-800/50 p-4 rounded-lg backdrop-blur-sm mb-6">
          <label className="block mb-2">Base Reward (in Gold):</label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={baseReward}
              onChange={(e) => {
                setBaseReward(e.target.value);
                setShowResult(false);
              }}
              className="flex-1 bg-slate-700 p-2 rounded border border-blue-500/30 
                       focus:border-blue-500 outline-none transition-all duration-300"
              placeholder="Enter base reward..."
            />
            <span className="text-2xl">🪙</span>
          </div>
        </div>

        {/* Modifiers Grid */}
        <div className="mb-6">
          <h2 className="text-xl mb-4 font-semibold">Quest Modifiers:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {QUEST_MODIFIERS.map((modifier) => (
              <button
                key={modifier.name}
                onClick={() => toggleModifier(modifier.name)}
                className={`p-4 rounded-lg transition-all duration-300 
                         ${selectedModifiers.has(modifier.name)
                           ? 'bg-blue-500/30 scale-105 border-blue-500'
                           : 'bg-slate-700/50 hover:bg-slate-700'
                         } border`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl animate-pulse">{modifier.icon}</span>
                  <div className="text-left">
                    <div className="font-semibold">{modifier.name}</div>
                    <div className="text-sm text-gray-300">{modifier.description}</div>
                    <div className="text-sm text-blue-300">×{modifier.multiplier}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={() => setShowResult(true)}
          disabled={!baseReward}
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-lg font-bold 
                   hover:from-purple-600 hover:to-blue-600 transition-all duration-300
                   transform hover:scale-[1.02] active:scale-[0.98] mb-4
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ✨ Calculate Reward ✨
        </button>

        {/* Results */}
        {showResult && baseReward && (
          <div className="bg-slate-800/50 p-4 rounded-lg backdrop-blur-sm animate-pulse">
            <h3 className="text-xl font-bold mb-2">Quest Summary:</h3>
            <div className="space-y-2">
              <p>Base Reward: {baseReward} 🪙</p>
              <p>Difficulty Level: {difficultyLevel()} ⚔️</p>
              <p>Active Modifiers: {selectedModifiers.size} 🎯</p>
              <p className="text-2xl font-bold text-green-400">
                Total Reward: {calculateReward()} 🪙
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestRewardsCalculator;