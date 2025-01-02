'use client';
import { useState, useEffect } from 'react';

const RunicBeacon = () => {
  const [text, setText] = useState('');
  const [size, setSize] = useState('150x150');
  const [beacon, setBeacon] = useState('');
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');

  const runicSizes = [
    { value: '100x100', label: '🔮 Small Rune' },
    { value: '150x150', label: '⚔️ Medium Sigil' },
    { value: '200x200', label: '🏰 Large Beacon' },
    { value: '300x300', label: '⚡ Grand Portal' },
  ];

  useEffect(() => {
    if (text.trim()) {
      generateBeacon();
    }
  }, [size]);

  const generateBeacon = () => {
    if (!text.trim()) {
      setError('The ethereal waves await your message...');
      return;
    }
    
    setGenerating(true);
    setError('');

    // Using the QR Server API with size parameter
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}&data=${encodeURIComponent(text)}`;
    setBeacon(qrUrl);
    setGenerating(false);
  };

  const downloadBeacon = () => {
    const link = document.createElement('a');
    link.href = beacon;
    link.download = 'runic-beacon.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareBeacon = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Runic Beacon',
        text: 'Behold this mystical sigil!',
        url: beacon
      }).catch(() => {
        setError('The ethereal winds blocked the sharing...');
      });
    } else {
      navigator.clipboard.writeText(beacon)
        .then(() => setError('Beacon link copied to your scroll!'))
        .catch(() => setError('The copying enchantment failed...'));
    }
  };

  return (
    <div className="w-[700px] h-[700px] bg-gray-900 overflow-auto magical-scroll  p-6 font-mono relative">
      <div className="absolute inset-0 border-4 border-blue-500/30 pointer-events-none" />
      
      <div className="text-center mb-6">
        <h1 className="text-3xl text-blue-400">🌟 Runic Beacon 🌟</h1>
        <div className="text-blue-300 text-sm">Ethereal Message Weaver</div>
      </div>

      <div className="grid gap-4 mb-6">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Inscribe your message..."
          className="w-full bg-gray-800 border border-blue-500/30 text-blue-100 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-400"
        />

        {error && (
          <div className="text-red-400 text-sm text-center">{error}</div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="bg-gray-800 border border-blue-500/30 text-blue-100 p-2 rounded-lg focus:outline-none focus:border-blue-400"
          >
            {runicSizes.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>

          <button
            onClick={generateBeacon}
            disabled={generating}
            className="px-6 py-2 bg-blue-600 text-blue-100 rounded-lg hover:bg-blue-500 transition-colors disabled:bg-gray-600"
          >
            {generating ? '✨ Channeling...' : '⚡ Forge Beacon'}
          </button>
        </div>
      </div>

      {beacon && (
        <div className="bg-gray-800/50 rounded-lg p-8 border border-blue-500/30 flex flex-col items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 animate-pulse bg-blue-500/20 rounded-lg" />
            <img 
              src={beacon} 
              alt="Generated Beacon" 
              className="relative bg-white p-2 rounded-lg"
            />
          </div>
          <div className="flex gap-2">
            <button 
              onClick={downloadBeacon}
              className="px-4 py-2 bg-blue-600 text-blue-100 rounded-lg hover:bg-blue-500 transition-colors"
            >
              💫 Save
            </button>
            <button 
              onClick={shareBeacon}
              className="px-4 py-2 bg-blue-600 text-blue-100 rounded-lg hover:bg-blue-500 transition-colors"
            >
              🔄 Share
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RunicBeacon;