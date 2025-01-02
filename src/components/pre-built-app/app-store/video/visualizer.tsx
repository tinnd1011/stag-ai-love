"use client";

import React, { useState, useRef, useEffect } from "react";

interface MusicVisualizerProps {
  className?: string;
}

interface AudioInfo {
  name: string;
  duration: number;
}

type VisualizerMode = "bars" | "wave" | "circular";

const MusicVisualizerApp: React.FC<MusicVisualizerProps> = ({ className }) => {
  // State
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioInfo, setAudioInfo] = useState<AudioInfo | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [visualizerMode, setVisualizerMode] = useState<VisualizerMode>("bars");
  const [error, setError] = useState<string>("");

  // Refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Format time display
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Initialize audio context and analyzer
  const initAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 2048;
    }
  };

  // Handle file upload
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("audio/")) {
      setAudioFile(file);
      const audio = new Audio(URL.createObjectURL(file));
      audio.onloadedmetadata = () => {
        setAudioInfo({
          name: file.name,
          duration: audio.duration,
        });
      };
      setError("");
    } else {
      setError("Please upload a valid audio file");
    }
  };

  // Draw visualizations
  const drawVisualizer = () => {
    if (!canvasRef.current || !analyserRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      if (!analyserRef.current) return;

      animationFrameRef.current = requestAnimationFrame(draw);
      analyserRef.current.getByteFrequencyData(dataArray);

      ctx.fillStyle = "rgba(17, 24, 39, 0.2)"; // Slightly transparent dark background
      ctx.fillRect(0, 0, width, height);

      switch (visualizerMode) {
        case "bars":
          drawBars(ctx, width, height, bufferLength, dataArray);
          break;
        case "wave":
          drawWave(ctx, width, height, bufferLength, dataArray);
          break;
        case "circular":
          drawCircular(ctx, width, height, bufferLength, dataArray);
          break;
      }
    };

    draw();
  };

  // Draw bars visualization
  const drawBars = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    bufferLength: number,
    dataArray: Uint8Array
  ) => {
    const barWidth = (width / bufferLength) * 2.5;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const barHeight = (dataArray[i] / 255) * height;
      const gradient = ctx.createLinearGradient(
        0,
        height - barHeight,
        0,
        height
      );
      gradient.addColorStop(0, "#fbbf24"); // amber-400
      gradient.addColorStop(1, "#b45309"); // amber-800

      ctx.fillStyle = gradient;
      ctx.fillRect(x, height - barHeight, barWidth, barHeight);
      x += barWidth + 1;
    }
  };

  // Draw wave visualization
  const drawWave = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    bufferLength: number,
    dataArray: Uint8Array
  ) => {
    ctx.beginPath();
    ctx.strokeStyle = "#fbbf24";
    ctx.lineWidth = 2;

    const sliceWidth = width / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0;
      const y = (v * height) / 2;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    ctx.lineTo(width, height / 2);
    ctx.stroke();
  };

  // Draw circular visualization
  const drawCircular = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    bufferLength: number,
    dataArray: Uint8Array
  ) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 4;

    for (let i = 0; i < bufferLength; i++) {
      const barHeight = (dataArray[i] / 255) * 100;
      const angle = (i * 2 * Math.PI) / bufferLength;

      const x1 = centerX + Math.cos(angle) * radius;
      const y1 = centerY + Math.sin(angle) * radius;
      const x2 = centerX + Math.cos(angle) * (radius + barHeight);
      const y2 = centerY + Math.sin(angle) * (radius + barHeight);

      ctx.beginPath();
      ctx.strokeStyle = `hsl(${(i * 360) / bufferLength}, 70%, 60%)`;
      ctx.lineWidth = 2;
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
  };

  // Handle play/pause
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        initAudioContext();
        if (
          !sourceRef.current &&
          audioContextRef.current &&
          analyserRef.current
        ) {
          sourceRef.current = audioContextRef.current.createMediaElementSource(
            audioRef.current
          );
          sourceRef.current.connect(analyserRef.current);
          analyserRef.current.connect(audioContextRef.current.destination);
        }
        audioRef.current.play();
        drawVisualizer();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (
        audioContextRef.current &&
        audioContextRef.current.state !== "closed"
      ) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Canvas resize handler
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const container = canvasRef.current.parentElement;
        if (container) {
          canvasRef.current.width = container.clientWidth;
          canvasRef.current.height = container.clientHeight;
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`min-w-[320px] min-h-[400px] bg-gray-900 border-2 border-amber-400/30 rounded-lg overflow-hidden shadow-lg ${className}`}
    >
      {/* Header */}
      <div className="p-4 bg-gray-800/50 border-b border-amber-400/20 flex items-center justify-between">
        <h2 className="text-amber-400 font-pixelated text-lg">
          Xetra AI Visualizer v1.0
        </h2>
        <div className="w-3 h-3 rounded-full bg-amber-400 animate-pulse shadow-[0_0_10px_#FBBF24]" />
      </div>

      {/* Main content */}
      <div className="p-4 space-y-4">
        {/* Visualization canvas */}
        <div className="relative h-48 bg-gray-800/30 rounded border border-amber-400/20 overflow-hidden">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
          {!audioFile && (
            <div className="absolute inset-0 flex items-center justify-center text-amber-400/60 font-pixelated">
              Upload Audio Potion
            </div>
          )}
        </div>

        {/* Audio element */}
        {audioFile && (
          <audio
            ref={audioRef}
            src={URL.createObjectURL(audioFile)}
            onEnded={() => setIsPlaying(false)}
          />
        )}

        {/* Error message */}
        {error && (
          <div className="text-red-400 text-sm text-center font-pixelated">
            {error}
          </div>
        )}

        {/* Audio info */}
        {audioInfo && (
          <div className="text-amber-400/60 text-center font-pixelated">
            <p className="truncate">{audioInfo.name}</p>
            <p>{formatTime(audioInfo.duration)}</p>
          </div>
        )}

        {/* Controls */}
        <div className="space-y-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="audio/*"
            className="hidden"
          />

          <div className="flex gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 py-2 px-4 bg-amber-500/20 border border-amber-400/30 rounded 
                       text-amber-400 font-pixelated hover:bg-amber-500/30 transition-all"
              type="button"
            >
              Upload
            </button>
            {audioFile && (
              <button
                onClick={togglePlay}
                className="flex-1 py-2 px-4 bg-amber-500/20 border border-amber-400/30 rounded 
                         text-amber-400 font-pixelated hover:bg-amber-500/30 transition-all"
                type="button"
              >
                {isPlaying ? "Pause" : "Play"}
              </button>
            )}
          </div>

          {/* Visualization mode selector */}
          {audioFile && (
            <div className="flex gap-2">
              {(["bars", "wave", "circular"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setVisualizerMode(mode)}
                  className={`flex-1 py-2 px-4 border rounded font-pixelated transition-all ${
                    visualizerMode === mode
                      ? "bg-amber-500/40 border-amber-400/60 text-amber-300"
                      : "bg-amber-500/20 border-amber-400/30 text-amber-400 hover:bg-amber-500/30"
                  }`}
                  type="button"
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicVisualizerApp;
