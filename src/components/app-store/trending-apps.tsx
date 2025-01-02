import trendingAuthorProfileImage from "@/images/app-store/trending-author.png";
import TrendingAppsSwiper from "../ui/swiper/trending-apps-swiper";
import Image from "next/image";
import cover01 from "@/images/app-store/vulcan/rival.jpg";
import cover02 from "@/images/app-store/vulcan/upcoming.webp";
import cover03 from "@/images/app-store/vulcan/text.png";
import cover04 from "@/images/app-store/vulcan/knight.jpg";
import cover05 from "@/images/app-store/vulcan/knowledge.png";
import cover06 from "@/images/app-store/vulcan/path-finder.png";
import cover07 from "@/images/app-store/vulcan/cityguesser.png";
import cover08 from "@/images/app-store/vulcan/distance.jpg";
import { useRouter } from "next/navigation";

export default function TrendingApps() {
  const router = useRouter();

  const MOCK_TRENDING_APPS = [
    {
      title: "Team Rivalry Explorer",
      description:
        "Analyze historical matchups, head-to-head statistics, and rivalry intensities between sports teams to uncover competitive patterns and trends.",
      icon: trendingAuthorProfileImage.src,
      id: "sports_001",
      cover: cover01.src,
    },
    {
      title: "Upcoming Sports Events",
      description:
        "Track and discover upcoming sports matches, tournaments, and championships across multiple leagues and sports categories worldwide.",
      icon: trendingAuthorProfileImage.src,
      id: "sports_002",
      cover: cover02.src,
    },
    {
      title: "Text Analysis Toolkit",
      description:
        "Powerful text analysis tools for sentiment analysis, keyword extraction, and content classification using advanced NLP algorithms.",
      icon: trendingAuthorProfileImage.src,
      id: "ocr_001",
      cover: cover03.src,
    },
    {
      title: "Knight Watch",
      description:
        "Strategic chess analysis tool that helps players evaluate positions, analyze games, and improve their tactical awareness in real-time.",
      icon: trendingAuthorProfileImage.src,
      id: "youtube_003",
      cover: cover04.src,
    },
    {
      title: "Knowledge Graph",
      description:
        "Visualize and explore complex relationships between data points, creating interactive network diagrams for better understanding of connections.",
      icon: trendingAuthorProfileImage.src,
      id: "map_003",
      cover: cover05.src,
    },
    {
      title: "Distance Finder",
      description:
        "Advanced routing algorithm tool that calculates optimal paths between points while considering various constraints and preferences.",
      icon: trendingAuthorProfileImage.src,
      id: "map_002",
      cover: cover06.src,
    },
    {
      title: "Street Guesser",
      description:
        "Interactive game that challenges users to identify locations worldwide based on street-level imagery and environmental clues.",
      icon: trendingAuthorProfileImage.src,
      id: "city_001",
      cover: cover07.src,
    },
    {
      title: "Distance Calculator",
      description:
        "Precise tool for measuring distances between multiple points on a map, supporting various distance metrics and transportation modes.",
      icon: trendingAuthorProfileImage.src,
      id: "city_002",
      cover: cover08.src,
    },
  ];

  const handleTryApp = (id: string) => {
    router.push(`?type=pb-apps&appId=${id}`);
  };

  return (
    <div
      className="w-full 
  md:pl-10 pl-4
"
    >
      <div className="relative w-full ">
        {/* section title */}
        <h2 className="mb-4 text-[24px] font-semibold leading-normal tracking-[-0.48px] text-primary-black">
          Featured Apps
        </h2>

        {/* all trending apps */}
        <div className="flex gap-4 flex-wrap">
          {MOCK_TRENDING_APPS.map((card, index) => (
            <button
              key={index}
              className="!w-[352px] hover:scale-105 transition-transform duration-300 ease-in-out"
              onClick={() => handleTryApp(card.id)}
            >
              <div
                className="w-full p-1 rounded-3xl relative group
            "
              >
                <div
                  className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(130deg,#8EC9FF_9%,#FF306E_56%,#F1D789_95%)] rounded-3xl opacity-0
              transition-all duration-300 ease-in-out
              group-hover:opacity-20
              "
                ></div>

                <div className="bg-white rounded-2xl shadow-sm flex items-center justify-start gap-4 relative z-20">
                  <div className="w-full h-full absolute top-0 left-0 rounded-2xl">
                    <div className="w-full h-full relative">
                      {/* author icon -> should be app cover*/}
                      <Image
                        src={card.cover}
                        alt="icon"
                        fill
                        style={{ objectFit: "cover" }}
                        className="rounded-2xl"
                      />
                    </div>
                  </div>

                  <div
                    className="flex flex-col gap-y-2 items-start relative z-20 pt-12 rounded-2xl
                    bg-gradient-to-t from-black via-black via-[30%] to-transparent
                    w-full h-full
                  px-4 py-5 
                  "
                  >
                    {/* app title */}
                    <h3 className="font-semibold text-[16px] leading-6 tracking-[-0.16px] text-[#fff]">
                      {card.title}
                    </h3>
                    {/* app description */}
                    <p
                      className="text-[#99A0AE] text-[14px] leading-5 font-normal tracking-[-0.21px] h-[60px]
                    line-clamp-3
                  "
                    >
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
