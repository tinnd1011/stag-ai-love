// MagicMarket.tsx
'use client';
import React, { useState, useEffect } from 'react';
import styles from './market.module.css';

interface MagicalItem {
  id: number;
  name: string;
  description: string;
  emoji: string;
  price: number;
  rarity: 'Common' | 'Rare' | 'Legendary';
  type: 'Spell' | 'Artifact' | 'Potion' | 'Scroll';
  power: number;
  tokenAddress?: string;
  attributes: {
    magic: number;
    durability: number;
    wisdom: number;
  };
}

interface Trade {
  id: number;
  itemId: number;
  price: number;
  timestamp: number;
  seller: string;
  buyer: string;
}

const generateAddress = () => {
  const chars = '0123456789abcdef';
  const prefix = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  const suffix = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `0x${prefix}...${suffix}`;
};

const magicalItems: MagicalItem[] = [
  {
    id: 1,
    name: "Ethereal Codex",
    description: "Ancient tome containing forbidden blockchain spells",
    emoji: "📚",
    price: 150,
    rarity: "Rare",
    type: "Artifact",
    power: 75,
    attributes: { magic: 85, durability: 60, wisdom: 90 }
  },
  {
    id: 2,
    name: "Chronosphere Crystal",
    description: "Manipulates blockchain time signatures",
    emoji: "🔮",
    price: 300,
    rarity: "Legendary",
    type: "Artifact",
    power: 95,
    attributes: { magic: 95, durability: 80, wisdom: 85 }
  },
  {
    id: 3,
    name: "Miner's Blessing",
    description: "Enchanted potion that increases hash rate",
    emoji: "⚗️",
    price: 75,
    rarity: "Common",
    type: "Potion",
    power: 45,
    attributes: { magic: 40, durability: 30, wisdom: 50 }
  },
  {
    id: 4,
    name: "Smart Contract Scroll",
    description: "Automatically executes magical agreements",
    emoji: "📜",
    price: 200,
    rarity: "Rare",
    type: "Scroll",
    power: 80,
    attributes: { magic: 75, durability: 70, wisdom: 85 }
  },
  {
    id: 5,
    name: "Oracle's Eye",
    description: "Predicts token price movements",
    emoji: "👁️",
    price: 250,
    rarity: "Legendary",
    type: "Artifact",
    power: 90,
    attributes: { magic: 90, durability: 85, wisdom: 95 }
  },
  {
    id: 6,
    name: "Gas Reduction Elixir",
    description: "Lowers transaction costs temporarily",
    emoji: "🧪",
    price: 100,
    rarity: "Common",
    type: "Potion",
    power: 50,
    attributes: { magic: 45, durability: 40, wisdom: 55 }
  }
];

const MagicMarket = () => {
  const [balance, setBalance] = useState(1000);
  const [selectedItem, setSelectedItem] = useState<MagicalItem | null>(null);
  const [inventory, setInventory] = useState<MagicalItem[]>([]);
  const [recentTrades, setRecentTrades] = useState<Trade[]>([]);
  const [marketFilter, setMarketFilter] = useState<'all' | 'Spell' | 'Artifact' | 'Potion' | 'Scroll'>('all');
  const [rarityFilter, setRarityFilter] = useState<'all' | 'Common' | 'Rare' | 'Legendary'>('all');
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [isTrading, setIsTrading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handlePurchase = (item: MagicalItem) => {
    if (balance >= item.price) {
      setIsTrading(true);
      // Simulate transaction processing
      setTimeout(() => {
        const newTrade: Trade = {
          id: recentTrades.length + 1,
          itemId: item.id,
          price: item.price,
          timestamp: Date.now(),
          seller: generateAddress(),
          buyer: generateAddress()
        };

        setBalance(prev => prev - item.price);
        setInventory(prev => [...prev, { ...item, tokenAddress: generateAddress() }]);
        setRecentTrades(prev => [newTrade, ...prev]);
        setNotification(`Successfully purchased ${item.name}!`);
        setIsTrading(false);
      }, 2000);
    } else {
      setNotification("Insufficient funds for purchase!");
    }
  };

  const filteredItems = magicalItems.filter(item => {
    if (marketFilter !== 'all' && item.type !== marketFilter) return false;
    if (rarityFilter !== 'all' && item.rarity !== rarityFilter) return false;
    return true;
  });

  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <h1 className={styles.title}>Enchanted Token Emporium</h1>
  
        {notification && (
          <div className={styles.notificationContainer}>
            <div className={`${styles.notification} ${styles.fadeIn}`}>
              {notification}
            </div>
          </div>
        )}
  
        <div className={styles.statsBar}>
          <div className={styles.statItem}>
            <span>Balance:</span>
            <span className="text-yellow-400">{balance} 🪙</span>
          </div>
          <div className={styles.statItem}>
            <span>Items Owned:</span>
            <span>{inventory.length}</span>
          </div>
          <button
            onClick={() => setBalance(prev => prev + 100)}
            className={styles.claimButton}
          >
            Claim Daily Tokens
          </button>
        </div>
  
        <div className={styles.filterBar}>
          <select
            value={marketFilter}
            onChange={(e) => setMarketFilter(e.target.value as never)}
            className={styles.filterSelect}
          >
            <option value="all">All Types</option>
            <option value="Spell">Spells</option>
            <option value="Artifact">Artifacts</option>
            <option value="Potion">Potions</option>
            <option value="Scroll">Scrolls</option>
          </select>
  
          <select
            value={rarityFilter}
            onChange={(e) => setRarityFilter(e.target.value as never)}
            className={styles.filterSelect}
          >
            <option value="all">All Rarities</option>
            <option value="Common">Common</option>
            <option value="Rare">Rare</option>
            <option value="Legendary">Legendary</option>
          </select>
        </div>
  
        <div className={styles.marketGrid}>
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`${styles.itemCard} ${hoveredItem === item.id ? styles.itemCardHovered : ''}`}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => setSelectedItem(item)}
            >
              <div className={`${styles.itemRarity} ${styles[item.rarity.toLowerCase()]}`}>
                {item.rarity}
              </div>
              <div className={styles.itemEmoji}>{item.emoji}</div>
              <h3 className={styles.itemName}>{item.name}</h3>
              <p className={styles.itemType}>{item.type}</p>
              <p className={styles.itemPrice}>{item.price} 🪙</p>
              {hoveredItem === item.id && (
                <div className={`${styles.itemPreview} ${styles.fadeIn}`}>
                  <p className="text-sm">{item.description}</p>
                  <div className="mt-2">
                    <div className="text-xs text-gray-400">Power Level</div>
                    <div className={styles.powerBar}>
                      <div 
                        className={styles.powerFill}
                        style={{ width: `${item.power}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
  
        <div className={styles.grid}>
          <div className={styles.card}>
            <h2 className="text-xl mb-4">Your Inventory</h2>
            <div className={styles.inventoryGrid}>
              {inventory.map((item) => (
                <div key={item.tokenAddress} className={styles.inventoryItem}>
                  <div className={styles.itemEmoji}>{item.emoji}</div>
                  <div className="text-sm">{item.name}</div>
                  <div className={`text-xs ${styles[item.rarity.toLowerCase()]}`}>
                    {item.rarity}
                  </div>
                  <div className="text-xs text-gray-400 truncate">
                    {item.tokenAddress}
                  </div>
                </div>
              ))}
            </div>
          </div>
  
          <div className={styles.card}>
            <h2 className="text-xl mb-4">Recent Trades</h2>
            <div className={styles.tradeList}>
              {recentTrades.map((trade) => (
                <div key={trade.id} className={styles.tradeItem}>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">
                      {magicalItems.find(item => item.id === trade.itemId)?.name}
                    </span>
                    <span className="text-sm text-yellow-400">
                      {trade.price} 🪙
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(trade.timestamp).toLocaleString()}
                  </div>
                  <div className="text-xs">
                    <span className="text-gray-400">From: </span>
                    <span className="font-mono">{trade.seller.slice(0, 6)}...{trade.seller.slice(-4)}</span>
                  </div>
                  <div className="text-xs">
                    <span className="text-gray-400">To: </span>
                    <span className="font-mono">{trade.buyer.slice(0, 6)}...{trade.buyer.slice(-4)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
  
        {selectedItem && (
          <div className={styles.modalContainer}>
            <div className={`${styles.modal} ${styles.fadeIn}`}>
              <div className={styles.modalContent}>

  
                <div className={styles.modalHeader}>
                  <span className={styles.itemEmoji}>{selectedItem.emoji}</span>
                  <h2>{selectedItem.name}</h2>
                  <span className={`${styles.itemRarity} ${styles[selectedItem.rarity.toLowerCase()]}`}>
                    {selectedItem.rarity}

                    <button 
                    className='mx-2 my-1 bg-white text-purple-700 px-2 py-1 rounded-sm'
                    onClick={() => setSelectedItem(null)}>
                      Close
                    </button>
                  </span>

                  
                </div>
  
                <div className={styles.modalBody}>
                  <p className={styles.itemDescription}>{selectedItem.description}</p>
                  
                  <div className={styles.attributeGrid}>
                    <div className={styles.attribute}>
                      <span>Magic</span>
                      <div className={styles.attributeBar}>
                        <div 
                          className={styles.attributeFill}
                          style={{ 
                            width: `${selectedItem.attributes.magic}%`,
                            backgroundColor: 'rgb(147, 51, 234)'
                          }}
                        />
                      </div>
                    </div>
                    <div className={styles.attribute}>
                      <span>Durability</span>
                      <div className={styles.attributeBar}>
                        <div 
                          className={styles.attributeFill}
                          style={{ 
                            width: `${selectedItem.attributes.durability}%`,
                            backgroundColor: 'rgb(59, 130, 246)'
                          }}
                        />
                      </div>
                    </div>
                    <div className={styles.attribute}>
                      <span>Wisdom</span>
                      <div className={styles.attributeBar}>
                        <div 
                          className={styles.attributeFill}
                          style={{ 
                            width: `${selectedItem.attributes.wisdom}%`,
                            backgroundColor: 'rgb(234, 179, 8)'
                          }}
                        />
                      </div>
                    </div>
                  </div>
  
                  <div className={styles.modalActions}>
                    <div className={styles.priceTag}>
                      Price: {selectedItem.price} 🪙
                    </div>
                    <button
                      onClick={() => handlePurchase(selectedItem)}
                      disabled={isTrading || balance < selectedItem.price}
                      className={styles.purchaseButton}
                    >
                      {isTrading ? 'Processing...' : 'Purchase'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MagicMarket;