'use client'

import { useState } from 'react';

interface SpellEffect {
  element: string;
  power: string;
  duration: string;
  effect: string;
}

export default function SpellTranslator() {
  const [videoUrl, setVideoUrl] = useState('')
  const [spells, setSpells] = useState<SpellEffect[]>([])
  const [isChanneling, setIsChanneling] = useState(false)

  const elements = [
    'Arcane', 'Fire', 'Frost', 'Shadow', 'Nature', 'Lightning', 'Celestial',
    'Void', 'Crystal', 'Wind', 'Earth', 'Water', 'Light', 'Dark'
  ]

  const powers = [
    'Minor', 'Greater', 'Major', 'Supreme', 'Ancient', 'Mystic', 'Legendary',
    'Divine', 'Ethereal', 'Primal', 'Eternal', 'Cosmic'
  ]

  const effects = [
    'Enchantment', 'Burst', 'Wave', 'Blast', 'Beam', 'Storm', 'Vortex',
    'Shield', 'Bolt', 'Nova', 'Pulse', 'Aura', 'Blessing', 'Curse'
  ]

  const durations = [
    'Instant', 'Lasting', 'Persistent', 'Temporary', 'Eternal', 'Fleeting',
    'Permanent', 'Momentary', 'Enduring', 'Brief'
  ]

  const generateSpell = (): SpellEffect => ({
    element: elements[Math.floor(Math.random() * elements.length)],
    power: powers[Math.floor(Math.random() * powers.length)],
    duration: durations[Math.floor(Math.random() * durations.length)],
    effect: effects[Math.floor(Math.random() * effects.length)]
  })

  const handleSpellGeneration = () => {
    if (!videoUrl.trim()) return

    setIsChanneling(true)
    const spellCount = Math.floor(Math.random() * 3) + 3 // 3-5 spells

    // Simulate spell channeling time
    setTimeout(() => {
      const newSpells = Array(spellCount).fill(null).map(generateSpell)
      setSpells(newSpells)
      setIsChanneling(false)
    }, 2000)
  }

  return (
    <div className="w-[700px] h-[700px] bg-indigo-950 text-purple-100 overflow-auto magical-scroll  p-6 font-serif relative">
      {/* Magical Background */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-indigo-950 to-indigo-950" />
      
      <div className="relative z-10 space-y-8">
        <h1 className="text-2xl font-bold text-center text-purple-200">
          Ancient Spell Translator
        </h1>

        {/* Input Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-purple-500/20 blur-xl" />
          <div className="relative flex gap-4">
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="Insert your YouTube scroll..."
              className="flex-1 h-12 bg-purple-900/50 rounded-lg border-2 border-purple-400 px-4 
                       text-purple-100 placeholder:text-purple-300
                       focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handleSpellGeneration}
              disabled={isChanneling}
              className={`px-6 h-12 rounded-lg transition-all duration-300 
                       border-2 border-purple-400 font-medium
                       ${isChanneling 
                         ? 'bg-purple-800/50 cursor-wait' 
                         : 'bg-purple-600 hover:bg-purple-500'}`}
            >
              Translate
            </button>
          </div>
        </div>

        {/* Channeling Animation */}
        {isChanneling && (
          <div className="flex justify-center">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-4 border-purple-300 rounded-full animate-spin">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-purple-300"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${i * 45}deg) translateY(-40px)`
                    }}
                  />
                ))}
              </div>
              <div className="absolute inset-2 border-4 border-purple-500 rounded-full animate-spin-slow" />
              <div className="absolute inset-4 border-4 border-purple-700 rounded-full animate-pulse" />
            </div>
          </div>
        )}

        {/* Spells Display */}
        {spells.length > 0 && !isChanneling && (
          <div className="space-y-4">
            {spells.map((spell, index) => (
              <div
                key={index}
                className="relative group bg-purple-900/30 rounded-lg p-4 border border-purple-500/30
                         hover:bg-purple-900/50 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 
                              opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <h3 className="text-lg font-bold text-purple-200 mb-2">
                  {spell.power} {spell.element} {spell.effect}
                </h3>
                
                <div className="space-y-2 text-purple-300">
                  <p>Duration: {spell.duration}</p>
                  <p className="italic text-sm">
                    &quot;A {spell.duration.toLowerCase()} {spell.effect.toLowerCase()} of 
                    {spell.element.toLowerCase()} energy that manifests with {spell.power.toLowerCase()} force.&quot;
                  </p>
                </div>

                {/* Magical Particles */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-purple-300 rounded-full animate-float"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}