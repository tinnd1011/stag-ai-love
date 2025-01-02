'use client';

import React, { useState, useRef, ChangeEvent, FormEvent } from 'react';

interface VideoPlayerProps {
  className?: string;
}

const VideoPlayerApp: React.FC<VideoPlayerProps> = ({ className }) => {
  // State management with proper TypeScript types
  const [videoSrc, setVideoSrc] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(50);
  const [showUrlInput, setShowUrlInput] = useState<boolean>(false);
  const [urlInput, setUrlInput] = useState<string>('');
  
  // Refs with proper TypeScript types
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // File upload handler
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
    }
  };

  // URL submission handler
  const handleUrlSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (urlInput.trim()) {
      setVideoSrc(urlInput);
      setShowUrlInput(false);
      setUrlInput('');
    }
  };

  // Video playback control
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch((error) => {
          console.error('Error playing video:', error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Volume control
  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setVolume(value);
    if (videoRef.current) {
      videoRef.current.volume = value / 100;
    }
  };

  // Cleanup function for object URLs
  React.useEffect(() => {
    return () => {
      if (videoSrc.startsWith('blob:')) {
        URL.revokeObjectURL(videoSrc);
      }
    };
  }, [videoSrc]);

  return (
    <div className={`min-w-[620px] min-h-[400px] bg-gray-900 border-2 border-blue-400/30 rounded-lg overflow-hidden shadow-lg ${className}`}>
      {/* Header */}
      <div className="p-4 bg-gray-800/50 border-b border-blue-400/20 flex items-center justify-between">
        <h2 className="text-blue-400 font-pixelated text-lg">Potion Player v1.0</h2>
        <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse shadow-[0_0_10px_#60A5FA]" />
      </div>
      
      {/* Main content */}
      <div className="p-4 space-y-4">
        {/* Video container */}
        <div className="relative h-48 bg-gray-800/30 rounded border border-blue-400/20 overflow-hidden">
          {videoSrc ? (
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-contain bg-black"
              src={videoSrc}
              onEnded={() => setIsPlaying(false)}
              onError={() => {
                console.error('Error loading video');
                setVideoSrc('');
              }}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-blue-400/60 font-pixelated">Upload or Link Video</div>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0" />
        </div>

        {/* URL Input Form */}
        {showUrlInput && (
          <form onSubmit={handleUrlSubmit} className="space-y-2">
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Enter video URL"
              className="w-full px-3 py-2 bg-gray-800 border border-blue-400/30 rounded text-blue-400 
                       placeholder-blue-400/50 focus:outline-none focus:border-blue-400"
            />
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500/20 border border-blue-400/30 rounded 
                       text-blue-400 font-pixelated hover:bg-blue-500/30 transition-all"
            >
              Add URL
            </button>
          </form>
        )}

        {/* Controls */}
        <div className="space-y-3">
          {/* Volume Control */}
          <div className="relative h-2 bg-gray-800 rounded-full">
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="absolute w-full h-full opacity-0 cursor-pointer"
            />
            <div 
              className="h-full bg-blue-400 rounded-full transition-all duration-150"
              style={{ width: `${volume}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-400 rounded-full shadow-[0_0_5px_#60A5FA]" />
            </div>
          </div>

          {/* File Upload and URL Controls */}
          <div className="flex gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="video/*"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 py-2 px-4 bg-blue-500/20 border border-blue-400/30 rounded 
                       text-blue-400 font-pixelated hover:bg-blue-500/30 transition-all"
              type="button"
            >
              Upload
            </button>
            <button
              onClick={() => setShowUrlInput(!showUrlInput)}
              className="flex-1 py-2 px-4 bg-blue-500/20 border border-blue-400/30 rounded 
                       text-blue-400 font-pixelated hover:bg-blue-500/30 transition-all"
              type="button"
            >
              Add URL
            </button>
          </div>

          {/* Play/Pause Control */}
          {videoSrc && (
            <button
              onClick={togglePlay}
              className="w-full py-2 px-4 bg-blue-500/20 border border-blue-400/30 rounded 
                       text-blue-400 font-pixelated hover:bg-blue-500/30 transition-all
                       shadow-[0_0_10px_rgba(96,165,250,0.1)]"
              type="button"
            >
              {isPlaying ? "Pause Spell" : "Cast Play"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerApp;