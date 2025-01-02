'use client';

import React, { useState, useRef, ChangeEvent } from 'react';

interface AudioExtractorProps {
  className?: string;
}

interface VideoFileInfo {
  name: string;
  duration: number;
  size: string;
}

const AudioExtractorApp: React.FC<AudioExtractorProps> = ({ className }) => {
  // State management
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoInfo, setVideoInfo] = useState<VideoFileInfo | null>(null);
  const [extracting, setExtracting] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string>('');

  // Refs
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  // const videoRef = useRef<HTMLVideoElement | null>(null);

  // File size formatter
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Format duration to mm:ss
  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Handle file upload
  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError('');
    
    if (file) {
      if (!file.type.startsWith('video/')) {
        setError('Please upload a valid video file');
        return;
      }

      setVideoFile(file);
      
      // Create video element to get duration
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.src = URL.createObjectURL(file);

      video.onloadedmetadata = () => {
        URL.revokeObjectURL(video.src);
        setVideoInfo({
          name: file.name,
          duration: video.duration,
          size: formatFileSize(file.size)
        });
      };

      video.onerror = () => {
        setError('Error loading video file');
        setVideoFile(null);
        setVideoInfo(null);
      };
    }
  };

  // Simulate audio extraction
  const extractAudio = async () => {
    if (!videoFile) return;

    setExtracting(true);
    setProgress(0);

    // Simulate processing with progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setProgress(i);
    }

    // Simulate download
    try {
      // const fileName = videoFile.name.replace(/\.[^/.]+$/, '') + '.mp3';
      
      // In a real implementation, you would:
      // 1. Process the video file to extract audio
      // 2. Convert to desired format
      // 3. Create and download the file
      
      setExtracting(false);
      setProgress(0);
      setVideoFile(null);
      setVideoInfo(null);
    } catch (err) {
      console.log(err)
      setError('Error extracting audio');
      setExtracting(false);
      setProgress(0);
    }
  };

  return (
    <div className={`min-w-[320px] min-h-[400px] bg-gray-900 border-2 border-purple-400/30 rounded-lg overflow-hidden shadow-lg ${className}`}>
      {/* Header */}
      <div className="p-4 bg-gray-800/50 border-b border-purple-400/20 flex items-center justify-between">
        <h2 className="text-purple-400 font-pixelated text-lg">Audio Extractor v1.0</h2>
        <div className="w-3 h-3 rounded-full bg-purple-400 animate-pulse shadow-[0_0_10px_#C084FC]" />
      </div>
      
      {/* Main content */}
      <div className="p-4 space-y-4">
        {/* Potion bottle visualization */}
        <div className="relative h-48 bg-gray-800/30 rounded border border-purple-400/20">
          <div className="absolute inset-0 flex items-center justify-center">
            {extracting ? (
              <div className="w-16 h-32 relative">
                <div 
                  className="absolute bottom-0 w-full bg-purple-400/50 rounded-b-lg transition-all duration-1000"
                  style={{ height: `${progress}%` }}
                />
                <div className="absolute inset-0 border-2 border-purple-400/30 rounded-lg" />
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-purple-400 font-pixelated">
                  {progress}%
                </div>
              </div>
            ) : videoInfo ? (
              <div className="text-purple-400/60 font-pixelated space-y-2 text-center">
                <p className="text-purple-400">{videoInfo.name}</p>
                <p>Duration: {formatDuration(videoInfo.duration)}</p>
                <p>Size: {videoInfo.size}</p>
              </div>
            ) : (
              <div className="text-purple-400/60 font-pixelated">Upload Video File</div>
            )}
          </div>
          {/* Magical bottom border */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0" />
        </div>

        {/* Error message */}
        {error && (
          <div className="text-red-400 text-sm text-center font-pixelated">
            {error}
          </div>
        )}

        {/* Controls */}
        <div className="space-y-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="video/*"
            className="hidden"
          />
          
          {!extracting && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-2 px-4 bg-purple-500/20 border border-purple-400/30 rounded 
                       text-purple-400 font-pixelated hover:bg-purple-500/30 transition-all
                       disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={extracting}
              type="button"
            >
              Select Video
            </button>
          )}

          {videoFile && !extracting && (
            <button
              onClick={extractAudio}
              className="w-full py-2 px-4 bg-purple-500/20 border border-purple-400/30 rounded 
                       text-purple-400 font-pixelated hover:bg-purple-500/30 transition-all
                       shadow-[0_0_10px_rgba(192,132,252,0.1)]"
              type="button"
            >
              Extract Audio
            </button>
          )}

          {extracting && (
            <button
              className="w-full py-2 px-4 bg-purple-500/20 border border-purple-400/30 rounded 
                       text-purple-400 font-pixelated cursor-not-allowed opacity-50"
              disabled
              type="button"
            >
              Extracting...
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioExtractorApp;