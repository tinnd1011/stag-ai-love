"use client";

import React, { useState, useEffect } from 'react';

interface PotionChart {
  name: string;
  basePrice: number;
  volatility: number;
  color: string;
}

const MAGIC_POTIONS: Record<string, PotionChart> = {
  PHX: {
    name: 'Phoenix Essence',
    basePrice: 1234.56,
    volatility: 0.03, // 3% volatility - most stable
    color: 'rgb(255, 99, 71)' // Reddish orange for phoenix
  },
  DRG: {
    name: 'Dragon Scale',
    basePrice: 789.12,
    volatility: 0.04,
    color: 'rgb(75, 0, 130)' // Deep purple for dragon
  },
  UNI: {
    name: 'Unicorn Tears',
    basePrice: 456.78,
    volatility: 0.05,
    color: 'rgb(147, 197, 253)' // Light blue for unicorn
  },
  MANA: {
    name: 'Pure Mana',
    basePrice: 123.45,
    volatility: 0.06, // 6% volatility - most volatile
    color: 'rgb(139, 92, 246)' // Purple for mana
  }
};

const MagicalPriceChart = () => {
  const [selectedPotion, setSelectedPotion] = useState('PHX');
  const [priceHistory, setPriceHistory] = useState<number[]>([]);
  const [isGlowing, setIsGlowing] = useState(false);

  useEffect(() => {
    // Generate mystical price history based on lunar cycles and magical interference
    const basePrice = MAGIC_POTIONS[selectedPotion].basePrice;
    const volatility = MAGIC_POTIONS[selectedPotion].volatility;
    
    const history = Array(24).fill(0).map((_, i) => {
      const timeOfDay = Math.sin((i / 24) * Math.PI * 2); // Day/night cycle
      const moonPhase = Math.cos((i / 24) * Math.PI); // Lunar influence
      const magicalInterference = Math.random() * volatility; // Random magical fluctuations
      
      return basePrice * (1 + timeOfDay * 0.02 + moonPhase * 0.03 + magicalInterference);
    });
    
    setPriceHistory(history);
    
    // Magical glow effect animation
    const glowInterval = setInterval(() => {
      setIsGlowing(prev => !prev);
    }, 2000);
    
    return () => clearInterval(glowInterval);
  }, [selectedPotion]);

  const maxPrice = Math.max(...priceHistory);
  const minPrice = Math.min(...priceHistory);

  return (
    <div className="bg-[#2a2a4a] p-6 rounded-lg border-2 border-[#4a4a6a] relative overflow-hidden">
      {/* Magical shimmer effect */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 animate-shimmer" />
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-yellow-400">Mystical Chart</h2>
        <select 
          value={selectedPotion}
          onChange={(e) => setSelectedPotion(e.target.value)}
          className="bg-[#1a1a2e] text-yellow-400 px-3 py-1 rounded border border-[#4a4a6a] focus:outline-none focus:border-purple-500"
        >
          {Object.keys(MAGIC_POTIONS).map(potion => (
            <option key={potion} value={potion}>
              {MAGIC_POTIONS[potion].name}
            </option>
          ))}
        </select>
      </div>

      <div className="h-48 bg-[#1a1a2e] p-2 rounded relative border border-[#4a4a6a]">
        {/* Price labels */}
        <div className="absolute left-2 top-0 text-xs text-yellow-400 opacity-70">
          {maxPrice.toFixed(2)} 🔮
        </div>
        <div className="absolute left-2 bottom-0 text-xs text-yellow-400 opacity-70">
          {minPrice.toFixed(2)} 🔮
        </div>

        {/* Chart bars */}
        <div className="absolute inset-0 flex items-end p-2">
          {priceHistory.map((price, i) => {
            const height = ((price - minPrice) / (maxPrice - minPrice)) * 100;
            return (
              <div
                key={i}
                className={`relative transition-all duration-300 ${
                  isGlowing ? 'opacity-100' : 'opacity-90'
                }`}
                style={{
                  height: `${height}%`,
                  width: '4%',
                  marginRight: '0.5%',
                  backgroundColor: MAGIC_POTIONS[selectedPotion].color,
                  boxShadow: isGlowing 
                    ? `0 0 10px ${MAGIC_POTIONS[selectedPotion].color}`
                    : 'none'
                }}
              />
            );
          })}
        </div>

        {/* Time indicators */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 pt-1 border-t border-[#4a4a6a]">
          <span className="text-xs text-yellow-400 opacity-70">24h ago</span>
          <span className="text-xs text-yellow-400 opacity-70">Now</span>
        </div>
      </div>

      {/* Magical indicators */}
      <div className="mt-4 flex justify-between text-sm text-yellow-400 opacity-70">
        <span>🌙 Lunar influence: {(Math.random() * 100).toFixed(1)}%</span>
        <span>✨ Magical clarity: {(Math.random() * 100).toFixed(1)}%</span>
      </div>
    </div>
  );
};

export default MagicalPriceChart;