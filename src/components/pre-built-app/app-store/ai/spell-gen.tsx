'use client';
import { useState } from 'react';

const SpellForge = () => {
  const [intent, setIntent] = useState('');
  const [spellbook, setSpellbook] = useState<{name: string, runes: string}[]>([]);
  const [forging, setForging] = useState(false);

  const magicalSpells = [
    {
      name: "Levitation Enchantment",
      runes: `function levitate(target) {
  await channel.energy();
  target.position.y += 10;
  applyFloatingEffect(target);
}`
    },
    {
      name: "Transmutation Hex",
      runes: `class Transmutation {
  constructor(element) {
    this.baseForm = element;
    this.energy = 100;
  }
  
  transform() {
    return this.baseForm.alter();
  }
}`
    }
  ];

  const forgeSpell = () => {
    if (!intent.trim()) return;
    
    setForging(true);
    setSpellbook([]);

    // Simulate spell generation
    setTimeout(() => {
      setSpellbook(magicalSpells);
      setForging(false);
    }, 2000);
  };

  return (
    <div className="w-[700px]  bg-gray-900 p-6 font-mono relative">
      <div className="absolute inset-0 border-4 border-amber-500/30 pointer-events-none" />
      
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl text-amber-400">⚔️ Spell Forge ⚔️</h1>
        <div className="text-amber-300 text-sm">Arcane Code Manifestation</div>
      </div>

      {/* Input Section */}
      <div className="mb-6">
        <textarea
          value={intent}
          onChange={(e) => setIntent(e.target.value)}
          placeholder="Describe your magical intent..."
          className="w-full h-32 bg-gray-800 border border-amber-500/30 text-amber-100 p-4 rounded-lg focus:outline-none focus:border-amber-400 resize-none"
        />
        <button
          onClick={forgeSpell}
          disabled={forging}
          className="mt-2 px-6 py-2 bg-amber-600 text-amber-100 rounded-lg hover:bg-amber-500 transition-colors w-full disabled:bg-gray-600"
        >
          {forging ? '✨ Forging Spells...' : '⚡ Channel Magic'}
        </button>
      </div>

      {/* Spellbook */}
      <div className="space-y-4">
        {spellbook.map((spell, idx) => (
          <div 
            key={idx}
            className="bg-gray-800/50 rounded-lg p-4 border border-amber-500/30"
          >
            <div className="text-amber-400 mb-2">{spell.name}</div>
            <pre className="text-amber-300 overflow-auto magical-scroll  p-2 bg-gray-900/50 rounded">
              <code>{spell.runes}</code>
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpellForge;