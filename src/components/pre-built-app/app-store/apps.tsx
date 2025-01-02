import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import { AppLoadingState } from "../loading";

// Define the registry type
interface AppRegistry {
  [key: string]: {
    component: ComponentType;
    title: string;
    icon: string;
    width?: number;
    height?: number;
    id?: string;
  };
}

export const AppComponents: AppRegistry = {
  // Games section
  PointClick: {
    id: "game_001",
    component: dynamic(() => import("./pvp-games/point-click"), {
      loading: () => <AppLoadingState title="Point Click" />,
    }),
    title: "Point Click",
    icon: "🎯",
    width: 400,
    height: 372,
  },
  MemoryGame: {
    id: "game_002",
    component: dynamic(() => import("./pvp-games/memory"), {
      loading: () => <AppLoadingState title="Memory Game" />,
    }),
    title: "Memory Game",
    icon: "🧠 ",
    width: 400,
    height: 400,
  },
  Snake: {
    id: "game_003",
    component: dynamic(() => import("./pvp-games/snake"), {
      loading: () => <AppLoadingState title="Snake" />,
    }),
    title: "Snake",
    icon: "🐍",
    width: 400,
    height: 480,
  },
  TicTacToe: {
    id: "game_004",
    component: dynamic(() => import("./pvp-games/tic-tac-toe"), {
      loading: () => <AppLoadingState title="Tic Tac Toe" />,
    }),
    title: "Tic Tac Toe",
    icon: "❌⭕",
    width: 400,
    height: 520,
  },
  /* token price */
  PriceTracker: {
    id: "price_001",
    component: dynamic(() => import("./token-price/price-tracker"), {
      loading: () => <AppLoadingState title="Price Tracker" />,
    }),
    title: "Price Tracker",
    icon: "💰",
    width: 660,
    height: 450,
  },
  PriceChart: {
    id: "price_002",
    component: dynamic(() => import("./token-price/price-chart"), {
      loading: () => <AppLoadingState title="Price Chart" />,
    }),
    title: "Price Chart",
    icon: "📈",
    width: 400,
    height: 380,
  },
  MarketDepth: {
    id: "price_003",
    component: dynamic(() => import("./token-price/market-depth"), {
      loading: () => <AppLoadingState title="Market Depth" />,
    }),
    title: "Market Depth",
    icon: "📊",
    width: 300,
    height: 400,
  },
  TokenInfo: {
    id: "price_004",
    component: dynamic(() => import("./token-price/token-info"), {
      loading: () => <AppLoadingState title="Token Info" />,
    }),
    title: "Token Info",
    icon: "🔍",
    width: 400,
    height: 280,
  },
  /* weather */
  WeatherDashboard: {
    id: "weather_001",
    component: dynamic(() => import("./weather/dashboard"), {
      loading: () => <AppLoadingState title="Weather Dashboard" />,
    }),
    title: "Weather Dashboard",
    icon: "🌤️",
    width: 330,
    height: 400,
  },
  ForeCast: {
    id: "weather_002",
    component: dynamic(() => import("./weather/forecast"), {
      loading: () => <AppLoadingState title="Weather Forecast" />,
    }),
    title: "Forecast",
    icon: "🌦️",
    width: 310,
    height: 520,
  },
  Alert: {
    id: "weather_003",
    component: dynamic(() => import("./weather/alert"), {
      loading: () => <AppLoadingState title="Alert" />,
    }),
    title: "Alert",
    icon: "⚠️",
    width: 400,
    height: 420,
  },
  Map: {
    id: "weather_004",
    component: dynamic(() => import("./weather/map"), {
      loading: () => <AppLoadingState title="Map" />,
    }),
    title: "Map",
    icon: "🗺️",
    width: 400,
    height: 570,
  },
  /* video */
  VideoPlayer: {
    id: "video_001",
    component: dynamic(() => import("./video/video-player"), {
      loading: () => <AppLoadingState title="Video Player" />,
    }),
    title: "Video Player",
    icon: "📺",
    width: 630,
    height: 410,
  },
  AudioExtract: {
    id: "video_002",
    component: dynamic(() => import("./video/audio-extract"), {
      loading: () => <AppLoadingState title="Audio Extract" />,
    }),
    title: "Audio Extract",
    icon: "🔊",
    width: 330,
    height: 410,
  },
  AudioRecorder: {
    id: "video_003",
    component: dynamic(() => import("./video/audio-record"), {
      loading: () => <AppLoadingState title="Audio Recorder" />,
    }),
    title: "Audio Recorder",
    icon: "🎙️",
    width: 330,
    height: 410,
  },
  Visualizer: {
    id: "video_004",
    component: dynamic(() => import("./video/visualizer"), {
      loading: () => <AppLoadingState title="Visualizer" />,
    }),
    title: "Visualizer",
    icon: "🎵",
    width: 330,
    height: 410,
  },
  /* ocr */
  Scanner: {
    id: "ocr_001",
    component: dynamic(() => import("./ocr/text-scanner"), {
      loading: () => <AppLoadingState title="Scanner" />,
    }),
    title: "Scanner",
    icon: "📄",
    width: 410,
    height: 410,
  },
  Translator: {
    id: "ocr_002",
    component: dynamic(() => import("./ocr/spell-trans"), {
      loading: () => <AppLoadingState title="Translator" />,
    }),
    title: "Translator",
    icon: "🔮",
    width: 440,
    height: 410,
  },
  Caster: {
    id: "ocr_003",
    component: dynamic(() => import("./ocr/spell-cast"), {
      loading: () => <AppLoadingState title="Caster" />,
    }),
    title: "Caster",
    icon: "🧙",
    width: 510,
    height: 570,
  },
  Writer: {
    id: "ocr_004",
    component: dynamic(() => import("./ocr/writer"), {
      loading: () => <AppLoadingState title="Writer" />,
    }),
    title: "Writer",
    icon: "📜",
    width: 330,
    height: 410,
  },
  /* maps */
  MapSearch: {
    id: "map_001",
    component: dynamic(() => import("./maps/map-search"), {
      loading: () => <AppLoadingState title="Map Search" />,
    }),
    title: "Map Search",
    icon: "🗺️",
    width: 495,
    height: 510,
  },
  StreetTour: {
    id: "map_002",
    component: dynamic(() => import("./maps/street-tour"), {
      loading: () => <AppLoadingState title="Street Tour" />,
    }),
    title: "Street Tour",
    icon: "🚶",
    width: 960,
    height: 710,
  },
  ScrollsLocation: {
    id: "map_003",
    component: dynamic(() => import("./maps/scrolls-location"), {
      loading: () => <AppLoadingState title="Scrolls Location" />,
    }),
    title: "Scrolls Location",
    icon: "📜",
    width: 910,
    height: 610,
  },
  Guide: {
    id: "map_004",
    component: dynamic(() => import("./maps/guide"), {
      loading: () => <AppLoadingState title="Guide" />,
    }),
    title: "Guide",
    icon: "🌙",
    width: 910,
    height: 670,
  },
  /* city guesser */
  CityGuesser: {
    id: "city_001",
    component: dynamic(() => import("./city-guesser/city-guesser"), {
      loading: () => <AppLoadingState title="City Guesser" />,
    }),
    title: "City Guesser",
    icon: "🌆",
    width: 895,
    height: 686,
  },
  Distance: {
    id: "city_002",
    component: dynamic(() => import("./city-guesser/distance"), {
      loading: () => <AppLoadingState title="Distance" />,
    }),
    title: "Distance",
    icon: "📏",
    width: 912,
    height: 615,
  },
  Time: {
    id: "city_003",
    component: dynamic(() => import("./city-guesser/time"), {
      loading: () => <AppLoadingState title="Time" />,
    }),
    title: "Time",
    icon: "⏰",
    width: 835,
    height: 618,
  },
  Temple: {
    id: "city_004",
    component: dynamic(() => import("./city-guesser/temple"), {
      loading: () => <AppLoadingState title="Temple" />,
    }),
    title: "Temple",
    icon: "🏯",
    width: 810,
    height: 674,
  },
  /* stocks */
  Metrics: {
    id: "stock_001",
    component: dynamic(() => import("./stocks/metrics"), {
      loading: () => <AppLoadingState title="Metrics" />,
    }),
    title: "Metrics",
    icon: "📊",
    width: 521,
    height: 610,
  },
  Watch: {
    id: "stock_002",
    component: dynamic(() => import("./stocks/watch"), {
      loading: () => <AppLoadingState title="Watch" />,
    }),
    title: "Watch",
    icon: "📈",
    width: 455,
    height: 640,
  },
  Mystic: {
    id: "stock_003",
    component: dynamic(() => import("./stocks/mystic"), {
      loading: () => <AppLoadingState title="Mystic" />,
    }),
    title: "Mystic",
    icon: "🔮",
    width: 570,
    height: 930,
  },
  PortFolio: {
    id: "stock_004",
    component: dynamic(() => import("./stocks/portfolio"), {
      loading: () => <AppLoadingState title="PortFolio" />,
    }),
    title: "PortFolio",
    icon: "📈",
    width: 700,
    height: 650,
  },
  /* token lab */
  AlchemyLab: {
    id: "token_001",
    component: dynamic(() => import("./token/lab"), {
      loading: () => <AppLoadingState title="Xetra Ai Lab" />,
    }),
    title: "Xetra AI Lab",
    icon: "🧪",
    width: 700,
    height: 700,
  },
  Dungeon: {
    id: "token_002",
    component: dynamic(() => import("./token/dungeon"), {
      loading: () => <AppLoadingState title="Dungeon" />,
    }),
    title: "Dungeon",
    icon: "🏰",
    width: 700,
    height: 700,
  },
  Market: {
    id: "token_003",
    component: dynamic(() => import("./token/market"), {
      loading: () => <AppLoadingState title="Market" />,
    }),
    title: "Market",
    icon: "📈",
    width: 700,
    height: 700,
  },
  Forge: {
    id: "token_004",
    component: dynamic(() => import("./token/forge"), {
      loading: () => <AppLoadingState title="Forge" />,
    }),
    title: "Forge",
    icon: "🔥",
    width: 700,
    height: 700,
  },
  /* youtube */
  MagicalPlayer: {
    id: "youtube_001",
    component: dynamic(() => import("./youtube/spell-tube"), {
      loading: () => <AppLoadingState title="Magical Player" />,
    }),
    title: "Magical Player",
    icon: "🎩",
    width: 700,
    height: 700,
  },
  VisualizerVideo: {
    id: "youtube_002",
    component: dynamic(() => import("./youtube/visualizer"), {
      loading: () => <AppLoadingState title="Visualizer" />,
    }),
    title: "Visualizer",
    icon: "🎵",
    width: 700,
    height: 700,
  },
  Chat: {
    id: "youtube_003",
    component: dynamic(() => import("./youtube/chat"), {
      loading: () => <AppLoadingState title="Chat" />,
    }),
    title: "Chat",
    icon: "💬",
    width: 700,
    height: 700,
  },
  Capture: {
    id: "youtube_004",
    component: dynamic(() => import("./youtube/capture"), {
      loading: () => <AppLoadingState title="Capture" />,
    }),
    title: "Capture",
    icon: "📸",
    width: 700,
    height: 700,
  },
  /* currency api */
  Exchange: {
    id: "currency_001",
    component: dynamic(() => import("./currency/exchange"), {
      loading: () => <AppLoadingState title="Exchange" />,
    }),
    title: "Exchange",
    icon: "💱",
    width: 580,
    height: 700,
  },
  Quest: {
    id: "currency_003",
    component: dynamic(() => import("./currency/quest"), {
      loading: () => <AppLoadingState title="Quest" />,
    }),
    title: "Quest",
    icon: "🏰",
    width: 700,
    height: 700,
  },
  Tax: {
    id: "currency_004",
    component: dynamic(() => import("./currency/tax"), {
      loading: () => <AppLoadingState title="Tax" />,
    }),
    title: "Tax",
    icon: "⚖️",
    width: 700,
    height: 700,
  },
  /* news */
  Dashboard: {
    id: "news_001",
    component: dynamic(() => import("./news/dashboard"), {
      loading: () => <AppLoadingState title="Dashboard" />,
    }),
    title: "Dashboard",
    icon: "📰",
    width: 700,
    height: 700,
  },
  EventReport: {
    id: "news_002",
    component: dynamic(() => import("./news/event"), {
      loading: () => <AppLoadingState title="Event Report" />,
    }),
    title: "Event Report",
    icon: "🚨",
    width: 700,
    height: 700,
  },
  Prophecy: {
    id: "news_003",
    component: dynamic(() => import("./news/prophecy"), {
      loading: () => <AppLoadingState title="Prophecy" />,
    }),
    title: "Prophecy",
    icon: "🔮",
    width: 700,
    height: 700,
  },
  Realm: {
    id: "news_004",
    component: dynamic(() => import("./news/network"), {
      loading: () => <AppLoadingState title="Realm" />,
    }),
    title: "Realm",
    icon: "🌌",
    width: 700,
    height: 700,
  },
  /* sports */
  Teams: {
    id: "sports_001",
    component: dynamic(() => import("./sports/teams"), {
      loading: () => <AppLoadingState title="Teams" />,
    }),
    title: "Teams",
    icon: "🏆",
    width: 510,
    height: 700,
  },
  Upcoming: {
    id: "sports_002",
    component: dynamic(() => import("./sports/upcoming"), {
      loading: () => <AppLoadingState title="Upcoming" />,
    }),
    title: "Upcoming",
    icon: "📅",
    width: 700,
    height: 700,
  },
  Top: {
    id: "sports_003",
    component: dynamic(() => import("./sports/top-league"), {
      loading: () => <AppLoadingState title="Top League" />,
    }),
    title: "Top League",
    icon: "🏆",
    width: 510,
    height: 700,
  },
  TeamSearch: {
    id: "sports_004",
    component: dynamic(() => import("./sports/team-search"), {
      loading: () => <AppLoadingState title="Team Search" />,
    }),
    title: "Team Search",
    icon: "🔍",
    width: 700,
    height: 700,
  },
  /* ai within ai */
  AiChat: {
    id: "ai_001",
    component: dynamic(() => import("./ai/chat"), {
      loading: () => <AppLoadingState title="Ai Chat" />,
    }),
    title: "Ai Chat",
    icon: "💬",
    width: 700,
    height: 700,
  },
  Transcribe: {
    id: "ai_002",
    component: dynamic(() => import("./ai/transcribe"), {
      loading: () => <AppLoadingState title="Transcribe" />,
    }),
    title: "Transcribe",
    icon: "🔊",
    width: 700,
    height: 700,
  },
  Vision: {
    id: "ai_003",
    component: dynamic(() => import("./ai/vision"), {
      loading: () => <AppLoadingState title="Vision" />,
    }),
    title: "Vision",
    icon: "👁️",
    width: 700,
    height: 700,
  },
  SpellGen: {
    id: "ai_004",
    component: dynamic(() => import("./ai/spell-gen"), {
      loading: () => <AppLoadingState title="Spell Gen" />,
    }),
    title: "Spell Gen",
    icon: "🧙",
    width: 700,
    height: 700,
  },
  /* image */
  Canvas: {
    id: "image_001",
    component: dynamic(() => import("./image/canvas"), {
      loading: () => <AppLoadingState title="Canvas" />,
    }),
    title: "Canvas",
    icon: "✧",
    width: 700,
    height: 700,
  },
  ForgeImage: {
    id: "image_002",
    component: dynamic(() => import("./image/forge"), {
      loading: () => <AppLoadingState title="Forge" />,
    }),
    title: "Forge",
    icon: "⚜️",
    width: 700,
    height: 700,
  },
  /* qr */
  Sigil: {
    id: "qr_001",
    component: dynamic(() => import("./qr/sigil"), {
      loading: () => <AppLoadingState title="Sigil" />,
    }),
    title: "Sigil",
    icon: "📿",
    width: 700,
    height: 700,
  },
  Runic: {
    id: "qr_002",
    component: dynamic(() => import("./qr/runic"), {
      loading: () => <AppLoadingState title="Runic" />,
    }),
    title: "Runic",
    icon: "🔮",
    width: 700,
    height: 700,
  },
  /* speech to text */
  Speech: {
    id: "speech_001",
    component: dynamic(() => import("./speech/speech"), {
      loading: () => <AppLoadingState title="Speech" />,
    }),
    title: "Speech",
    icon: "🔊",
    width: 700,
    height: 700,
  },
  Oracle: {
    id: "speech_002",
    component: dynamic(() => import("./speech/oracle"), {
      loading: () => <AppLoadingState title="Oracle" />,
    }),
    title: "Oracle",
    icon: "🔮",
    width: 700,
    height: 700,
  },
  Scribe: {
    id: "speech_003",
    component: dynamic(() => import("./speech/scribe"), {
      loading: () => <AppLoadingState title="Scribe" />,
    }),
    title: "Scribe",
    icon: "📜",
    width: 700,
    height: 700,
  },
  Crystal: {
    id: "speech_004",
    component: dynamic(() => import("./speech/crystal"), {
      loading: () => <AppLoadingState title="Crystal" />,
    }),
    title: "Crystal",
    icon: "💎",
    width: 700,
    height: 700,
  },
};

export const getApps = () =>
  Object.entries(AppComponents).map(([, app], index) => ({
    id: index + 1,
    title: app.title,
    icon: app.icon,
    component: app.component,
  }));

export const getAppById = (id: string) => {
  const app = Object.values(AppComponents).find((app) => app.id === id);

  if (!app) {
    return {
      title: "App Not Found",
      component: () => <div>App Not Found</div>,
      icon: "❌",
    };
  }

  return app;
};
