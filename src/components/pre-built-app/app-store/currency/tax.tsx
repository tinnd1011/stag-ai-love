"use client";

import React, { useState } from "react";

interface TaxCategory {
  name: string;
  icon: string;
  baseRate: number;
  description: string;
  type: "trade" | "property" | "magic" | "special";
}

interface Exemption {
  name: string;
  icon: string;
  reduction: number;
  description: string;
}

const TAX_CATEGORIES: TaxCategory[] = [
  {
    name: "Merchant's Guild",
    icon: "⚖️",
    baseRate: 0.15,
    description: "Standard trade and commerce tax",
    type: "trade",
  },
  {
    name: "Noble Estate",
    icon: "🏰",
    baseRate: 0.25,
    description: "Land and property ownership",
    type: "property",
  },
  {
    name: "Arcane Academy",
    icon: "🔮",
    baseRate: 0.2,
    description: "Magical services and education",
    type: "magic",
  },
  {
    name: "Dragon's Hoard",
    icon: "🐉",
    baseRate: 0.3,
    description: "Precious metals and gems",
    type: "special",
  },
  {
    name: "Xetra AI's Guild",
    icon: "⚗️",
    baseRate: 0.18,
    description: "Potion and elixir sales",
    type: "magic",
  },
];

const TAX_EXEMPTIONS: Exemption[] = [
  {
    name: "Royal Favor",
    icon: "👑",
    reduction: 0.5,
    description: "Blessed by the Crown's grace",
  },
  {
    name: "Hero's Status",
    icon: "⚔️",
    reduction: 0.3,
    description: "Service to the realm",
  },
  {
    name: "Temple Blessing",
    icon: "🏛️",
    reduction: 0.2,
    description: "Religious exemption",
  },
];

const RoyalTaxCollector: React.FC = () => {
  const [income, setIncome] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedExemptions, setSelectedExemptions] = useState<Set<string>>(
    new Set()
  );
  const [showCalculation, setShowCalculation] = useState<boolean>(false);

  const toggleExemption = (exemptionName: string) => {
    const newExemptions = new Set(selectedExemptions);
    if (newExemptions.has(exemptionName)) {
      newExemptions.delete(exemptionName);
    } else {
      newExemptions.add(exemptionName);
    }
    setSelectedExemptions(newExemptions);
    setShowCalculation(false);
  };

  const calculateTax = () => {
    const baseAmount = parseFloat(income) || 0;
    const category = TAX_CATEGORIES.find((c) => c.name === selectedCategory);
    if (!category) return 0;

    let taxRate = category.baseRate;
    selectedExemptions.forEach((exemptionName) => {
      const exemption = TAX_EXEMPTIONS.find((e) => e.name === exemptionName);
      if (exemption) {
        taxRate *= 1 - exemption.reduction;
      }
    });

    return Math.round(baseAmount * taxRate);
  };

  const getEffectiveTaxRate = () => {
    const category = TAX_CATEGORIES.find((c) => c.name === selectedCategory);
    if (!category) return 0;

    let taxRate = category.baseRate;
    selectedExemptions.forEach((exemptionName) => {
      const exemption = TAX_EXEMPTIONS.find((e) => e.name === exemptionName);
      if (exemption) {
        taxRate *= 1 - exemption.reduction;
      }
    });

    return (taxRate * 100).toFixed(1);
  };

  return (
    <div className="w-full max-w-[700px] bg-slate-900 text-white p-6 rounded-lg relative">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 animate-pulse rounded-lg" />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2">
            👑 Royal Tax Collector 👑
          </h1>
          <p className="text-blue-300">
            Calculate thy contribution to the realm
          </p>
        </div>

        {/* Income Input */}
        <div className="bg-slate-800/50 p-4 rounded-lg backdrop-blur-sm mb-6">
          <label className="block mb-2">Annual Income (in Gold):</label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={income}
              onChange={(e) => {
                setIncome(e.target.value);
                setShowCalculation(false);
              }}
              className="flex-1 bg-slate-700 p-2 rounded border border-blue-500/30 
                       focus:border-blue-500 outline-none transition-all duration-300"
              placeholder="Enter your income..."
            />
            <span className="text-2xl">🪙</span>
          </div>
        </div>

        {/* Tax Categories */}
        <div className="mb-6">
          <h2 className="text-xl mb-4 font-semibold">Select Tax Category:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TAX_CATEGORIES.map((category) => (
              <button
                key={category.name}
                onClick={() => {
                  setSelectedCategory(category.name);
                  setShowCalculation(false);
                }}
                className={`p-4 rounded-lg transition-all duration-300
                         ${
                           selectedCategory === category.name
                             ? "bg-blue-500/30 scale-105 border-blue-500"
                             : "bg-slate-700/50 hover:bg-slate-700"
                         } border`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl animate-pulse">
                    {category.icon}
                  </span>
                  <div className="text-left">
                    <div className="font-semibold">{category.name}</div>
                    <div className="text-sm text-gray-300">
                      {category.description}
                    </div>
                    <div className="text-sm text-blue-300">
                      Rate: {(category.baseRate * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Exemptions */}
        <div className="mb-6">
          <h2 className="text-xl mb-4 font-semibold">Royal Exemptions:</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TAX_EXEMPTIONS.map((exemption) => (
              <button
                key={exemption.name}
                onClick={() => toggleExemption(exemption.name)}
                className={`p-4 rounded-lg transition-all duration-300
                         ${
                           selectedExemptions.has(exemption.name)
                             ? "bg-green-500/30 scale-105 border-green-500"
                             : "bg-slate-700/50 hover:bg-slate-700"
                         } border`}
              >
                <span className="text-2xl mb-2 block">{exemption.icon}</span>
                <div className="text-sm font-semibold">{exemption.name}</div>
                <div className="text-xs text-gray-300">
                  {exemption.description}
                </div>
                <div className="text-xs text-green-300">
                  -{exemption.reduction * 100}%
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={() => setShowCalculation(true)}
          disabled={!income || !selectedCategory}
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-lg font-bold 
                   hover:from-purple-600 hover:to-blue-600 transition-all duration-300
                   transform hover:scale-[1.02] active:scale-[0.98] mb-4
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ✨ Calculate Tax ✨
        </button>

        {/* Results */}
        {showCalculation && income && selectedCategory && (
          <div className="bg-slate-800/50 p-4 rounded-lg backdrop-blur-sm animate-pulse">
            <h3 className="text-xl font-bold mb-4">Royal Decree:</h3>
            <div className="space-y-2">
              <p>Declared Income: {parseInt(income).toLocaleString()} 🪙</p>
              <p>
                Tax Category:{" "}
                {TAX_CATEGORIES.find((c) => c.name === selectedCategory)?.icon}{" "}
                {selectedCategory}
              </p>
              <p>Effective Tax Rate: {getEffectiveTaxRate()}%</p>
              <p>Applied Exemptions: {selectedExemptions.size}</p>
              <p className="text-2xl font-bold text-yellow-400 mt-4">
                Taxes Due: {calculateTax().toLocaleString()} 🪙
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoyalTaxCollector;
