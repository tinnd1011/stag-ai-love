"use client";

import React, { useState, useEffect } from 'react';

interface MapCell {
  value: number;
  x: number;
  y: number;
}

const WeatherMap = () => {
  const [activeLayer, setActiveLayer] = useState<'rain' | 'temp' | 'wind'>('rain');
  const [loading, setLoading] = useState(false);
  const [mapRegion, setMapRegion] = useState('Sydney, AU');
  const [searchInput, setSearchInput] = useState('');
  const [mapData, setMapData] = useState<MapCell[]>([]);

  const layers = [
    { 
      id: 'rain' as const, 
      name: 'Rainfall',
      icon: '🌧️',
      color: 'from-blue-500 to-blue-700',
      unit: 'mm',
      range: [0, 25]
    },
    { 
      id: 'temp' as const, 
      name: 'Temperature',
      icon: '🌡️',
      color: 'from-orange-500 to-red-600',
      unit: '°C',
      range: [15, 35]
    },
    { 
      id: 'wind' as const, 
      name: 'Wind Speed',
      icon: '🌪️',
      color: 'from-teal-500 to-cyan-600',
      unit: 'km/h',
      range: [0, 50]
    }
  ];

  const generateMapData = () => {
    const cells: MapCell[] = [];
    const gridSize = 20;
    const centerX = gridSize / 2;
    const centerY = gridSize / 2;
    
    // Generate base pattern
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        const distFromCenter = Math.sqrt(
          Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
        );
        
        let value;
        const layer = layers.find(l => l.id === activeLayer)!;
        const [min, max] = layer.range;
        
        switch (activeLayer) {
          case 'rain':
            // Create rain cells with some clustering
            value = Math.max(0, max - (distFromCenter * 2) + Math.random() * 10);
            break;
          case 'temp':
            // Temperature gradually changes across the map
            value = min + ((max - min) * (x / gridSize)) + (Math.random() * 5);
            break;
          case 'wind':
            // Wind speeds with some patterns
            value = (Math.sin(x / 3) + Math.cos(y / 3)) * 15 + 20 + (Math.random() * 10);
            break;
        }
        
        cells.push({
          x,
          y,
          value: Math.min(max, Math.max(min, value))
        });
      }
    }
    return cells;
  };

  const getColorForValue = (value: number) => {
    const layer = layers.find(l => l.id === activeLayer)!;
    const [min, max] = layer.range;
    const percentage = (value - min) / (max - min);
    
    switch (activeLayer) {
      case 'rain':
        return `rgba(0, 100, 255, ${percentage * 0.7})`;
      case 'temp':
        return `rgba(255, ${100 - percentage * 100}, 0, ${percentage * 0.7})`;
      case 'wind':
        return `rgba(0, 255, ${255 - percentage * 200}, ${percentage * 0.7})`;
    }
  };

  const handleSearch = () => {
    if (searchInput.trim()) {
      setLoading(true);
      setMapRegion(searchInput);
      setTimeout(() => {
        setMapData(generateMapData());
        setLoading(false);
      }, 1000);
      setSearchInput('');
    }
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setMapData(generateMapData());
      setLoading(false);
    }, 1000);
  }, [activeLayer]);

  return (
    <div className="w-[400px] p-6 bg-[#2a2a4a] rounded-lg border-2 border-[#4a4a6a] relative">
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 animate-shimmer" />

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Weather Map</h2>
        <span className="text-sm text-gray-400">{mapRegion}</span>
      </div>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search location..."
          className="flex-1 bg-[#1a1a2e] text-white px-3 py-2 rounded border border-[#4a4a6a] focus:outline-none focus:border-purple-500 text-sm"
        />
        <button
          onClick={handleSearch}
          className="px-3 py-2 bg-[#4a4a6a] text-white rounded hover:bg-[#6a6a8a] transition-colors"
        >
          🔍
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        {layers.map(layer => (
          <button
            key={layer.id}
            onClick={() => setActiveLayer(layer.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded text-sm transition-colors ${
              activeLayer === layer.id 
                ? `bg-gradient-to-r ${layer.color} text-white`
                : 'bg-[#1a1a2e] text-gray-300 hover:bg-[#3a3a5a]'
            }`}
          >
            <span>{layer.icon}</span>
            <span>{layer.name}</span>
          </button>
        ))}
      </div>

      <div className="bg-[#1a1a2e] h-[300px] rounded-lg border border-[#4a4a6a] relative overflow-hidden">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white">Loading map data... ✨</div>
          </div>
        ) : (
          <div className="absolute inset-0 p-4">
            <div className="relative w-full h-full">
              {mapData.map((cell, i) => (
                <div
                  key={i}
                  className="absolute w-[5%] h-[5%] transition-colors duration-500"
                  style={{
                    left: `${cell.x * 5}%`,
                    top: `${cell.y * 5}%`,
                    backgroundColor: getColorForValue(cell.value),
                  }}
                />
              ))}
              
              {/* Value indicator on hover */}
              <div className="absolute bottom-2 right-2 bg-[#2a2a4a] px-2 py-1 rounded text-sm text-white">
                {layers.find(l => l.id === activeLayer)?.name}: 
                {Math.round(mapData[Math.floor(mapData.length / 2)]?.value || 0)}
                {layers.find(l => l.id === activeLayer)?.unit}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-between text-sm text-gray-400">
        <span>Scale: 1:1000</span>
        <span>Updated: {new Date().toLocaleTimeString()}</span>
      </div>
    </div>
  );
};

export default WeatherMap;