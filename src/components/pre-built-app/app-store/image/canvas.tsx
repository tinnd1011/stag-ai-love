'use client';
import Image from 'next/image';
import { useState } from 'react';

const EtherealCanvas = () => {
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [image, setImage] = useState('');

  const generateImage = () => {
    if (!prompt.trim()) return;
    setGenerating(true);

    // Simulate generation with placeholder
    setTimeout(() => {
      setImage('https://picsum.photos/512/512?random=1');
      setGenerating(false);
    }, 2000);
  };

  return (
    <div className="w-[700px] h-[700px] bg-gray-900 overflow-auto magical-scroll  p-6 font-mono relative">
      <div className="absolute inset-0 border-4 border-fuchsia-500/30 pointer-events-none" />
      
      <div className="text-center mb-6">
        <h1 className="text-3xl text-fuchsia-400">✧ Ethereal Canvas ✧</h1>
        <div className="text-fuchsia-300 text-sm">Manifest Visions from Dreams</div>
      </div>

      <div className="mb-6">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your mystical vision..."
          className="w-full h-32 bg-gray-800 border border-fuchsia-500/30 text-fuchsia-100 p-4 rounded-lg focus:outline-none focus:border-fuchsia-400 resize-none"
        />
        <button
          onClick={generateImage}
          disabled={generating}
          className="mt-2 px-6 py-2 bg-fuchsia-600 text-fuchsia-100 rounded-lg hover:bg-fuchsia-500 transition-colors w-full disabled:bg-gray-600"
        >
          {generating ? '✨ Weaving Reality...' : '🎨 Manifest Image'}
        </button>
      </div>

      <div className="bg-gray-800/50 rounded-lg p-4 border border-fuchsia-500/30 min-h-[200px] flex items-center justify-center">
        {image ? (
          <Image src={image} alt="Generated" className="max-w-full h-auto rounded-lg" />
        ) : (
          <div className="text-fuchsia-300 text-center">
            The canvas awaits your imagination...
          </div>
        )}
      </div>
    </div>
  );
};

export default EtherealCanvas;