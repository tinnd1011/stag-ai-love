"use client";

import React, { useState, useEffect } from 'react';

interface Order {
  price: number;
  amount: number;
}

interface OrderBook {
  bids: Order[];
  asks: Order[];
}

const MagicalMarketDepth = () => {
  const [orders, setOrders] = useState<OrderBook>({ bids: [], asks: [] });
  const [selectedPotion, ] = useState('PHX');

  const POTIONS: { [key: string]: { name: string; basePrice: number; unit: string } } = {
    PHX: {
      name: 'Phoenix Essence',
      basePrice: 1234.56,
      unit: '🔥'
    }
  };

  useEffect(() => {
    // Generate mystical order book data
    const basePrice = POTIONS[selectedPotion as keyof typeof POTIONS].basePrice;
    
    const bids = Array(10).fill(0).map((_, i) => ({
      price: basePrice * (1 - (i * 0.001) - Math.random() * 0.001),
      amount: Math.random() * 2 + 0.5 // Minimum 0.5 units
    }));

    const asks = Array(10).fill(0).map((_, i) => ({
      price: basePrice * (1 + (i * 0.001) + Math.random() * 0.001),
      amount: Math.random() * 2 + 0.5
    }));

    setOrders({ bids, asks });
  }, [selectedPotion]);

  return (
    <div className="bg-[#2a2a4a] p-6 rounded-lg border-2 border-[#4a4a6a] relative max-h-[400px] overflow-y-auto magical-scroll ">
      {/* Magical shimmer effect */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 animate-shimmer" />

      <h2 className="text-xl font-bold text-yellow-400 mb-4">Arcane Order Book</h2>

      <div className="space-y-4">
        {/* Asks (Selling) */}
        <div className="relative">
          <h3 className="font-medium text-red-400 mb-2 flex items-center">
            <span className="mr-2">Enchanted Offerings</span>
            <span className="text-xs opacity-70">✨ Selling</span>
          </h3>
          <div className="space-y-1">
            {orders.asks.map((ask, i) => (
              <div 
                key={i} 
                className="flex justify-between text-sm p-1 rounded hover:bg-[#3a3a5a] transition-colors relative overflow-hidden"
              >
                {/* Background fill based on volume */}
                <div 
                  className="absolute left-0 top-0 bottom-0 bg-red-900 opacity-10"
                  style={{ width: `${(ask.amount / 2) * 100}%` }}
                />
                <span className="text-red-300 relative">
                  {ask.price.toFixed(2)} 🔮
                </span>
                <span className="text-gray-300 relative">
                  {ask.amount.toFixed(4)} {POTIONS[selectedPotion].unit}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Spread Indicator */}
        <div className="text-center text-sm text-purple-400 bg-[#1a1a2e] p-2 rounded border border-[#4a4a6a]">
          <span className="opacity-70">Magical Spread: </span>
          {(orders.asks[0]?.price - orders.bids[0]?.price).toFixed(2)} 🔮
        </div>

        {/* Bids (Buying) */}
        <div className="relative">
          <h3 className="font-medium text-green-400 mb-2 flex items-center">
            <span className="mr-2">Mystic Demands</span>
            <span className="text-xs opacity-70">✨ Buying</span>
          </h3>
          <div className="space-y-1">
            {orders.bids.map((bid, i) => (
              <div 
                key={i} 
                className="flex justify-between text-sm p-1 rounded hover:bg-[#3a3a5a] transition-colors relative overflow-hidden"
              >
                {/* Background fill based on volume */}
                <div 
                  className="absolute left-0 top-0 bottom-0 bg-green-900 opacity-10"
                  style={{ width: `${(bid.amount / 2) * 100}%` }}
                />
                <span className="text-green-300 relative">
                  {bid.price.toFixed(2)} 🔮
                </span>
                <span className="text-gray-300 relative">
                  {bid.amount.toFixed(4)} {POTIONS[selectedPotion].unit}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Volume Indicator */}
        <div className="text-center text-xs text-yellow-400 opacity-70">
          Total Volume: {orders.bids.reduce((acc, bid) => acc + bid.amount, 0).toFixed(2)} {POTIONS[selectedPotion].unit}
        </div>
      </div>
    </div>
  );
};

export default MagicalMarketDepth;