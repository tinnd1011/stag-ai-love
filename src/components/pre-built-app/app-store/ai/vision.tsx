'use client';
import Image from 'next/image';
import { useState } from 'react';

const VisionWeaver = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<string[]>([]);
  const [imagePath, setImagePath] = useState('');

  const magicalAnalysis = [
    "A powerful aura emanates from this vision...",
    "Ancient symbols reveal themselves...",
    "The magical essence suggests great power...",
    "Dark energies swirl within...",
  ];

  const analyzeImage = (file: File) => {
    setAnalyzing(true);
    setResult([]);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePath(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Simulate analysis
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < 4) {
        setResult(prev => [...prev, magicalAnalysis[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
        setAnalyzing(false);
      }
    }, 1000);
  };

  return (
    <div className="w-[700px]  bg-gray-900  p-6 font-mono relative">
      <div className="absolute inset-0 border-4 border-cyan-500/30 pointer-events-none" />
      
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl text-cyan-400">👁️ Vision Weaver 👁️</h1>
        <div className="text-cyan-300 text-sm">Mystical Image Interpretation</div>
      </div>

      {/* Upload Area */}
      <div className="mb-6">
        <label className="block w-full bg-gray-800 border-2 border-dashed border-cyan-500/30 rounded-lg p-8 text-center cursor-pointer hover:border-cyan-400 transition-colors">
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && analyzeImage(e.target.files[0])}
          />
          <div className="text-cyan-300">
            {analyzing ? '✨ Channeling Sight...' : '🎴 Present your vision to the oracle'}
          </div>
        </label>
      </div>

      {/* Preview and Results */}
      <div className="grid grid-cols-2 gap-4">
        {imagePath && (
          <div className="bg-gray-800/50 rounded-lg p-4 border border-cyan-500/30">
            <Image 
              src={imagePath} 
              alt="Preview" 
              className="w-full h-auto rounded"
            />
          </div>
        )}
        
        <div className="bg-gray-800/50 rounded-lg p-4 border border-cyan-500/30">
          {result.map((insight, idx) => (
            <div key={idx} className="text-cyan-300 mb-2 animate-[fadeIn_0.5s_ease-out]">
              ✧ {insight}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VisionWeaver;