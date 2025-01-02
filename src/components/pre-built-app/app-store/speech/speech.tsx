'use client';
import "regenerator-runtime/runtime";
import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const VoidWhispers = () => {
  const [savedWhispers, setSavedWhispers] = useState<string[]>([]);
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const saveWhisper = () => {
    if (transcript.trim()) {
      setSavedWhispers(prev => [...prev, transcript]);
      resetTranscript();
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="w-[700px] h-[700px] bg-gray-900 p-6 font-mono text-center text-teal-300">
        ⚠️ Your mortal device lacks the power to channel void whispers...
      </div>
    );
  }

  return (
    <div className="w-[700px] h-[700px] bg-gray-900 overflow-auto magical-scroll  p-6 font-mono relative">
      {/* Magical Border */}
      <div className="absolute inset-0 border-4 border-teal-500/30 pointer-events-none" />
      
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl text-teal-400">👻 Whispers of the Void 👻</h1>
        <div className="text-teal-300 text-sm">Channel the Ethereal Voices</div>
      </div>

      {/* Listening Status */}
      <div className={`
        text-center mb-6 p-4 rounded-lg border
        ${listening 
          ? 'border-teal-500 bg-teal-500/10 animate-pulse' 
          : 'border-teal-500/30 bg-gray-800/50'
        }
      `}>
        <div className="text-teal-300 text-sm mb-2">
          Ethereal Channel: {listening ? '🔮 Active' : '💤 Dormant'}
        </div>
        
        {/* Control Buttons */}
        <div className="flex justify-center gap-2">
          <button
            onClick={() => SpeechRecognition.startListening({ continuous: true })}
            disabled={listening}
            className="px-4 py-2 bg-teal-600 text-teal-100 rounded-lg hover:bg-teal-500 transition-colors disabled:bg-gray-600"
          >
            ✨ Open Channel
          </button>
          <button
            onClick={SpeechRecognition.stopListening}
            disabled={!listening}
            className="px-4 py-2 bg-teal-600 text-teal-100 rounded-lg hover:bg-teal-500 transition-colors disabled:bg-gray-600"
          >
            🌙 Close Channel
          </button>
          <button
            onClick={resetTranscript}
            className="px-4 py-2 bg-teal-600 text-teal-100 rounded-lg hover:bg-teal-500 transition-colors"
          >
            ♾️ Clear Echo
          </button>
        </div>
      </div>

      {/* Current Whispers */}
      <div className="bg-gray-800/50 rounded-lg p-4 mb-4 border border-teal-500/30 min-h-[100px]">
        <div className="text-teal-400 mb-2">🗨️ Current Whispers:</div>
        <div className="text-teal-300 min-h-[60px] mb-2">
          {transcript || 'The void awaits your voice...'}
        </div>
        {transcript && (
          <button
            onClick={saveWhisper}
            className="px-4 py-2 bg-teal-600 text-teal-100 rounded-lg hover:bg-teal-500 transition-colors w-full"
          >
            📜 Preserve Whisper
          </button>
        )}
      </div>

      {/* Saved Whispers */}
      {savedWhispers.length > 0 && (
        <div className="bg-gray-800/50 rounded-lg p-4 border border-teal-500/30">
          <div className="text-teal-400 mb-2">📚 Preserved Echoes:</div>
          <div className="space-y-2">
            {savedWhispers.map((whisper, index) => (
              <div 
                key={index}
                className="bg-gray-900/50 p-3 rounded border border-teal-500/20 text-teal-300"
              >
                {whisper}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Magical Effects */}
      {listening && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="w-64 h-64 rounded-full border-2 border-teal-500/20 animate-ping" />
          <div className="w-48 h-48 rounded-full border-2 border-teal-500/20 animate-ping animation-delay-300" />
          <div className="w-32 h-32 rounded-full border-2 border-teal-500/20 animate-ping animation-delay-700" />
        </div>
      )}
    </div>
  );
};

export default VoidWhispers;