'use client';

import React, { useState, useEffect } from 'react';

interface HistoricalEvent {
  year: number;
  description: string;
}

interface CityPeriod {
  name: string;
  coords: string;
  year: number;
  events: HistoricalEvent[];
  generalHints: string[];
  modernView?: string;
}

const CityTimePortal: React.FC = () => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_EMBED_KEY;
  const [currentPeriod, setCurrentPeriod] = useState<CityPeriod | null>(null);
  const [yearGuess, setYearGuess] = useState<string>('');
  const [gameState, setGameState] = useState<'guessing' | 'result'>('guessing');
  const [score, setScore] = useState<number>(0);
  const [revealedHints, setRevealedHints] = useState<number>(0);
  const [showModernView, setShowModernView] = useState<boolean>(false);
  const [totalRounds, setTotalRounds] = useState<number>(0);

  const cityPeriods: CityPeriod[] = [
    {
      name: 'Dubai',
      coords: '25.2048,55.2708',
      year: 1990,
      events: [
        {
          year: 1985,
          description:
            'The Dubai World Trade Centre stands almost alone in the desert 🏢',
        },
        {
          year: 1988,
          description:
            'First major residential developments begin to appear 🏗️',
        },
        {
          year: 1992,
          description: 'Construction of major highways connecting the city 🛣️',
        },
      ],
      generalHints: [
        'The desert begins its transformation 🌅',
        'Before the great towers rose 🏙️',
        'When camels still roamed where skyscrapers now stand 🐪',
      ],
      modernView: '25.2048,55.2708',
    },
    {
      name: 'Shanghai',
      coords: '31.2304,121.4737',
      year: 1987,
      events: [
        {
          year: 1984,
          description: 'Early stages of Pudong development zone planning 📋',
        },
        {
          year: 1990,
          description: 'Before the Pearl Tower changed the skyline 🗼',
        },
        {
          year: 1992,
          description: 'The beginning of modern financial district 💹',
        },
      ],
      generalHints: [
        'Before the city touched the clouds ☁️',
        'When the river bank was still low 🌊',
        'The calm before the economic storm 🌅',
      ],
      modernView: '31.2304,121.4737',
    },
    {
      name: 'Las Vegas',
      coords: '36.1699,-115.1398',
      year: 1975,
      events: [
        {
          year: 1973,
          description: 'The original MGM Grand opens its doors 🎰',
        },
        { year: 1976, description: 'Before the mega-resorts era began ✨' },
        { year: 1978, description: 'When the Strip was still growing 🎲' },
      ],
      generalHints: [
        'When the desert oasis was smaller 🌵',
        'Before the neon city reached its peak 💫',
        'The early days of the Entertainment Capital 🎭',
      ],
      modernView: '36.1699,-115.1398',
    },
  ];

  const startNewRound = () => {
    const newPeriod =
      cityPeriods[Math.floor(Math.random() * cityPeriods.length)];
    setCurrentPeriod(newPeriod);
    setGameState('guessing');
    setYearGuess('');
    setRevealedHints(0);
    setShowModernView(false);
  };

  useEffect(() => {
    startNewRound();
  }, []);

  const calculateScore = (actual: number, guessed: number): number => {
    const difference = Math.abs(actual - guessed);
    if (difference <= 2) return 100;
    if (difference <= 5) return 80;
    if (difference <= 10) return 60;
    if (difference <= 15) return 40;
    if (difference <= 20) return 20;
    return 10;
  };

  const handleGuess = () => {
    if (!currentPeriod || !yearGuess) return;

    const guessNum = parseInt(yearGuess);
    const roundScore = calculateScore(currentPeriod.year, guessNum);
    setScore(prev => prev + roundScore);
    setGameState('result');
    setTotalRounds(prev => prev + 1);
  };

  // isModern: boolean = false
  const getMapUrl = (coords: string) => {
    return (
      `https://www.google.com/maps/embed/v1/place` +
      `?key=${apiKey}` +
      `&q=${coords}` +
      `&zoom=14` +
      `&maptype=satellite`
    );
  };

  return (
    <div className="w-full max-w-4xl rounded-lg bg-[#1a1c2e] p-6 text-[#e2c7ff] shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-3xl">⌛</span>
          <h2 className="bg-gradient-to-r from-[#9f6ef5] to-[#c77dff] bg-clip-text text-2xl font-bold text-transparent">
            City Time Portal
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm">Portal Jumps: {totalRounds}</div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">✨</span>
            <span className="text-xl font-bold">{score}</span>
          </div>
        </div>
      </div>

      {currentPeriod && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="space-y-4">
            <div className="rounded-lg bg-[#252847] p-4">
              <h3 className="mb-2 text-lg font-semibold">🌟 Mystical City</h3>
              <p className="text-xl font-bold">{currentPeriod.name}</p>

              {gameState === 'guessing' && (
                <div className="mt-4">
                  <label className="mb-2 block text-sm">
                    📅 What year is this vision from?
                  </label>
                  <input
                    type="number"
                    min="1900"
                    max="2024"
                    placeholder="Enter year..."
                    value={yearGuess}
                    onChange={e => setYearGuess(e.target.value)}
                    className="w-full rounded-lg border-2 border-[#4a3b89] bg-[#1a1c2e] px-4 py-2 text-[#e2c7ff] placeholder-[#8e7bb0] focus:border-[#9f6ef5] focus:outline-none"
                    onKeyPress={e => e.key === 'Enter' && handleGuess()}
                  />
                  <button
                    onClick={handleGuess}
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-[#4a3b89] py-2 transition-colors hover:bg-[#5a4a99]"
                  >
                    <span>🔮</span>
                    Divine the Year
                  </button>
                </div>
              )}
            </div>

            <div className="rounded-lg bg-[#252847] p-4">
              <h3 className="mb-2 text-lg font-semibold">📜 Mystical Hints</h3>
              <div className="space-y-2">
                {currentPeriod.generalHints.map((hint, index) => (
                  <div
                    key={index}
                    className={`rounded bg-[#1a1c2e] p-2 transition-opacity ${
                      index < revealedHints ? 'opacity-100' : 'opacity-30'
                    }`}
                  >
                    {index < revealedHints ? hint : '???'}
                  </div>
                ))}
              </div>
              {gameState === 'guessing' && revealedHints < 3 && (
                <button
                  onClick={() => setRevealedHints(prev => prev + 1)}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-[#1a1c2e] py-2 transition-colors hover:bg-[#2a2d50]"
                >
                  <span>✨</span>
                  Reveal Hint ({3 - revealedHints} remaining)
                </button>
              )}
            </div>

            {gameState === 'result' && (
              <div className="rounded-lg bg-[#252847] p-4">
                <h3 className="mb-2 text-lg font-semibold">
                  📖 Historical Events
                </h3>
                <div className="space-y-2">
                  {currentPeriod.events.map((event, index) => (
                    <div key={index} className="rounded bg-[#1a1c2e] p-2">
                      <span className="text-[#9f6ef5]">{event.year}: </span>
                      {event.description}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4 md:col-span-2">
            <div className="relative h-[500px] w-full overflow-hidden rounded-lg bg-[#252847]">
              {showModernView && currentPeriod.modernView ? (
                <iframe
                  title="Modern City View"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  src={getMapUrl(currentPeriod.modernView)}
                  allowFullScreen
                  className="transition-opacity duration-500"
                />
              ) : (
                <iframe
                  title="Historical City View"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  src={getMapUrl(currentPeriod.coords)}
                  allowFullScreen
                  className="transition-opacity duration-500"
                />
              )}
            </div>

            {gameState === 'result' && (
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-[#252847] p-4 text-center">
                  <h3 className="mb-2 text-lg font-semibold">
                    🎯 Time Portal Results
                  </h3>
                  <p className="text-3xl font-bold text-[#9f6ef5]">
                    {currentPeriod.year}
                  </p>
                  <p className="text-sm text-[#e2c7ff]/70">
                    Your guess: {yearGuess}
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center gap-2 rounded-lg bg-[#252847] p-4">
                  <button
                    onClick={() => setShowModernView(!showModernView)}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#4a3b89] py-2 transition-colors hover:bg-[#5a4a99]"
                  >
                    <span>{showModernView ? '🕰️' : '🌆'}</span>
                    {showModernView ? 'View Historical' : 'View Modern'}
                  </button>
                  <button
                    onClick={startNewRound}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#4a3b89] py-2 transition-colors hover:bg-[#5a4a99]"
                  >
                    <span>🌟</span>
                    Next Time Jump
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CityTimePortal;