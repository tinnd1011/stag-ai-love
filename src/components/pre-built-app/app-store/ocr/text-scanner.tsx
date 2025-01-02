"use client";

import React, { useRef, useState } from "react";

interface TextScannerProps {
  className?: string;
}

interface ScanResult {
  text: string;
  confidence: number;
  timestamp: number;
}

interface OCRResponse {
  text: string;
  confidence: number;
}

const SmartScannerApp: React.FC<TextScannerProps> = ({ className = "" }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string>("");
  const [processingPower, setProcessingPower] = useState<number>(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please upload a valid image file");
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setError("");
      setScanResult(null);
      // Simulate processing power calculation
      setProcessingPower(Math.floor(Math.random() * 1000));
    }
  };

  const performOCR = async (file: File): Promise<OCRResponse> => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("https://api.ocr.space/parse/image", {
        method: "POST",
        headers: {
          application: "application/json",
          apikey: process.env.NEXT_PUBLIC_OCR_KEY as string,
        },
        body: formData,
      });

      const ocrText = await response.json();

      if (!response.ok) {
        throw new Error("OCR processing failed");
      }

      return {
        text: ocrText.ParsedResults[0].ParsedText,
        confidence: 99,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Failed to process image");
    }
  };

  const startScanning = async () => {
    if (!imageFile) return;

    setIsScanning(true);
    setError("");

    try {
      const result = await performOCR(imageFile);
      setScanResult({
        text: result.text,
        confidence: result.confidence,
        timestamp: Date.now(),
      });
    } catch (err) {
      console.error(err);
      setError("Error processing image");
    } finally {
      setIsScanning(false);
    }
  };

  const copyToClipboard = () => {
    if (scanResult?.text) {
      navigator.clipboard
        .writeText(scanResult.text)
        .then(() => {
          const originalText = scanResult.text;
          setScanResult({
            ...scanResult,
            text: "Content copied to clipboard!",
          });
          setTimeout(() => {
            setScanResult({
              ...scanResult,
              text: originalText,
            });
          }, 1000);
        })
        .catch(() => setError("Failed to copy text"));
    }
  };

  React.useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <div
      className={`min-w-[320px] min-h-[400px] bg-slate-900 border border-sky-500/30 rounded-lg overflow-hidden shadow-lg ${className}`}
    >
      <div className="p-4 bg-slate-900 border-b border-sky-500/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-sky-400 font-sans text-lg">Smart Scanner Pro</h2>
          <span className="text-slate-400 text-xs">
            Last scan: {new Date().toLocaleTimeString()}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-xs">Status:</span>
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="relative h-48 bg-slate-800 rounded border border-sky-500/20 overflow-hidden">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="absolute inset-0 w-full h-full object-contain"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-slate-400 font-sans flex flex-col items-center gap-2">
                <span className="text-2xl">📄</span>
                <span>Drop document here</span>
              </div>
            </div>
          )}
          {isScanning && (
            <div className="absolute inset-0 bg-sky-500/10">
              <div className="absolute inset-0 border-2 border-sky-500/50 animate-pulse" />
              <div
                className="absolute top-0 left-0 h-0.5 bg-sky-500 animate-[scan_2s_linear_infinite]"
                style={{ width: "100%" }}
              />
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500/0 via-sky-500/50 to-sky-500/0" />
        </div>

        {/* Processing Power Display */}
        <div className="text-slate-300 font-sans text-sm flex items-center gap-2">
          <span>Processing Power:</span>
          <span className="text-sky-400">
            {processingPower.toLocaleString()} TFLOPS
          </span>
          <span className="text-sky-500">⚡</span>
        </div>

        {error && (
          <div className="text-red-400 text-sm text-center font-sans">
            {error}
          </div>
        )}

        {scanResult && (
          <div className="bg-slate-800 rounded border border-sky-500/20 p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sky-400 text-sm font-sans">
                Accuracy: {scanResult.confidence}%
              </span>
              <button
                onClick={copyToClipboard}
                className="text-sky-400 hover:text-sky-300 transition-colors font-sans text-sm"
                type="button"
              >
                Copy Text
              </button>
            </div>
            <div className="text-slate-300 font-sans text-sm whitespace-pre-line">
              {scanResult.text}
            </div>
          </div>
        )}

        <div className="space-y-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />

          <div className="flex gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 py-2 px-4 bg-sky-500/20 border border-sky-500/30 rounded 
                       text-sky-400 font-sans hover:bg-sky-500/30 transition-all"
              type="button"
            >
              Select File
            </button>
            {imageFile && !isScanning && (
              <button
                onClick={startScanning}
                className="flex-1 py-2 px-4 bg-sky-500/20 border border-sky-500/30 rounded 
                         text-sky-400 font-sans hover:bg-sky-500/30 transition-all"
                type="button"
              >
                Process Image
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartScannerApp;
