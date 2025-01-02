"use client";

import React, { useState } from "react";

const PathFinder: React.FC = () => {
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [travelMode, setTravelMode] = useState<
    "walking" | "transit" | "driving"
  >("driving");
  const [mapUrl, setMapUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_EMBED_KEY;

  const handleSearch = () => {
    if (origin && destination) {
      setIsLoading(true);
      const embedUrl =
        `https://www.google.com/maps/embed/v1/directions` +
        `?key=${apiKey}` +
        `&origin=${encodeURIComponent(origin)}` +
        `&destination=${encodeURIComponent(destination)}` +
        `&mode=${travelMode}`;
      setMapUrl(embedUrl);
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  const travelModes = [
    { id: "driving", icon: "🚗", label: "Drive" },
    { id: "transit", icon: "🚇", label: "Transit" },
    { id: "walking", icon: "🚶‍♂️", label: "Walk" },
  ] as const;

  return (
    <div className="w-full max-w-4xl bg-white dark:bg-slate-900 shadow-2xl rounded-2xl p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-xl">
            <svg
              className="w-6 h-6 text-blue-600 dark:text-blue-400"
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
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
            Route Planner
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Control Panel */}
        <div className="space-y-6">
          {/* Location Inputs */}
          <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Starting Point
              </label>
              <input
                type="text"
                placeholder="Enter origin location..."
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 
                         rounded-lg text-slate-900 dark:text-white placeholder-slate-400
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Destination
              </label>
              <input
                type="text"
                placeholder="Enter destination location..."
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 
                         rounded-lg text-slate-900 dark:text-white placeholder-slate-400
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Travel Mode Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Transportation Mode
              </label>
              <div className="grid grid-cols-3 gap-2">
                {travelModes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setTravelMode(mode.id)}
                    className={`p-3 rounded-lg transition-all flex flex-col items-center gap-1
                      ${
                        travelMode === mode.id
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                          : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                      }`}
                  >
                    <span className="text-lg">{mode.icon}</span>
                    <span className="text-xs font-medium">{mode.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg 
                       shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2
                       font-medium"
            >
              Find Route
            </button>
          </div>

          {/* Tips Card */}
          <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
              Quick Tips
            </h3>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                Enter specific addresses for accurate routes
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                Use landmarks or place names
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                Select the most suitable transport mode
              </li>
            </ul>
          </div>
        </div>

        {/* Map Display */}
        <div className="lg:col-span-2">
          <div className="relative w-full h-[600px] bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-inner">
            {mapUrl ? (
              <>
                <iframe
                  title="Route Map"
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
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 p-8">
                <svg
                  className="w-16 h-16 mb-4 text-slate-300 dark:text-slate-600"
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
                <p className="text-center">
                  Enter your starting point and destination to view the route
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PathFinder;
