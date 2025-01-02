'use client';

import React, { useState, useRef, useEffect } from 'react';

interface SpellCasterProps {
  className?: string;
}

interface VoiceOption {
  voice: SpeechSynthesisVoice;
  name: string;
  language: string;
}

interface SpellConfig {
  pitch: number;
  rate: number;
  volume: number;
}

const SpellCasterApp: React.FC<SpellCasterProps> = ({ className = '' }) => {
  // State management
  const [text, setText] = useState<string>('');
  const [voices, setVoices] = useState<VoiceOption[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<VoiceOption | null>(null);
  const [isCasting, setIsCasting] = useState(false);
  const [error, setError] = useState<string>('');
  const [manaVolume, setManaVolume] = useState<number>(Math.floor(Math.random() * 100000));
  const [spellConfig, setSpellConfig] = useState<SpellConfig>({
    pitch: 1,
    rate: 1,
    volume: 1
  });
  const [visualizerData, setVisualizerData] = useState<number[]>(Array(20).fill(0));

  // Refs
  const synthesisRef = useRef<SpeechSynthesis | null>(null);
  const animationFrameRef = useRef<number>(0);

  // Initialize speech synthesis
  useEffect(() => {
    synthesisRef.current = window.speechSynthesis;
    
    const loadVoices = () => {
      const availableVoices = synthesisRef.current?.getVoices() || [];
      const voiceOptions = availableVoices.map(voice => ({
        voice,
        name: voice.name,
        language: voice.lang
      }));
      setVoices(voiceOptions);
      setSelectedVoice(voiceOptions[0] || null);
    };

    loadVoices();
    if (synthesisRef.current) {
      synthesisRef.current.onvoiceschanged = loadVoices;
    }

    return () => {
      if (synthesisRef.current) {
        synthesisRef.current.cancel();
      }
    };
  }, []);

  // Visualizer animation
  useEffect(() => {
    const updateVisualizer = () => {
      if (isCasting) {
        setVisualizerData(prev => 
          prev.map(() => Math.random() * (isCasting ? 100 : 0))
        );
        animationFrameRef.current = requestAnimationFrame(updateVisualizer);
      }
    };

    if (isCasting) {
      updateVisualizer();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isCasting]);

  // Cast spell (speak text)
  const castSpell = () => {
    if (!synthesisRef.current || !selectedVoice || !text.trim()) {
      setError('Cannot cast spell without incantation');
      return;
    }

    setError('');
    synthesisRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice.voice;
    utterance.pitch = spellConfig.pitch;
    utterance.rate = spellConfig.rate;
    utterance.volume = spellConfig.volume;

    utterance.onstart = () => {
      setIsCasting(true);
      setManaVolume(prev => prev + Math.floor(Math.random() * 1000));
    };

    utterance.onend = () => {
      setIsCasting(false);
    };

    utterance.onerror = () => {
      setError('Spell casting failed');
      setIsCasting(false);
    };

    synthesisRef.current.speak(utterance);
  };

  // Stop casting
  const stopCasting = () => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
      setIsCasting(false);
    }
  };

  return (
    <div className={`min-w-[320px] max-w-[500px] min-h-[400px] bg-[#1a1a2e] border-2 border-[#6b21a8]/30 rounded-lg overflow-hidden shadow-lg ${className}`}>
      <div className="p-4 bg-[#1a1a2e] border-b border-[#6b21a8]/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-[#ffd700] font-mono text-lg">Spell Caster</h2>
          <span className="text-[#a855f7] text-xs">
            Last Cast: {new Date().toLocaleTimeString()}
          </span>
        </div>
        <div className="w-3 h-3 rounded-full bg-[#a855f7] animate-pulse shadow-[0_0_10px_#a855f7]" />
      </div>
      
      <div className="p-4 space-y-4">
        {/* Spell input */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your incantation..."
          className="w-full h-32 bg-[#1a1a2e] border border-[#6b21a8]/20 rounded p-3 
                   text-[#e2e8f0] font-mono placeholder-[#a855f7]/50 focus:outline-none 
                   focus:border-[#a855f7]/50 resize-none"
        />

        {/* Voice selection */}
        <select
          value={selectedVoice?.name || ''}
          onChange={(e) => setSelectedVoice(voices.find(v => v.name === e.target.value) || null)}
          className="w-full bg-[#1a1a2e] border border-[#6b21a8]/20 rounded p-2 
                   text-[#ffd700] font-mono focus:outline-none focus:border-[#a855f7]/50"
        >
          {voices.map((voice) => (
            <option key={voice.name} value={voice.name}>
              {voice.name} ({voice.language})
            </option>
          ))}
        </select>

        {/* Spell configuration */}
        <div className="grid grid-cols-3 gap-4">
          {/* Pitch control */}
          <div className="space-y-1">
            <label className="text-[#ffd700] text-sm font-mono">Pitch</label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={spellConfig.pitch}
              onChange={(e) => setSpellConfig(prev => ({
                ...prev,
                pitch: parseFloat(e.target.value)
              }))}
              className="w-full accent-[#a855f7]"
            />
          </div>

          {/* Rate control */}
          <div className="space-y-1">
            <label className="text-[#ffd700] text-sm font-mono">Speed</label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={spellConfig.rate}
              onChange={(e) => setSpellConfig(prev => ({
                ...prev,
                rate: parseFloat(e.target.value)
              }))}
              className="w-full accent-[#a855f7]"
            />
          </div>

          {/* Volume control */}
          <div className="space-y-1">
            <label className="text-[#ffd700] text-sm font-mono">Power</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={spellConfig.volume}
              onChange={(e) => setSpellConfig(prev => ({
                ...prev,
                volume: parseFloat(e.target.value)
              }))}
              className="w-full accent-[#a855f7]"
            />
          </div>
        </div>

        {/* Visualizer */}
        <div className="h-24 bg-[#1a1a2e] border border-[#6b21a8]/20 rounded p-3">
          <div className="h-full flex items-end justify-center gap-1">
            {visualizerData.map((height, index) => (
              <div
                key={index}
                className="w-2 bg-[#a855f7] transition-all duration-75"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>

        {/* Mana display */}
        <div className="text-[#ffd700] font-mono text-sm flex items-center gap-2">
          <span>Mana Volume:</span>
          <span>{manaVolume.toLocaleString()}</span>
          <span className="text-[#a855f7]">⚡</span>
        </div>

        {/* Error display */}
        {error && (
          <div className="text-red-400 text-sm text-center font-mono">
            {error}
          </div>
        )}

        {/* Control buttons */}
        <div className="flex gap-2">
          <button
            onClick={castSpell}
            disabled={isCasting || !text.trim()}
            className={`flex-1 py-2 px-4 bg-[#6b21a8]/20 border border-[#a855f7]/30 rounded 
                     text-[#ffd700] font-mono transition-all
                     ${isCasting || !text.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#6b21a8]/30'}`}
            type="button"
          >
            Cast Spell
          </button>
          {isCasting && (
            <button
              onClick={stopCasting}
              className="flex-1 py-2 px-4 bg-red-500/20 border border-red-400/30 rounded 
                       text-red-400 font-mono hover:bg-red-500/30 transition-all"
              type="button"
            >
              Cancel Spell
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpellCasterApp;