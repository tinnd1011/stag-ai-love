'use client';

import React, { useState, useEffect } from 'react';

interface Event {
  idEvent: string;
  strEvent: string;
  strLeague: string;
  strSport: string;
  strHomeTeam: string | null;
  strAwayTeam: string | null;
  strTime: string | null;
  dateEvent: string;
  strVenue: string | null;
  strStatus: string | null;
  strThumb: string | null;
  strLeagueBadge: string | null;
}

interface EventsByCategory {
  [key: string]: Event[];
}

const SPORTS_ICONS: { [key: string]: string } = {
  'Soccer': '⚽',
  'Basketball': '🏀',
  'Ice Hockey': '🏒',
  'Baseball': '⚾',
  'American Football': '🏈',
  'Rugby': '🏉',
  'Cricket': '🏏',
  'Tennis': '🎾',
  'Fighting': '🥊',
  'Handball': '🤾',
  'Default': '🎮'
};

const UpcomingEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [selectedSport, setSelectedSport] = useState<string>('all');
  const [selectedLeague, setSelectedLeague] = useState<string>('all');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        const response = await fetch(
          `https://www.thesportsdb.com/api/v1/json/3/eventsday.php?d=${formattedDate}`
        );
        const data = await response.json();
        
        if (data.events) {
          setEvents(data.events);
        } else {
          setEvents([]);
        }
      } catch (err) {
        console.log(err)
        setError('Failed to fetch events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const groupEventsByCategory = (events: Event[]): EventsByCategory => {
    return events.reduce((acc: EventsByCategory, event) => {
      if (!acc[event.strSport]) {
        acc[event.strSport] = [];
      }
      acc[event.strSport].push(event);
      return acc;
    }, {});
  };

  const getSportIcon = (sport: string): string => {
    return SPORTS_ICONS[sport] || SPORTS_ICONS.Default;
  };

  const getLeagues = (): string[] => {
    const leagues = new Set(events.map(event => event.strLeague));
    return Array.from(leagues);
  };

  const getSports = (): string[] => {
    const sports = new Set(events.map(event => event.strSport));
    return Array.from(sports);
  };

  const filteredEvents = events.filter(event => {
    const matchesSport = selectedSport === 'all' || event.strSport === selectedSport;
    const matchesLeague = selectedLeague === 'all' || event.strLeague === selectedLeague;
    return matchesSport && matchesLeague;
  });

  const groupedEvents = groupEventsByCategory(filteredEvents);

  return (
    <div className="w-full max-w-[700px] bg-slate-900 text-white p-6 rounded-lg relative">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse rounded-lg" />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className='flex items-center justify-center gap-1'>
            <span className='text-4xl'>🏆</span>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
              Upcoming Sports Events
            </h1>
            <span className='text-4xl'>🏆</span>
          </div>
          <p className="text-blue-300">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
              className="bg-slate-800/50 p-2 rounded-lg border border-blue-500/30 outline-none"
            >
              <option value="all">All Sports</option>
              {getSports().map(sport => (
                <option key={sport} value={sport}>
                  {getSportIcon(sport)} {sport}
                </option>
              ))}
            </select>
            <select
              value={selectedLeague}
              onChange={(e) => setSelectedLeague(e.target.value)}
              className="bg-slate-800/50 p-2 rounded-lg border border-blue-500/30 outline-none"
            >
              <option value="all">All Leagues</option>
              {getLeagues().map(league => (
                <option key={league} value={league}>{league}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Events Display */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin text-4xl mb-4">🎯</div>
            <p>Loading events...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-400">
            <p>{error}</p>
          </div>
        ) : Object.keys(groupedEvents).length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p>No events found for today</p>
          </div>
        ) : (
          Object.entries(groupedEvents).map(([sport, sportEvents]) => (
            <div key={sport} className="mb-8">
              <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
                <span>{getSportIcon(sport)}</span>
                <span>{sport}</span>
              </h2>
              <div className="space-y-4">
                {sportEvents.map((event) => (
                  <div
                    key={event.idEvent}
                    className="bg-slate-800/50 p-4 rounded-lg backdrop-blur-sm
                             border border-slate-700/50 hover:border-slate-600/50
                             transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2">
                        {event.strLeagueBadge && (
                          <img 
                            src={event.strLeagueBadge}
                            alt={event.strLeague}

                            className="w-6 h-6 object-contain"
                          />
                        )}
                        <span className="text-blue-300">{event.strLeague}</span>
                      </div>
                      <span className="text-sm text-gray-400">
                        {event.strTime ? event.strTime.slice(0, 5) : 'TBA'}
                      </span>
                    </div>

                    <div className="mb-2">
                      {event.strHomeTeam && event.strAwayTeam ? (
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">{event.strHomeTeam}</span>
                          <span className="text-gray-400 mx-2">vs</span>
                          <span className="font-semibold">{event.strAwayTeam}</span>
                        </div>
                      ) : (
                        <span className="font-semibold">{event.strEvent}</span>
                      )}
                    </div>

                    {event.strVenue && (
                      <div className="text-sm text-gray-400">
                        📍 {event.strVenue}
                      </div>
                    )}

                    {event.strStatus && (
                      <div className="mt-2">
                        <span className="bg-blue-500/20 px-2 py-1 rounded text-sm">
                          {event.strStatus}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UpcomingEvents;