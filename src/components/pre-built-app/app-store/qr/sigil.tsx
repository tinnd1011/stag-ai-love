'use client';
import { useState } from 'react';

const ArcaneSigil = () => {
  const [text, setText] = useState('');
  const [sigil, setSigil] = useState('');
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');

  const generateSigil = () => {
    if (!text.trim()) {
      setError('The scrolls require your message...');
      return;
    }
    
    setGenerating(true);
    setError('');
    
    // Using the QR Server API
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(text)}`;
    setSigil(qrUrl);
    setGenerating(false);
  };

  const downloadSigil = () => {
    const link = document.createElement('a');
    link.href = sigil;
    link.download = 'mystic-sigil.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-[700px] h-[700px] bg-gray-900 overflow-auto magical-scroll  p-6 font-mono relative">
      <div className="absolute inset-0 border-4 border-violet-500/30 pointer-events-none" />
      
      <div className="text-center mb-6">
        <h1 className="text-3xl text-violet-400">📿 Arcane Sigil 📿</h1>
        <div className="text-violet-300 text-sm">Forge Mystical Bindings</div>
      </div>

      <div className="mb-6">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your mystical message..."
          className="w-full bg-gray-800 border border-violet-500/30 text-violet-100 px-4 py-2 rounded-lg focus:outline-none focus:border-violet-400"
        />
        {error && (
          <div className="text-red-400 text-sm mt-2">{error}</div>
        )}
        <button
          onClick={generateSigil}
          disabled={generating}
          className="mt-4 px-6 py-2 bg-violet-600 text-violet-100 rounded-lg hover:bg-violet-500 transition-colors w-full disabled:bg-gray-600"
        >
          {generating ? '✨ Binding Magic...' : '🔮 Create Sigil'}
        </button>
      </div>

      {sigil && (
        <div className="bg-gray-800/50 rounded-lg p-8 border border-violet-500/30 flex flex-col items-center gap-4">
          <img 
            src={sigil} 
            alt="Generated Sigil" 
            className="w-48 h-48 bg-white p-2 rounded-lg"
          />
          <button
            onClick={downloadSigil}
            className="px-4 py-2 bg-violet-600 text-violet-100 rounded-lg hover:bg-violet-500 transition-colors"
          >
            📜 Save Sigil
          </button>
        </div>
      )}
    </div>
  );
};

export default ArcaneSigil;