"use client";

import React, { useState, useRef, useEffect } from "react";

interface VoiceRecorderProps {
  className?: string;
}

interface AudioData {
  blob: Blob;
  url: string;
  duration: number;
}

const VoiceRecorderApp: React.FC<VoiceRecorderProps> = ({ className }) => {
  // State management
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [audioData, setAudioData] = useState<AudioData | null>(null);
  const [recordingTime, setRecordingTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [audioLevel, setAudioLevel] = useState<number>(0);

  // Refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  // Format time for display
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Initialize audio analyzer for visualizing audio levels
  const initializeAudioAnalyzer = async (stream: MediaStream) => {
    try {
      audioContextRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      analyzerRef.current = audioContextRef.current.createAnalyser();
      analyzerRef.current.fftSize = 256;

      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyzerRef.current);

      const updateLevel = () => {
        if (!analyzerRef.current || !isRecording) return;

        const dataArray = new Uint8Array(analyzerRef.current.frequencyBinCount);
        analyzerRef.current.getByteFrequencyData(dataArray);

        // Calculate average level
        const average =
          dataArray.reduce((acc, val) => acc + val, 0) / dataArray.length;
        setAudioLevel(average);

        if (isRecording) {
          requestAnimationFrame(updateLevel);
        }
      };

      updateLevel();
    } catch (err) {
      console.error("Error initializing audio analyzer:", err);
    }
  };

  // Start recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Initialize MediaRecorder
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus",
      });

      // Handle data available event
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      // Handle recording stop
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        const audioUrl = URL.createObjectURL(audioBlob);

        setAudioData({
          blob: audioBlob,
          url: audioUrl,
          duration: recordingTime,
        });

        audioChunksRef.current = [];
        setIsRecording(false);
        setIsPaused(false);
      };

      // Initialize audio analyzer for visualization
      await initializeAudioAnalyzer(stream);

      // Start recording
      mediaRecorderRef.current.start(1000);
      setIsRecording(true);
      setError("");

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error("Error starting recording:", err);
      setError("Error accessing microphone");
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());

      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      if (
        audioContextRef.current &&
        audioContextRef.current.state !== "closed"
      ) {
        audioContextRef.current.close();
      }
    }
  };

  // Toggle recording pause/resume
  const togglePause = () => {
    if (mediaRecorderRef.current) {
      if (isPaused) {
        mediaRecorderRef.current.resume();
      } else {
        mediaRecorderRef.current.pause();
      }
      setIsPaused(!isPaused);
    }
  };

  // Play recorded audio
  const playAudio = () => {
    if (audioData && audioElementRef.current) {
      audioElementRef.current.play();
      setIsPlaying(true);
    }
  };

  // Stop audio playback
  const stopAudio = () => {
    if (audioElementRef.current) {
      audioElementRef.current.pause();
      audioElementRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  // Download recorded audio
  const downloadAudio = () => {
    if (audioData) {
      const a = document.createElement("a");
      a.href = audioData.url;
      a.download = `recording-${new Date().getTime()}.webm`;
      a.click();
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (
        audioContextRef.current &&
        audioContextRef.current.state !== "closed"
      ) {
        audioContextRef.current.close();
      }
      if (audioData) {
        URL.revokeObjectURL(audioData.url);
      }
    };
  }, [audioData]);

  return (
    <div
      className={`min-w-[320px] min-h-[400px] bg-gray-900 border-2 border-green-400/30 rounded-lg overflow-hidden shadow-lg ${className}`}
    >
      {/* Header */}
      <div className="p-4 bg-gray-800/50 border-b border-green-400/20 flex items-center justify-between">
        <h2 className="text-green-400 font-pixelated text-lg">
          Voice Recorder v1.0
        </h2>
        <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_#4ADE80]" />
      </div>

      {/* Main content */}
      <div className="p-4 space-y-4">
        {/* Visualization area */}
        <div className="relative h-48 bg-gray-800/30 rounded border border-green-400/20">
          <div className="absolute inset-0 flex items-center justify-center">
            {isRecording && (
              <div className="flex items-end space-x-1">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 bg-green-400/60 transition-all duration-75"
                    style={{
                      height: `${Math.min(
                        100,
                        (audioLevel / 255) * 100 + Math.random() * 20
                      )}%`,
                    }}
                  />
                ))}
              </div>
            )}
            {!isRecording && !audioData && (
              <div className="text-green-400/60 font-pixelated">
                Ready to Record
              </div>
            )}
            {!isRecording && audioData && !isPlaying && (
              <div className="text-green-400/60 font-pixelated">
                Recording Complete - {formatTime(audioData.duration)}
              </div>
            )}
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500/0 via-green-500/50 to-green-500/0" />
        </div>

        {/* Error message */}
        {error && (
          <div className="text-red-400 text-sm text-center font-pixelated">
            {error}
          </div>
        )}

        {/* Timer */}
        {isRecording && (
          <div className="text-green-400 text-center font-pixelated">
            {formatTime(recordingTime)}
          </div>
        )}

        {/* Audio element for playback */}
        <audio
          ref={audioElementRef}
          src={audioData?.url}
          onEnded={() => setIsPlaying(false)}
          className="hidden"
        />

        {/* Controls */}
        <div className="space-y-3">
          {/* Recording controls */}
          {!audioData && (
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className="w-full py-2 px-4 bg-green-500/20 border border-green-400/30 rounded 
                       text-green-400 font-pixelated hover:bg-green-500/30 transition-all"
              type="button"
            >
              {isRecording ? "Stop Recording" : "Start Recording"}
            </button>
          )}

          {/* Pause/Resume control */}
          {isRecording && mediaRecorderRef.current?.state !== "inactive" && (
            <button
              onClick={togglePause}
              className="w-full py-2 px-4 bg-green-500/20 border border-green-400/30 rounded 
                       text-green-400 font-pixelated hover:bg-green-500/30 transition-all"
              type="button"
            >
              {isPaused ? "Resume" : "Pause"}
            </button>
          )}

          {/* Playback controls */}
          {audioData && !isRecording && (
            <div className="space-y-2">
              <button
                onClick={isPlaying ? stopAudio : playAudio}
                className="w-full py-2 px-4 bg-green-500/20 border border-green-400/30 rounded 
                         text-green-400 font-pixelated hover:bg-green-500/30 transition-all"
                type="button"
              >
                {isPlaying ? "Stop Playback" : "Play Recording"}
              </button>

              <button
                onClick={downloadAudio}
                className="w-full py-2 px-4 bg-green-500/20 border border-green-400/30 rounded 
                         text-green-400 font-pixelated hover:bg-green-500/30 transition-all"
                type="button"
              >
                Download Recording
              </button>

              <button
                onClick={() => {
                  setAudioData(null);
                  setRecordingTime(0);
                }}
                className="w-full py-2 px-4 bg-green-500/20 border border-green-400/30 rounded 
                         text-green-400 font-pixelated hover:bg-green-500/30 transition-all"
                type="button"
              >
                New Recording
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceRecorderApp;
