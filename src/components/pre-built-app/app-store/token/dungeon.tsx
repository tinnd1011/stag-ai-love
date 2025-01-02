'use client';
import React, { useState, useEffect } from 'react';
import styles from './dungeon.module.css';

interface DungeonToken {
  id: number;
  address: string;
  name: string;
  rarity: 'Common' | 'Rare' | 'Legendary';
  power: number;
  attributes: {
    strength: number;
    magic: number;
    luck: number;
  };
  mintedAt: number;
  foundIn: string;
}

interface DungeonRoom {
  id: number;
  name: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  minPower: number;
  rewards: {
    tokens: number;
    experience: number;
  };
  enemies: string[];
  background: string;
}

const dungeonRooms: DungeonRoom[] = [
  {
    id: 0,
    name: "Mystic Gateway",
    description: "The entrance to the dungeon, filled with ancient runes and magical barriers.",
    difficulty: "Easy",
    minPower: 0,
    rewards: { tokens: 5, experience: 10 },
    enemies: ["🦇", "🐀"],
    background: "linear-gradient(to bottom, #2D3748, #1A202C)"
  },
  {
    id: 1,
    name: "Crystal Cavern",
    description: "A sparkling chamber where magical crystals grow from the walls.",
    difficulty: "Medium",
    minPower: 20,
    rewards: { tokens: 10, experience: 25 },
    enemies: ["🦎", "🕷️"],
    background: "linear-gradient(to bottom, #2B6CB0, #1A365D)"
  },
  {
    id: 2,
    name: "Dragon's Vault",
    description: "The final chamber, where ancient treasures are guarded by powerful forces.",
    difficulty: "Hard",
    minPower: 50,
    rewards: { tokens: 20, experience: 50 },
    enemies: ["🐉", "⚔️"],
    background: "linear-gradient(to bottom, #9B2C2C, #63171B)"
  }
];

const generateTokenAddress = () => {
  const chars = '0123456789abcdef';
  const prefix = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  const suffix = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `0x${prefix}...${suffix}`;
};

const DungeonQuest = () => {
  const [currentRoom, setCurrentRoom] = useState(0);
  const [playerHealth, setPlayerHealth] = useState(100);
  const [playerPower, setPlayerPower] = useState(10);
  const [experience, setExperience] = useState(0);
  const [tokens, setTokens] = useState<DungeonToken[]>([]);
  const [selectedToken, setSelectedToken] = useState<DungeonToken | null>(null);
  const [isExploring, setIsExploring] = useState(false);
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [isBattling, setIsBattling] = useState(false);

  useEffect(() => {
    if (playerHealth <= 0) {
      setCurrentRoom(0);
      setPlayerHealth(100);
      setBattleLog(prev => [...prev, "You have been defeated! Returning to the entrance..."]);
    }
  }, [playerHealth]);

  const getRank = () => {
    if (experience >= 100) return 'Dragon Slayer';
    if (experience >= 50) return 'Veteran Explorer';
    return 'Novice Adventurer';
  };

  const generateToken = (roomName: string): DungeonToken => {
    const rarityRoll = Math.random();
    const rarity: 'Common' | 'Rare' | 'Legendary' = 
      rarityRoll > 0.95 ? 'Legendary' :
      rarityRoll > 0.8 ? 'Rare' : 
      'Common';

    const power = Math.floor(Math.random() * 50) + (
      rarity === 'Legendary' ? 50 :
      rarity === 'Rare' ? 25 : 
      10
    );

    return {
      id: tokens.length + 1,
      address: generateTokenAddress(),
      name: `${roomName} Token #${tokens.length + 1}`,
      rarity,
      power,
      attributes: {
        strength: Math.floor(Math.random() * 100),
        magic: Math.floor(Math.random() * 100),
        luck: Math.floor(Math.random() * 100)
      },
      mintedAt: Date.now(),
      foundIn: roomName
    };
  };

  const exploreRoom = () => {
    const room = dungeonRooms[currentRoom];
    if (playerPower < room.minPower) {
      setBattleLog(prev => [...prev, `You need at least ${room.minPower} power to explore this room!`]);
      return;
    }

    setIsExploring(true);
    setIsBattling(true);
    setBattleLog(prev => [...prev, `Exploring ${room.name}...`]);

    const battleSimulation = setInterval(() => {
      setPlayerHealth(prev => {
        const damage = Math.floor(Math.random() * 20);
        return Math.max(0, prev - damage);
      });
      setBattleLog(prev => [...prev, `You take ${Math.floor(Math.random() * 20)} damage from ${room.enemies[Math.floor(Math.random() * room.enemies.length)]}!`]);
    }, 1000);

    setTimeout(() => {
      clearInterval(battleSimulation);
      setIsBattling(false);
      
      if (playerHealth > 0) {
        const newToken = generateToken(room.name);
        setTokens(prev => [newToken, ...prev]);
        setExperience(prev => prev + room.rewards.experience);
        setPlayerPower(prev => prev + Math.floor(room.rewards.experience / 10));
        setBattleLog(prev => [
          ...prev,
          `Victory! You found a ${newToken.rarity} token!`,
          `Gained ${room.rewards.experience} experience!`
        ]);
      }
      
      setIsExploring(false);
    }, 5000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <h1 className={styles.title}>Token Hunter&apos;s Quest</h1>
        
        <div className={styles.grid}>
          <div className={styles.card}>
            <h2 className="text-xl mb-4">Dungeon Navigation</h2>
            <div 
              className={styles.roomViewer}
              style={{ background: dungeonRooms[currentRoom].background }}
            >
              <div className={styles.roomContent}>
                <h3 className="text-xl mb-2">{dungeonRooms[currentRoom].name}</h3>
                <p className="text-sm mb-4">{dungeonRooms[currentRoom].description}</p>
                <div className="flex items-center gap-2 mb-2">
                  {dungeonRooms[currentRoom].enemies.map((enemy, index) => (
                    <span key={index} className="text-2xl">{enemy}</span>
                  ))}
                </div>
                <div className="text-sm">
                  <p>Difficulty: <span className={`text-${dungeonRooms[currentRoom].difficulty.toLowerCase()}`}>
                    {dungeonRooms[currentRoom].difficulty}
                  </span></p>
                  <p>Required Power: {dungeonRooms[currentRoom].minPower}</p>
                </div>
              </div>
              
              <div className={styles.navigationButtons}>
                {currentRoom > 0 && (
                  <button
                    onClick={() => setCurrentRoom(prev => prev - 1)}
                    className={styles.navButton}
                    disabled={isExploring}
                  >
                    ⬅️ Previous Room
                  </button>
                )}
                {currentRoom < dungeonRooms.length - 1 && (
                  <button
                    onClick={() => setCurrentRoom(prev => prev + 1)}
                    className={styles.navButton}
                    disabled={isExploring}
                  >
                    Next Room ➡️
                  </button>
                )}
              </div>
            </div>
          </div>
          
          <div className={styles.card}>
            <h2 className="text-xl mb-4">Adventurer Status</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span>Health:</span>
                  <span>{playerHealth}/100</span>
                </div>
                <div className={styles.progressBar}>
                  <div 
                    className={styles.progressFill}
                    style={{ 
                      width: `${playerHealth}%`,
                      backgroundColor: `rgb(${Math.floor(255 * (1 - playerHealth/100))}, ${Math.floor(255 * (playerHealth/100))}, 0)`
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Power:</span>
                  <span>{playerPower}</span>
                </div>
                <div className={styles.progressBar}>
                  <div 
                    className={styles.progressFill}
                    style={{ 
                      width: `${Math.min(playerPower, 100)}%`,
                      backgroundColor: 'rgb(59, 130, 246)'
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Experience:</span>
                  <span>{experience}/100</span>
                </div>
                <div className={styles.progressBar}>
                  <div 
                    className={styles.progressFill}
                    style={{ 
                      width: `${Math.min(experience, 100)}%`,
                      backgroundColor: 'rgb(234, 179, 8)'
                    }}
                  />
                </div>
              </div>
              <p>Rank: {getRank()}</p>
              <p>Tokens Found: {tokens.length}</p>
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2 className="text-xl mb-4">Battle Log</h2>
            <div className={styles.battleLog}>
              {battleLog.map((log, index) => (
                <p 
                  key={index}
                  className={`text-sm ${index === battleLog.length - 1 ? 'text-yellow-400' : 'text-gray-400'}`}
                >
                  {log}
                </p>
              ))}
            </div>
            <button
              onClick={exploreRoom}
              disabled={isExploring || playerHealth <= 0}
              className={styles.exploreButton}
            >
              {isExploring ? 'Exploring...' : 'Explore Room'}
            </button>
          </div>

          <div className={styles.card}>
            <h2 className="text-xl mb-4">Latest Token</h2>
            {tokens[0] ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-amber-300">Name:</span>
                  <span>{tokens[0].name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-amber-300">Rarity:</span>
                  <span className={`
                    ${tokens[0].rarity === 'Legendary' ? 'text-yellow-400' :
                      tokens[0].rarity === 'Rare' ? 'text-blue-400' : 'text-gray-400'}
                  `}>
                    {tokens[0].rarity}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-amber-300">Power:</span>
                  <span>{tokens[0].power}</span>
                </div>
                <div className="mt-2">
                  <div className="text-amber-300 text-sm mb-1">Contract:</div>
                  <div className="font-mono text-xs break-all bg-amber-900/30 p-2 rounded">
                    {tokens[0].address}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400">No tokens found yet</div>
            )}
          </div>
        </div>

        <div className={styles.card}>
          <h2 className="text-xl mb-4">Token Collection</h2>
          <div className={styles.tokenGrid}>
            {tokens.map((token) => (
              <div
                key={token.id}
                onClick={() => setSelectedToken(token)}
                className={`${styles.tokenCard} ${selectedToken === token ? styles.tokenCardSelected : ''}`}
              >
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
                  <span className="text-2xl">
                    {token.rarity === 'Legendary' ? '🏆' :
                     token.rarity === 'Rare' ? '💎' : '⚔️'}
                  </span>
                </div>
                <div className="text-xs text-gray-400">
                  Found in: {token.foundIn}
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedToken && (
          <div className={`${styles.card} mt-4`}>
            <div className="flex justify-between items-start">
              <h2 className="text-xl">{selectedToken.name}</h2>
              <button
                onClick={() => setSelectedToken(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-amber-300 text-sm">Token ID</div>
                  <div className="font-mono">#{selectedToken.id}</div>
                </div>
                <div>
                  <div className="text-amber-300 text-sm">Rarity</div>
                  <div className={`
                    ${selectedToken.rarity === 'Legendary' ? 'text-yellow-400' :
                      selectedToken.rarity === 'Rare' ? 'text-blue-400' : 'text-gray-400'}
                      `}>
                        {selectedToken.rarity}
                      </div>
                    </div>
                    <div>
                      <div className="text-amber-300 text-sm">Power Level</div>
                      <div>{selectedToken.power}</div>
                    </div>
                    <div>
                      <div className="text-amber-300 text-sm">Found In</div>
                      <div>{selectedToken.foundIn}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-amber-300 text-sm">Attributes</div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-xs text-gray-400">Strength</div>
                        <div className={styles.progressBar}>
                          <div 
                            className={styles.progressFill}
                            style={{ 
                              width: `${selectedToken.attributes.strength}%`,
                              backgroundColor: 'rgb(239, 68, 68)'
                            }}
                          />
                        </div>
                        <div className="text-right text-xs">{selectedToken.attributes.strength}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400">Magic</div>
                        <div className={styles.progressBar}>
                          <div 
                            className={styles.progressFill}
                            style={{ 
                              width: `${selectedToken.attributes.magic}%`,
                              backgroundColor: 'rgb(147, 51, 234)'
                            }}
                          />
                        </div>
                        <div className="text-right text-xs">{selectedToken.attributes.magic}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400">Luck</div>
                        <div className={styles.progressBar}>
                          <div 
                            className={styles.progressFill}
                            style={{ 
                              width: `${selectedToken.attributes.luck}%`,
                              backgroundColor: 'rgb(234, 179, 8)'
                            }}
                          />
                        </div>
                        <div className="text-right text-xs">{selectedToken.attributes.luck}</div>
                      </div>
                    </div>
                  </div>
    
                  <div>
                    <div className="text-amber-300 text-sm">Minted</div>
                    <div className="text-sm">
                      {new Date(selectedToken.mintedAt).toLocaleString()}
                    </div>
                  </div>
    
                  <div>
                    <div className="text-amber-300 text-sm">Contract Address</div>
                    <div className="font-mono text-xs break-all bg-amber-900/30 p-2 rounded mt-1">
                      {selectedToken.address}
                    </div>
                  </div>
                </div>
              </div>
            )}
    
            {isBattling && (
              <div className={`${styles.card} mt-4 ${styles.fadeIn}`}>
                <h2 className="text-xl mb-4">Active Battle</h2>
                <div className="flex justify-between items-center">
                  <div className="space-y-2">
                    <div className="text-sm">Current Enemy</div>
                    <div className="text-2xl">
                      {dungeonRooms[currentRoom].enemies[
                        Math.floor(Math.random() * dungeonRooms[currentRoom].enemies.length)
                      ]}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm">Room Difficulty</div>
                    <div className={`text-${dungeonRooms[currentRoom].difficulty.toLowerCase()}`}>
                      {dungeonRooms[currentRoom].difficulty}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm">Potential Rewards</div>
                    <div className="text-yellow-400">
                      +{dungeonRooms[currentRoom].rewards.experience} XP
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    };
    
    export default DungeonQuest;