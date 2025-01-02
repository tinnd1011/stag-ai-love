"use client";

import { useState } from "react";

export default function SmartVideoPlayer() {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoId, setVideoId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const extractVideoId = (url: string): string | null => {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : null;
  };

  const handleUrlSubmit = () => {
    setError("");
    setIsLoading(true);

    const id = extractVideoId(videoUrl);
    if (id) {
      setVideoId(id);
    } else {
      setError("Please enter a valid YouTube URL");
    }

    setIsLoading(false);
  };

  return (
    <div className="w-[700px] h-[700px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-100 overflow-auto p-6 relative">
      {/* Dynamic background effect */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      {/* Main content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Smart Video Player
          </h2>
          <p className="text-gray-400 mt-2">Enhanced YouTube Experience</p>
        </div>

        {/* URL Input Section */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-blue-500/5 rounded-xl blur-xl" />
          <div className="relative flex gap-4">
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="Enter YouTube URL..."
              className="flex-1 h-12 bg-slate-800/90 rounded-lg border border-blue-500/30 px-4 
                         text-gray-100 placeholder:text-gray-500
                         focus:outline-none focus:ring-2 focus:ring-blue-500/50 
                         transition-all duration-300"
            />
            <button
              onClick={handleUrlSubmit}
              className="px-6 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 
                       rounded-lg transition-all duration-300
                       text-white font-medium shadow-lg shadow-blue-500/20"
            >
              Load Video
            </button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="text-red-400 text-center mb-4 bg-red-500/10 py-2 px-4 rounded-lg">
            {error}
          </div>
        )}

        {/* Video Display Section */}
        <div className="relative">
          {/* Video frame styling */}
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 rounded-xl blur-md" />

          <div className="relative aspect-video bg-slate-900 rounded-lg overflow-hidden border border-blue-500/20">
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/90">
                <div className="w-16 h-16 border-4 border-blue-500 rounded-full animate-spin border-t-transparent" />
              </div>
            ) : videoId ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/90">
                <div className="text-center space-y-3">
                  <div className="text-4xl">🎥</div>
                  <p className="text-gray-400">Ready to play your video</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic accent elements */}
        {videoId && (
          <div className="absolute -inset-1 -z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
          </div>
        )}
      </div>

      {/* Ambient background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `pulse 4s infinite ${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
