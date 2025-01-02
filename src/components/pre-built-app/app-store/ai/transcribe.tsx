'use client';
import { useState } from 'react';

const RuneScribe = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const magicalPhrases = [
    "In the ancient realms of forgotten lore...",
    "Through mystical valleys and enchanted forests...",
    "Beyond the veil of mortal sight...",
    "Within the depths of arcane knowledge...",
  ];

  const generateText = () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setGeneratedText('');

    // Simulate text generation
    let currentPhrase = '';
    const selectedPhrase = magicalPhrases[Math.floor(Math.random() * magicalPhrases.length)];
    
    const interval = setInterval(() => {
      if (currentPhrase.length < selectedPhrase.length) {
        currentPhrase += selectedPhrase[currentPhrase.length];
        setGeneratedText(currentPhrase);
      } else {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 50);
  };

  return (
    <div className="w-[700px]  bg-gray-900  p-6 font-mono relative">
      <div className="absolute inset-0 border-4 border-emerald-500/30 pointer-events-none" />
      
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl text-emerald-400">⚡ Rune Scribe ⚡</h1>
        <div className="text-emerald-300 text-sm">Enchanted Text Manifestation</div>
      </div>

      {/* Input Section */}
      <div className="mb-6">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Inscribe your magical intent..."
          className="w-full h-32 bg-gray-800 border border-emerald-500/30 text-emerald-100 p-4 rounded-lg focus:outline-none focus:border-emerald-400 resize-none"
        />
        <button
          onClick={generateText}
          disabled={isGenerating}
          className="mt-2 px-6 py-2 bg-emerald-600 text-emerald-100 rounded-lg hover:bg-emerald-500 transition-colors w-full disabled:bg-gray-600"
        >
          {isGenerating ? '✨ Channeling Magic...' : '📜 Manifest Text'}
        </button>
      </div>

      {/* Output Section */}
      <div className="bg-gray-800/50 rounded-lg p-6 border border-emerald-500/30 min-h-[200px]">
        <div className="text-emerald-300 whitespace-pre-wrap">
          {generatedText || 'The scroll awaits your command...'}
        </div>
      </div>
    </div>
  );
};

export default RuneScribe;