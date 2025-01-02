"use client";

import React, { useState } from 'react';

const WeatherDashboard = () => {
  const [cityInput, setCityInput] = useState('');
  const [weather, setWeather] = useState({
    temp: 28,
    humidity: 65,
    wind: 12,
    condition: 'Partly Cloudy',
    location: 'Sydney, AU',
    feelsLike: 30,
    uvIndex: 6,
    visibility: 10
  });

  // Get color theme based on temperature
  const getColorTheme = (temp: number) => {
    if (temp >= 30) return 'from-orange-500 to-red-500';
    if (temp >= 20) return 'from-yellow-400 to-orange-400';
    if (temp >= 10) return 'from-green-400 to-teal-500';
    return 'from-blue-400 to-indigo-500';
  };

  // Get weather icon based on condition
  const getWeatherSymbol = (condition: string) => {
    const conditions: Record<string, string> = {
      'Clear': '☀️',
      'Sunny': '☀️',
      'Partly Cloudy': '⛅',
      'Cloudy': '☁️',
      'Overcast': '☁️',
      'Rain': '🌧️',
      'Storm': '⛈️',
      'Snow': '❄️',
      'Fog': '🌫️'
    };
    return conditions[condition] || '🌈';
  };

  const searchCity = () => {
    // Simulate API call with random temperature variations
    const newTemp = Math.floor(Math.random() * 35);
    setWeather(prev => ({
      ...prev,
      location: cityInput,
      temp: newTemp,
      feelsLike: newTemp + Math.floor(Math.random() * 5),
      humidity: Math.floor(Math.random() * 100),
      wind: Math.floor(Math.random() * 30),
      uvIndex: Math.floor(Math.random() * 11),
      condition: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rain'][Math.floor(Math.random() * 4)]
    }));
  };

  return (
    <div className="w-[320px] p-6 bg-[#2a2a4a] rounded-lg border-2 border-[#4a4a6a] relative overflow-hidden">
      {/* Shimmer effect */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 animate-shimmer" />
      
      {/* Temperature gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getColorTheme(weather.temp)} opacity-10`} />

      {/* City search */}
      <div className="relative mb-4 flex gap-2">
        <input
          type="text"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          placeholder="Enter city..."
          className="flex-1 bg-[#1a1a2e] text-white px-3 py-2 rounded border border-[#4a4a6a] focus:outline-none focus:border-purple-500"
        />
        <button
          onClick={searchCity}
          className="px-3 py-2 bg-[#4a4a6a] text-white rounded hover:bg-[#6a6a8a] transition-colors"
        >
          🔍
        </button>
      </div>

      <div className="flex justify-between items-start mb-6 relative">
        <div className="flex items-start gap-2">
          <h2 className="text-3xl font-bold text-white">
            {weather.temp}°C
          </h2>
          <span className="text-2xl mt-1">
            {getWeatherSymbol(weather.condition)}
          </span>
        </div>
        <div className="text-right">
          <div className="font-semibold text-white">{weather.location}</div>
          <div className="text-sm text-gray-300">{weather.condition}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 relative">
        <div className="bg-[#1a1a2e] p-3 rounded border border-[#4a4a6a] hover:border-purple-500 transition-colors">
          <div className="text-gray-300 text-sm">Feels Like</div>
          <div className="font-semibold text-white">{weather.feelsLike}°C</div>
        </div>

        <div className="bg-[#1a1a2e] p-3 rounded border border-[#4a4a6a] hover:border-purple-500 transition-colors">
          <div className="text-gray-300 text-sm">Humidity</div>
          <div className="font-semibold text-white">{weather.humidity}% 💧</div>
        </div>

        <div className="bg-[#1a1a2e] p-3 rounded border border-[#4a4a6a] hover:border-purple-500 transition-colors">
          <div className="text-gray-300 text-sm">Wind Speed</div>
          <div className="font-semibold text-white">{weather.wind} km/h 🌪️</div>
        </div>

        <div className="bg-[#1a1a2e] p-3 rounded border border-[#4a4a6a] hover:border-purple-500 transition-colors">
          <div className="text-gray-300 text-sm">UV Index</div>
          <div className="font-semibold text-white">{weather.uvIndex} ☀️</div>
        </div>
      </div>

      {/* Update time */}
      <div className="mt-4 text-center text-sm text-gray-300 opacity-70">
        Last Updated: {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
};

export default WeatherDashboard;