'use client';
import "regenerator-runtime/runtime";
import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

type VisualizationType = 'runes' | 'waves' | 'sparks';
type ScrollEntry = {
  text: string;
  timestamp: string;
  energy: number;
  type: VisualizationType;
};

const SoulScribe = () => {
  const [scrolls, setScrolls] = useState<ScrollEntry[]>([]);
  const [activeViz, setActiveViz] = useState<VisualizationType>('runes');
  const [energy, setEnergy] = useState(0);
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (listening) {
      interval = setInterval(() => {
        setEnergy(prev => (prev + 1) % 100);
      }, 100);
    } else {
      setEnergy(0);
    }
    return () => clearInterval(interval);
  }, [listening]);

  const saveScroll = () => {
    if (!transcript.trim()) return;
    setScrolls(prev => [...prev, {
      text: transcript,
      timestamp: new Date().toLocaleTimeString(),
      energy: energy,
      type: activeViz
    }]);
    resetTranscript();
  };

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="w-[700px] h-[700px] bg-gray-900 p-6 font-mono text-center text-purple-300">
        ⚠️ Your soul lacks the power to manifest scribing magic...
      </div>
    );
  }

  const renderVisualization = () => {
    switch (activeViz) {
      case 'runes':
        return (
          <div className="flex justify-center items-center h-32 gap-2">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`w-4 rounded-full transition-all duration-300 bg-purple-500/30
                  ${listening ? 'animate-bounce' : 'h-4'}
                `}
                style={{ 
                  height: listening ? `${Math.random() * 64 + 16}px` : '16px',
                  animationDelay: `${i * 100}ms`,
                }}
              />
            ))}
          </div>
        );
      case 'waves':
        return (
          <div className="relative h-32 flex items-center justify-center">
            <div className={`absolute w-64 h-64 rounded-full border-2 border-purple-500/20
              ${listening ? 'animate-ping' : 'scale-0'}`} 
            />
            <div className={`absolute w-48 h-48 rounded-full border-2 border-purple-500/20 delay-300
              ${listening ? 'animate-ping' : 'scale-0'}`}
            />
            <div className={`absolute w-32 h-32 rounded-full border-2 border-purple-500/20 delay-700
              ${listening ? 'animate-ping' : 'scale-0'}`}
            />
          </div>
        );
      case 'sparks':
        return (
          <div className="h-32 flex justify-center items-center">
            {listening && (
              <div className="relative w-32 h-32">
                <div className="absolute inset-0 animate-spin">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-purple-500 rounded-full animate-pulse"
                      style={{
                        top: `${Math.sin(i * Math.PI / 4) * 50 + 50}%`,
                        left: `${Math.cos(i * Math.PI / 4) * 50 + 50}%`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="w-[700px] h-[700px] bg-gray-900 overflow-auto magical-scroll  p-6 font-mono relative">
      <div className="absolute inset-0 border-4 border-purple-500/30 pointer-events-none" />
      
      <div className="text-center mb-6 opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]">
        <h1 className="text-3xl text-purple-400">✍️ Soul Scribe ✍️</h1>
        <div className="text-purple-300 text-sm">Manifest Your Voice in Magic</div>
      </div>

      <div className="flex justify-center gap-2 mb-6">
        {(['runes', 'waves', 'sparks'] as const).map(type => (
          <button
            key={type}
            onClick={() => setActiveViz(type)}
            className={`px-4 py-2 rounded-lg transition-colors
              ${activeViz === type
                ? 'bg-purple-600 text-purple-100'
                : 'bg-gray-800 text-purple-300 hover:bg-purple-900'
              }`}
          >
            {type === 'runes' ? '⚡ Runes' : type === 'waves' ? '〰️ Waves' : '✨ Sparks'}
          </button>
        ))}
      </div>

      <div className="bg-gray-800/50 rounded-lg p-4 mb-6 border border-purple-500/30">
        {renderVisualization()}
        <div className="text-center text-purple-300 mt-4">
          {listening ? 'Channeling your essence...' : 'Awaiting your voice...'}
        </div>
      </div>

      <div className="flex justify-center gap-2 mb-6">
        <button
          onClick={() => SpeechRecognition.startListening({ continuous: true })}
          disabled={listening}
          className="px-4 py-2 bg-purple-600 text-purple-100 rounded-lg hover:bg-purple-500 
            transition-colors disabled:bg-gray-600"
        >
          🎤 Channel
        </button>
        <button
          onClick={SpeechRecognition.stopListening}
          disabled={!listening}
          className="px-4 py-2 bg-purple-600 text-purple-100 rounded-lg hover:bg-purple-500 
            transition-colors disabled:bg-gray-600"
        >
          ✋ Cease
        </button>
        <button
          onClick={saveScroll}
          disabled={!transcript}
          className="px-4 py-2 bg-purple-600 text-purple-100 rounded-lg hover:bg-purple-500 
            transition-colors disabled:bg-gray-600"
        >
          📜 Inscribe
        </button>
      </div>

      <div className="bg-gray-800/50 rounded-lg p-4 mb-6 border border-purple-500/30">
        <div className="text-purple-300 min-h-[40px]">
          {transcript || 'Your words will appear here...'}
        </div>
      </div>

      {scrolls.length > 0 && (
        <div className="space-y-4">
          {scrolls.map((scroll, index) => (
            <div 
              key={index}
              className="bg-gray-800/50 p-4 rounded-lg border border-purple-500/30
                opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-between text-sm text-purple-400 mb-2">
                <span>{scroll.timestamp}</span>
                <span>{scroll.type.toUpperCase()} • Energy: {scroll.energy}</span>
              </div>
              <div className="text-purple-300">{scroll.text}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SoulScribe;