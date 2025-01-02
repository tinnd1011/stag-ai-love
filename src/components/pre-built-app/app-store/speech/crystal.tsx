'use client';
import "regenerator-runtime/runtime";
import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

type Crystal = {
  id: number;
  text: string;
  color: string;
  timestamp: string;
  size: number;
};

const CrystalMemory = () => {
  const [crystals, setCrystals] = useState<Crystal[]>([]);
  const [selectedCrystal, setSelectedCrystal] = useState<Crystal | null>(null);
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const colors = [
    'bg-pink-500', 'bg-purple-500', 'bg-indigo-500', 
    'bg-blue-500', 'bg-cyan-500', 'bg-teal-500'
  ];

  const crystallize = () => {
    if (!transcript.trim()) return;
    
    const newCrystal: Crystal = {
      id: Date.now(),
      text: transcript,
      color: colors[Math.floor(Math.random() * colors.length)],
      timestamp: new Date().toLocaleTimeString(),
      size: Math.floor(transcript.length / 20) + 1 // Size based on text length
    };

    setCrystals(prev => [newCrystal, ...prev]);
    resetTranscript();
  };

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="w-[700px] h-[700px] bg-gray-900 p-6 font-mono text-center text-cyan-300">
        ⚠️ Your vessel cannot contain crystal memories...
      </div>
    );
  }

  return (
    <div className="w-[700px] h-[700px] bg-gray-900 overflow-auto magical-scroll  p-6 font-mono relative">
      {/* Magical Border */}
      <div className="absolute inset-0 border-4 border-cyan-500/30 pointer-events-none" />
      
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl text-cyan-400">💎 Crystal Memory 💎</h1>
        <div className="text-cyan-300 text-sm">Crystallize Your Thoughts</div>
      </div>

      {/* Crystal Forge */}
      <div className={`mb-6 p-6 rounded-lg border relative overflow-hidden
        ${listening ? 'border-cyan-400 bg-cyan-500/10' : 'border-cyan-500/30 bg-gray-800/50'}`}
      >
        {/* Magical Effects */}
        {listening && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute w-full h-full animate-pulse opacity-20 bg-gradient-to-r from-cyan-500 to-purple-500" />
            <div className="absolute w-32 h-32 bg-cyan-500/20 rounded-full animate-ping" />
          </div>
        )}

        {/* Voice Status */}
        <div className="relative text-center mb-4">
          <div className="text-cyan-300">
            {listening ? '✨ Capturing Essence...' : '💫 Speak to Forge'}
          </div>
          <div className="text-cyan-400 mt-2 min-h-[24px]">
            {transcript}
          </div>
        </div>

        {/* Controls */}
        <div className="relative flex justify-center gap-2">
          <button
            onClick={() => SpeechRecognition.startListening()}
            disabled={listening}
            className="px-4 py-2 bg-cyan-600 text-cyan-100 rounded-lg hover:bg-cyan-500 
              transition-colors disabled:bg-gray-600"
          >
            🗣️ Speak
          </button>
          <button
            onClick={SpeechRecognition.stopListening}
            disabled={!listening}
            className="px-4 py-2 bg-cyan-600 text-cyan-100 rounded-lg hover:bg-cyan-500 
              transition-colors disabled:bg-gray-600"
          >
            ✋ Cease
          </button>
          <button
            onClick={crystallize}
            disabled={!transcript}
            className="px-4 py-2 bg-cyan-600 text-cyan-100 rounded-lg hover:bg-cyan-500 
              transition-colors disabled:bg-gray-600"
          >
            💎 Crystallize
          </button>
        </div>
      </div>

      {/* Crystal Collection */}
      <div className="grid grid-cols-4 gap-4">
        {crystals.map((crystal) => (
          <div
            key={crystal.id}
            onClick={() => setSelectedCrystal(crystal)}
            className={`relative group cursor-pointer transition-all duration-300
              ${crystal.color} rounded-lg p-2 aspect-square
              hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20
              flex items-center justify-center
              animate-[fadeIn_0.5s_ease-out_forwards]`}
          >
            {/* Crystal Shape */}
            <div className={`absolute inset-0 opacity-20 animate-pulse
              bg-gradient-to-br from-white to-transparent`}
            />
            
            {/* Crystal Size Indicator */}
            <div className={`w-${crystal.size} h-${crystal.size} 
              absolute inset-0 m-auto rounded-full bg-white/10`}
            />

            {/* Hover Info */}
            <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100
              transition-opacity duration-300 p-2 flex flex-col justify-center items-center text-center">
              <div className="text-xs text-cyan-300 mb-1">{crystal.timestamp}</div>
              <div className="text-xs text-cyan-100 line-clamp-3">{crystal.text}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Crystal Modal */}
      {selectedCrystal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center"
          onClick={() => setSelectedCrystal(null)}>
          <div className={`${selectedCrystal.color} m-4 p-6 rounded-lg max-w-md
            animate-[fadeIn_0.3s_ease-out_forwards]`}
            onClick={e => e.stopPropagation()}>
            <div className="text-white mb-2">{selectedCrystal.timestamp}</div>
            <div className="text-white/90 mb-4">{selectedCrystal.text}</div>
            <button
              onClick={() => setSelectedCrystal(null)}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg
                transition-colors"
            >
              ✨ Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrystalMemory;