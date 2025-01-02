'use client';

import React, { useState } from 'react';

interface NewsArticle {
  id: string;
  title: string;
  content: string;
  category: NewsCategory;
  icon: string;
  author: string;
  timestamp: string;
  priority: 'normal' | 'urgent' | 'royal-decree';
  likes: number;
}

type NewsCategory = 'royal' | 'magic' | 'quest' | 'market' | 'creature';

interface CategoryMetadata {
  name: string;
  icon: string;
  color: string;
}

const CATEGORIES: Record<NewsCategory, CategoryMetadata> = {
  royal: {
    name: "Royal Affairs",
    icon: "👑",
    color: "from-yellow-500/20 to-yellow-900/20"
  },
  magic: {
    name: "Arcane Updates",
    icon: "🔮",
    color: "from-purple-500/20 to-purple-900/20"
  },
  quest: {
    name: "Quest Board",
    icon: "⚔️",
    color: "from-red-500/20 to-red-900/20"
  },
  market: {
    name: "Market Watch",
    icon: "⚖️",
    color: "from-green-500/20 to-green-900/20"
  },
  creature: {
    name: "Creature Sightings",
    icon: "🐲",
    color: "from-blue-500/20 to-blue-900/20"
  }
};

const MOCK_NEWS: NewsArticle[] = [
  {
    id: '1',
    title: "Royal Dragon Tamer Position Now Open",
    content: "The Royal Court seeks an experienced dragon tamer following an... unfortunate incident with the previous one. Fireproof equipment provided.",
    category: 'royal',
    icon: "🐉",
    author: "Royal Herald",
    timestamp: "2 hours ago",
    priority: 'royal-decree',
    likes: 245
  },
  {
    id: '2',
    title: "Enchanted Forest Trading Prices Soar",
    content: "Unicorn horn prices have doubled following recent shortage. Market experts blame increased demand from potion makers.",
    category: 'market',
    icon: "📈",
    author: "Market Sage",
    timestamp: "4 hours ago",
    priority: 'normal',
    likes: 122
  },
  {
    id: '3',
    title: "New Spell Discovery: Turn Lead to... Copper",
    content: "Apprentice accidentally discovers new transmutation spell. Senior xetra remain unimpressed.",
    category: 'magic',
    icon: "⚗️",
    author: "Arcane Times",
    timestamp: "1 day ago",
    priority: 'normal',
    likes: 89
  },
  {
    id: '4',
    title: "URGENT: Dragon Spotted Near Capital",
    content: "Large red dragon seen circling the capital. Citizens advised to keep valuable livestock indoors and avoid wearing shiny objects.",
    category: 'creature',
    icon: "🚨",
    author: "City Watch",
    timestamp: "1 hour ago",
    priority: 'urgent',
    likes: 567
  },
  {
    id: '5',
    title: "Hero Needed: Ancient Tomb Discovered",
    content: "Adventurers sought for exploration of newly discovered tomb. Previous expedition returned screaming something about 'too many teeth.'",
    category: 'quest',
    icon: "⚔️",
    author: "Adventurers' Guild",
    timestamp: "12 hours ago",
    priority: 'normal',
    likes: 334
  }
];

const RealmHerald: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [likedArticles, setLikedArticles] = useState<Set<string>>(new Set());

  const filteredNews = MOCK_NEWS.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleLike = (articleId: string) => {
    const newLiked = new Set(likedArticles);
    if (newLiked.has(articleId)) {
      newLiked.delete(articleId);
    } else {
      newLiked.add(articleId);
    }
    setLikedArticles(newLiked);
  };

  return (
    <div className="w-full max-w-[700px]  bg-slate-900 text-white p-6 rounded-lg relative">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 animate-pulse rounded-lg" />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2">
            📜 The Realm Herald 📜
          </h1>
          <p className="text-blue-300">News from across the magical kingdoms</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search news..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-800/50 p-3 pl-10 rounded-lg border border-blue-500/30 
                       focus:border-blue-500 outline-none"
            />
            <span className="absolute left-3 top-3.5">🔍</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full transition-all duration-300
                       ${selectedCategory === 'all'
                         ? 'bg-blue-500/30 scale-105'
                         : 'bg-slate-700/50 hover:bg-slate-700'}`}
            >
              📰 All News
            </button>
            {Object.entries(CATEGORIES).map(([key, category]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key as NewsCategory)}
                className={`px-4 py-2 rounded-full transition-all duration-300
                         ${selectedCategory === key
                           ? 'bg-blue-500/30 scale-105'
                           : 'bg-slate-700/50 hover:bg-slate-700'}`}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* News Feed */}
        <div className="space-y-4">
          {filteredNews.map((article) => (
            <div
              key={article.id}
              className={`p-4 rounded-lg transition-all duration-300 hover:scale-[1.02]
                       bg-gradient-to-r ${CATEGORIES[article.category].color}
                       ${article.priority === 'urgent' ? 'border-2 border-red-500 animate-pulse' : ''}
                       ${article.priority === 'royal-decree' ? 'border-2 border-yellow-500' : ''}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{article.icon}</span>
                    <h3 className="text-lg font-bold">{article.title}</h3>
                  </div>
                  <div className="text-sm text-gray-300 mt-1">
                    By {article.author} • {article.timestamp}
                  </div>
                </div>
                <button
                  onClick={() => toggleLike(article.id)}
                  className="flex items-center space-x-1 px-2 py-1 rounded
                           bg-slate-700/50 hover:bg-slate-700 transition-colors"
                >
                  <span>{likedArticles.has(article.id) ? '❤️' : '🤍'}</span>
                  <span>{article.likes + (likedArticles.has(article.id) ? 1 : 0)}</span>
                </button>
              </div>
              <p className="text-gray-200">{article.content}</p>
              <div className="mt-2 flex items-center space-x-2">
                <span className="text-sm bg-slate-700/50 px-2 py-1 rounded">
                  {CATEGORIES[article.category].icon} {CATEGORIES[article.category].name}
                </span>
                {article.priority === 'urgent' && (
                  <span className="text-sm bg-red-500/20 px-2 py-1 rounded text-red-300">
                    🚨 Urgent
                  </span>
                )}
                {article.priority === 'royal-decree' && (
                  <span className="text-sm bg-yellow-500/20 px-2 py-1 rounded text-yellow-300">
                    👑 Royal Decree
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RealmHerald;