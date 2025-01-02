"use client";

import React, { useState } from "react";

interface PlaceInfo {
  name: string;
  address: string;
  rating?: number;
  timezone?: string;
  weather?: {
    temp: number;
    condition: string;
  };
}

const MapSearch: React.FC = () => {
  const [location, setLocation] = useState<string>("");
  const [mapUrl, setMapUrl] = useState<string>("");
  const [placeInfo, setPlaceInfo] = useState<PlaceInfo | null>(null);

  const handleSearch = async () => {
    if (location) {
      const embedUrl = `https://www.google.com/maps/embed/v1/place?key=${
        process.env.NEXT_PUBLIC_GOOGLE_MAP_EMBED_KEY
      }&q=${encodeURIComponent(location)}`;
      setMapUrl(embedUrl);

      setPlaceInfo({
        name: location,
        address: "123 Example Street",
        rating: 4.7,
        timezone: "GMT+1",
        weather: {
          temp: 22,
          condition: "Clear Sky",
        },
      });
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white dark:bg-slate-900 shadow-2xl rounded-2xl p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-xl">
            <svg
              className="w-6 h-6 text-blue-600 dark:text-blue-400"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
            Location Search
          </h2>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <span>Powered by</span>
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
          </svg>
          <span>Maps</span>
        </div>
      </div>

      <div className="flex gap-3 mb-8">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search for a location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-12 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 
                     rounded-xl text-slate-900 dark:text-white placeholder-slate-400
                     focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <button
          onClick={handleSearch}
          className="px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl 
                   shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2"
        >
          <span>Search</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 relative">
          <div className="rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 h-80 shadow-inner">
            {mapUrl ? (
              <iframe
                title="Map View"
                width="100%"
                height="100%"
                frameBorder="0"
                src={mapUrl}
                allowFullScreen
                className="w-full h-full"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-slate-400 dark:text-slate-500">
                <p className="text-center">Enter a location to view the map</p>
              </div>
            )}
          </div>
        </div>

        {placeInfo && (
          <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 space-y-5 shadow-inner">
            <div className="pb-4 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                {placeInfo.name}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {placeInfo.address}
              </p>
            </div>

            <div className="space-y-4">
              {placeInfo.rating && (
                <div className="flex items-center gap-3">
                  <div className="bg-amber-50 dark:bg-amber-900/30 p-2 rounded-lg">
                    <svg
                      className="w-4 h-4 text-amber-500"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-900 dark:text-white">
                      Rating
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {placeInfo.rating} / 5.0
                    </div>
                  </div>
                </div>
              )}

              {placeInfo.timezone && (
                <div className="flex items-center gap-3">
                  <div className="bg-purple-50 dark:bg-purple-900/30 p-2 rounded-lg">
                    <svg
                      className="w-4 h-4 text-purple-500"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-900 dark:text-white">
                      Time Zone
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {placeInfo.timezone}
                    </div>
                  </div>
                </div>
              )}

              {placeInfo.weather && (
                <div className="flex items-center gap-3">
                  <div className="bg-sky-50 dark:bg-sky-900/30 p-2 rounded-lg">
                    <svg
                      className="w-4 h-4 text-sky-500"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2a9 9 0 0 0-9 9c0 4.97 4.5 11 9 11s9-6.03 9-11a9 9 0 0 0-9-9zm0 16c-3.86 0-7-5.14-7-9a7 7 0 1 1 14 0c0 3.86-3.14 9-7 9z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-900 dark:text-white">
                      Weather
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {placeInfo.weather.temp}°C • {placeInfo.weather.condition}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapSearch;
