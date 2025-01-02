"use client";
import React, { useState, useEffect } from "react";
import styles from "./lab.module.css";

interface Ingredient {
  emoji: string;
  name: string;
  rarity: "common" | "rare" | "legendary";
  manaRequired: number;
}

interface TokenInfo {
  address: string;
  tokenId: number;
  rarity: "Common" | "Rare" | "Legendary";
  potency: number;
  timestamp: number;
  ingredients: string[];
}

const ingredients: Ingredient[] = [
  { emoji: "🧪", name: "Ethereal Essence", rarity: "common", manaRequired: 10 },
  { emoji: "⚗️", name: "Crystal Catalyst", rarity: "rare", manaRequired: 20 },
  { emoji: "🔮", name: "Mystic Orb", rarity: "legendary", manaRequired: 30 },
  { emoji: "💎", name: "Genesis Gem", rarity: "rare", manaRequired: 25 },
  { emoji: "🌟", name: "Stellar Shard", rarity: "legendary", manaRequired: 35 },
  { emoji: "🌙", name: "Lunar Fragment", rarity: "common", manaRequired: 15 },
];

const generateTokenAddress = () => {
  const chars = "0123456789abcdef";
  const prefix = Array.from(
    { length: 4 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
  const suffix = Array.from(
    { length: 4 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
  return `0x${prefix}...${suffix}`;
};

const generateTokenId = () => {
  return Math.floor(Math.random() * 1000000);
};

const calculatePotency = (ingredients: string[]) => {
  const potencyMap: { [key: string]: number } = {
    "🧪": 10,
    "⚗️": 20,
    "🔮": 30,
    "💎": 25,
    "🌟": 35,
    "🌙": 15,
  };
  return ingredients.reduce((acc, curr) => acc + (potencyMap[curr] || 0), 0);
};

const AlchemyLab = () => {
  const [mana, setMana] = useState(100);
  const [tokensBrewedCount, setTokensBrewedCount] = useState(0);
  const [experience, setExperience] = useState(0);
  const [combinedIngredients, setCombinedIngredients] = useState<string[]>([]);
  const [brewing, setBrewing] = useState(false);
  const [brewedTokens, setBrewedTokens] = useState<TokenInfo[]>([]);
  const [selectedToken, setSelectedToken] = useState<TokenInfo | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (brewing) {
      interval = setInterval(() => {
        setMana((prev) => Math.max(0, prev - 5));
        if (mana <= 0) {
          setBrewing(false);
          setCombinedIngredients([]);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [brewing, mana]);

  const handleIngredientClick = (ingredient: Ingredient) => {
    if (combinedIngredients.length < 3 && mana >= ingredient.manaRequired) {
      setCombinedIngredients([...combinedIngredients, ingredient.emoji]);
      setMana((prev) => prev - ingredient.manaRequired);
    }
  };

  const startBrewing = () => {
    if (combinedIngredients.length > 0) {
      setBrewing(true);
      setTimeout(() => {
        const newToken: TokenInfo = {
          address: generateTokenAddress(),
          tokenId: generateTokenId(),
          rarity:
            combinedIngredients.length === 3
              ? "Legendary"
              : combinedIngredients.length === 2
              ? "Rare"
              : "Common",
          potency: calculatePotency(combinedIngredients),
          timestamp: Date.now(),
          ingredients: [...combinedIngredients],
        };

        setBrewedTokens((prev) => [newToken, ...prev]);
        setTokensBrewedCount((prev) => prev + 1);
        setExperience((prev) => prev + combinedIngredients.length * 10);
        setCombinedIngredients([]);
        setBrewing(false);
      }, 3000);
    }
  };

  const getCurrentRank = () => {
    if (experience >= 100) return "Archmage";
    if (experience >= 50) return "Wizard";
    return "Apprentice";
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <h1 className={styles.title}>Mystic Token Brewery</h1>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2 className="text-xl mb-4">Ingredient Selection</h2>
            <div className={styles.ingredientGrid}>
              {ingredients.map((ingredient, i) => (
                <button
                  key={i}
                  onClick={() => handleIngredientClick(ingredient)}
                  disabled={mana < ingredient.manaRequired}
                  className={styles.ingredient}
                  style={{
                    borderColor:
                      ingredient.rarity === "legendary"
                        ? "#fbbf24"
                        : ingredient.rarity === "rare"
                        ? "#60a5fa"
                        : "#9ca3af",
                  }}
                >
                  {ingredient.emoji}
                  <span className={styles.ingredientTooltip}>
                    {ingredient.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.card}>
            <h2 className="text-xl mb-4">Xetra AI Status</h2>
            <div className="space-y-2">
              <div>
                <span>Mana: {mana}/100</span>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{
                      width: `${mana}%`,
                      backgroundColor: "rgb(59, 130, 246)",
                    }}
                  />
                </div>
              </div>
              <div>
                <span>Experience: {experience}/100</span>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{
                      width: `${Math.min(experience, 100)}%`,
                      backgroundColor: "rgb(234, 179, 8)",
                    }}
                  />
                </div>
              </div>
              <p>Tokens Brewed: {tokensBrewedCount}</p>
              <p>Rank: {getCurrentRank()}</p>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className={styles.grid}>
            <div className={styles.card}>
              <h2 className="text-xl mb-4">Latest Token</h2>
              {brewedTokens[0] ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-purple-300">Token ID:</span>
                    <span className="font-mono">
                      #{brewedTokens[0].tokenId}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-purple-300">Rarity:</span>
                    <span
                      className={`
                      ${
                        brewedTokens[0].rarity === "Legendary"
                          ? "text-yellow-400"
                          : brewedTokens[0].rarity === "Rare"
                          ? "text-blue-400"
                          : "text-gray-400"
                      }
                    `}
                    >
                      {brewedTokens[0].rarity}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-purple-300">Potency:</span>
                    <span>{brewedTokens[0].potency} MNA</span>
                  </div>
                  <div className="mt-2">
                    <div className="text-purple-300 text-sm mb-1">
                      Contract:
                    </div>
                    <div className="font-mono text-xs break-all bg-purple-900/30 p-2 rounded">
                      {brewedTokens[0].address}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-400">
                  No tokens brewed yet
                </div>
              )}
            </div>

            <div className={styles.card}>
              <h2 className="text-xl mb-4">Brewing Station</h2>
              <div className="relative h-32 bg-purple-900 rounded-lg overflow-hidden">
                {brewing && (
                  <div className={styles.bubbleContainer}>
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div
                        key={i}
                        className={styles.bubble}
                        style={{
                          left: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 2}s`,
                        }}
                      />
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-center h-full">
                  {combinedIngredients.map((emoji, i) => (
                    <span key={i} className="text-4xl mx-2">
                      {emoji}
                    </span>
                  ))}
                </div>
              </div>
              <div className={styles.buttonContainer}>
                <button
                  onClick={() => setCombinedIngredients([])}
                  className={`${styles.button} ${styles.buttonClear}`}
                  disabled={combinedIngredients.length === 0}
                >
                  Clear
                </button>
                <button
                  onClick={() => setMana(100)}
                  className={`${styles.button} ${styles.buttonMana}`}
                  disabled={mana === 100}
                >
                  Restore Mana
                </button>
                <button
                  onClick={startBrewing}
                  disabled={brewing || combinedIngredients.length === 0}
                  className={`${styles.button} ${styles.buttonBrew}`}
                >
                  {brewing ? "Brewing..." : "Start Brewing"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.card} mt-4`}>
          <h2 className="text-xl mb-4">Token History</h2>
          <div className="max-h-48 overflow-y-auto magical-scroll  space-y-2">
            {brewedTokens.map((token) => (
              <div
                key={token.address}
                onClick={() => setSelectedToken(token)}
                className={`
                  p-2 rounded cursor-pointer transition-colors
                  ${
                    selectedToken === token
                      ? "bg-purple-700"
                      : "bg-purple-900/30 hover:bg-purple-800/30"
                  }
                `}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm">#{token.tokenId}</span>
                    <span
                      className={`
                      text-sm
                      ${
                        token.rarity === "Legendary"
                          ? "text-yellow-400"
                          : token.rarity === "Rare"
                          ? "text-blue-400"
                          : "text-gray-400"
                      }
                    `}
                    >
                      {token.rarity}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {token.ingredients.map((emoji, i) => (
                      <span key={i} className="text-sm">
                        {emoji}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {new Date(token.timestamp).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedToken && (
          <div className={`${styles.card} mt-4`}>
            <div className="flex justify-between items-start">
              <h2 className="text-xl">Token Details</h2>
              <button
                onClick={() => setSelectedToken(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="mt-4 space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-purple-300 text-sm">Token ID</div>
                  <div className="font-mono">#{selectedToken.tokenId}</div>
                </div>
                <div>
                  <div className="text-purple-300 text-sm">Rarity</div>
                  <div
                    className={`
                    ${
                      selectedToken.rarity === "Legendary"
                        ? "text-yellow-400"
                        : selectedToken.rarity === "Rare"
                        ? "text-blue-400"
                        : "text-gray-400"
                    }
                  `}
                  >
                    {selectedToken.rarity}
                  </div>
                </div>
                <div>
                  <div className="text-purple-300 text-sm">Potency</div>
                  <div>{selectedToken.potency} MNA</div>
                </div>
                <div>
                  <div className="text-purple-300 text-sm">Minted</div>
                  <div className="text-sm">
                    {new Date(selectedToken.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>
              <div>
                <div className="text-purple-300 text-sm">Ingredients</div>
                <div className="flex gap-2 mt-1">
                  {selectedToken.ingredients.map((emoji, i) => (
                    <span key={i} className="text-2xl">
                      {emoji}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-purple-300 text-sm">Contract Address</div>
                <div className="font-mono text-xs break-all bg-purple-900/30 p-2 rounded mt-1">
                  {selectedToken.address}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlchemyLab;
