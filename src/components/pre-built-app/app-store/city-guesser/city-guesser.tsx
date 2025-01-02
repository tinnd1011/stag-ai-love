"use client";

import React, { useState, useEffect } from "react";

interface City {
  name: string;
  coords: string;
  hints: string[];
  streetViewConfig: {
    heading: number;
    pitch: number;
    zoom: number;
  };
  continent: string;
  population: string;
  landmark: string;
}

const MysticalCityGuesser: React.FC = () => {
  const [guess, setGuess] = useState<string>("");
  const [currentCity, setCurrentCity] = useState<City | null>(null);
  const [mapUrl, setMapUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [revealedHints, setRevealedHints] = useState<number>(0);
  const [gameState, setGameState] = useState<"playing" | "won" | "lost">(
    "playing"
  );
  const [score, setScore] = useState<number>(0);
  const [attempts, setAttempts] = useState<number>(0);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_EMBED_KEY;

  const cities: City[] = [
    {
      name: "Paris",
      coords: "48.8584,2.2945",
      hints: [
        "City of Lights ✨",
        "Famous for its iron tower 🗼",
        "Capital of romance 💕",
      ],
      streetViewConfig: {
        heading: 165,
        pitch: 0,
        zoom: 1,
      },
      continent: "Europe",
      population: "2.2 million",
      landmark: "Eiffel Tower",
    },
    {
      name: "Tokyo",
      coords: "35.6595,139.7004",
      hints: [
        "Largest metropolitan area in the world 🌆",
        "Home of anime culture 🎎",
        "Famous for its cherry blossoms 🌸",
      ],
      streetViewConfig: {
        heading: 215,
        pitch: 0,
        zoom: 1,
      },
      continent: "Asia",
      population: "37 million",
      landmark: "Shibuya Crossing",
    },
    {
      name: "New York",
      coords: "40.7580,-73.9855",
      hints: [
        "The Big Apple 🍎",
        "City that never sleeps 🌃",
        "Home to Lady Liberty 🗽",
      ],
      streetViewConfig: {
        heading: 250,
        pitch: 0,
        zoom: 1,
      },
      continent: "North America",
      population: "8.4 million",
      landmark: "Times Square",
    },
    {
      name: "Venice",
      coords: "45.4371,12.3326",
      hints: [
        "City of canals and masks 🎭",
        "No cars allowed in this ancient realm 🚶‍♂️",
        "Famous for glass-making and gondolas ⛵",
      ],
      streetViewConfig: {
        heading: 30,
        pitch: 0,
        zoom: 1,
      },
      continent: "Europe",
      population: "260,000",
      landmark: "St. Mark's Square",
    },
    {
      name: "Dubai",
      coords: "25.1972,55.2744",
      hints: [
        "City of gold and modern miracles ✨",
        "Where desert meets futuristic dreams 🏜️",
        "Home to the world's tallest building 🌆",
      ],
      streetViewConfig: {
        heading: 75,
        pitch: 10,
        zoom: 1,
      },
      continent: "Asia",
      population: "3.3 million",
      landmark: "Burj Khalifa",
    },
    {
      name: "Rio de Janeiro",
      coords: "-22.9519,-43.2105",
      hints: [
        "City of carnival and samba 💃",
        "Blessed by a famous mountain statue 🗿",
        "Known for spectacular beaches 🏖️",
      ],
      streetViewConfig: {
        heading: 180,
        pitch: 0,
        zoom: 1,
      },
      continent: "South America",
      population: "6.7 million",
      landmark: "Christ the Redeemer",
    },
    {
      name: "Amsterdam",
      coords: "52.3675,4.9041",
      hints: [
        "City of canals and bicycles 🚲",
        "Famous for narrow houses and bridges 🌉",
        "Capital of tulips and windmills 🌷",
      ],
      streetViewConfig: {
        heading: 290,
        pitch: 0,
        zoom: 1,
      },
      continent: "Europe",
      population: "870,000",
      landmark: "Canal Ring",
    },
    {
      name: "Istanbul",
      coords: "41.0082,28.9784",
      hints: [
        "Where East meets West 🌅",
        "City of domes and minarets 🕌",
        "Ancient capital of three empires 👑",
      ],
      streetViewConfig: {
        heading: 135,
        pitch: 0,
        zoom: 1,
      },
      continent: "Europe/Asia",
      population: "15.5 million",
      landmark: "Hagia Sophia",
    },
    {
      name: "Kyoto",
      coords: "35.0116,135.7681",
      hints: [
        "City of ancient temples and gardens 🍁",
        "Former imperial capital 👘",
        "Famous for geishas and tea ceremonies 🍵",
      ],
      streetViewConfig: {
        heading: 0,
        pitch: 0,
        zoom: 1,
      },
      continent: "Asia",
      population: "1.5 million",
      landmark: "Kinkaku-ji (Golden Pavilion)",
    },
    {
      name: "Rome",
      coords: "41.8902,12.4922",
      hints: [
        "Eternal City of ancient ruins 🏛️",
        "Where all roads lead to 🛣️",
        "City of seven hills and fountains ⛲",
      ],
      streetViewConfig: {
        heading: 45,
        pitch: 0,
        zoom: 1,
      },
      continent: "Europe",
      population: "4.3 million",
      landmark: "Colosseum",
    },
    {
      name: "San Francisco",
      coords: "37.8099,-122.4103",
      hints: [
        "City by the bay 🌉",
        "Famous for steep hills and cable cars 🚃",
        "Where fog meets technology 🌫️",
      ],
      streetViewConfig: {
        heading: 300,
        pitch: 0,
        zoom: 1,
      },
      continent: "North America",
      population: "870,000",
      landmark: "Golden Gate Bridge",
    },
    {
      name: "Prague",
      coords: "50.0755,14.4378",
      hints: [
        "City of a hundred spires 🏰",
        "Famous for astronomical clocks ⏰",
        "Capital of bohemian culture 🎭",
      ],
      streetViewConfig: {
        heading: 90,
        pitch: 0,
        zoom: 1,
      },
      continent: "Europe",
      population: "1.3 million",
      landmark: "Charles Bridge",
    },
  ];
  const selectNewCity = () => {
    setIsLoading(true);
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    setCurrentCity(randomCity);

    const embedUrl =
      `https://www.google.com/maps/embed/v1/streetview` +
      `?key=${apiKey}` +
      `&location=${randomCity.coords}` +
      `&heading=${randomCity.streetViewConfig.heading}` +
      `&pitch=${randomCity.streetViewConfig.pitch}` +
      `&fov=${90 / randomCity.streetViewConfig.zoom}`;

    setMapUrl(embedUrl);
    setGameState("playing");
    setRevealedHints(0);
    setGuess("");
    setAttempts(0);

    setTimeout(() => setIsLoading(false), 1000);
  };

  useEffect(() => {
    selectNewCity();
  }, []);

  const checkGuess = () => {
    if (!currentCity) return;

    setAttempts((prev) => prev + 1);

    if (guess.toLowerCase() === currentCity.name.toLowerCase()) {
      setGameState("won");
      setScore(
        (prev) => prev + Math.max(10 - revealedHints * 2 - attempts * 2, 1)
      );
    } else if (attempts >= 2) {
      setGameState("lost");
    }
  };

  const revealHint = () => {
    if (revealedHints < 3) {
      setRevealedHints((prev) => prev + 1);
    }
  };

  return (
    <div className="w-full max-w-4xl bg-gradient-to-br from-orange-50 to-rose-50 dark:from-slate-900 dark:to-rose-950 rounded-2xl shadow-2xl p-8">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-r from-amber-500 to-rose-500 p-3 rounded-xl shadow-lg">
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
                d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10a8 8 0 0116 0v1M9 21v-5a2 2 0 012-2h2a2 2 0 012 2v5"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-rose-600 dark:from-amber-400 dark:to-rose-400 text-transparent bg-clip-text">
            Global Explorer
          </h2>
        </div>

        <div className="bg-white dark:bg-slate-800 px-4 py-2 rounded-xl shadow-md flex items-center gap-2">
          <span className="text-amber-500">Score</span>
          <span className="text-2xl font-bold text-rose-600 dark:text-rose-400">
            {score}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Map Display */}
        <div className="md:col-span-2">
          <div className="relative w-full h-[500px] bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-md">
            {mapUrl ? (
              <>
                <iframe
                  title="Street View"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  src={mapUrl}
                  allowFullScreen
                  className={`transition-opacity duration-500 ${
                    isLoading ? "opacity-0" : "opacity-100"
                  }`}
                />
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-slate-800">
                    <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                <svg
                  className="w-16 h-16 text-amber-500 mb-4"
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
                <p className="text-slate-600 dark:text-slate-400 text-center">
                  Loading your next destination...
                </p>
              </div>
            )}
          </div>

          <div className="mt-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 shadow-sm">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Use your mouse or touch to explore the street view
            </p>
          </div>
        </div>

        {/* Game Controls */}
        <div className="space-y-4">
          {/* Guess Input */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md">
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Your Guess
              </label>
              <input
                type="text"
                placeholder="Name this city..."
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 
                         rounded-lg text-slate-900 dark:text-white placeholder-slate-400
                         focus:outline-none focus:ring-2 focus:ring-amber-500"
                onKeyPress={(e) => e.key === "Enter" && checkGuess()}
                disabled={gameState !== "playing"}
              />
            </div>

            <div className="space-y-2">
              <button
                onClick={checkGuess}
                disabled={gameState !== "playing"}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600
                         text-white rounded-lg shadow-lg shadow-rose-500/20 transition-all
                         disabled:opacity-50 disabled:cursor-not-allowed
                         font-medium"
              >
                Submit Guess
              </button>

              <button
                onClick={revealHint}
                disabled={gameState !== "playing" || revealedHints >= 3}
                className="w-full py-3 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300
                         hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-all
                         border border-slate-200 dark:border-slate-700
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reveal Hint ({3 - revealedHints} left)
              </button>
            </div>
          </div>

          {/* Hints Display */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              City Hints
            </h3>
            <div className="space-y-2">
              {currentCity?.hints.map((hint, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg ${
                    index < revealedHints
                      ? "bg-amber-50 dark:bg-amber-900/20 text-slate-700 dark:text-slate-300"
                      : "bg-slate-100 dark:bg-slate-900 text-slate-400"
                  } transition-all`}
                >
                  {index < revealedHints ? hint : "???"}
                </div>
              ))}
            </div>
          </div>

          {gameState !== "playing" && (
            <>
              {/* Result Card */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`p-2 rounded-lg ${
                      gameState === "won"
                        ? "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                        : "bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400"
                    }`}
                  >
                    <span className="text-2xl">
                      {gameState === "won" ? "🎉" : "📍"}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {gameState === "won" ? "Excellent!" : "Location Revealed"}
                    </h3>
                    <p
                      className="text-xl font-bold bg-gradient-to-r from-amber-600 to-rose-600 
                                dark:from-amber-400 dark:to-rose-400 text-transparent bg-clip-text"
                    >
                      {currentCity?.name}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <p>Location: {currentCity?.continent}</p>
                  <p>Population: {currentCity?.population}</p>
                  <p>Famous for: {currentCity?.landmark}</p>
                </div>
              </div>

              {/* Next City Button */}
              <button
                onClick={selectNewCity}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600
                         text-white rounded-xl shadow-lg shadow-rose-500/20 transition-all font-medium"
              >
                Next Challenge
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MysticalCityGuesser;
