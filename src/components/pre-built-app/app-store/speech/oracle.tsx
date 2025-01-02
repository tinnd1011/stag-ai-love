'use client';
import "regenerator-runtime/runtime";
import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const MysticOracle = () => {
  const [prophecies, setProphecies] = useState<Array<{text: string, type: string}>>([]);
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [interpretMode, setInterpretMode] = useState<'prophecy' | 'riddle' | 'omen'>('prophecy');

  // Simulate magical interpretation
  const interpretWords = () => {
    if (!transcript.trim()) return;

    const interpretations = {
      prophecy: ['The ancient stars reveal...', 'The crystal shows...', 'The fates declare...'],
      riddle: ['When shadows dance...', 'In moonless nights...', 'Through mystic veils...'],
      omen: ['The signs portend...', 'The runes foretell...', 'The augury speaks...']
    };

    const prefix = interpretations[interpretMode][Math.floor(Math.random() * 3)];
    setProphecies(prev => [...prev, {
      text: `${prefix} "${transcript}"`,
      type: interpretMode
    }]);
    resetTranscript();
  };

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="w-[700px] h-[700px] bg-gray-900 p-6 font-mono text-center text-amber-300">
        ⚠️ The oracle cannot manifest in this mortal vessel...
      </div>
    );
  }

  return (
    <div className="w-[700px] h-[700px] bg-gray-900 overflow-auto magical-scroll  p-6 font-mono relative">
      {/* Magical Border */}
      <div className="absolute inset-0 border-4 border-amber-500/30 pointer-events-none" />
      
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl text-amber-400">🔮 Mystic Oracle 🔮</h1>
        <div className="text-amber-300 text-sm">Interpreter of Mortal Words</div>
      </div>

      {/* Mode Selection */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {(['prophecy', 'riddle', 'omen'] as const).map(mode => (
          <button
            key={mode}
            onClick={() => setInterpretMode(mode)}
            className={`p-2 rounded-lg border transition-colors ${
              interpretMode === mode
                ? 'bg-amber-600 border-amber-400 text-amber-100'
                : 'bg-gray-800 border-amber-500/30 text-amber-300 hover:bg-amber-900'
            }`}
          >
            {mode === 'prophecy' ? '🌟 Prophecy' : mode === 'riddle' ? '✨ Riddle' : '🌙 Omen'}
          </button>
        ))}
      </div>

      {/* Oracle Status */}
      <div className={`
        mb-6 p-4 rounded-lg text-center border
        ${listening 
          ? 'border-amber-500 bg-amber-500/10 animate-pulse' 
          : 'border-amber-500/30 bg-gray-800/50'
        }
      `}>
        <div className="text-amber-300 mb-2">
          {listening ? '🎭 The Oracle listens...' : '💫 Await your words...'}
        </div>
        
        <div className="flex justify-center gap-2">
          <button
            onClick={() => SpeechRecognition.startListening()}
            disabled={listening}
            className="px-4 py-2 bg-amber-600 text-amber-100 rounded-lg hover:bg-amber-500 transition-colors disabled:bg-gray-600"
          >
            🗣️ Speak
          </button>
          <button
            onClick={SpeechRecognition.stopListening}
            disabled={!listening}
            className="px-4 py-2 bg-amber-600 text-amber-100 rounded-lg hover:bg-amber-500 transition-colors disabled:bg-gray-600"
          >
            🤫 Silence
          </button>
          <button
            onClick={interpretWords}
            disabled={!transcript}
            className="px-4 py-2 bg-amber-600 text-amber-100 rounded-lg hover:bg-amber-500 transition-colors disabled:bg-gray-600"
          >
            ⚜️ Interpret
          </button>
        </div>
      </div>

      {/* Current Words */}
      <div className="bg-gray-800/50 rounded-lg p-4 mb-4 border border-amber-500/30">
        <div className="text-amber-400 mb-2">📜 Your Words:</div>
        <div className="text-amber-300 min-h-[40px]">
          {transcript || 'Speak your query to the oracle...'}
        </div>
      </div>

      {/* Interpretations */}
      {prophecies.length > 0 && (
        <div className="space-y-4">
          <div className="text-amber-400">📖 The Oracle&apos;s Revelations:</div>
          {prophecies.map((prophecy, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg border animate-[fadeIn_0.5s_ease-out] ${
                prophecy.type === 'prophecy' 
                  ? 'border-yellow-500/30 bg-yellow-500/5'
                  : prophecy.type === 'riddle'
                    ? 'border-purple-500/30 bg-purple-500/5'
                    : 'border-red-500/30 bg-red-500/5'
              }`}
            >
              <div className={`font-medium mb-1 ${
                prophecy.type === 'prophecy'
                  ? 'text-yellow-400'
                  : prophecy.type === 'riddle'
                    ? 'text-purple-400'
                    : 'text-red-400'
              }`}>
                {prophecy.type === 'prophecy' ? '🌟' : prophecy.type === 'riddle' ? '✨' : '🌙'} {
                  prophecy.type.charAt(0).toUpperCase() + prophecy.type.slice(1)
                }:
              </div>
              <div className="text-amber-300">{prophecy.text}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MysticOracle;