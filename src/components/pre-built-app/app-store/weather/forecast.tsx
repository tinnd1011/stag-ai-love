"use client";

import React, { useState } from 'react';

interface DayForecast {
  day: string;
  temp: {
    min: number;
    max: number;
  };
  condition: string;
  rainChance: number;
}

const WeatherForecast = () => {
  const [cityInput, setCityInput] = useState('');
  const [currentCity, setCurrentCity] = useState('Sydney, AU');
  const [forecast, setForecast] = useState<DayForecast[]>([
    { day: 'Mon', temp: { min: 22, max: 28 }, condition: 'Sunny', rainChance: 0 },
    { day: 'Tue', temp: { min: 21, max: 27 }, condition: 'Cloudy', rainChance: 20 },
    { day: 'Wed', temp: { min: 20, max: 25 }, condition: 'Rain', rainChance: 80 },
    { day: 'Thu', temp: { min: 19, max: 24 }, condition: 'Stormy', rainChance: 90 },
    { day: 'Fri', temp: { min: 20, max: 26 }, condition: 'Cloudy', rainChance: 30 },
  ]);

  const conditions = ['Sunny', 'Cloudy', 'Rain', 'Stormy', 'Clear', 'Partly Cloudy'];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getWeatherIcon = (condition: string, rainChance: number) => {
    if (rainChance >= 80) return '⛈️';
    const icons: Record<string, string> = {
      'Sunny': '☀️',
      'Cloudy': '☁️',
      'Rain': '🌧️',
      'Stormy': '⛈️',
      'Snow': '❄️',
      'Clear': '🌟',
      'Partly Cloudy': '⛅'
    };
    return icons[condition] || '🌈';
  };

  const getRainBackground = (rainChance: number) => {
    if (rainChance >= 80) return 'bg-blue-900';
    if (rainChance >= 60) return 'bg-blue-800';
    if (rainChance >= 40) return 'bg-blue-700';
    if (rainChance >= 20) return 'bg-blue-600';
    return 'bg-blue-500';
  };

  const generateRandomForecast = () => {
    const baseTemp = Math.floor(Math.random() * 25) + 10; // 10-35°C
    const newForecast = Array(5).fill(null).map((_, index) => ({
      day: days[(new Date().getDay() + index) % 7],
      temp: {
        min: baseTemp + Math.floor(Math.random() * 5) - 3,
        max: baseTemp + Math.floor(Math.random() * 8) + 2
      },
      condition: conditions[Math.floor(Math.random() * conditions.length)],
      rainChance: Math.floor(Math.random() * 100)
    }));
    setForecast(newForecast);
  };

  const searchCity = () => {
    if (cityInput.trim()) {
      setCurrentCity(cityInput);
      generateRandomForecast();
      setCityInput('');
    }
  };

  return (
    <div className="w-[300px] p-6 bg-[#2a2a4a] rounded-lg border-2 border-[#4a4a6a] relative">
      {/* Shimmer effect */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 animate-shimmer" />

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">5-Day Forecast</h2>
        <button
          onClick={generateRandomForecast}
          className="text-sm px-2 py-1 bg-[#4a4a6a] text-white rounded hover:bg-[#6a6a8a] transition-colors"
        >
          🎲
        </button>
      </div>

      <div className="mb-4">
        <div className="text-sm text-gray-300 mb-2">{currentCity}</div>
        <div className="flex gap-2">
          <input
            type="text"
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            placeholder="Enter city..."
            className="flex-1 bg-[#1a1a2e] text-white px-3 py-2 rounded border border-[#4a4a6a] focus:outline-none focus:border-purple-500 text-sm"
          />
          <button
            onClick={searchCity}
            className="px-3 py-2 bg-[#4a4a6a] text-white rounded hover:bg-[#6a6a8a] transition-colors"
          >
            🔍
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        {forecast.map((day, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between bg-[#1a1a2e] p-3 rounded border border-[#4a4a6a] hover:border-purple-500 transition-colors relative overflow-hidden"
          >
            <div 
              className={`absolute bottom-0 left-0 h-0.5 ${getRainBackground(day.rainChance)}`}
              style={{ width: `${day.rainChance}%` }}
            />
            
            <div className="font-medium w-16 text-white">{day.day}</div>
            
            <div className="flex items-center gap-2">
              <span className="text-xl">
                {getWeatherIcon(day.condition, day.rainChance)}
              </span>
              <span className="text-gray-300">{day.condition}</span>
            </div>
            
            <div className="text-right flex items-center gap-2">
              <span className="text-xs text-blue-300">
                {day.rainChance}% 💧
              </span>
              <div>
                <span className="font-medium text-white">{day.temp.max}°</span>
                <span className="text-gray-400 ml-1">{day.temp.min}°</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;