"use client";

import React, { useState, useEffect } from "react";
import styles from "./watch.module.css";

export default function MarketAlerts() {
  const [activeBrew, setActiveBrew] = useState<string | null>(null);
  const [brewingProgress, setBrewingProgress] = useState(0);
  const [alerts, setAlerts] = useState<string[]>([]);
  const [potionPower, setPotionPower] = useState(0);

  const alertTypes = [
    {
      id: "price",
      name: "Price Guardian",
      description: "Monitors significant price changes",
      ingredients: ["Market Essence", "Time Crystal", "Price Powder"],
      potionClass: styles.potionPrice,
      liquidClass: styles.liquidPrice,
    },
    {
      id: "volume",
      name: "Volume Vision",
      description: "Detects unusual trading volumes",
      ingredients: ["Trading Spirit", "Volume Vapor", "Flow Fragment"],
      potionClass: styles.potionVolume,
      liquidClass: styles.liquidVolume,
    },
    {
      id: "trend",
      name: "Trend Tracker",
      description: "Identifies market trend changes",
      ingredients: ["Direction Dust", "Pattern Pearl", "Trend Tincture"],
      potionClass: styles.potionTrend,
      liquidClass: styles.liquidTrend,
    },
    {
      id: "volatility",
      name: "Volatility Vessel",
      description: "Alerts on volatility spikes",
      ingredients: ["Chaos Crystal", "Stability Salt", "Balance Brew"],
      potionClass: styles.potionVolatility,
      liquidClass: styles.liquidVolatility,
    },
  ];

  const marketEvents = [
    { type: "price", symbol: "AAPL", value: "+7.5%", urgency: "medium" },
    { type: "volume", symbol: "TSLA", value: "2.5M", urgency: "high" },
    { type: "trend", symbol: "GOOGL", value: "Breakout", urgency: "low" },
    { type: "volatility", symbol: "META", value: "High", urgency: "high" },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeBrew) {
      interval = setInterval(() => {
        setBrewingProgress((prev) => {
          if (prev >= 100) {
            setAlerts((current) => [
              `${alertTypes.find((a) => a.id === activeBrew)?.name} is ready!`,
              ...current.slice(0, 4),
            ]);
            setActiveBrew(null);
            return 0;
          }
          setPotionPower(Math.sin(prev / 10) * 50 + 50);
          return prev + 2;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [activeBrew]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Xetra AI&apos;s Market Watch</h1>

      <div className={styles.brewingStation}>
        <div className={styles.potionRow}>
          {alertTypes.map((type) => (
            <div key={type.id} className={styles.potionContainer}>
              <div
                className={`${styles.potion} ${type.potionClass} ${
                  activeBrew === type.id ? styles.potionActive : ""
                }`}
                onClick={() => setActiveBrew(type.id)}
              >
                <div
                  className={`${styles.liquid} ${type.liquidClass}`}
                  style={{
                    height:
                      activeBrew === type.id ? `${brewingProgress}%` : "30%",
                    transform: `translateY(${
                      Math.sin(potionPower / 20) * 2
                    }px)`,
                  }}
                >
                  {activeBrew === type.id && (
                    <>
                      <div className={styles.bubble1} />
                      <div className={styles.bubble2} />
                      <div className={styles.bubble3} />
                    </>
                  )}
                </div>
              </div>
              <div className={styles.potionLabel}>{type.name}</div>
            </div>
          ))}
        </div>

        {activeBrew && (
          <div className={styles.brewDetails}>
            <h3 className={styles.brewTitle}>
              Brewing {alertTypes.find((a) => a.id === activeBrew)?.name}
            </h3>
            <div className={styles.ingredients}>
              {alertTypes
                .find((a) => a.id === activeBrew)
                ?.ingredients.map((ingredient, i) => (
                  <span
                    key={i}
                    className={styles.ingredientTag}
                    style={{ animationDelay: `${i * 200}ms` }}
                  >
                    {ingredient}
                  </span>
                ))}
            </div>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${brewingProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <div className={styles.eventsGrid}>
        {marketEvents.map((event, i) => {
          const alertType = alertTypes.find((a) => a.id === event.type);
          return (
            <div
              key={i}
              className={`${styles.eventCard} ${
                event.urgency === "high"
                  ? styles.urgencyHigh
                  : event.urgency === "medium"
                  ? styles.urgencyMedium
                  : styles.urgencyLow
              }`}
            >
              <div className={styles.eventHeader}>
                <span className={styles.symbol}>{event.symbol}</span>
                <span className={styles.alertType}>{alertType?.name}</span>
              </div>
              <div className={styles.value}>{event.value}</div>
              <div className={styles.urgency}>
                Urgency:{" "}
                {event.urgency.charAt(0).toUpperCase() + event.urgency.slice(1)}
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.alertLog}>
        <h3>Magical Alert Log</h3>
        <div>
          {alerts.map((alert, i) => (
            <div
              key={i}
              className={styles.alertItem}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {alert}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
