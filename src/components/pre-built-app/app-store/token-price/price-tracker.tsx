"use client";

import React, { useState, useEffect } from "react";

// Types
interface PotionData {
  name: string;
  price: number;
  symbol: string;
  change24h: number;
  manaVolume: number;
}

interface PotionPrices {
  [key: string]: PotionData;
}

// Custom arrow components instead of using Lucide
const ArrowUp = () => <div className="inline-block w-3 h-3 mr-1">▲</div>;

const ArrowDown = () => <div className="inline-block w-3 h-3 mr-1">▼</div>;

// Initial data
const INITIAL_POTIONS: PotionPrices = {
  PHX: {
    name: "Phoenix Essence",
    symbol: "PHX",
    price: 1234.56,
    change24h: 2.34,
    manaVolume: 245893,
  },
  DRG: {
    name: "Dragon Scale",
    symbol: "DRG",
    price: 789.12,
    change24h: -1.2,
    manaVolume: 124589,
  },
  UNI: {
    name: "Unicorn Tears",
    symbol: "UNI",
    price: 456.78,
    change24h: 5.67,
    manaVolume: 32457,
  },
  MANA: {
    name: "Pure Mana",
    symbol: "MANA",
    price: 123.45,
    change24h: -0.45,
    manaVolume: 12345,
  },
};

const PotionTracker = () => {
  const [potions, setPotions] = useState<PotionPrices>(INITIAL_POTIONS);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setPotions((prev) => {
        const updated = { ...prev };
        Object.keys(updated).forEach((potion) => {
          // Generate more mystical price movements
          const moonPhase = Math.sin(Date.now() / 10000); // Adds some cyclical variation
          const volatility = potion === "PHX" ? 0.5 : 1; // Phoenix essence is more stable
          const change = (Math.random() - 0.5 + moonPhase * 0.1) * volatility;

          const newPrice = updated[potion].price * (1 + change / 100);
          const change24hDelta = (Math.random() - 0.5) * 0.2;
          const newChange24h = updated[potion].change24h + change24hDelta;

          // Mana volume fluctuates with lunar cycles
          const volumeDelta = (Math.random() - 0.5 + moonPhase * 0.2) * 0.01;
          const newVolume = updated[potion].manaVolume * (1 + volumeDelta);

          updated[potion] = {
            ...updated[potion],
            price: newPrice,
            change24h: newChange24h,
            manaVolume: newVolume,
          };
        });
        return updated;
      });
      setLastUpdated(new Date());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#1a1a2e] p-6 font-mono text-yellow-400">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#2a2a4a] p-4 rounded border-2 border-[#4a4a6a] mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Xetra AI&apos;s Exchange</h1>
            <p className="text-sm opacity-70">
              Last Enchanted: {lastUpdated.toLocaleTimeString()}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(potions).map(([symbol, data]) => (
            <div
              key={symbol}
              className="bg-[#2a2a4a] p-4 rounded border-2 border-[#4a4a6a] relative overflow-hidden hover:border-[#6a6a8a] transition-colors"
            >
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 animate-shimmer" />

              <div className="flex justify-between items-start mb-2">
                <div>
                  <h2 className="text-lg font-bold text-emerald-400">
                    {data.name}
                  </h2>
                  <p className="text-sm opacity-70">{symbol}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">
                    {data.price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: data.price < 1 ? 4 : 2,
                    })}{" "}
                    🔮
                  </p>
                  <div
                    className={`flex items-center justify-end text-sm ${
                      data.change24h >= 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {data.change24h >= 0 ? <ArrowUp /> : <ArrowDown />}
                    {Math.abs(data.change24h).toFixed(2)}%
                  </div>
                </div>
              </div>

              <div className="text-sm opacity-70">
                Mana Volume: {Math.floor(data.manaVolume).toLocaleString()} ✨
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4 mt-6">
          <button className="px-4 py-2 bg-[#4a4a6a] text-yellow-400 rounded hover:bg-[#6a6a8a] transition-colors">
            Laboratory
          </button>
          <button className="px-4 py-2 bg-[#4a4a6a] text-yellow-400 rounded hover:bg-[#6a6a8a] transition-colors">
            Marketplace
          </button>
        </div>
      </div>
    </div>
  );
};

export default PotionTracker;
