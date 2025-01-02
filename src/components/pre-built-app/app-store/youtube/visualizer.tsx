// app/components/spell-visualizer/page.tsx
'use client'

import { useState, useEffect, useRef } from 'react'

type VisualizationPattern = 'runes' | 'crystals' | 'vortex' | 'waves'

export default function SpellVisualizer() {
  // const [videoUrl, setVideoUrl] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [pattern, setPattern] = useState<VisualizationPattern>('runes')
  const [intensity, setIntensity] = useState(50)
  const [hueRotation, setHueRotation] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)

  // Handle visualization start
  // const handleStart = () => {
  //   setIsPlaying(true)
  // }

  // Function to draw runes pattern
  const drawRunes = (ctx: CanvasRenderingContext2D, time: number, frequencyData: Uint8Array) => {
    const { width, height } = ctx.canvas
    const runeCount = 12
    const radius = Math.min(width, height) * 0.4
    
    ctx.save()
    ctx.translate(width / 2, height / 2)
    
    for (let i = 0; i < runeCount; i++) {
      const angle = (i / runeCount) * Math.PI * 2
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius
      const scale = (frequencyData[i % frequencyData.length] / 255) * (intensity / 50)
      
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(angle + time * 0.001)
      ctx.scale(scale, scale)
      
      // Draw magical rune
      ctx.beginPath()
      ctx.moveTo(-10, -10)
      ctx.lineTo(10, -10)
      ctx.lineTo(0, 10)
      ctx.closePath()
      ctx.strokeStyle = `hsla(${hueRotation + i * 30}, 70%, 60%, 0.8)`
      ctx.lineWidth = 2
      ctx.stroke()
      
      ctx.restore()
    }
    ctx.restore()
  }

  // Function to draw crystal pattern
  const drawCrystals = (ctx: CanvasRenderingContext2D, time: number, frequencyData: Uint8Array) => {
    const { width, height } = ctx.canvas
    const crystalCount = 8
    
    for (let i = 0; i < crystalCount; i++) {
      const angle = (i / crystalCount) * Math.PI * 2
      const radius = (frequencyData[i] / 255) * (width * 0.3) * (intensity / 50)
      const x = width/2 + Math.cos(angle + time * 0.001) * radius
      const y = height/2 + Math.sin(angle + time * 0.001) * radius
      
      ctx.beginPath()
      ctx.moveTo(x, y - 20)
      ctx.lineTo(x + 10, y)
      ctx.lineTo(x, y + 20)
      ctx.lineTo(x - 10, y)
      ctx.closePath()
      
      const gradient = ctx.createLinearGradient(x - 10, y - 20, x + 10, y + 20)
      gradient.addColorStop(0, `hsla(${hueRotation + i * 45}, 70%, 60%, 0.8)`)
      gradient.addColorStop(1, `hsla(${hueRotation + i * 45}, 70%, 40%, 0.4)`)
      ctx.fillStyle = gradient
      ctx.fill()
    }
  }

  // Function to draw vortex pattern
  const drawVortex = (ctx: CanvasRenderingContext2D, time: number, frequencyData: Uint8Array) => {
    const { width, height } = ctx.canvas
    const centerX = width / 2
    const centerY = height / 2
    
    for (let i = 0; i < frequencyData.length; i++) {
      const angle = (i / frequencyData.length) * Math.PI * 2
      const scale = frequencyData[i] / 255 * (intensity / 50)
      const radius = scale * Math.min(width, height) * 0.4
      
      const x1 = centerX + Math.cos(angle + time * 0.002) * radius
      const y1 = centerY + Math.sin(angle + time * 0.002) * radius
      const x2 = centerX + Math.cos(angle + time * 0.002) * (radius * 0.8)
      const y2 = centerY + Math.sin(angle + time * 0.002) * (radius * 0.8)
      
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.strokeStyle = `hsla(${hueRotation + i * 3}, 70%, 60%, ${scale})`
      ctx.lineWidth = 2 * scale
      ctx.stroke()
    }
  }

  // Function to draw wave pattern
  const drawWaves = (ctx: CanvasRenderingContext2D, time: number, frequencyData: Uint8Array) => {
    const { width, height } = ctx.canvas
    
    ctx.beginPath()
    ctx.moveTo(0, height / 2)
    
    for (let i = 0; i < width; i++) {
      const frequency = frequencyData[Math.floor((i / width) * frequencyData.length)] / 255
      const y = height/2 + 
                Math.sin(i * 0.02 + time * 0.002) * 50 * (intensity / 50) +
                Math.sin(i * 0.01 + time * 0.001) * 30 * frequency
      
      ctx.lineTo(i, y)
    }
    
    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    gradient.addColorStop(0, `hsla(${hueRotation}, 70%, 60%, 0.8)`)
    gradient.addColorStop(1, `hsla(${hueRotation + 60}, 70%, 40%, 0.4)`)
    
    ctx.strokeStyle = gradient
    ctx.lineWidth = 3
    ctx.stroke()
  }

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || !isPlaying) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 600
    canvas.height = 400

    const animate = () => {
      const time = Date.now()
      
      // Clear with fade effect
      ctx.fillStyle = 'rgba(13, 5, 30, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Generate fake audio data
      const frequencyData = new Uint8Array(64)
      for (let i = 0; i < frequencyData.length; i++) {
        frequencyData[i] = 
          128 + 
          Math.sin(time * 0.003 + i * 0.2) * 50 * (intensity / 50) +
          Math.sin(time * 0.005 + i * 0.3) * 30 +
          Math.random() * 20
      }

      // Draw based on selected pattern
      switch (pattern) {
        case 'runes':
          drawRunes(ctx, time, frequencyData)
          break
        case 'crystals':
          drawCrystals(ctx, time, frequencyData)
          break
        case 'vortex':
          drawVortex(ctx, time, frequencyData)
          break
        case 'waves':
          drawWaves(ctx, time, frequencyData)
          break
      }

      setHueRotation(prev => (prev + 0.5) % 360)
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [isPlaying, pattern, intensity])

  return (
    <div className="w-[700px] h-[700px] bg-indigo-950 text-purple-100 overflow-auto magical-scroll  p-6 font-serif relative">
      {/* Magical Background */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-indigo-950 to-indigo-950" />
      
      {/* Content */}
      <div className="relative z-10 space-y-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-purple-200">
          Arcane Resonance Visualizer
        </h1>

        {/* Controls */}
        <div className="flex gap-4 mb-6">
          <select
            value={pattern}
            onChange={(e) => setPattern(e.target.value as VisualizationPattern)}
            className="bg-purple-900/50 border-2 border-purple-400 rounded-lg px-4 py-2"
          >
            <option value="runes">Ancient Runes</option>
            <option value="crystals">Crystal Formation</option>
            <option value="vortex">Mystic Vortex</option>
            <option value="waves">Ethereal Waves</option>
          </select>

          <div className="flex-1 flex items-center gap-4">
            <span>Power</span>
            <input
              type="range"
              min="0"
              max="100"
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="flex-1"
            />
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-500 
                     rounded-lg transition-colors duration-300
                     border-2 border-purple-400"
          >
            {isPlaying ? 'Dispel' : 'Cast'}
          </button>
        </div>

        {/* Visualization Canvas */}
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-purple-400/20 to-purple-500/20 rounded-lg blur-sm" />
          <canvas
            ref={canvasRef}
            className="relative w-full rounded-lg border-2 border-purple-500/30"
          />
        </div>
      </div>
    </div>
  )
}