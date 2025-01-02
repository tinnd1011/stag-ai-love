'use client';

import React, { useState, useRef } from 'react';

interface GrimoireWriterProps {
  className?: string;
}

type FormatAction = 'bold' | 'italic' | 'underline' | 'strikethrough' | 'code' | 'link';

// Spell formatting icons
const FormatIcons = {
  bold: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M6 4v13h4.75c2 0 3.5-.75 4.5-2.25.5-.75.75-1.75.75-2.75 0-1.75-.75-3-2.25-3.75C15 7.75 15.75 6.5 15.75 5c0-2-1.5-3-4.5-3H6zm6.5 6H8.5V6H12c1.25 0 2 .5 2 1.5S13.25 9 12.5 9zm-.5 6H8.5v-4h3.5c1.5 0 2.25.75 2.25 2s-.75 2-2.25 2z"/>
    </svg>
  ),
  italic: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4h-8z"/>
    </svg>
  ),
  underline: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z"/>
    </svg>
  ),
  link: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
    </svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
    </svg>
  ),
  strike: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z"/>
    </svg>
  ),
};

const GrimoireWriterApp: React.FC<GrimoireWriterProps> = ({ className = '' }) => {
  const [manaVolume, setManaVolume] = useState<number>(Math.floor(Math.random() * 100000));
  const [magicCharges, setMagicCharges] = useState<number>(0);
  const editorRef = useRef<HTMLDivElement>(null);

  const handleFormat = (action: FormatAction) => {
    document.execCommand(action, false);
    editorRef.current?.focus();
    setMagicCharges(prev => prev + 1);
    setManaVolume(prev => prev + Math.floor(Math.random() * 100));
  };

  const handleLink = () => {
    const url = prompt('Enter the mystic link URL:', 'https://');
    if (url) {
      document.execCommand('createLink', false, url);
      editorRef.current?.focus();
      setMagicCharges(prev => prev + 2);
      setManaVolume(prev => prev + Math.floor(Math.random() * 200));
    }
  };

  const formatButtonClass = (action: string) => `${action}
    p-2 text-[#ffd700] hover:text-[#a855f7] hover:bg-[#6b21a8]/20 rounded
    transition-all duration-200 flex items-center justify-center
  `;

  return (
    <div className={`min-w-[320px] max-w-[500px] min-h-[400px] bg-[#1a1a2e] border-2 border-[#6b21a8]/30 rounded-lg overflow-hidden shadow-lg ${className}`}>
      {/* Header */}
      <div className="p-4 bg-[#1a1a2e] border-b border-[#6b21a8]/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-[#ffd700] font-mono text-lg">Grimoire Writer</h2>
          <span className="text-[#a855f7] text-xs">
            Magic Charges: {magicCharges}
          </span>
        </div>
        <div className="w-3 h-3 rounded-full bg-[#a855f7] animate-pulse shadow-[0_0_10px_#a855f7]" />
      </div>

      {/* Toolbar */}
      <div className="p-2 border-b border-[#6b21a8]/20 bg-[#1a1a2e]/50 flex flex-wrap gap-1">
        <button
          onClick={() => handleFormat('bold')}
          className={formatButtonClass('bold')}
          title="Ancient Bold"
        >
          {FormatIcons.bold}
        </button>
        <button
          onClick={() => handleFormat('italic')}
          className={formatButtonClass('italic')}
          title="Mystic Italic"
        >
          {FormatIcons.italic}
        </button>
        <button
          onClick={() => handleFormat('underline')}
          className={formatButtonClass('underline')}
          title="Runic Underline"
        >
          {FormatIcons.underline}
        </button>
        <button
          onClick={() => handleFormat('strikethrough')}
          className={formatButtonClass('strike')}
          title="Void Strike"
        >
          {FormatIcons.strike}
        </button>
        <button
          onClick={() => handleFormat('code')}
          className={formatButtonClass('code')}
          title="Arcane Code"
        >
          {FormatIcons.code}
        </button>
        <button
          onClick={handleLink}
          className={formatButtonClass('link')}
          title="Mystic Link"
        >
          {FormatIcons.link}
        </button>
      </div>

      {/* Editor */}
      <div className="p-4 space-y-4">
        <div
          ref={editorRef}
          contentEditable
          className="min-h-[200px] bg-[#1a1a2e] border border-[#6b21a8]/20 rounded p-3 
                   text-[#e2e8f0] font-mono focus:outline-none focus:border-[#a855f7]/50
                   overflow-auto magical-scroll "
          onInput={() => {
            setMagicCharges(prev => prev + 1);
            setManaVolume(prev => prev + Math.floor(Math.random() * 50));
          }}
        />

        {/* Mana display */}
        <div className="text-[#ffd700] font-mono text-sm flex items-center gap-2">
          <span>Mana Volume:</span>
          <span>{manaVolume.toLocaleString()}</span>
          <span className="text-[#a855f7]">⚡</span>
        </div>
      </div>

      {/* Magic effects */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6b21a8]/0 via-[#a855f7]/50 to-[#6b21a8]/0" />
    </div>
  );
};

export default GrimoireWriterApp;