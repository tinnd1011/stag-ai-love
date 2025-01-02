"use client";

import React, { useState } from 'react';

interface Alert {
  id: number;
  type: string;
  severity: 'Low' | 'Medium' | 'High';
  message: string;
  time: string;
}

const WeatherAlerts = () => {
  const [locationInput, setLocationInput] = useState('');
  const [currentLocation, setCurrentLocation] = useState('Sydney, AU');
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 1,
      type: 'Severe Thunderstorm',
      severity: 'High',
      message: 'Strong winds and heavy rainfall expected in the evening',
      time: '2:30 PM'
    },
    {
      id: 2,
      type: 'Heat Warning',
      severity: 'Medium',
      message: 'High temperatures expected to continue through the weekend',
      time: '11:45 AM'
    }
  ]);

  // Alert templates for random generation
  const alertTemplates = {
    storm: {
      types: ['Severe Thunderstorm', 'Flash Flood', 'High Winds'],
      messages: [
        'Strong winds and heavy rainfall expected',
        'Potential for flash flooding in low-lying areas',
        'Damaging winds with possible structural damage'
      ]
    },
    heat: {
      types: ['Heat Warning', 'UV Alert', 'Fire Danger'],
      messages: [
        'Extreme temperatures expected to continue',
        'Very high UV levels forecasted',
        'Increased fire danger due to hot conditions'
      ]
    },
    air: {
      types: ['Air Quality', 'Fog Warning', 'Smoke Alert'],
      messages: [
        'Poor air quality affecting visibility',
        'Dense fog reducing visibility in morning hours',
        'Smoke haze affecting air quality'
      ]
    }
  };

  const getSeverityColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'High':
        return {
          bg: 'bg-[#2d1618]',
          border: 'border-red-800',
          text: 'text-red-400',
          icon: '⚠️'
        };
      case 'Medium':
        return {
          bg: 'bg-[#2d2318]',
          border: 'border-yellow-800',
          text: 'text-yellow-400',
          icon: '⚠️'
        };
      case 'Low':
        return {
          bg: 'bg-[#182a2d]',
          border: 'border-blue-800',
          text: 'text-blue-400',
          icon: 'ℹ️'
        };
    }
  };

  const generateRandomAlert = () => {
    const categories = Object.keys(alertTemplates);
    const category = categories[Math.floor(Math.random() * categories.length)] as keyof typeof alertTemplates;
    const template = alertTemplates[category];
    
    const type = template.types[Math.floor(Math.random() * template.types.length)];
    const message = template.messages[Math.floor(Math.random() * template.messages.length)];
    const severity: Alert['severity'] = ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)] as Alert['severity'];
    
    const hours = Math.floor(Math.random() * 12) + 1;
    const minutes = Math.floor(Math.random() * 60);
    const ampm = Math.random() > 0.5 ? 'AM' : 'PM';
    const time = `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;

    return {
      id: Date.now(),
      type,
      severity,
      message: `${message} in ${currentLocation}`,
      time
    };
  };

  const searchLocation = () => {
    if (locationInput.trim()) {
      setCurrentLocation(locationInput);
      // Generate 2-4 random alerts for the new location
      const numAlerts = Math.floor(Math.random() * 3) + 2;
      const newAlerts = Array(numAlerts).fill(null).map(() => generateRandomAlert());
      setAlerts(newAlerts);
      setLocationInput('');
    }
  };

  return (
    <div className=" p-6 bg-[#2a2a4a] rounded-lg border-2 border-[#4a4a6a] relative">
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 animate-shimmer" />

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Weather Alerts</h2>
        <button
          onClick={() => setAlerts(prev => [...prev, generateRandomAlert()])}
          className="text-sm px-2 py-1 bg-[#4a4a6a] text-white rounded hover:bg-[#6a6a8a] transition-colors"
        >
          🎲
        </button>
      </div>

      <div className="mb-4">
        <div className="text-sm text-gray-300 mb-2">{currentLocation}</div>
        <div className="flex gap-2">
          <input
            type="text"
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
            placeholder="Enter location..."
            className="flex-1 bg-[#1a1a2e] text-white px-3 py-2 rounded border border-[#4a4a6a] focus:outline-none focus:border-purple-500 text-sm"
          />
          <button
            onClick={searchLocation}
            className="px-3 py-2 bg-[#4a4a6a] text-white rounded hover:bg-[#6a6a8a] transition-colors"
          >
            🔍
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        {alerts.map((alert, index) => {
          const severity = getSeverityColor(alert.severity);
          return (
            <div
              key={index}
              className={`p-3 rounded border ${severity.bg} ${severity.border} hover:border-opacity-50 transition-colors`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <span>{severity.icon}</span>
                  <span className={`font-medium ${severity.text}`}>
                    {alert.type}
                  </span>
                </div>
                <span className="text-sm text-gray-400">{alert.time}</span>
              </div>
              <p className="text-sm text-gray-300">{alert.message}</p>
              <div className="mt-2 text-xs flex justify-between items-center">
                <span className={severity.text}>
                  {alert.severity} Severity
                </span>
                <span className="text-gray-400">
                  ID: {alert.id.toString().padStart(4, '0')}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {alerts.length === 0 && (
        <div className="text-center text-gray-400 py-4">
          No active alerts for {currentLocation}
        </div>
      )}
    </div>
  );
};

export default WeatherAlerts;