"use client";

import React, { useState, useEffect } from "react";

interface AncientSite {
  name: string;
  coords: string;
  hints: string[];
  civilization: string;
  period: string;
  facts: string[];
  viewConfig: {
    heading: number;
    pitch: number;
    zoom: number;
  };
}

const AncientRuinsExplorer: React.FC = () => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_EMBED_KEY;
  const [currentSite, setCurrentSite] = useState<AncientSite | null>(null);
  const [guess, setGuess] = useState<string>("");
  const [gameState, setGameState] = useState<"playing" | "won" | "lost">(
    "playing"
  );
  const [score, setScore] = useState<number>(0);
  const [revealedHints, setRevealedHints] = useState<number>(0);
  const [attempts, setAttempts] = useState<number>(0);
  const [viewMode, setViewMode] = useState<"street" | "satellite">("street");

  const ancientSites: AncientSite[] = [
    {
      name: "Petra",
      coords: "30.3285,35.4444",
      hints: [
        "Rose-colored walls hide ancient secrets 🌹",
        "Carved directly into the rock face 🏛️",
        "Indiana Jones found the Holy Grail here 🏺",
      ],
      civilization: "Nabataean",
      period: "312 BCE - 106 CE",
      facts: [
        "Known as the 'Rose City' due to the color of the stone",
        "Hidden from the Western world until 1812",
        "Water conduit system was ahead of its time",
      ],
      viewConfig: {
        heading: 180,
        pitch: 0,
        zoom: 1,
      },
    },
    {
      name: "Angkor Wat",
      coords: "13.4125,103.8670",
      hints: [
        "The largest religious monument in the world 🗿",
        "Hidden in the Cambodian jungle 🌿",
        "Five towers represent Mount Meru ⛰️",
      ],
      civilization: "Khmer Empire",
      period: "12th Century CE",
      facts: [
        "Originally built as a Hindu temple",
        "Appears on Cambodia's national flag",
        "Perfectly aligned with the spring equinox",
      ],
      viewConfig: {
        heading: 270,
        pitch: 0,
        zoom: 1,
      },
    },
    {
      name: "Abu Simbel",
      coords: "22.3372,31.6258",
      hints: [
        "Four colossal guardians watch the Nile 👑",
        "Moved piece by piece to escape the waters 💫",
        "Built by the greatest of pharaohs 🐪",
      ],
      civilization: "Ancient Egypt",
      period: "13th Century BCE",
      facts: [
        "Relocated due to the Aswan Dam project",
        "Aligned to illuminate the inner sanctuary twice a year",
        "Dedicated to Ramesses II and Queen Nefertari",
      ],
      viewConfig: {
        heading: 45,
        pitch: 0,
        zoom: 1,
      },
    },
    {
      name: "Newgrange",
      coords: "53.6947,-6.4755",
      hints: [
        "Older than the pyramids and Stonehenge 🌟",
        "Winter solstice illuminates its chamber ☀️",
        "White quartz walls shine in the Irish mist 💎",
      ],
      civilization: "Neolithic Ireland",
      period: "3200 BCE",
      facts: [
        "Perfectly aligned with the winter solstice sunrise",
        "The roof box is an ancient astronomical device",
        "Contains the world's oldest known solar observatory",
      ],
      viewConfig: {
        heading: 135,
        pitch: 0,
        zoom: 1,
      },
    },
    {
      name: "Chichen Itza",
      coords: "20.6843,-88.5678",
      hints: [
        "Serpent shadows dance on equinox days 🐍",
        "The great ball court echoes ancient games �球",
        "Temple of the Warriors guards its secrets 🗡️",
      ],
      civilization: "Maya",
      period: "600-1200 CE",
      facts: [
        "The pyramid has 365 steps, one for each day",
        "Clap at the base creates an echo like a bird call",
        "Contains sophisticated astronomical alignments",
      ],
      viewConfig: {
        heading: 300,
        pitch: 0,
        zoom: 1,
      },
    },
  ];

  const startNewSite = () => {
    const newSite =
      ancientSites[Math.floor(Math.random() * ancientSites.length)];
    setCurrentSite(newSite);
    setGameState("playing");
    setRevealedHints(0);
    setGuess("");
    setAttempts(0);
    updateMapUrl(newSite, "street");
  };

  const updateMapUrl = (site: AncientSite, mode: "street" | "satellite") => {
    setViewMode(mode);
  };

  useEffect(() => {
    startNewSite();
  }, []);

  const checkGuess = () => {
    if (!currentSite) return;

    setAttempts((prev) => prev + 1);

    if (guess.toLowerCase() === currentSite.name.toLowerCase()) {
      setGameState("won");
      setScore(
        (prev) => prev + Math.max(10 - revealedHints * 2 - attempts * 2, 1)
      );
    } else if (attempts >= 2) {
      setGameState("lost");
    }
  };

  const getMapUrl = () => {
    if (!currentSite) return undefined;

    if (viewMode === "street") {
      return (
        `https://www.google.com/maps/embed/v1/streetview` +
        `?key=${apiKey}` +
        `&location=${currentSite.coords}` +
        `&heading=${currentSite.viewConfig.heading}` +
        `&pitch=${currentSite.viewConfig.pitch}` +
        `&fov=${90 / currentSite.viewConfig.zoom}`
      );
    } else {
      return (
        `https://www.google.com/maps/embed/v1/place` +
        `?key=${apiKey}` +
        `&q=${currentSite.coords}` +
        `&zoom=18` +
        `&maptype=satellite`
      );
    }
  };

  return (
    <div className="w-[800px] max-w-4xl bg-gradient-to-br from-stone-50 to-orange-50 dark:from-slate-900 dark:to-amber-950 rounded-2xl shadow-2xl p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-3 rounded-xl shadow-lg">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-700 to-orange-700 dark:from-amber-400 dark:to-orange-400 text-transparent bg-clip-text">
              Historical Sites Explorer
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Discover ancient wonders
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-xl shadow-md flex items-center gap-2">
          <span className="text-amber-600 dark:text-amber-400">Points</span>
          <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {score}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Control Panel */}
        <div className="space-y-4">
          {/* Guess Input Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Identify the Site
              </label>
              <input
                type="text"
                placeholder="Enter site name..."
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700
                         rounded-lg text-gray-900 dark:text-white placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-amber-500"
                onKeyPress={(e) => e.key === "Enter" && checkGuess()}
                disabled={gameState !== "playing"}
              />
            </div>

            <div className="space-y-2">
              <button
                onClick={checkGuess}
                disabled={gameState !== "playing"}
                className="w-full py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700
                         text-white rounded-lg shadow-lg shadow-orange-500/20 transition-all
                         disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                Verify Answer
              </button>

              <button
                onClick={() =>
                  setRevealedHints((prev) => Math.min(prev + 1, 3))
                }
                disabled={gameState !== "playing" || revealedHints >= 3}
                className="w-full py-3 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300
                         hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-all
                         disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                Show Hint ({3 - revealedHints} left)
              </button>
            </div>
          </div>

          {/* Hints Section */}
          {currentSite && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Historical Clues
              </h3>
              <div className="space-y-3">
                {currentSite.hints.map((hint, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border transition-all ${
                      index < revealedHints
                        ? "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-gray-700 dark:text-gray-300"
                        : "bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-400"
                    }`}
                  >
                    {index < revealedHints ? hint : "???"}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Site Information */}
          {gameState !== "playing" && currentSite && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/20">
                  <svg
                    className="w-5 h-5 text-amber-600 dark:text-amber-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {currentSite.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {currentSite.civilization}
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <p>
                  <span className="font-medium text-amber-600 dark:text-amber-400">
                    Period:
                  </span>{" "}
                  {currentSite.period}
                </p>
                {currentSite.facts.map((fact, index) => (
                  <p key={index} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-orange-500" />
                    {fact}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Map Display */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md">
            <div className="relative w-full h-[500px]">
              <iframe
                title="Historical Site View"
                width="100%"
                height="100%"
                frameBorder="0"
                src={getMapUrl()}
                allowFullScreen
                className="transition-opacity duration-500"
              />
            </div>
          </div>

          {/* View Mode Controls */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => updateMapUrl(currentSite!, "street")}
              className={`py-3 rounded-xl transition-all flex items-center justify-center gap-2 font-medium
                ${
                  viewMode === "street"
                    ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg shadow-orange-500/20"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
            >
              Ground View
            </button>
            <button
              onClick={() => updateMapUrl(currentSite!, "satellite")}
              className={`py-3 rounded-xl transition-all flex items-center justify-center gap-2 font-medium
                ${
                  viewMode === "satellite"
                    ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg shadow-orange-500/20"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
            >
              Aerial View
            </button>
          </div>

          {/* Next Site Button */}
          {gameState !== "playing" && (
            <button
              onClick={startNewSite}
              className="w-full py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700
                       text-white rounded-xl shadow-lg shadow-orange-500/20 transition-all font-medium"
            >
              Explore Next Site
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AncientRuinsExplorer;
