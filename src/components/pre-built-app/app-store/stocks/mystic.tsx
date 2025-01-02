"use client";

import React, { useState, useEffect } from 'react';
import './mystic.css';


export const CrystalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="metric-icon">
    <path
      d="M12 2L2 8l10 6 10-6-10-6zM2 16l10 6 10-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const RuneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="metric-icon">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <path
      d="M12 2v20M2 12h20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const SpellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="metric-icon">
    <path
      d="M12 2l3 6 7 1-5 4 2 7-7-4-7 4 2-7-5-4 7-1 3-6z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function MysticMetrics() {
  const [selectedSpell, setSelectedSpell] = useState('price');
  const [data, setData] = useState<number[]>([]);
  const [, setMagicPower] = useState(0);

  const spells = [
    { id: 'price', name: 'Price Scrying', icon: CrystalIcon },
    { id: 'volume', name: 'Volume Vision', icon: RuneIcon },
    { id: 'momentum', name: 'Momentum Magic', icon: SpellIcon },
  ];

  const metrics = [
    { label: 'Mystical Strength', value: '87.5', trend: 'up' },
    { label: 'Arcane Volume', value: '2.3M', trend: 'down' },
    { label: 'Ethereal Momentum', value: '+12.4%', trend: 'up' },
    { label: 'Crystal Power', value: '92.1', trend: 'up' },
    { label: 'Rune Energy', value: '45.8%', trend: 'down' },
    { label: 'Spell Efficacy', value: '78.3', trend: 'up' },
  ];

  useEffect(() => {
    // Generate initial data
    setData(Array.from({ length: 12 }, () => Math.random() * 100));

    // Update data periodically
    const interval = setInterval(() => {
      setData(prev => [...prev.slice(1), Math.random() * 100]);
      setMagicPower(prev => (prev + 1) % 100);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mystic-container">
      <h1 className="mystic-title">Mystic Market Metrics</h1>

      {/* Spell Selector */}
      <div className="spell-selector">
        {spells.map((spell) => (
          <button
            key={spell.id}
            className={`spell-button ${selectedSpell === spell.id ? 'active' : ''}`}
            onClick={() => setSelectedSpell(spell.id)}
          >
            <spell.icon />
            <span>{spell.name}</span>
          </button>
        ))}
      </div>

      {/* Crystal Chamber */}
      <div className="crystal-chamber">
        <div className="magic-circle">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="rune"
              style={{
                transform: `rotate(${i * 45}deg) translateX(150px) rotate(-${i * 45}deg)`
              }}
            />
          ))}
        </div>

        {/* Chart */}
        <div className="chart-container">
          {data.map((value, index) => (
            <div
              key={index}
              className="chart-bar"
              style={{
                height: `${value}%`,
                opacity: 0.3 + (index / data.length) * 0.7
              }}
            />
          ))}
        </div>

        {/* Magical Sparkles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="magical-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Metrics Grid */}
      <div className="metrics-grid">
        {metrics.map((metric, index) => (
          <div key={index} className="metric-card">
            {index % 3 === 0 && <CrystalIcon />}
            {index % 3 === 1 && <RuneIcon />}
            {index % 3 === 2 && <SpellIcon />}
            <div className="metric-value">{metric.value}</div>
            <div className="metric-label">{metric.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}