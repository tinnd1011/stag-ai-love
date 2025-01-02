'use client';

import React, { useState } from 'react';

interface MatchEvent {
  id: string;
  strEvent: string;
  dateEvent: string;
  strLeague: string;
  intHomeScore: string | null;
  intAwayScore: string | null;
  strHomeTeam: string;
  strAwayTeam: string;
  strStatus: string | null;
  strThumb: string | null;
  strVideo: string | null;
  strSeason: string;
  strVenue: string | null;
}

const TeamRivalryExplorer: React.FC = () => {
  const [team1, setTeam1] = useState<string>('');
  const [team2, setTeam2] = useState<string>('');
  const [matches, setMatches] = useState<MatchEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [stats, setStats] = useState<{
    team1Wins: number;
    team2Wins: number;
    draws: number;
    totalGoalsTeam1: number;
    totalGoalsTeam2: number;
  }>({
    team1Wins: 0,
    team2Wins: 0,
    draws: 0,
    totalGoalsTeam1: 0,
    totalGoalsTeam2: 0
  });

  const searchMatches = async () => {
    if (!team1 || !team2) {
      setError('Please enter both team names');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(
        `https://www.thesportsdb.com/api/v1/json/3/searchevents.php?e=${team1}_vs_${team2}`
      );
      const data = await response.json();
      
      if (data.event) {
        setMatches(data.event);
        calculateStats(data.event);
      } else {
        setMatches([]);
        setError('No matches found');
      }
    } catch (err) {
      console.log(err)
      setError('Error fetching matches');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (matchData: MatchEvent[]) => {
    const stats = matchData.reduce((acc, match) => {
      if (match.intHomeScore && match.intAwayScore) {
        const homeScore = parseInt(match.intHomeScore);
        const awayScore = parseInt(match.intAwayScore);
        
        // Track total goals
        if (match.strHomeTeam.toLowerCase().includes(team1.toLowerCase())) {
          acc.totalGoalsTeam1 += homeScore;
          acc.totalGoalsTeam2 += awayScore;
        } else {
          acc.totalGoalsTeam1 += awayScore;
          acc.totalGoalsTeam2 += homeScore;
        }

        // Track wins and draws
        if (homeScore > awayScore) {
          if (match.strHomeTeam.toLowerCase().includes(team1.toLowerCase())) {
            acc.team1Wins++;
          } else {
            acc.team2Wins++;
          }
        } else if (homeScore < awayScore) {
          if (match.strHomeTeam.toLowerCase().includes(team1.toLowerCase())) {
            acc.team2Wins++;
          } else {
            acc.team1Wins++;
          }
        } else {
          acc.draws++;
        }
      }
      return acc;
    }, {
      team1Wins: 0,
      team2Wins: 0,
      draws: 0,
      totalGoalsTeam1: 0,
      totalGoalsTeam2: 0
    });

    setStats(stats);
  };

  return (
    <div className="w-full max-w-[700px] bg-slate-900 text-white p-6 rounded-lg relative">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse rounded-lg" />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-8 flex items-center">
          <span className='text-2xl'>
          ⚔️
          </span>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
             Team Rivalry Explorer
          </h1>
          <span className='text-2xl'>
          ⚔️
          </span>
        </div>
          <p className="text-blue-300">Discover head-to-head match history</p>

        {/* Search Form */}
        <div className="mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              value={team1}
              onChange={(e) => setTeam1(e.target.value)}
              placeholder="Enter first team name..."
              className="bg-slate-800/50 p-3 rounded-lg border border-blue-500/30 
                       focus:border-blue-500 outline-none"
            />
            <input
              type="text"
              value={team2}
              onChange={(e) => setTeam2(e.target.value)}
              placeholder="Enter second team name..."
              className="bg-slate-800/50 p-3 rounded-lg border border-blue-500/30 
                       focus:border-blue-500 outline-none"
            />
          </div>
          <button
            onClick={searchMatches}
            disabled={loading}
            className="w-full bg-blue-500/20 p-3 rounded-lg font-bold hover:bg-blue-500/30 
                     transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Searching...' : 'Search Matches'}
          </button>
          {error && (
            <p className="text-red-400 text-center">{error}</p>
          )}
        </div>

        {/* Stats Overview */}
        {matches.length > 0 && (
          <div className="mb-8 grid grid-cols-3 gap-4 text-center">
            <div className="bg-blue-500/20 p-4 rounded-lg">
              <div className="text-2xl font-bold">{stats.team1Wins}</div>
              <div className="text-sm text-blue-300">{team1} Wins</div>
            </div>
            <div className="bg-purple-500/20 p-4 rounded-lg">
              <div className="text-2xl font-bold">{stats.draws}</div>
              <div className="text-sm text-purple-300">Draws</div>
            </div>
            <div className="bg-red-500/20 p-4 rounded-lg">
              <div className="text-2xl font-bold">{stats.team2Wins}</div>
              <div className="text-sm text-red-300">{team2} Wins</div>
            </div>
          </div>
        )}

        {/* Match History */}
        <div className="space-y-4">
          {matches.map((match, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 
                       hover:border-slate-600/50 transition-all"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-blue-300">{match.strLeague}</span>
                <span className="text-gray-400">{match.dateEvent}</span>
              </div>
              
              <div className="flex justify-between items-center mb-2">
                <span className="flex-1 text-right">{match.strHomeTeam}</span>
                <span className="mx-4 font-bold">
                  {match.intHomeScore !== null ? 
                    `${match.intHomeScore} - ${match.intAwayScore}` : 
                    'vs'}
                </span>
                <span className="flex-1 text-left">{match.strAwayTeam}</span>
              </div>

              <div className="text-sm text-gray-400">
                {match.strVenue && <span>📍 {match.strVenue}</span>}
              </div>

              {match.strVideo && (
                <a
                  href={match.strVideo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-red-500/20 p-2 rounded-lg 
                           hover:bg-red-500/30 transition-colors mt-2"
                >
                  📺 Watch Highlights
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamRivalryExplorer;