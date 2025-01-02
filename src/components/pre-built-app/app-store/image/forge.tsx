'use client';
import { useState } from 'react';

const DreamweaverForge = () => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('mystical');
  const [size, setSize] = useState('512x512');
  const [generating, setGenerating] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const magicalStyles = [
    { id: 'mystical', name: '✨ Mystical' },
    { id: 'ancient', name: '📜 Ancient' },
    { id: 'ethereal', name: '🌟 Ethereal' },
    { id: 'dark', name: '🌑 Dark Magic' },
  ];

  const generateImages = () => {
    if (!prompt.trim()) return;
    setGenerating(true);

    // Simulate generation with placeholders
    setTimeout(() => {
      setImages([
        'https://picsum.photos/512/512?random=4',
        'https://picsum.photos/512/512?random=2',
        'https://picsum.photos/512/512?random=3',
      ]);
      setGenerating(false);
    }, 3000);
  };

  return (
    <div className="w-[700px] h-[700px] bg-gray-900 overflow-auto magical-scroll  p-6 font-mono relative">
      <div className="absolute inset-0 border-4 border-rose-500/30 pointer-events-none" />
      
      <div className="text-center mb-6">
        <h1 className="text-3xl text-rose-400">⚜️ Dreamweaver&apos;s Forge ⚜️</h1>
        <div className="text-rose-300 text-sm">Master of Illusory Arts</div>
      </div>

      <div className="grid gap-4 mb-6">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Inscribe your vision's essence..."
          className="w-full h-24 bg-gray-800 border border-rose-500/30 text-rose-100 p-4 rounded-lg focus:outline-none focus:border-rose-400 resize-none"
        />

        <div className="grid grid-cols-2 gap-4">
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="bg-gray-800 border border-rose-500/30 text-rose-100 p-2 rounded-lg focus:outline-none focus:border-rose-400"
          >
            {magicalStyles.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>

          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="bg-gray-800 border border-rose-500/30 text-rose-100 p-2 rounded-lg focus:outline-none focus:border-rose-400"
          >
            <option value="256x256">🔮 Small Scry</option>
            <option value="512x512">📜 Medium Portal</option>
            <option value="1024x1024">⚡ Large Vision</option>
          </select>
        </div>

        <button
          onClick={generateImages}
          disabled={generating}
          className="px-6 py-3 bg-rose-600 text-rose-100 rounded-lg hover:bg-rose-500 transition-colors disabled:bg-gray-600"
        >
          {generating ? '✨ Channeling Powers...' : '🌟 Forge Visions'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {images.map((src, idx) => (
          <div key={idx} className="bg-gray-800/50 rounded-lg p-2 border border-rose-500/30">
            <img src={src} alt={`Generated ${idx + 1}`} className="w-full h-auto rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DreamweaverForge;