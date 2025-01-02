"use client";

import React, { useState, useEffect } from "react";

interface Location {
  name: string;
  coords: string;
  description: string;
  magicalFact: string;
  bestTime: string;
  zoom?: number;
}

const MagicalStreetView: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState<string>("");
  const [viewUrl, setViewUrl] = useState<string>("");
  const [mapUrl, setMapUrl] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"street" | "map">("street");

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_EMBED_KEY;

  const magicalLocations: Location[] = [
    {
      name: "Neuschwanstein Castle",
      coords: "47.557574,10.749800",
      description: "A fairy-tale castle nestled in the Bavarian Alps",
      magicalFact: "Inspired the design of Disney's Sleeping Beauty Castle",
      bestTime: "Dawn or Dusk",
      zoom: 17,
    },
    {
      name: "Mont Saint-Michel",
      coords: "48.636063,-1.511457",
      description: "A mystical island abbey that appears to float on water",
      magicalFact: "The tide transforms it from island to mainland daily",
      bestTime: "During High Tide",
      zoom: 16,
    },
    {
      name: "Petra",
      coords: "30.328960,35.444832",
      description: "Ancient city carved into rose-colored rock",
      magicalFact: "Known as the 'Rose City' due to the color of its stones",
      bestTime: "Early Morning",
      zoom: 16,
    },
    {
      name: "Machu Picchu",
      coords: "-13.163141,-72.544963",
      description: "Lost city of the Incas high in the Andes",
      magicalFact: "Built in perfect alignment with astronomical events",
      bestTime: "Sunrise",
      zoom: 17,
    },
    {
      name: "Angkor Wat",
      coords: "13.4125,103.8670",
      description: "Ancient temple complex hidden in the Cambodian jungle",
      magicalFact:
        "The largest religious monument in the world, aligned with the equinox",
      bestTime: "Sunrise or Sunset",
      zoom: 16,
    },
    {
      name: "Cappadocia",
      coords: "38.6431,34.8289",
      description:
        "Otherworldly landscape of 'fairy chimneys' and cave dwellings",
      magicalFact:
        "Ancient underground cities housed thousands of people beneath the surface",
      bestTime: "Early Morning for Hot Air Balloons",
      zoom: 15,
    },
  ];

  const startTour = (location: Location) => {
    setIsLoading(true);
    setCurrentLocation(location.name);
    setSelectedLocation(location);

    // Street View URL
    const streetViewUrl =
      `https://www.google.com/maps/embed/v1/streetview` +
      `?key=${apiKey}` +
      `&location=${location.coords}` +
      `&heading=0` +
      `&pitch=0` +
      `&fov=90`;

    // Map View URL
    const mapViewUrl =
      `https://www.google.com/maps/embed/v1/view` +
      `?key=${apiKey}` +
      `&center=${location.coords}` +
      `&zoom=${location.zoom || 20}` +
      `&maptype=satellite`;

    setViewUrl(streetViewUrl);
    setMapUrl(mapViewUrl);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [viewUrl, mapUrl]);

  return (
    <div className="w-[950px] h-[700px] overflow-hidden  bg-[#1a1c2e] text-[#e2c7ff] rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <svg
            className="w-8 h-8 text-[#9f6ef5]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
            <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
          </svg>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-[#9f6ef5] to-[#c77dff] text-transparent bg-clip-text">
            <span>✨</span>
            Mystical Realms Explorer
            <span>🗺️</span>
          </h2>
        </div>

        {selectedLocation && (
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("street")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === "street"
                  ? "bg-[#4a3b89] text-white"
                  : "bg-[#252847] hover:bg-[#2a2d50] text-[#e2c7ff]"
              }`}
            >
              <span>🏛️ Street View</span>
            </button>
            <button
              onClick={() => setViewMode("map")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === "map"
                  ? "bg-[#4a3b89] text-white"
                  : "bg-[#252847] hover:bg-[#2a2d50] text-[#e2c7ff]"
              }`}
            >
              <span>🌍 Map View</span>
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Location List Column */}
        <div className="col-span-3 space-y-4">
          {magicalLocations.map((location) => (
            <button
              key={location.name}
              onClick={() => startTour(location)}
              className={`w-full p-4 rounded-lg text-left transition-all transform hover:scale-102 ${
                currentLocation === location.name
                  ? "bg-[#4a3b89] border-2 border-[#9f6ef5]"
                  : "bg-[#252847] hover:bg-[#2a2d50] border-2 border-transparent"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">📍</span>
                <span className="font-semibold">{location.name}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Map/Street View Column */}
        <div className="col-span-6">
          <div className="relative w-full h-[600px] bg-[#252847] rounded-lg overflow-hidden">
            {selectedLocation ? (
              <>
                <iframe
                  title={
                    viewMode === "street"
                      ? "Magical Street View"
                      : "Magical Map View"
                  }
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  src={viewMode === "street" ? viewUrl : mapUrl}
                  allowFullScreen
                  className={`transition-opacity duration-500 ${
                    isLoading ? "opacity-0" : "opacity-100"
                  }`}
                />
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#252847]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#9f6ef5]"></div>
                  </div>
                )}
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-[#9f6ef5] p-6">
                <span className="text-6xl mb-4">🎯</span>
                <p className="text-center">
                  Choose a mystical location to begin your journey...
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Info Panel Column */}
        <div className="col-span-3">
          {selectedLocation ? (
            <div className="bg-[#252847] rounded-lg p-4 h-[600px] overflow-y-auto magical-scroll ">
              <div className="mb-4 pb-4 border-b border-[#4a3b89]">
                <h3 className="text-xl font-semibold text-[#c77dff] mb-2">
                  🏰 {selectedLocation.name}
                </h3>
                <p className="text-sm text-[#e2c7ff]/80">
                  {viewMode === "street"
                    ? "🖱️ Navigation Controls:"
                    : "🗺️ Map Controls:"}
                </p>
                <ul className="text-sm text-[#e2c7ff]/60 mt-2 space-y-1">
                  {viewMode === "street" ? (
                    <>
                      <li>🔄 Click and drag to look around</li>
                      <li>👣 Click arrows to move forward</li>
                      <li>🔍 Mouse wheel to zoom in/out</li>
                    </>
                  ) : (
                    <>
                      <li>✋ Click and drag to pan</li>
                      <li>🔍 Mouse wheel to zoom</li>
                      <li>🛰️ Toggle satellite view</li>
                    </>
                  )}
                </ul>
              </div>

              <div className="space-y-4">
                <div className="p-3 bg-[#1a1c2e] rounded-lg">
                  <h4 className="font-semibold mb-2">📖 Description</h4>
                  <p className="text-sm">{selectedLocation.description}</p>
                </div>

                <div className="p-3 bg-[#1a1c2e] rounded-lg">
                  <h4 className="font-semibold mb-2">✨ Magical Fact</h4>
                  <p className="text-sm">{selectedLocation.magicalFact}</p>
                </div>

                <div className="p-3 bg-[#1a1c2e] rounded-lg">
                  <h4 className="font-semibold mb-2">⏰ Best Time to Visit</h4>
                  <p className="text-sm">{selectedLocation.bestTime}</p>
                </div>

                <div className="p-3 bg-[#1a1c2e] rounded-lg">
                  <h4 className="font-semibold mb-2">📍 Coordinates</h4>
                  <p className="text-sm font-mono">{selectedLocation.coords}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#252847] rounded-lg p-4 h-[600px] flex items-center justify-center">
              <div className="text-center">
                <span className="text-4xl mb-4 block">🧙‍♂️</span>
                <p>Select a location to reveal its mysteries...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MagicalStreetView;
