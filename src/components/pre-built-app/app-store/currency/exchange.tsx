'use client';

import React, { useState, useEffect } from 'react';

interface Currency {
  name: string;
  rate: number;
  color: string;
  icon: string;
  description: string;
}

interface MagicOrb {
  id: number;
  left: number;
  delay: number;
}

interface CurrencyMap {
  [key: string]: Currency;
}

const CURRENCIES: CurrencyMap = {
  gold: { 
    name: 'Dragon Gold', 
    rate: 1, 
    color: '#FFD700',
    icon: '🪙',
    description: 'Standard currency of the realm'
  },
  crystal: { 
    name: 'Crystal Shards', 
    rate: 0.5, 
    color: '#88CCEE',
    icon: '💎',
    description: 'Magical crystalline essence'
  },
  essence: { 
    name: 'Ethereal Essence', 
    rate: 2, 
    color: '#FF69B4',
    icon: '⚗️',
    description: 'Pure magical energy'
  },
  rune: { 
    name: 'Ancient Runes', 
    rate: 1.5, 
    color: '#7B68EE',
    icon: '🔮',
    description: 'Ancient magical artifacts'
  },
  phoenix: { 
    name: 'Phoenix Ash', 
    rate: 3, 
    color: '#FF4500',
    icon: '✨',
    description: 'Rare phoenix remnants'
  }
} as const;

type CurrencyKey = keyof typeof CURRENCIES;

const AlchemistExchange: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyKey>('gold');
  const [amount, setAmount] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [showSparkles, setShowSparkles] = useState<boolean>(false);
  const [, setCauldronBubbles] = useState<boolean>(false);
  const [magicOrbs, setMagicOrbs] = useState<MagicOrb[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMagicOrbs(prev => {
        if (prev.length < 5) {
          return [...prev, {
            id: Date.now(),
            left: Math.random() * 100,
            delay: Math.random() * 2
          }];
        }
        return prev;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cleanup = setInterval(() => {
      setMagicOrbs(prev => prev.filter(orb => Date.now() - orb.id < 10000));
    }, 1000);
    return () => clearInterval(cleanup);
  }, []);

  const handleConvert = (): void => {
    const baseAmount = parseFloat(amount);
    if (isNaN(baseAmount)) return;
    
    const converted = (Object.entries(CURRENCIES) as [CurrencyKey, Currency][])
      .map(([key, curr]) => {
        if (key !== selectedCurrency) {
          const rate = curr.rate / CURRENCIES[selectedCurrency].rate;
          return `${curr.icon} ${(baseAmount * rate).toFixed(2)} ${curr.name}`;
        }
        return null;
      })
      .filter(Boolean);
    
    setResult(converted.join('\n'));
    setShowSparkles(true);
    setCauldronBubbles(true);
    setTimeout(() => {
      setShowSparkles(false);
      setCauldronBubbles(false);
    }, 1500);
  };

  return (
    <div className="w-full max-w-[700px] bg-slate-900 text-white p-6 rounded-lg relative">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 animate-pulse rounded-lg" />
      
      {/* Floating Orbs */}
      {magicOrbs.map((orb) => (
        <div
          key={orb.id}
          style={{
            left: `${orb.left}%`,
            animationDelay: `${orb.delay}s`
          }}
          className="absolute w-3 h-3 rounded-full bg-blue-400/50 animate-bounce pointer-events-none"
        />
      ))}

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-8 transition-transform duration-300 hover:scale-105">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2">
            ⚗️ Xetra AI&apos;s Exchange ⚗️
          </h1>
          <p className="text-blue-300 animate-pulse">Convert between magical currencies</p>
        </div>

        {/* Currency Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {(Object.entries(CURRENCIES) as [CurrencyKey, Currency][]).map(([key, curr]) => (
            <button
              key={key}
              onClick={() => setSelectedCurrency(key)}
              className={`p-4 rounded-lg transition-all duration-300
                         ${selectedCurrency === key 
                           ? 'bg-blue-500/30 scale-105' 
                           : 'bg-slate-700/50 hover:bg-slate-700'}`}
              style={{
                borderColor: curr.color,
                borderWidth: '1px',
                boxShadow: selectedCurrency === key ? `0 0 10px ${curr.color}` : 'none'
              }}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl animate-pulse">{curr.icon}</span>
                <div className="text-left">
                  <div className="font-semibold">{curr.name}</div>
                  <div className="text-sm opacity-75">{curr.description}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Amount Input */}
        <div className="bg-slate-800/50 p-4 rounded-lg backdrop-blur-sm mb-4">
          <label className="block mb-2">
            Amount of {CURRENCIES[selectedCurrency].icon} {CURRENCIES[selectedCurrency].name}:
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-slate-700 p-2 rounded border border-blue-500/30 focus:border-blue-500 outline-none 
                     transition-all duration-300 hover:bg-slate-700/70"
            placeholder="Enter amount..."
          />
        </div>

        {/* Convert Button */}
        <button
          onClick={handleConvert}
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-lg font-bold 
                   hover:from-purple-600 hover:to-blue-600 transition-all duration-300
                   transform hover:scale-[1.02] active:scale-[0.98] mb-4 relative overflow-hidden
                   group"
        >
          <span className="relative z-10">✨ Convert ✨</span>
          <div className="absolute inset-0 bg-white/20 transform scale-x-0 
                       group-hover:scale-x-100 transition-transform 
                       duration-500 origin-left" />
        </button>

        {/* Results */}
        {result && (
          <div 
            className={`bg-slate-800/50 p-4 rounded-lg backdrop-blur-sm relative overflow-hidden
                       transition-all duration-300 hover:scale-[1.01]
                       ${showSparkles ? 'animate-pulse' : ''}`}
          >
            <h3 className="font-bold mb-2 text-blue-300">🔮 Conversion Results:</h3>
            <pre className="whitespace-pre-line">{result}</pre>
            
            {showSparkles && (
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 animate-pulse" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlchemistExchange;