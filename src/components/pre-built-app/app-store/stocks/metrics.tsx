"use client";

import React, { useState, useEffect } from 'react';

export default function CrystalForecast() {
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [crystalPower, setCrystalPower] = useState(0);
  const [isCharging, setIsCharging] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<string>('growth');

  // Enhanced stock data with multiple metrics
  const stocks = [
    {
      symbol: 'AAPL',
      name: 'Apple Inc',
      metrics: {
        growth: 12.4,
        volatility: 18.6,
        momentum: 0.85,
        strength: 76.3,
        volume: 2.4,
        pe: 28.5
      }
    },
    {
      symbol: 'GOOGL',
      name: 'Alphabet Inc',
      metrics: {
        growth: 8.7,
        volatility: 22.3,
        momentum: 0.72,
        strength: 82.1,
        volume: 1.8,
        pe: 24.2
      }
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corp',
      metrics: {
        growth: 15.2,
        volatility: 16.8,
        momentum: 0.92,
        strength: 88.5,
        volume: 3.1,
        pe: 32.4
      }
    },
    {
      symbol: 'AMZN',
      name: 'Amazon.com',
      metrics: {
        growth: 10.9,
        volatility: 24.5,
        momentum: 0.78,
        strength: 71.9,
        volume: 2.7,
        pe: 30.8
      }
    }
  ];

  const metricInfo = {
    growth: { name: 'Growth Rate', unit: '%', color: 'purple' },
    volatility: { name: 'Volatility', unit: '%', color: 'red' },
    momentum: { name: 'Momentum', unit: '', color: 'blue' },
    strength: { name: 'Market Strength', unit: '%', color: 'emerald' },
    volume: { name: 'Volume', unit: 'M', color: 'amber' },
    pe: { name: 'P/E Ratio', unit: '', color: 'indigo' }
  };

  useEffect(() => {
    if (isCharging) {
      const interval = setInterval(() => {
        setCrystalPower(prev => {
          if (prev >= 100) {
            setIsCharging(false);
            return 0;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isCharging]);

  const chargeCrystal = () => {
    setIsCharging(true);
    setCrystalPower(0);
  };

  return (
    <div className="h-[600px] overflow-auto magical-scroll  bg-indigo-950 p-6 text-white">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center mb-8 text-purple-300">
          Crystal Market Metrics
        </h1>

        {/* Metric Selector */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {Object.entries(metricInfo).map(([key, info]) => (
            <button
              key={key}
              onClick={() => setSelectedMetric(key)}
              className={`px-3 py-1 rounded-full text-sm transition-all duration-300
                ${selectedMetric === key 
                  ? `bg-${info.color}-600/50 ring-2 ring-${info.color}-400` 
                  : `bg-${info.color}-900/30 hover:bg-${info.color}-800/30`}`}
            >
              {info.name}
            </button>
          ))}
        </div>
        
        {/* Crystal Ball */}
        <div className="relative w-48 h-48 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full bg-purple-900/30 overflow-hidden">
            {/* Inner Crystal */}
            <div className="absolute inset-4 rounded-full bg-purple-800/50 backdrop-blur-sm flex items-center justify-center">
              {selectedStock ? (
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-300">
                    {stocks.find(s => s.symbol === selectedStock)?.metrics[selectedMetric as keyof typeof stocks[0]['metrics']]}
                    {metricInfo[selectedMetric as keyof typeof metricInfo].unit}
                  </div>
                  <div className="text-sm text-purple-400">
                    {metricInfo[selectedMetric as keyof typeof metricInfo].name}
                  </div>
                </div>
              ) : (
                <div className="text-sm text-purple-400 text-center">
                  Select a stock
                </div>
              )}
            </div>
            
            {/* Power Ring */}
            <svg className="absolute inset-0" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="48"
                fill="none"
                stroke="rgb(147, 51, 234)"
                strokeWidth="2"
                strokeDasharray="301.59"
                strokeDashoffset={301.59 - (301.59 * crystalPower / 100)}
                className="transition-all duration-100"
                transform="rotate(-90 50 50)"
              />
            </svg>
          </div>

          {/* Energy Particles */}
          {isCharging && (
            <>
              <div className="absolute top-0 left-1/2 w-2 h-2 bg-purple-400 rounded-full animate-float-1" />
              <div className="absolute top-1/4 right-0 w-2 h-2 bg-purple-400 rounded-full animate-float-2" />
              <div className="absolute bottom-1/4 left-0 w-2 h-2 bg-purple-400 rounded-full animate-float-3" />
            </>
          )}
        </div>

        {/* Stock List with Metric Details */}
        <div className="grid grid-cols-2 gap-4">
          {stocks.map((stock) => (
            <button
              key={stock.symbol}
              onClick={() => {
                setSelectedStock(stock.symbol);
                chargeCrystal();
              }}
              className={`p-4 rounded-lg transition-all duration-300 text-left
                ${selectedStock === stock.symbol 
                  ? 'bg-purple-800/50 ring-2 ring-purple-400' 
                  : 'bg-purple-900/30 hover:bg-purple-800/30'}`}
            >
              <div className="text-lg font-bold text-purple-300">{stock.symbol}</div>
              <div className="text-sm text-purple-400 mb-2">{stock.name}</div>
              {selectedStock === stock.symbol && (
                <div className="space-y-1 text-sm">
                  {Object.entries(metricInfo).map(([key, info]) => (
                    <div key={key} className="flex justify-between">
                      <span className={`text-${info.color}-300`}>{info.name}:</span>
                      <span>
                        {stock.metrics[key as keyof typeof stock.metrics]}
                        {info.unit}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float-1 {
          0%, 100% { transform: translate(-50%, 0) scale(0.8); opacity: 0; }
          50% { transform: translate(-50%, -20px) scale(1); opacity: 1; }
        }
        @keyframes float-2 {
          0%, 100% { transform: translate(0, 0) scale(0.8); opacity: 0; }
          50% { transform: translate(20px, 0) scale(1); opacity: 1; }
        }
        @keyframes float-3 {
          0%, 100% { transform: translate(0, 0) scale(0.8); opacity: 0; }
          50% { transform: translate(-20px, 0) scale(1); opacity: 1; }
        }
        .animate-float-1 { animation: float-1 2s infinite; }
        .animate-float-2 { animation: float-2 2s infinite 0.3s; }
        .animate-float-3 { animation: float-3 2s infinite 0.6s; }
      `}</style>
    </div>
  );
}