import authorProfileImage from "@/images/app-store/author.png";
import CategorizedAppsSwiper from "../ui/swiper/categorized-apps-swiper";
/* sports */
import s1 from "@/images/app-store/vulcan/rival.jpg";
import s2 from "@/images/app-store/vulcan/upcoming.webp";
import sr3 from "@/images/app-store/sports/3.jpg";
import sr4 from "@/images/app-store/sports/3.png";

/* chat */
import c1 from "@/images/app-store/chat/1.jpeg";
import c2 from "@/images/app-store/chat/2.png";

/* media */
import m1 from "@/images/app-store/vulcan/knight.jpg";
import m2 from "@/images/app-store/media/m2.png";

/* map */
import ma1 from "@/images/app-store/vulcan/knowledge.png";
import ma2 from "@/images/app-store/vulcan/path-finder.png";
import ma3 from "@/images/app-store/maps/3.png";
import ma4 from "@/images/app-store/maps/4.png";

/* city */
import ci1 from "@/images/app-store/vulcan/cityguesser.png";
import ci2 from "@/images/app-store/vulcan/distance.jpg";

import ancient from "@/images/app-store/city/ancient.jpg";

/* text */
import t1 from "@/images/app-store/vulcan/text.png";
import t2 from "@/images/app-store/text/2.png";

export default function CategorizedApps({ category }: { category: string }) {
  const MOCK_DATA = {
    Sports: [
      {
        id: "sports_001",
        title: "Team Rivalry Explorer",
        description:
          "Explore and analyze historical team rivalries with comprehensive match statistics and head-to-head records. Track performance trends and memorable moments between rival teams across multiple seasons.",
        icon: authorProfileImage.src,
        type: "prebuilt",
        cover: s1.src,
      },
      {
        id: "sports_002",
        title: "Upcoming Sports Events",
        description:
          "Stay updated with a comprehensive calendar of upcoming sports events, matches, and tournaments across different leagues. Get detailed information about venues, teams, and match predictions for each event.",
        icon: authorProfileImage.src,
        type: "prebuilt",
        cover: s2.src,
      },
      {
        id: "sports_003",
        title: "National Tournaments",
        description:
          "Search and explore national-level tournaments across different countries and sports. Get key details about championships, venues, and participating teams.",
        icon: authorProfileImage.src,
        type: "prebuilt",
        cover: sr4.src,
      },
      {
        id: "sports_004",
        title: "Sport Team Search",
        description:
          "Discover detailed histories of sports teams from around the world. Search any team to instantly view their stadium, leagues, and legacy.",
        icon: authorProfileImage.src,
        type: "prebuilt",
        cover: sr3.src,
      },
    ],
    Chat: [
      {
        id: "speech_001",
        title: "Speech to Text",
        description:
          "Advanced speech recognition system that converts spoken words into written text with high accuracy across multiple languages. Features real-time transcription and support for various accents and dialects.",
        icon: authorProfileImage.src,
        type: "prebuilt",
        cover: c1.src,
      },
      {
        id: "ai_002",
        title: "Fantasy Rewriter",
        description:
          "Transform everyday text into enchanting fantasy-style prose with magical flair. Convert mundane messages into epic tales worthy of ancient scrolls and mystical tomes.",
        icon: authorProfileImage.src,
        type: "prebuilt",
        cover: c2.src,
      },
    ],
    "Media Player": [
      {
        id: "youtube_003",
        title: "Knight Watch",
        description:
          "Specialized video player dedicated to medieval battle scenes, historical warfare, and knight combat footage. Features curated playlists of historical documentaries and battle reenactments with expert commentary.",
        icon: authorProfileImage.src,
        type: "prebuilt",
        cover: m1.src,
      },
      {
        id: "youtube_001",
        title: "Smart Player",
        description:
          "Enhanced YouTube video player with advanced playback features and customizable viewing experience. Includes playlist management, smart recommendations, and integrated community features.",
        icon: authorProfileImage.src,
        type: "prebuilt",
        cover: m2.src,
      },
    ],
    Maps: [
      {
        id: "map_003",
        title: "Knowledge Graph",
        description:
          "Visual mapping tool for exploring and understanding complex relationships in large datasets. Create interactive network diagrams that reveal hidden connections and patterns within your information.",
        icon: authorProfileImage.src,
        type: "prebuilt",
        cover: ma1.src,
      },
      {
        id: "map_002",
        title: "Realm Explorer",
        description:
          "Interactive map explorer designed for fantasy worlds and virtual gaming environments. Navigate through detailed landscapes while discovering hidden locations and tracking in-game events.",
        icon: authorProfileImage.src,
        type: "prebuilt",
        cover: ma2.src,
      },
      {
        id: "map_001",
        title: "Map Master",
        description:
          "Discover detailed location information with an intuitive map search interface. Find places worldwide and instantly view their maps, local time, weather conditions, and ratings.",
        icon: authorProfileImage.src,
        type: "prebuilt",
        cover: ma3.src,
      },
      {
        id: "map_004",
        title: "Path Finder",
        description:
          "Find optimal routes between locations with multiple transportation options. Compare travel methods from walking to public transit, complete with time estimates and turn-by-turn directions.",
        icon: authorProfileImage.src,
        type: "prebuilt",
        cover: ma4.src,
      },
    ],
    City: [
      {
        id: "city_001",
        title: "City Guesser",
        description:
          "Engaging game that challenges players to identify cities from photos, street views, and cultural clues. Test your geographic knowledge while learning about different urban landscapes and cultures.",
        icon: authorProfileImage.src,
        type: "prebuilt",
        cover: ci1.src,
      },
      {
        id: "city_002",
        title: "Distance Calculator",
        description:
          "Precise tool for calculating distances between cities with support for multiple transportation modes and routing options. Compare different routes while considering traffic patterns and travel restrictions.",
        icon: authorProfileImage.src,
        type: "prebuilt",
        cover: ci2.src,
      },
      {
        id: "city_004",
        title: "Acient Ruins Explorer",
        description:
          "Explore historical sites and ancient ruins through immersive street and aerial views. Test your knowledge by identifying famous archaeological locations while learning about their civilization, time period, and fascinating historical facts.",
        icon: authorProfileImage.src,
        type: "prebuilt",
        cover: ancient.src,
      },
    ],
    "Text Analysis": [
      {
        id: "ocr_001",
        title: "Text Analysis Toolkit",
        description:
          "Comprehensive suite of text analysis tools for processing and understanding written content. Perform sentiment analysis, keyword extraction, and readability assessments with detailed reporting.",
        icon: authorProfileImage.src,
        type: "prebuilt",
        cover: t1.src,
      },
      {
        id: "ocr_002",
        title: "Fantasy Spell Recipe",
        description:
          "Mystical tool for translating and interpreting magical spells across different magical traditions and languages. Understand the nuances of incantations while exploring their historical origins.",
        icon: authorProfileImage.src,
        type: "prebuilt",
        cover: t2.src,
      },
    ],
  };

  return (
    <div
      className="
    "
    >
      <div className="w-full  flex flex-col gap-y-8">
        {category === "All" ? (
          Object.keys(MOCK_DATA).map((category) => (
            <CategorizedAppsSwiper
              key={category}
              category={category}
              cards={MOCK_DATA[category as keyof typeof MOCK_DATA]}
            />
          ))
        ) : (
          <CategorizedAppsSwiper
            key={category}
            category={category}
            cards={MOCK_DATA[category as keyof typeof MOCK_DATA]}
          />
        )}
      </div>
    </div>
  );
}
