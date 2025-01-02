export interface ISlider {
  thumbnail: string | StaticImageData;
  logo: string | StaticImageData;
  type: string;
  title: string;
  desc: string;
  category: string[];
}

export interface IProduct {
  id: number;
  thumbnail: string | StaticImageData;
  logo: string | StaticImageData;
  type: string;
  title: string;
  desc: string;
  category: string[];
  gallery: StaticImageData[];
}

export interface Job {
  title: string;
  date: string;
  description: string;
  location: string;
  type: string;
  workMode: string;
  company: string;
  createdBy: string;
  applyLink: string;
}

export enum SwiperType {
  PROJECT = 1,
  JOB = 2,
}

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export interface TradingData {
  buys: number;
  sells: number;
  roi: number;
  winrate: number;
  tradersProfit: number;
  numTrades: number;
  tradingDays: number;
  firstTradeMade: string;
  lastTradeMade: string;
  solscanLink: string;
}