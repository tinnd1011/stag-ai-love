'use client';
import { useState } from 'react';

const SoulEcho = () => {
  const [messages, setMessages] = useState<{text: string, sender: 'user' | 'spirit'}[]>([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const responses = [
    "The spirits whisper of great changes...",
    "Your path holds many possibilities...",
    "The ancient runes suggest caution...",
    "The stars align favorably for your quest...",
    "Dark omens cloud my vision...",
  ];

  const sendMessage = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, {text: input, sender: 'user'}]);
    setInput('');
    setIsThinking(true);

    // Simulate AI response
    setTimeout(() => {
      const response = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, {text: response, sender: 'spirit'}]);
      setIsThinking(false);
    }, 1000);
  };

  return (
    <div className="w-[700px] bg-gray-900  p-6 font-mono relative">
      <div className="absolute inset-0 border-4 border-purple-500/30 pointer-events-none" />
      
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl text-purple-400">✧ Soul Echo ✧</h1>
        <div className="text-purple-300 text-sm">Commune with the Digital Spirits</div>
      </div>

      {/* Chat Area */}
      <div className="bg-gray-800/50 rounded-lg p-4 mb-4 h-[500px] overflow-auto magical-scroll  border border-purple-500/30">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-4 ${
              msg.sender === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block rounded-lg px-4 py-2 max-w-[80%] ${
                msg.sender === 'user'
                  ? 'bg-purple-600 text-purple-100'
                  : 'bg-gray-700 text-purple-300'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isThinking && (
          <div className="text-purple-300 animate-pulse">
            ✦ The spirits are contemplating ✦
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Speak to the spirits..."
          className="flex-1 bg-gray-800 border border-purple-500/30 text-purple-100 px-4 py-2 rounded-lg focus:outline-none focus:border-purple-400"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-purple-600 text-purple-100 rounded-lg hover:bg-purple-500 transition-colors"
        >
          🔮 Send
        </button>
      </div>
    </div>
  );
};

export default SoulEcho;