// TokenForge.tsx
'use client';
import React, { useState } from 'react';
import styles from './forge.module.css';

interface ForgedToken {
  id: number;
  address: string;
  timestamp: number;
  power: number;
  rarity: 'Common' | 'Rare' | 'Legendary';
  tier: number;
}

const TokenForge = () => {
  const [energy, setEnergy] = useState(100);
  const [tier, setTier] = useState(1);
  const [forging, setForging] = useState(false);
  const [tokens, setTokens] = useState<ForgedToken[]>([]);

  const generateTokenAddress = () => {
    const chars = '0123456789abcdef';
    const prefix = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    const suffix = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    return `0x${prefix}...${suffix}`;
  };

  const handleForge = () => {
    if (energy < 20) return;
    
    setForging(true);
    setEnergy(prev => Math.max(0, prev - 20));

    setTimeout(() => {
      const rarityRoll = Math.random();
      const rarity: 'Common' | 'Rare' | 'Legendary' = 
        rarityRoll > 0.95 ? 'Legendary' :
        rarityRoll > 0.8 ? 'Rare' : 
        'Common';

      const power = Math.floor(Math.random() * 50) + (tier * 10);

      const newToken: ForgedToken = {
        id: tokens.length + 1,
        address: generateTokenAddress(),
        timestamp: Date.now(),
        power,
        rarity,
        tier
      };

      setTokens(prev => [newToken, ...prev]);
      setForging(false);
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <h1 className={styles.title}>Celestial Token Forge</h1>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2 className="text-xl mb-4">Forge Controls</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span>Energy:</span>
                  <span>{energy}/100</span>
                </div>
                <div className={styles.progressBar}>
                  <div 
                    className={styles.progressFill}
                    style={{ 
                      width: `${energy}%`,
                      backgroundColor: 'rgb(59, 130, 246)'
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="mb-2">Forge Tier: {tier}</div>
                <div className="flex gap-2">
                  {[1, 2, 3].map((level) => (
                    <button
                      key={level}
                      onClick={() => setTier(level)}
                      className={`${styles.tierButton} ${tier === level ? styles.tierButtonActive : ''}`}
                      disabled={forging}
                    >
                      Tier {level}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setEnergy(100)}
                  disabled={energy === 100 || forging}
                  className={styles.actionButton}
                >
                  Recharge
                </button>
                <button
                  onClick={handleForge}
                  disabled={energy < 20 || forging}
                  className={styles.forgeButton}
                >
                  {forging ? 'Forging...' : 'Forge Token'}
                </button>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <h2 className="text-xl mb-4">Latest Token</h2>
            {tokens[0] ? (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-blue-300">ID:</span>
                  <span>#{tokens[0].id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-300">Rarity:</span>
                  <span className={`
                    ${tokens[0].rarity === 'Legendary' ? 'text-yellow-400' :
                      tokens[0].rarity === 'Rare' ? 'text-blue-400' : 'text-gray-400'}
                  `}>
                    {tokens[0].rarity}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-300">Power:</span>
                  <span>{tokens[0].power}</span>
                </div>
                <div>
                  <div className="text-blue-300 text-sm mb-1">Contract:</div>
                  <div className="font-mono text-xs break-all bg-blue-900/30 p-2 rounded">
                    {tokens[0].address}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400">No tokens forged yet</div>
            )}
          </div>
        </div>

        <div className={styles.card}>
          <h2 className="text-xl mb-4">Forged Tokens</h2>
          <div className={styles.tokenGrid}>
            {tokens.map((token) => (
              <div key={token.id} className={styles.tokenCard}>
                <div className="flex justify-between items-center">
                  <span className="font-mono text-sm">#{token.id}</span>
                  <span className={`
                    text-sm
                    ${token.rarity === 'Legendary' ? 'text-yellow-400' :
                      token.rarity === 'Rare' ? 'text-blue-400' : 'text-gray-400'}
                  `}>
                    {token.rarity}
                  </span>
                </div>
                <div className="text-center my-2">
                  <div className="text-2xl mb-1">⚒️</div>
                  <div className="text-sm">Power: {token.power}</div>
                </div>
                <div className="text-xs text-gray-400">
                  Tier {token.tier}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenForge;