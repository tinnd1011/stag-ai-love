'use client';

import React, { useState, useEffect } from 'react';

interface MagicalEvent {
  id: string;
  title: string;
  description: string;
  location: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  type: EventType;
  timestamp: string;
  status: 'ongoing' | 'resolved' | 'investigating';
  updates: EventUpdate[];
}

interface EventUpdate {
  id: string;
  content: string;
  timestamp: string;
}

type EventType = 'magical' | 'creature' | 'weather' | 'battle' | 'portal';

const EVENT_TYPES: Record<EventType, { icon: string; color: string }> = {
  magical: {
    icon: "✨",
    color: "from-purple-500/20 to-purple-900/20"
  },
  creature: {
    icon: "🐲",
    color: "from-red-500/20 to-red-900/20"
  },
  weather: {
    icon: "🌪️",
    color: "from-blue-500/20 to-blue-900/20"
  },
  battle: {
    icon: "⚔️",
    color: "from-orange-500/20 to-orange-900/20"
  },
  portal: {
    icon: "🌀",
    color: "from-green-500/20 to-green-900/20"
  }
};

const SEVERITY_COLORS = {
  low: "bg-blue-500/20 text-blue-300",
  medium: "bg-yellow-500/20 text-yellow-300",
  high: "bg-orange-500/20 text-orange-300",
  critical: "bg-red-500/20 text-red-300 animate-pulse"
};

const MOCK_EVENTS: MagicalEvent[] = [
  {
    id: '1',
    title: "Dragon Migration Pattern Disruption",
    description: "Unexpected changes in dragon flight paths detected near the Crystal Mountains.",
    location: "Crystal Mountains",
    severity: 'high',
    type: 'creature',
    timestamp: 'Just now',
    status: 'ongoing',
    updates: [
      { id: 'u1', content: "Multiple dragons spotted flying against typical migration routes", timestamp: "2 minutes ago" },
      { id: 'u2', content: "Dragon Watch deployed to investigate cause", timestamp: "Just now" }
    ]
  },
  {
    id: '2',
    title: "Magical Storm Brewing",
    description: "Arcane energies gathering over the Enchanted Forest.",
    location: "Enchanted Forest",
    severity: 'medium',
    type: 'weather',
    timestamp: '5 minutes ago',
    status: 'investigating',
    updates: [
      { id: 'u3', content: "Color-changing rain reported in the area", timestamp: "5 minutes ago" }
    ]
  },
  {
    id: '3',
    title: "Portal Malfunction: CRITICAL",
    description: "Major teleportation hub experiencing random redirects.",
    location: "Central Teleport Station",
    severity: 'critical',
    type: 'portal',
    timestamp: '15 minutes ago',
    status: 'ongoing',
    updates: [
      { id: 'u4', content: "Multiple travelers reported in unexpected locations", timestamp: "15 minutes ago" },
      { id: 'u5', content: "Archmages dispatched to stabilize the network", timestamp: "10 minutes ago" },
      { id: 'u6', content: "Temporary containment field established", timestamp: "5 minutes ago" }
    ]
  }
];

const MagicalEventReporter: React.FC = () => {
  const [events, setEvents] = useState<MagicalEvent[]>(MOCK_EVENTS);
  const [selectedType, setSelectedType] = useState<EventType | 'all'>('all');
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  useEffect(() => {
    // Simulate new events coming in
    const interval = setInterval(() => {
      const shouldAddEvent = Math.random() < 0.3; // 30% chance of new event
      if (shouldAddEvent && autoScroll) {
        const newEvent = generateRandomEvent();
        setEvents(prev => [newEvent, ...prev].slice(0, 10));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [autoScroll]);

  const generateRandomEvent = (): MagicalEvent => {
    const types: EventType[] = ['magical', 'creature', 'weather', 'battle', 'portal'];
    const type = types[Math.floor(Math.random() * types.length)];
    return {
      id: Date.now().toString(),
      title: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Event Detected`,
      description: "Investigation in progress...",
      location: "Unknown Location",
      severity: 'medium',
      type,
      timestamp: 'Just now',
      status: 'investigating',
      updates: []
    };
  };

  const filteredEvents = events.filter(event => 
    selectedType === 'all' || event.type === selectedType
  );

  return (
    <div className="w-full max-w-[700px] bg-slate-900 text-white p-6 rounded-lg relative">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 animate-pulse rounded-lg" />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2">
            🔮 Magical Event Reporter 🔮
          </h1>
          <p className="text-blue-300">Live updates from across the realms</p>
        </div>

        {/* Controls */}
        <div className="mb-6 space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-4 py-2 rounded-full transition-all duration-300
                         ${selectedType === 'all'
                           ? 'bg-blue-500/30 scale-105'
                           : 'bg-slate-700/50 hover:bg-slate-700'}`}
              >
                📡 All Events
              </button>
              {Object.entries(EVENT_TYPES).map(([key, { icon }]) => (
                <button
                  key={key}
                  onClick={() => setSelectedType(key as EventType)}
                  className={`px-4 py-2 rounded-full transition-all duration-300
                           ${selectedType === key
                             ? 'bg-blue-500/30 scale-105'
                             : 'bg-slate-700/50 hover:bg-slate-700'}`}
                >
                  {icon} {key.charAt(0).toUpperCase() + key.slice(1)}
                </button>
              ))}
            </div>
            <button
              onClick={() => setAutoScroll(!autoScroll)}
              className={`px-4 py-2 rounded-full transition-all duration-300
                       ${autoScroll ? 'bg-green-500/30' : 'bg-slate-700/50'}`}
            >
              {autoScroll ? '🔄 Live' : '⏸️ Paused'}
            </button>
          </div>
        </div>

        {/* Event Feed */}
        <div className="space-y-4">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className={`p-4 rounded-lg transition-all duration-300
                       bg-gradient-to-r ${EVENT_TYPES[event.type].color}
                       border border-slate-700/50 hover:border-slate-500/50`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-2xl">{EVENT_TYPES[event.type].icon}</span>
                    <h3 className="text-lg font-bold">{event.title}</h3>
                  </div>
                  <p className="text-gray-300 mb-2">{event.description}</p>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="bg-slate-700/50 px-2 py-1 rounded">
                      📍 {event.location}
                    </span>
                    <span className={`px-2 py-1 rounded ${SEVERITY_COLORS[event.severity]}`}>
                      ⚠️ {event.severity.toUpperCase()}
                    </span>
                    <span className="bg-slate-700/50 px-2 py-1 rounded">
                      ⏰ {event.timestamp}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}
                  className="ml-4 p-2 hover:bg-slate-700/50 rounded transition-colors"
                >
                  {expandedEvent === event.id ? '🔼' : '🔽'}
                </button>
              </div>

              {/* Event Updates */}
              {expandedEvent === event.id && event.updates.length > 0 && (
                <div className="mt-4 pl-4 border-l-2 border-slate-700">
                  <h4 className="font-semibold mb-2">Latest Updates:</h4>
                  {event.updates.map(update => (
                    <div key={update.id} className="mb-2 text-sm">
                      <span className="text-gray-400">{update.timestamp}:</span>
                      <p className="text-gray-200 ml-4">{update.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MagicalEventReporter;