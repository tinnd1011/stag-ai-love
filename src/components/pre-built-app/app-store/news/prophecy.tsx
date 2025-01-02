'use client';

import React, { useState } from 'react';

interface Prophecy {
  id: string;
  title: string;
  content: string;
  source: string;
  timeframe: 'imminent' | 'near' | 'distant' | 'unknown';
  type: ProphecyType;
  status: 'unfulfilled' | 'in-progress' | 'fulfilled' | 'disputed';
  clarity: number;
  interpretations: Interpretation[];
  signs: string[];
}

interface Interpretation {
  id: string;
  seer: string;
  text: string;
  confidence: number;
  timestamp: string;
}

type ProphecyType = 'doom' | 'glory' | 'transformation' | 'warning' | 'blessing';

const PROPHECY_TYPES: Record<ProphecyType, { icon: string; color: string }> = {
  doom: {
    icon: "💀",
    color: "from-red-500/20 to-red-900/20"
  },
  glory: {
    icon: "👑",
    color: "from-yellow-500/20 to-yellow-900/20"
  },
  transformation: {
    icon: "🦋",
    color: "from-purple-500/20 to-purple-900/20"
  },
  warning: {
    icon: "⚠️",
    color: "from-orange-500/20 to-orange-900/20"
  },
  blessing: {
    icon: "✨",
    color: "from-green-500/20 to-green-900/20"
  }
};

const TIMEFRAME_INDICATORS = {
  imminent: { icon: "⚡", label: "Imminent", color: "text-red-300" },
  near: { icon: "🌙", label: "Near Future", color: "text-yellow-300" },
  distant: { icon: "🌟", label: "Distant Future", color: "text-blue-300" },
  unknown: { icon: "❓", label: "Unknown", color: "text-gray-300" }
};

const MOCK_PROPHECIES: Prophecy[] = [
  {
    id: '1',
    title: "The Dragon's Return",
    content: "When the three moons align, the ancient one shall awaken from its slumber beneath the Crystal Mountains.",
    source: "Elder Seer Mystara",
    timeframe: 'imminent',
    type: 'warning',
    status: 'in-progress',
    clarity: 85,
    interpretations: [
      {
        id: 'i1',
        seer: "Arch-Mage Thaddeus",
        text: "The prophecy likely refers to the dormant dragon Crystallox.",
        confidence: 90,
        timestamp: "2 days ago"
      },
      {
        id: 'i2',
        seer: "Oracle of the Lake",
        text: "The alignment suggests the awakening will occur during the next full moon.",
        confidence: 75,
        timestamp: "1 day ago"
      }
    ],
    signs: [
      "Increased seismic activity in Crystal Mountains",
      "Unusual crystal formations appearing",
      "Dragons acting restlessly"
    ]
  },
  {
    id: '2',
    title: "The Blessed Harvest",
    content: "Golden fields shall bloom in winter's heart, bringing prosperity to the realm.",
    source: "Garden Oracle",
    timeframe: 'near',
    type: 'blessing',
    status: 'unfulfilled',
    clarity: 65,
    interpretations: [
      {
        id: 'i3',
        seer: "Royal Botanist",
        text: "A new magical strain of wheat may develop resistance to frost.",
        confidence: 60,
        timestamp: "1 week ago"
      }
    ],
    signs: [
      "Unusual growth patterns in royal gardens",
      "Warm spots appearing in winter fields"
    ]
  }
];

const ProphecyTracker: React.FC = () => {
  const [selectedType, setSelectedType] = useState<ProphecyType | 'all'>('all');
  const [sortBy, setSortBy] = useState<'clarity' | 'timeframe'>('clarity');
  const [expandedProphecy, setExpandedProphecy] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProphecies = MOCK_PROPHECIES
    .filter(prophecy => 
      (selectedType === 'all' || prophecy.type === selectedType) &&
      (prophecy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       prophecy.content.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'clarity') return b.clarity - a.clarity;
      const timeframeOrder = { imminent: 0, near: 1, distant: 2, unknown: 3 };
      return timeframeOrder[a.timeframe] - timeframeOrder[b.timeframe];
    });

  return (
    <div className="w-full max-w-[700px] bg-slate-900 text-white p-6 rounded-lg relative">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 animate-pulse rounded-lg" />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2">
            🔮 Prophecy Tracker 🔮
          </h1>
          <p className="text-blue-300">Monitoring the threads of fate</p>
        </div>

        {/* Controls */}
        <div className="mb-6 space-y-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search prophecies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-800/50 p-3 pl-10 rounded-lg border border-blue-500/30 
                         focus:border-blue-500 outline-none"
              />
              <span className="absolute left-3 top-3.5">🔍</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'clarity' | 'timeframe')}
              className="bg-slate-800/50 p-3 rounded-lg border border-blue-500/30 
                       focus:border-blue-500 outline-none"
            >
              <option value="clarity">Sort by Clarity</option>
              <option value="timeframe">Sort by Timeframe</option>
            </select>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-4 py-2 rounded-full transition-all duration-300
                       ${selectedType === 'all'
                         ? 'bg-blue-500/30 scale-105'
                         : 'bg-slate-700/50 hover:bg-slate-700'}`}
            >
              🌌 All Prophecies
            </button>
            {Object.entries(PROPHECY_TYPES).map(([key, { icon }]) => (
              <button
                key={key}
                onClick={() => setSelectedType(key as ProphecyType)}
                className={`px-4 py-2 rounded-full transition-all duration-300
                         ${selectedType === key
                           ? 'bg-blue-500/30 scale-105'
                           : 'bg-slate-700/50 hover:bg-slate-700'}`}
              >
                {icon} {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Prophecies */}
        <div className="space-y-4">
          {filteredProphecies.map((prophecy) => (
            <div
              key={prophecy.id}
              className={`p-4 rounded-lg transition-all duration-300
                       bg-gradient-to-r ${PROPHECY_TYPES[prophecy.type].color}
                       border border-slate-700/50 hover:border-slate-500/50`}
            >
              {/* Prophecy Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-2xl">{PROPHECY_TYPES[prophecy.type].icon}</span>
                    <h3 className="text-lg font-bold">{prophecy.title}</h3>
                  </div>
                  <p className="text-gray-300 mb-2">{prophecy.content}</p>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="bg-slate-700/50 px-2 py-1 rounded">
                      👁️ {prophecy.source}
                    </span>
                    <span className={`px-2 py-1 rounded bg-slate-700/50 ${TIMEFRAME_INDICATORS[prophecy.timeframe].color}`}>
                      {TIMEFRAME_INDICATORS[prophecy.timeframe].icon} {TIMEFRAME_INDICATORS[prophecy.timeframe].label}
                    </span>
                    <span className="bg-slate-700/50 px-2 py-1 rounded">
                      ✨ Clarity: {prophecy.clarity}%
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setExpandedProphecy(expandedProphecy === prophecy.id ? null : prophecy.id)}
                  className="ml-4 p-2 hover:bg-slate-700/50 rounded transition-colors"
                >
                  {expandedProphecy === prophecy.id ? '🔼' : '🔽'}
                </button>
              </div>

              {/* Expanded Content */}
              {expandedProphecy === prophecy.id && (
                <div className="mt-4 space-y-4">
                  {/* Signs */}
                  <div className="pl-4 border-l-2 border-slate-700">
                    <h4 className="font-semibold mb-2">Observed Signs:</h4>
                    <ul className="space-y-1">
                      {prophecy.signs.map((sign, index) => (
                        <li key={index} className="text-sm">
                          🔸 {sign}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Interpretations */}
                  <div className="pl-4 border-l-2 border-slate-700">
                    <h4 className="font-semibold mb-2">Interpretations:</h4>
                    {prophecy.interpretations.map(interpretation => (
                      <div key={interpretation.id} className="mb-2">
                        <div className="text-sm flex justify-between">
                          <span className="font-medium">{interpretation.seer}</span>
                          <span className="text-gray-400">{interpretation.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-300">{interpretation.text}</p>
                        <div className="mt-1 text-sm">
                          <span className="text-blue-300">
                            Confidence: {interpretation.confidence}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProphecyTracker;