"use client";

import React, { useState, useEffect } from "react";

interface City {
  name: string;
  coords: string;
  region: string;
  magicalLore: string;
  historicRoute?: string;
}

interface GameRound {
  cityFrom: City;
  cityTo: City;
  actualDistance: number;
}

const RealmDistanceDiviner: React.FC = () => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_EMBED_KEY;
  const [guess, setGuess] = useState<string>("");
  const [currentRound, setCurrentRound] = useState<GameRound | null>(null);
  const [gameState, setGameState] = useState<"guessing" | "result">("guessing");
  const [score, setScore] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(0);
  const [mapUrl, setMapUrl] = useState<string>("");
  const [totalRounds, setTotalRounds] = useState<number>(0);

  const cities: City[] = [
    {
      name: "Alexandria",
      coords: "31.2001,29.9187",
      region: "Ancient Mediterranean",
      magicalLore: "Home of the great lighthouse, one of the Seven Wonders ✨",
      historicRoute: "The Silk Road's western terminus",
    },
    {
      name: "Constantinople",
      coords: "41.0082,28.9784",
      region: "Byzantine Empire",
      magicalLore: "Where the gates between East and West stand eternal 🏰",
      historicRoute: "The Royal Road's end point",
    },
    {
      name: "Samarkand",
      coords: "39.6270,66.9750",
      region: "Central Asia",
      magicalLore: "Crossroads of mystic traders and ancient wisdom 🐫",
      historicRoute: "Heart of the Silk Road",
    },
    {
      name: "Timbuktu",
      coords: "16.7666,-3.0026",
      region: "West Africa",
      magicalLore: "City of 333 saints and countless scrolls 📜",
      historicRoute: "Trans-Saharan trade route hub",
    },
    {
      name: "Cusco",
      coords: "-13.5319,-71.9675",
      region: "Inca Empire",
      magicalLore: "The navel of the world, center of the four quarters 🌞",
      historicRoute: "Qhapaq Ñan royal road system",
    },
    {
      name: "Kyoto",
      coords: "35.0116,135.7681",
      region: "Ancient Japan",
      magicalLore: "Where dragons guard the imperial gates 🐉",
      historicRoute: "Tōkaidō road endpoint",
    },
    {
      name: "Venice",
      coords: "45.4408,12.3155",
      region: "Medieval Europe",
      magicalLore: "Where merchants trade in dreams and possibilities 🎭",
      historicRoute: "Maritime Silk Road terminus",
    },
    {
      name: "Petra",
      coords: "30.3285,35.4444",
      region: "Ancient Arabia",
      magicalLore: "The rose-red city, half as old as time 🏛️",
      historicRoute: "Incense Route hub",
    },
  ];

  const calculateDistance = (from: string, to: string): number => {
    const [lat1, lon1] = from.split(",").map(Number);
    const [lat2, lon2] = to.split(",").map(Number);

    const R = 6371; // Earth's radius in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
  };

  const startNewRound = () => {
    const cityFrom = cities[Math.floor(Math.random() * cities.length)];
    let cityTo;
    do {
      cityTo = cities[Math.floor(Math.random() * cities.length)];
    } while (cityFrom === cityTo);

    const distance = calculateDistance(cityFrom.coords, cityTo.coords);

    setCurrentRound({
      cityFrom,
      cityTo,
      actualDistance: distance,
    });

    const embedUrl =
      `https://www.google.com/maps/embed/v1/directions` +
      `?key=${apiKey}` +
      `&origin=${cityFrom.coords}` +
      `&destination=${cityTo.coords}` +
      "&maptype=satellite" +
      `&zoom=5`;

    setMapUrl(embedUrl);
    setGameState("guessing");
    setGuess("");
  };

  useEffect(() => {
    startNewRound();
  }, []);

  const calculateScore = (actual: number, guessed: number): number => {
    const difference = Math.abs(actual - guessed);
    const percentageOff = (difference / actual) * 100;

    if (percentageOff <= 5) return 100;
    if (percentageOff <= 10) return 80;
    if (percentageOff <= 20) return 60;
    if (percentageOff <= 30) return 40;
    if (percentageOff <= 40) return 20;
    return 10;
  };

  const handleGuess = () => {
    if (!currentRound || !guess) return;

    const guessNum = parseInt(guess);
    const roundScore = calculateScore(currentRound.actualDistance, guessNum);
    const guessAccuracy = Math.round(
      (1 -
        Math.abs(currentRound.actualDistance - guessNum) /
          currentRound.actualDistance) *
        100
    );

    setScore((prev) => prev + roundScore);
    setAccuracy(guessAccuracy);
    setGameState("result");
    setTotalRounds((prev) => prev + 1);
  };

  return (
    <div className="w-full max-w-4xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-emerald-950 rounded-2xl shadow-2xl p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-xl shadow-lg">
            <svg
              className="w-6 h-6 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 dark:from-emerald-400 dark:to-teal-400 text-transparent bg-clip-text">
              Distance Calculator
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Test your geography knowledge
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-white dark:bg-gray-800 px-3 py-1 rounded-lg shadow text-sm text-gray-600 dark:text-gray-400">
            Round {totalRounds}
          </div>
          <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-md flex items-center gap-2">
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
              Score
            </span>
            <span className="text-2xl font-bold text-teal-600 dark:text-teal-400">
              {score}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Control Panel */}
        <div className="space-y-4">
          {currentRound && (
            <>
              {/* Cities Information */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  Route Details
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-800">
                    <div className="text-sm text-emerald-700 dark:text-emerald-400 font-medium mb-1">
                      Starting Point
                    </div>
                    <div className="font-semibold text-gray-800 dark:text-white mb-1">
                      {currentRound.cityFrom.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {currentRound.cityFrom.region}
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <svg
                      className="w-6 h-6 text-emerald-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </div>

                  <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-100 dark:border-teal-800">
                    <div className="text-sm text-teal-700 dark:text-teal-400 font-medium mb-1">
                      Destination
                    </div>
                    <div className="font-semibold text-gray-800 dark:text-white mb-1">
                      {currentRound.cityTo.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {currentRound.cityTo.region}
                    </div>
                  </div>
                </div>
              </div>

              {/* Guess Input or Results */}
              {gameState === "guessing" ? (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Estimate Distance (km)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="100"
                      placeholder="Enter your guess..."
                      value={guess}
                      onChange={(e) => setGuess(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700
                               rounded-lg text-gray-900 dark:text-white placeholder-gray-400
                               focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      onKeyPress={(e) => e.key === "Enter" && handleGuess()}
                    />
                  </div>
                  <button
                    onClick={handleGuess}
                    className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600
                             text-white rounded-lg shadow-lg shadow-emerald-500/20 transition-all font-medium"
                  >
                    Check Distance
                  </button>
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                  <div className="text-center space-y-4">
                    <div className="inline-flex p-3 rounded-full bg-emerald-50 dark:bg-emerald-900/20">
                      <svg
                        className="w-6 h-6 text-emerald-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                        {currentRound.actualDistance} km
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Your guess: {guess} km
                      </div>
                      <div className="mt-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                        Accuracy: {accuracy}%
                      </div>
                    </div>
                    <button
                      onClick={startNewRound}
                      className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600
                               text-white rounded-lg shadow-lg shadow-emerald-500/20 transition-all font-medium"
                    >
                      Next Round
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Map Display */}
        <div className="md:col-span-2">
          <div className="w-full h-[500px] bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md">
            {mapUrl ? (
              <iframe
                title="Distance Map"
                width="100%"
                height="100%"
                frameBorder="0"
                src={mapUrl}
                allowFullScreen
                className="transition-opacity duration-500"
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 p-6">
                <svg
                  className="w-16 h-16 mb-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
                <p>Loading map...</p>
              </div>
            )}
          </div>

          {/* Historical Routes Info */}
          {gameState === "result" && currentRound?.cityFrom.historicRoute && (
            <div className="mt-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 shadow-sm">
              <h3 className="font-medium text-gray-800 dark:text-white mb-2">
                Historical Connection
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                These cities were connected through historic trade routes:{" "}
                {currentRound.cityFrom.historicRoute}
                and {currentRound.cityTo.historicRoute}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RealmDistanceDiviner;
