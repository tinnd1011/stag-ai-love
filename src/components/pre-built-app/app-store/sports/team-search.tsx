"use client";
import { useState } from "react";

interface Team {
  strTeam: string;
  intFormedYear: string;
  strStadium: string;
  strDescriptionEN: string;
  intStadiumCapacity: string;
  strLeague: string;
  strTeamBadge: string;
  strCountry: string;
  strLeague2?: string;
  strLeague3?: string;
  strLeague4?: string;
}

const TeamSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [teamData, setTeamData] = useState<Team | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const searchTeam = async () => {
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${encodeURIComponent(
          searchTerm
        )}`
      );
      const data = await response.json();

      if (data.teams && data.teams.length > 0) {
        setTeamData(data.teams[0]);
      } else {
        setError("No team found. Please try another search.");
      }
    } catch (err) {
      console.log(err);
      setError("Unable to fetch team data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg overflow-auto p-6 font-sans">
      {/* Search Section */}
      <div className="mb-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Team Stats Explorer
          </h1>
          <div className="text-gray-600 text-sm">
            Comprehensive Sports Database
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a team..."
            className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <button
            onClick={searchTeam}
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 font-semibold"
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </div>

        {error && (
          <div className="text-red-600 text-center text-sm mt-2">{error}</div>
        )}
      </div>

      {teamData && (
        <>
          {/* Team Header */}
          <div className="bg-gray-50 p-6 rounded-lg mb-6 border border-gray-200">
            <div className="text-2xl font-bold text-center text-gray-800 mb-2">
              {teamData.strTeam}
            </div>
            <div className="text-center text-gray-600">
              {teamData.strCountry} • Founded {teamData.intFormedYear}
            </div>
          </div>

          {/* Key Statistics */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
              <div className="text-center">
                <div className="font-semibold text-gray-800">Home Stadium</div>
                <div className="text-gray-600">{teamData.strStadium}</div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
              <div className="text-center">
                <div className="font-semibold text-gray-800">
                  Stadium Capacity
                </div>
                <div className="text-gray-600">
                  {parseInt(teamData.intStadiumCapacity).toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* League Participation */}
          <div className="bg-white p-4 rounded-lg mb-6 shadow border border-gray-200">
            <div className="text-center">
              <div className="font-semibold text-gray-800 mb-2">
                Active Leagues
              </div>
              <div className="text-gray-600 grid gap-1">
                <div>{teamData.strLeague}</div>
                {teamData.strLeague2 && <div>{teamData.strLeague2}</div>}
                {teamData.strLeague3 && <div>{teamData.strLeague3}</div>}
                {teamData.strLeague4 && <div>{teamData.strLeague4}</div>}
              </div>
            </div>
          </div>

          {/* Team Description */}
          <div
            className="bg-white p-6 rounded-lg shadow cursor-pointer mb-6 border border-gray-200"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="font-semibold text-gray-800 text-center mb-2">
              Team Overview
            </div>
            <div
              className={`overflow-hidden transition-all duration-500 ${
                isOpen ? "max-h-96" : "max-h-20"
              }`}
            >
              <div className="text-gray-600 leading-relaxed">
                {teamData.strDescriptionEN || "No team description available."}
              </div>
            </div>
            <div className="text-center text-blue-600 mt-2 text-sm font-medium">
              {isOpen ? "Show Less" : "Read More"}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TeamSearch;
