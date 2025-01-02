import React from "react";
import HeadComponent from "../common/head";
import solana from "@/images/solana.svg";
import TradingTable from "../common/trading-table";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
const SolanaAlphaScan = () => {
  function generateSolanaAddress() {
    // Generate a new random keypair
    const keypair = Keypair.generate();

    // Get the public key (address) and private key
    const publicKey = keypair.publicKey.toString();
    const privateKey = bs58.encode(keypair.secretKey);

    // Create Solscan links
    const solscanMainnetLink = `https://solscan.io/account/${publicKey}`;
    const solscanTestnetLink = `https://solscan.io/account/${publicKey}?cluster=testnet`;
    const solscanDevnetLink = `https://solscan.io/account/${publicKey}?cluster=devnet`;

    return {
      address: publicKey,
      privateKey: privateKey,
      links: {
        mainnet: solscanMainnetLink,
        testnet: solscanTestnetLink,
        devnet: solscanDevnetLink,
      },
    };
  }

  const generateVariedTradingData = (numRows = 12) => {
    const generateRandomDate = () => {
      const start = new Date("2024-12-15");
      const end = new Date("2024-12-16");
      const date = new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
      );
      return date.toISOString().slice(0, 16).replace("T", " ");
    };

    return Array.from({ length: numRows }, (_, index) => {
      // Generate varied but realistic trading values
      const buys = (9 + Math.random() * 3).toFixed(5);
      const sells = (485000 + Math.random() * 60000).toFixed(2);
      const roi = (45 + Math.random() * 5).toFixed(2);
      const winrate = (68 + Math.random() * 6).toFixed(1);
      const tradersProfit = (485000 + Math.random() * 60000).toFixed(2);
      const numTrades = Math.floor(200 + Math.random() * 100);
      const tradingDays = Math.floor(150 + Math.random() * 30);
      const firstTrade = generateRandomDate();
      const lastTrade = generateRandomDate();

      return [
        { id: "buys", value: buys },
        { id: "sells", value: sells },
        { id: "roi", value: roi },
        { id: "winrate", value: winrate },
        { id: "tradersProfit", value: tradersProfit },
        { id: "solscan", value: "Link" },
        { id: "numTrades", value: numTrades },
        { id: "tradingDays", value: tradingDays },
        { id: "firstTrade", value: firstTrade },
        { id: "lastTrade", value: lastTrade },
        { id: "solscanLink", value: generateSolanaAddress().address },
      ];
    });
  };

  const variedTradingDataAsObjects = generateVariedTradingData().map((row) => {
    return row.reduce((obj: any, item) => {
      obj[item.id] = item.value;
      return obj;
    }, {});
  });

  return (
    <main>
      <HeadComponent icon={solana} title="Solana Alpha Wallets Scanner" />
      <TradingTable data={variedTradingDataAsObjects} />
    </main>
  );
};

export default SolanaAlphaScan;
