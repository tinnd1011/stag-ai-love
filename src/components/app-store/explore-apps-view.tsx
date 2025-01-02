import Image from "next/image";
import FeaturedApps from "./featured-apps";
import TrendingApps from "./trending-apps";
import exploreIcon from "@/images/app-store/explore.svg";
import sportsIcon from "@/images/app-store/categories/sports.svg";
import mapsIcon from "@/images/app-store/categories/maps.svg";
import web3Icon from "@/images/app-store/categories/web3.svg";
import textIcon from "@/images/app-store/categories/text.svg";
import { useRouter } from "next/navigation";

const MOCK_TOP_CATEGORIES = [
  {
    title: "Web3",
    icon: web3Icon,
    category: "All",
  },
  {
    title: "Sports",
    icon: sportsIcon,
    category: "Sports",
  },
  {
    title: "Maps",
    icon: mapsIcon,
    category: "Maps",
  },
  {
    title: "Text",
    icon: textIcon,
    category: "Text Analysis",
  },
];

export default function ExploreAppsView() {
  const router = useRouter();

  return (
    <div
      className="w-full flex flex-col gap-6 pb-10 md:pb-0 relative h-[calc(100vh-4rem)] overflow-y-auto
    standard-scroll
    "
    >
      {/* header */}
      <h1
        className="flex items-center justify-start gap-4 font-semibold text-[32px] leading-normal tracking-[-0.8px] text-[#1b1b1b]
        md:px-10 px-4
      "
      >
        <Image src={exploreIcon} alt="Explore" width={32} height={32} />
        <span>Explore</span>
      </h1>

      {/* swiper */}
      <FeaturedApps />

      {/* top categories */}
      <div>
        <h1
          className="flex items-center justify-start gap-4 font-semibold text-2xl leading-normal tracking-[-0.8px] text-[#1b1b1b]
        md:px-10 px-4
        "
        >
          <span>Top Categories</span>

          <button
            onClick={() => router.push("?type=store&tag=All")}
            className="text-[#ff306e] font-semibold text-base"
          >
            Show all
          </button>
        </h1>

        <div className="mt-4">
          <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide md:px-10 px-4 flex-wrap">
            {MOCK_TOP_CATEGORIES.map((category, index) => (
              <button
                key={category.title}
                onClick={() => {
                  router.push(`?type=store&tag=${category.category}`);
                }}
                className="flex items-center md:w-full w-fit md:max-w-[150px] gap-3 md:py-2 md:px-5
                py-1 px-2.5
                rounded-2xl bg-white shadow-sm
                  hover:scale-105 transition-transform duration-300 ease-in-out 
                "
              >
                <Image
                  src={category.icon}
                  alt={category.title}
                  width={24}
                  height={24}
                />
                <span className="text-base font-semibold tracking-[-0.14px] text-[#1b1b1b]">
                  {category.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* trending apps */}
      <TrendingApps />
    </div>
  );
}
