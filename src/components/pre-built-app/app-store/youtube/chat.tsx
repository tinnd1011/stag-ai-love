'use client'

import { useState, useEffect, useRef } from 'react'

interface ChatMessage {
  id: number
  username: string
  message: string
  timestamp: Date
  type: 'message' | 'notification'
  rank?: 'knight' | 'wizard' | 'royal' | 'peasant'
}

export default function KingdomChronicles() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [viewerCount, setViewerCount] = useState(0)
  const [selectedQuality, setSelectedQuality] = useState('1080p')
  // const [showSettings, setShowSettings] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)

  // Magical particle effect animation
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      hue: number
      alpha: number
    }> = []

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        hue: Math.random() * 60 + 30, // Gold/amber range
        alpha: Math.random() * 0.5 + 0.5
      })
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(26, 15, 31, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach(particle => {
        particle.x += particle.speedX
        particle.y += particle.speedY
        particle.alpha -= 0.005

        if (particle.alpha <= 0) {
          particle.x = Math.random() * canvas.width
          particle.y = Math.random() * canvas.height
          particle.alpha = 1
        }

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${particle.hue}, 70%, 50%, ${particle.alpha})`
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => cancelAnimationFrame(animationRef.current)
  }, [])

  // Simulate chat and viewer updates
  useEffect(() => {
    const ranks = ['knight', 'wizard', 'royal', 'peasant']
    const userNames = ['Sir_Lancelot', 'Dragon_Tamer', 'Royal_Wizard', 'Knight_Wanderer']
    const messages = [
      'The dragons approach!',
      'Rally the troops!',
      'For the kingdom!',
      'Magic flows through the realm!'
    ]

    const chatInterval = setInterval(() => {
      const newMsg: ChatMessage = {
        id: Date.now(),
        username: userNames[Math.floor(Math.random() * userNames.length)],
        message: messages[Math.floor(Math.random() * messages.length)],
        timestamp: new Date(),
        type: 'message',
        rank: ranks[Math.floor(Math.random() * ranks.length)] as ChatMessage['rank']
      }
      setMessages(prev => [...prev.slice(-50), newMsg])
    }, 3000)

    const viewerInterval = setInterval(() => {
      setViewerCount(prev => Math.max(0, prev + Math.floor(Math.random() * 11) - 5))
    }, 2000)

    return () => {
      clearInterval(chatInterval)
      clearInterval(viewerInterval)
    }
  }, [])

  return (
    <div className="w-[700px] h-[700px] bg-[#1a0f1f] text-amber-100 overflow-hidden p-4 font-serif relative">
      {/* Animated Background Canvas */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      <div className="grid grid-cols-[1fr_300px] gap-4 h-full relative">
        {/* Main Content Area */}
        <div className="relative">
          {/* Viewer Crystal */}
          <div className="absolute top-4 right-4 z-10">
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-500/20 blur-xl animate-pulse" />
              <div className="relative bg-gradient-to-br from-blue-500/30 to-purple-500/30 
                            p-3 rounded-lg border border-blue-400/50 backdrop-blur-sm
                            group-hover:scale-105 transition-transform">
                <div className="text-center">
                  <div className="text-sm text-blue-200">Brave Souls</div>
                  <div className="text-xl font-bold animate-pulse">
                    {viewerCount}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stream Content */}
          <div className="relative h-[400px] rounded-lg border-2 border-amber-900/50 overflow-hidden">
            {/* <video
              autoPlay
              muted={isMuted}
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="https://www.youtube.com/watch?v=RCipUMPyV3E" type="video/mp4" />
            </video> */}
            <iframe
              src={`https://www.youtube.com/embed/RCipUMPyV3E?autoplay=1&mute=1&loop=1&playlist=RCipUMPyV3E`}
              className="w-full h-full object-cover"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            
            {/* Video Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 bg-amber-900/50 rounded-full hover:bg-amber-900/70 transition-colors"
                >
                  {isMuted ? 'Unmute' : 'Mute'}
                </button>
                <div className="flex-1 h-1 bg-amber-900/30 rounded-full overflow-hidden">
                  <div className="w-2/3 h-full bg-amber-500/50 animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Quality Controls */}
          <div className="mt-4 flex justify-center gap-6">
            {['Diamond', 'Ruby', 'Emerald', 'Sapphire'].map((quality, index) => (
              <button
                key={quality}
                onClick={() => setSelectedQuality(quality)}
                className={`group relative ${
                  selectedQuality === quality ? 'scale-110' : ''
                }`}
              >
                <div className="absolute inset-0 blur-md bg-gradient-to-br from-amber-500/30 to-red-500/30" />
                <div className={`
                  relative w-10 h-10 rounded-lg transform rotate-45 transition-all
                  ${selectedQuality === quality ? 'animate-pulse' : ''}
                  ${['bg-cyan-300', 'bg-red-400', 'bg-emerald-400', 'bg-blue-400'][index]}
                `}>
                  <div className="absolute inset-0 bg-white/20 rounded-lg transform -rotate-45" />
                </div>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap">
                  {quality}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Chat Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 to-red-900/10 
                         rounded-lg border-2 border-amber-800/30 backdrop-blur-sm" />
          
          <div className="h-[550px] overflow-y-auto magical-scroll  p-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`relative group transform hover:scale-102 transition-all duration-300`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-900/0 
                               via-amber-900/10 to-amber-900/0 transform -skew-x-12" />
                <div className="relative p-2 rounded-lg hover:bg-amber-900/20 transition-colors">
                  <div className="flex items-center gap-2">
                    {msg.rank && (
                      <span className={`
                        px-2 py-0.5 rounded-full text-xs
                        ${msg.rank === 'royal' ? 'bg-purple-500/30 text-purple-200' :
                          msg.rank === 'wizard' ? 'bg-blue-500/30 text-blue-200' :
                          msg.rank === 'knight' ? 'bg-amber-500/30 text-amber-200' :
                          'bg-gray-500/30 text-gray-200'}
                      `}>
                        {msg.rank}
                      </span>
                    )}
                    <span className="font-bold text-amber-400">{msg.username}</span>
                    <span className="text-xs text-amber-200/50">
                      {msg.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="mt-1 text-amber-100">{msg.message}</p>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Enhanced Chat Input */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="relative">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Send a royal decree..."
                className="w-full bg-amber-900/20 rounded-lg border-2 border-amber-800/30 
                         px-4 py-2 focus:outline-none focus:border-amber-700/50 
                         placeholder-amber-200/30 backdrop-blur-sm"
              />
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 
                         bg-amber-700/30 hover:bg-amber-700/50 rounded 
                         transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}