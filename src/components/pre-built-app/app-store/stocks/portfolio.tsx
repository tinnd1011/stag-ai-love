"use client";

import React, { useState } from "react";

export default function PortfolioPotions() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [isBrewing, setIsBrewing] = useState(false);
  const [brewResult, setBrewResult] = useState<{
    name: string;
    effects: string[];
  } | null>(null);

  const ingredients = [
    {
      id: "tech",
      name: "Tech Crystal",
      symbol: "AAPL",
      effect: "+15% Growth",
      color: "from-blue-500/50 to-purple-600/50",
    },
    {
      id: "stable",
      name: "Stable Shard",
      symbol: "GOOGL",
      effect: "+12% Stability",
      color: "from-purple-500/50 to-pink-600/50",
    },
    {
      id: "yield",
      name: "Yield Root",
      symbol: "KO",
      effect: "+10% Dividend",
      color: "from-emerald-500/50 to-teal-600/50",
    },
    {
      id: "growth",
      name: "Growth Leaf",
      symbol: "TSLA",
      effect: "+20% Power",
      color: "from-amber-500/50 to-orange-600/50",
    },
  ];

  const potionRecipes = {
    "tech,growth": {
      name: "Growth Accelerator",
      effects: [
        "Amplified Growth +35%",
        "Market Momentum +20%",
        "Volatility +15%",
      ],
    },
    "stable,yield": {
      name: "Stability Elixir",
      effects: ["Enhanced Stability +25%", "Steady Yield +18%", "Growth -10%"],
    },
    "tech,stable,growth": {
      name: "Master's Brew",
      effects: [
        "Ultimate Balance +30%",
        "Risk Control +25%",
        "Profit Boost +20%",
      ],
    },
  };

  const toggleIngredient = (id: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev.slice(-2), id]
    );
    setBrewResult(null);
  };

  const startBrewing = () => {
    setIsBrewing(true);
    setTimeout(() => {
      const recipe =
        potionRecipes[
          selectedIngredients.sort().join(",") as keyof typeof potionRecipes
        ];
      setBrewResult(
        recipe || {
          name: "Experimental Mix",
          effects: [
            `${
              ingredients.find((i) => i.id === selectedIngredients[0])?.effect
            }`,
            `${
              ingredients.find((i) => i.id === selectedIngredients[1])?.effect
            }`,
            "Unknown Effect +???",
          ],
        }
      );
      setIsBrewing(false);
    }, 2000);
  };

  return (
    <div className="w-[700px] bg-slate-900 rounded-xl p-6 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900" />

      <div className="relative">
        <h2 className="text-2xl font-serif text-center mb-6 text-violet-300">
          Portfolio Xetra AI Lab
        </h2>

        {/* Ingredients Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {ingredients.map((ingredient) => (
            <button
              key={ingredient.id}
              onClick={() => toggleIngredient(ingredient.id)}
              className={`group p-4 rounded-lg text-left transition-all duration-300 relative overflow-hidden
                ${
                  selectedIngredients.includes(ingredient.id)
                    ? "bg-violet-900/40 ring-2 ring-violet-500/50"
                    : "bg-violet-900/20 hover:bg-violet-900/30"
                }`}
            >
              <div
                className={`absolute inset-0 opacity-20 bg-gradient-to-r ${ingredient.color}`}
              />
              <div className="relative">
                <div className="font-bold text-violet-300">
                  {ingredient.name}
                </div>
                <div className="text-sm text-violet-200/80">
                  {ingredient.symbol}
                </div>
                <div className="text-xs text-violet-300/60 mt-2">
                  {ingredient.effect}
                </div>
              </div>
              <div
                className={`absolute inset-0 bg-gradient-to-r ${ingredient.color} opacity-0 
                group-hover:opacity-20 transition-opacity duration-300`}
              />
            </button>
          ))}
        </div>

        {/* Brewing Section */}
        <div className="relative mx-auto w-40 h-40 mb-6">
          <div className="absolute inset-0 bg-violet-900/30 rounded-full overflow-hidden border border-violet-500/20">
            <div
              className={`w-full bg-gradient-to-t from-violet-600/50 to-violet-400/50 
                transition-all duration-1000 relative
                ${isBrewing ? "h-full" : brewResult ? "h-4/5" : "h-1/3"}`}
            >
              {isBrewing && (
                <>
                  <div className="absolute inset-0 animate-pulse bg-violet-400/20" />
                  <div className="absolute inset-0 animate-ping bg-violet-400/10" />
                </>
              )}
            </div>
          </div>
        </div>

        {/* Selected Ingredients */}
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {selectedIngredients.map((id) => (
            <span
              key={id}
              className="px-3 py-1 rounded-full text-sm bg-violet-900/40 text-violet-300
                border border-violet-500/20"
            >
              {ingredients.find((i) => i.id === id)?.name}
            </span>
          ))}
        </div>

        {/* Brew Button */}
        <button
          onClick={startBrewing}
          disabled={selectedIngredients.length === 0 || isBrewing}
          className={`mx-auto block px-6 py-2 rounded-full font-bold transition-all duration-300
            ${
              isBrewing
                ? "bg-violet-700/50 text-violet-300 cursor-not-allowed"
                : "bg-violet-900/50 text-violet-300 hover:bg-violet-800/50 hover:scale-105"
            }`}
        >
          {isBrewing ? "Brewing..." : "Brew Potion"}
        </button>

        {/* Brewing Result */}
        {brewResult && (
          <div className="mt-6 p-4 rounded-lg bg-violet-900/30 border border-violet-500/20">
            <div className="text-center">
              <div className="text-lg font-bold text-violet-300 mb-2">
                {brewResult.name}
              </div>
              <div className="space-y-2">
                {brewResult.effects.map((effect, i) => (
                  <div
                    key={i}
                    className="text-sm text-violet-200/80 px-3 py-1 rounded-full bg-violet-900/30"
                  >
                    {effect}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
