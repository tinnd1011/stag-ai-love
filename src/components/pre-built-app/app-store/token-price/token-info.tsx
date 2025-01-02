"use client";

import React, { useState } from 'react';

interface ChainInfo {
  name: string;
  symbol: string;
  icon: string;
}

interface TokenInfo {
  name: string;
  symbol: string;
  price: number;
  marketCap: number;
  holders: number;
  totalSupply: number;
}

const SUPPORTED_CHAINS: Record<string, ChainInfo> = {
  ETH: {
    name: 'Ethereal Realm',
    symbol: 'ETH',
    icon: '🌟'
  },
  BSC: {
    name: 'Binding Scrolls',
    symbol: 'BSC',
    icon: '📜'
  },
  MATIC: {
    name: 'Mystic Polygon',
    symbol: 'MATIC',
    icon: '⭐'
  },
  ARB: {
    name: 'Arcane Arbitrum',
    symbol: 'ARB',
    icon: '🌙'
  }
};

const TokenLookup = () => {
  const [selectedChain, setSelectedChain] = useState('ETH');
  const [tokenAddress, setTokenAddress] = useState('');
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const lookupToken = async () => {
    if (!tokenAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
      setError('Invalid magical seal (address)');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call with random data
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // Generate fake token data
      const fakeToken: TokenInfo = {
        name: `Mystic Token ${Math.floor(Math.random() * 1000)}`,
        symbol: `MTK${Math.floor(Math.random() * 100)}`,
        price: Math.random() * 100,
        marketCap: Math.random() * 1000000,
        holders: Math.floor(Math.random() * 10000),
        totalSupply: Math.floor(Math.random() * 1000000000)
      };
      
      setTokenInfo(fakeToken);
    } catch (err) {
      console.log(err)
      setError('Failed to decode magical essence');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#2a2a4a] p-6 rounded-lg border-2 border-[#4a4a6a] relative">
      {/* Magical shimmer effect */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 animate-shimmer" />

      <h2 className="text-xl font-bold text-yellow-400 mb-6">Arcane Token Seeker</h2>

      <div className="space-y-4">
        {/* Chain selector */}
        <div>
          <label className="block text-yellow-400 mb-2 text-sm">Select Magical Realm</label>
          <select
            value={selectedChain}
            onChange={(e) => setSelectedChain(e.target.value)}
            className="w-full bg-[#1a1a2e] text-yellow-400 px-3 py-2 rounded border border-[#4a4a6a] focus:outline-none focus:border-purple-500"
          >
            {Object.entries(SUPPORTED_CHAINS).map(([id, chain]) => (
              <option key={id} value={id}>
                {chain.icon} {chain.name} ({chain.symbol})
              </option>
            ))}
          </select>
        </div>

        {/* Token address input */}
        <div>
          <label className="block text-yellow-400 mb-2 text-sm">Enter Magical Seal (Address)</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
              placeholder="0x..."
              className="flex-1 bg-[#1a1a2e] text-yellow-400 px-3 py-2 rounded border border-[#4a4a6a] focus:outline-none focus:border-purple-500"
            />
            <button
              onClick={lookupToken}
              disabled={isLoading}
              className="px-4 py-2 bg-[#4a4a6a] text-yellow-400 rounded hover:bg-[#6a6a8a] transition-colors disabled:opacity-50"
            >
              {isLoading ? '✨ Divining...' : '🔍 Seek'}
            </button>
          </div>
          {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
        </div>

        {/* Token info display */}
        {tokenInfo && (
          <div className="mt-6 space-y-3 bg-[#1a1a2e] p-4 rounded border border-[#4a4a6a]">
            <div className="flex justify-between">
              <span className="text-purple-400">Magical Essence</span>
              <span className="text-yellow-400">{tokenInfo.name} ({tokenInfo.symbol})</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-purple-400">Power Level</span>
              <span className="text-yellow-400">${tokenInfo.price.toFixed(4)} 🔮</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-purple-400">Treasury Size</span>
              <span className="text-yellow-400">${tokenInfo.marketCap.toLocaleString()} 💰</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-purple-400">Spell Wielders</span>
              <span className="text-yellow-400">{tokenInfo.holders.toLocaleString()} 🧙‍♂️</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-purple-400">Total Essence</span>
              <span className="text-yellow-400">{tokenInfo.totalSupply.toLocaleString()} ✨</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TokenLookup;