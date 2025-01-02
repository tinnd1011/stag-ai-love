'use client';

import React, { useState } from 'react';

interface League {
  idLeague: string;
  strLeague: string;
  strSport: string;
  strLeagueAlternate: string;
  strCountry: string;
  intFormedYear: string | null;
  strDescriptionEN: string | null;
  strBadge: string | null;
  strBanner: string | null;
  strLogo: string | null;
  strTrophy: string | null;
  strWebsite: string;
  strFacebook: string;
  strTwitter: string;
  strYoutube: string;
}

const LeagueExplorer: React.FC = () => {
  const [country, setCountry] = useState<string>('');
  const [sport, setSport] = useState<string>('');
  const [leagues, setLeagues] = useState<League[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null);

  const searchLeagues = async () => {
    if (!country || !sport) {
      setError('Please enter both country and sport');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://www.thesportsdb.com/api/v1/json/3/search_all_leagues.php?c=${country}&s=${sport}`
      );
      const data = await response.json();
      
      if (data.countries) {
        setLeagues(data.countries);
      } else {
        setLeagues([]);
        setError('No leagues found');
      }
    } catch (err) {
      console.log(err)
      setError('Error fetching leagues');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchLeagues();
  };

  return (
    <div className="w-full max-w-[700px] bg-slate-900 text-white p-6 rounded-lg relative">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 animate-pulse rounded-lg" />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className=' flex justify-center items-center gap-1'>
            <span className='text-4xl'>🏆</span>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2">
              League Explorer
            </h1>
            <span className='text-4xl'>🏆</span>
          </div>
          <p className="text-blue-300">Discover sports leagues around the world</p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Enter country name..."
              className="bg-slate-800/50 p-3 rounded-lg border border-blue-500/30 
                       focus:border-blue-500 outline-none"
            />
            <input
              type="text"
              value={sport}
              onChange={(e) => setSport(e.target.value)}
              placeholder="Enter sport type..."
              className="bg-slate-800/50 p-3 rounded-lg border border-blue-500/30 
                       focus:border-blue-500 outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-lg 
                     font-bold hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
          >
            Search Leagues
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <div className="text-red-400 text-center mb-4">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin text-4xl mb-4">🏆</div>
            <p>Searching leagues...</p>
          </div>
        )}

        {/* League Results */}
        {!loading && leagues.length > 0 && (
          <div className="space-y-6">
            {leagues.map((league) => (
              <div
                key={league.idLeague}
                className="bg-slate-800/50 rounded-lg overflow-hidden transition-all duration-300 
                         hover:bg-slate-800/70 cursor-pointer"
                onClick={() => setSelectedLeague(
                  selectedLeague === league.idLeague ? null : league.idLeague
                )}
              >
                {/* League Header */}
                <div className="p-4 flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    {league.strBadge && (
                      <img
                        src={league.strBadge}
                        alt={league.strLeague}
                        className="w-12 h-12 object-contain"
                      />
                    )}
                    <div>
                      <h3 className="font-bold text-lg">{league.strLeague}</h3>
                      {league.strLeagueAlternate && (
                        <p className="text-sm text-gray-400">{league.strLeagueAlternate}</p>
                      )}
                      <div className="text-sm text-blue-300 mt-1">
                        {league.intFormedYear && `Founded: ${league.intFormedYear}`}
                      </div>
                    </div>
                  </div>
                  <span className="text-2xl">
                    {selectedLeague === league.idLeague ? '🔽' : '🔼'}
                  </span>
                </div>

                {/* Expanded Content */}
                {selectedLeague === league.idLeague && (
                  <div className="p-4 border-t border-slate-700/50">
                    {/* League Banner */}
                    {league.strBanner && (
                      <img
                        src={league.strBanner}
                        alt={`${league.strLeague} banner`}
                        className="w-full h-32 object-cover rounded-lg mb-4"
                      />
                    )}

                    {/* Description */}
                    {league.strDescriptionEN && (
                      <p className="text-gray-300 mb-4">
                        {league.strDescriptionEN.slice(0, 300)}...
                      </p>
                    )}

                    {/* Trophy */}
                    {league.strTrophy && (
                      <div className="mb-4">
                        <img
                          src={league.strTrophy}
                          alt="Trophy"
                          className="h-32 object-contain mx-auto"
                        />
                      </div>
                    )}

                    {/* Social Links */}
                    <div className="flex justify-center space-x-4">
                      {league.strWebsite && (
                        <a
                          href={`https://${league.strWebsite}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-500/20 p-2 rounded hover:bg-blue-500/30 transition-colors"
                        >
                          🌐 Website
                        </a>
                      )}
                      {league.strFacebook && (
                        <a
                          href={`https://${league.strFacebook}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-600/20 p-2 rounded hover:bg-blue-600/30 transition-colors"
                        >
                          📘 Facebook
                        </a>
                      )}
                      {league.strTwitter && (
                        <a
                          href={`https://${league.strTwitter}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-400/20 p-2 rounded hover:bg-blue-400/30 transition-colors"
                        >
                          🐦 Twitter
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeagueExplorer;