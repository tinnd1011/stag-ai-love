'use client';

import React, { useState } from 'react';

interface Post {
  id: string;
  author: {
    name: string;
    title: string;
    race: string;
    guild: string;
    icon: string;
  };
  content: string;
  timestamp: string;
  reactions: {
    spell: number;
    potion: number;
    scroll: number;
    crystal: number;
    dragon: number;
  };
  comments: Comment[];
  type: PostType;
  attachments?: string[];
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  icon: string;
}

type PostType = 'spell' | 'announcement' | 'quest' | 'social' | 'trade';

const POST_TYPES: Record<PostType, { icon: string; color: string }> = {
  spell: {
    icon: "✨",
    color: "from-purple-500/20 to-purple-900/20"
  },
  announcement: {
    icon: "📜",
    color: "from-blue-500/20 to-blue-900/20"
  },
  quest: {
    icon: "⚔️",
    color: "from-red-500/20 to-red-900/20"
  },
  social: {
    icon: "🎭",
    color: "from-green-500/20 to-green-900/20"
  },
  trade: {
    icon: "⚖️",
    color: "from-yellow-500/20 to-yellow-900/20"
  }
};

const REACTIONS = {
  spell: { icon: "✨", label: "Enchanting!" },
  potion: { icon: "⚗️", label: "Brewkward!" },
  scroll: { icon: "📜", label: "Scholarly!" },
  crystal: { icon: "💎", label: "Precious!" },
  dragon: { icon: "🐲", label: "Legendary!" }
};

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    author: {
      name: "Merlin the Wise",
      title: "Archmage",
      race: "Human",
      guild: "Crystal Tower",
      icon: "🧙‍♂️"
    },
    content: "Just discovered a new spell that turns vegetables into chocolate! Still working on reversing the effects... #MagicalMishaps",
    timestamp: "2 hours ago",
    reactions: {
      spell: 45,
      potion: 12,
      scroll: 8,
      crystal: 15,
      dragon: 3
    },
    comments: [
      {
        id: 'c1',
        author: "Thorin Runecraft",
        content: "The Dwarven Council would be interested in this research!",
        timestamp: "1 hour ago",
        icon: "⛏️"
      }
    ],
    type: 'spell'
  },
  {
    id: '2',
    author: {
      name: "Sylvana Moonshadow",
      title: "Forest Guardian",
      race: "Elf",
      guild: "Nature's Embrace",
      icon: "🧝‍♀️"
    },
    content: "The ancient tree spirits are hosting a gathering under the new moon. All peaceful beings welcome! Bring your own glowshrooms. 🌳✨",
    timestamp: "3 hours ago",
    reactions: {
      spell: 22,
      potion: 34,
      scroll: 15,
      crystal: 28,
      dragon: 5
    },
    comments: [],
    type: 'social'
  }
];

const RealmNetwork: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [newPost, setNewPost] = useState('');
  const [selectedType, setSelectedType] = useState<PostType | 'all'>('all');
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());

  const handleReaction = (postId: string, reactionType: keyof Post['reactions']) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          reactions: {
            ...post.reactions,
            [reactionType]: post.reactions[reactionType] + 1
          }
        };
      }
      return post;
    }));
  };

  const toggleComments = (postId: string) => {
    const newExpanded = new Set(expandedComments);
    if (newExpanded.has(postId)) {
      newExpanded.delete(postId);
    } else {
      newExpanded.add(postId);
    }
    setExpandedComments(newExpanded);
  };

  return (
    <div className="w-full max-w-[700px]  bg-slate-900 text-white p-6 rounded-lg relative">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 animate-pulse rounded-lg" />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2">
            🌟 Realm Network 🌟
          </h1>
          <p className="text-blue-300">Connect with magical beings across the realms</p>
        </div>

        {/* New Post Creation */}
        <div className="mb-6 bg-slate-800/50 p-4 rounded-lg">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Share your magical thoughts..."
            className="w-full bg-slate-700/50 p-3 rounded-lg border border-blue-500/30 
                     focus:border-blue-500 outline-none min-h-[100px] mb-3"
          />
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              {Object.entries(POST_TYPES).map(([key, { icon }]) => (
                <button
                  key={key}
                  className="p-2 hover:bg-slate-700/50 rounded transition-colors"
                  title={key}
                >
                  {icon}
                </button>
              ))}
            </div>
            <button
              className="px-4 py-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 
                       transition-colors font-semibold"
            >
              ✨ Cast Post
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedType('all')}
            className={`px-4 py-2 rounded-full transition-all duration-300
                     ${selectedType === 'all'
                       ? 'bg-blue-500/30 scale-105'
                       : 'bg-slate-700/50 hover:bg-slate-700'}`}
          >
            🌟 All Posts
          </button>
          {Object.entries(POST_TYPES).map(([key, { icon }]) => (
            <button
              key={key}
              onClick={() => setSelectedType(key as PostType)}
              className={`px-4 py-2 rounded-full transition-all duration-300
                       ${selectedType === key
                         ? 'bg-blue-500/30 scale-105'
                         : 'bg-slate-700/50 hover:bg-slate-700'}`}
            >
              {icon} {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className={`p-4 rounded-lg transition-all duration-300
                       bg-gradient-to-r ${POST_TYPES[post.type].color}
                       border border-slate-700/50 hover:border-slate-500/50`}
            >
              {/* Author Info */}
              <div className="flex items-start space-x-3 mb-4">
                <span className="text-2xl">{post.author.icon}</span>
                <div>
                  <div className="font-semibold">{post.author.name}</div>
                  <div className="text-sm text-gray-300">
                    {post.author.title} • {post.author.race} • {post.author.guild}
                  </div>
                  <div className="text-xs text-gray-400">{post.timestamp}</div>
                </div>
              </div>

              {/* Content */}
              <p className="mb-4 whitespace-pre-wrap">{post.content}</p>

              {/* Reactions */}
              <div className="flex flex-wrap gap-2 mb-4">
                {Object.entries(REACTIONS).map(([key, { icon,  }]) => (
                  <button
                    key={key}
                    onClick={() => handleReaction(post.id, key as keyof Post['reactions'])}
                    className="px-3 py-1 bg-slate-700/50 rounded-full hover:bg-slate-700 
                             transition-colors flex items-center space-x-2"
                  >
                    <span>{icon}</span>
                    <span>{post.reactions[key as keyof Post['reactions']]}</span>
                  </button>
                ))}
              </div>

              {/* Comments */}
              <div className="border-t border-slate-700/50 pt-3">
                <button
                  onClick={() => toggleComments(post.id)}
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  {post.comments.length} Comments
                </button>
                
                {expandedComments.has(post.id) && post.comments.map(comment => (
                  <div key={comment.id} className="mt-3 pl-4 border-l-2 border-slate-700">
                    <div className="flex items-start space-x-2">
                      <span>{comment.icon}</span>
                      <div>
                        <span className="font-medium">{comment.author}</span>
                        <p className="text-sm text-gray-300">{comment.content}</p>
                        <span className="text-xs text-gray-400">{comment.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RealmNetwork;