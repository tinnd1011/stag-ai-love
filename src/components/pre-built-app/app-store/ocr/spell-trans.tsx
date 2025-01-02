'use client';

import React, { useState } from 'react';
import { MOCK_TRANSLATIONS, generateSpellRecipe } from './mock-spell';

interface SpellTranslatorProps {
  className?: string;
}

interface TranslationResult {
  translatedText: string;
  sourceLang: string;
  targetLang: string;
  manaUsed: number;
  timestamp: number;
  recipe: string;
}

const AVAILABLE_LANGUAGES = Object.entries(MOCK_TRANSLATIONS).map(([code, lang]) => ({
  code,
  name: lang.name
}));

const SpellTranslatorApp: React.FC<SpellTranslatorProps> = ({ className = '' }) => {
  const [inputText, setInputText] = useState<string>('');
  const [targetLang, setTargetLang] = useState<string>('es');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationResult, setTranslationResult] = useState<TranslationResult | null>(null);
  const [error, setError] = useState<string>('');
  const [manaVolume, setManaVolume] = useState<number>(Math.floor(Math.random() * 100000));

  const mockTranslate = (text: string, targetLang: string): string => {
    // Convert input to lowercase and split into words
    const words = text.toLowerCase().split(/\s+/);
    
    // Translate each word if it exists in our mock data, otherwise keep original
    const translatedWords = words.map(word => {
      const translations = MOCK_TRANSLATIONS[targetLang as keyof typeof MOCK_TRANSLATIONS]?.translations;
      return translations?.[word as keyof typeof translations] || word;
    });

    return translatedWords.join(' ');
  };

  const performTranslation = async () => {
    if (!inputText.trim()) {
      setError('No spell recipe to translate!');
      return;
    }

    setIsTranslating(true);
    setError('');

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      const translatedText = mockTranslate(inputText, targetLang);
      const recipe = generateSpellRecipe(translatedText);
      const manaUsed = Math.floor(Math.random() * 1000);

      setTranslationResult({
        translatedText,
        recipe,
        sourceLang: 'en',
        targetLang,
        manaUsed,
        timestamp: Date.now()
      });

      setManaVolume(prev => prev + manaUsed);
    } catch (err) {
      console.log(err)
      setError('Failed to translate spell recipe');
    } finally {
      setIsTranslating(false);
    }
  };

  const copyToClipboard = () => {
    if (translationResult?.translatedText) {
      const textToCopy = `${translationResult.translatedText}\n\n${translationResult.recipe}`;
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          const originalText = translationResult.translatedText;
          const originalRecipe = translationResult.recipe;
          setTranslationResult({
            ...translationResult,
            translatedText: 'Spell recipe copied to grimoire!',
            recipe: 'The ancient knowledge is yours now...'
          });
          setTimeout(() => {
            setTranslationResult({
              ...translationResult,
              translatedText: originalText,
              recipe: originalRecipe
            });
          }, 1000);
        })
        .catch(() => setError('Failed to copy spell recipe'));
    }
  };

  return (
    <div className={`min-w-[320px] min-h-[400px] bg-[#1a1a2e] border-2 border-[#6b21a8]/30 rounded-lg overflow-hidden shadow-lg ${className}`}>
      <div className="p-4 bg-[#1a1a2e] border-b border-[#6b21a8]/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-[#ffd700] font-mono text-lg">Spell Recipe Translator</h2>
          <span className="text-[#a855f7] text-xs">
            Last Enchanted: {new Date().toLocaleTimeString()}
          </span>
        </div>
        <div className="w-3 h-3 rounded-full bg-[#a855f7] animate-pulse shadow-[0_0_10px_#a855f7]" />
      </div>
      
      <div className="p-4 space-y-4">
        {/* Input area */}
        <div className="space-y-2">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter your spell words (e.g., healing fireball shield)..."
            className="w-full h-32 bg-[#1a1a2e] border border-[#6b21a8]/20 rounded p-3 
                     text-[#e2e8f0] font-mono placeholder-[#a855f7]/50 focus:outline-none 
                     focus:border-[#a855f7]/50 resize-none"
          />
          
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="w-full bg-[#1a1a2e] border border-[#6b21a8]/20 rounded p-2 
                     text-[#ffd700] font-mono focus:outline-none focus:border-[#a855f7]/50"
          >
            {AVAILABLE_LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <div className="text-[#ffd700] font-mono text-sm flex items-center gap-2">
          <span>Mana Volume:</span>
          <span>{manaVolume.toLocaleString()}</span>
          <span className="text-[#a855f7]">⚡</span>
        </div>

        {error && (
          <div className="text-red-400 text-sm text-center font-mono">
            {error}
          </div>
        )}

        {translationResult && (
          <div className="bg-[#1a1a2e] rounded border border-[#6b21a8]/20 p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[#a855f7] text-sm font-mono">
                Mana Used: {translationResult.manaUsed.toLocaleString()}
              </span>
              <button
                onClick={copyToClipboard}
                className="text-[#ffd700] hover:text-[#a855f7] transition-colors font-mono"
                type="button"
              >
                Copy to Grimoire
              </button>
            </div>
            <div className="text-[#e2e8f0] font-mono text-sm whitespace-pre-line">
              <div className="mb-2">
                <span className="text-[#a855f7]">Translation: </span>
                {translationResult.translatedText}
              </div>
              <div className="mt-4 pt-4 border-t border-[#6b21a8]/20">
                <span className="text-[#a855f7]">Magical Recipe: </span>
                {translationResult.recipe}
              </div>
            </div>
          </div>
        )}

        <button
          onClick={performTranslation}
          disabled={isTranslating || !inputText.trim()}
          className={`w-full py-2 px-4 bg-[#6b21a8]/20 border border-[#a855f7]/30 rounded 
                   text-[#ffd700] font-mono transition-all
                   ${isTranslating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#6b21a8]/30'}`}
          type="button"
        >
          {isTranslating ? 'Channeling Magic...' : 'Translate Spell Recipe'}
        </button>
      </div>

      {isTranslating && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[#6b21a8]/5 animate-pulse" />
          <div className="absolute top-0 left-0 w-full h-0.5 bg-[#a855f7] animate-[scan_2s_linear_infinite]" />
        </div>
      )}
    </div>
  );
};

export default SpellTranslatorApp;