'use client';

import React, { useState } from 'react';


const MagicalScrollFinder: React.FC = () => {
  const [city, setCity] = useState<string>('');
  const [searchType, setSearchType] = useState<'library' | 'bookstore'>('library');
  const [mapUrl, setMapUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_EMBED_KEY;

  const handleSearch = () => {
    if (city) {
      setIsLoading(true);
      const searchQuery = `${searchType}s in ${city}`;
      const embedUrl = `https://www.google.com/maps/embed/v1/search` +
        `?key=${apiKey}` +
        `&q=${encodeURIComponent(searchQuery)}` +
        `&zoom=13`;
      setMapUrl(embedUrl);
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  return (
    <div className="w-full bg-[#1a1c2e] text-[#e2c7ff] rounded-lg shadow-lg p-6 text-sm">
      <div className="flex items-center gap-4 mb-6">
        <span className="text-3xl">📜</span>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-[#9f6ef5] to-[#c77dff] text-transparent bg-clip-text">
          Ancient Scrolls Locator
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div className="bg-[#252847] rounded-lg p-4">
            <div className="mb-4">
              <label className="block text-sm mb-2">🏰 Enter Your Realm</label>
              <input
                type="text"
                placeholder="Enter city name..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-2 bg-[#1a1c2e] border-2 border-[#4a3b89] rounded-lg text-[#e2c7ff] placeholder-[#8e7bb0] focus:outline-none focus:border-[#9f6ef5]"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>

            <div className="mb-4 text-xs">
              <label className="block text-xs mb-2">✨ Choose Your Destination</label>
              <div className="grid grid-cols-2 gap-2 ">
                <button
                  onClick={() => setSearchType('library')}
                  className={`p-2 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                    searchType === 'library'
                      ? 'bg-[#4a3b89] text-white'
                      : 'bg-[#1a1c2e] hover:bg-[#2a2d50]'
                  }`}
                >
                  <span>📚</span>
                  Libraries
                </button>
                <button
                  onClick={() => setSearchType('bookstore')}
                  className={`p-2 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                    searchType === 'bookstore'
                      ? 'bg-[#4a3b89] text-white'
                      : 'bg-[#1a1c2e] hover:bg-[#2a2d50]'
                  }`}
                >
                  <span>📖</span>
                  Stores
                </button>
              </div>
            </div>

            <button
              onClick={handleSearch}
              className="w-full py-2 bg-[#4a3b89] hover:bg-[#5a4a99] rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <span>🔮</span>
              Reveal Locations
            </button>
          </div>

          <div className="bg-[#252847] rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <span>📜</span> Ancient Wisdom
            </h3>
            <p className="text-sm text-[#e2c7ff]/80">
              Libraries and bookstores are portals to countless realms of knowledge and adventure. 
              Each one holds unique treasures waiting to be discovered.
            </p>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="relative w-full h-[500px] bg-[#252847] rounded-lg overflow-hidden">
            {mapUrl ? (
              <>
                <iframe
                  title="Magical Map View"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  src={mapUrl}
                  allowFullScreen
                  className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                />
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#252847]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#9f6ef5]"></div>
                  </div>
                )}
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-[#9f6ef5] p-6">
                <span className="text-6xl mb-4">🗺️</span>
                <p className="text-center">Enter a location to reveal the sacred repositories of knowledge...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MagicalScrollFinder;