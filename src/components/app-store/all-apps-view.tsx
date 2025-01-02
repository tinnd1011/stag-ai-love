import Image from "next/image";
import searchIcon from "@/images/app-store/search.svg";
import CategorizedApps from "./categorized-apps";
import arrowIcon from "@/images/pre-built-app/arrow-left.svg";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function AllAppsView() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const tag = searchParams.get("tag");

  const MOCK_UP_CATEGORIES = [
    "Sports",
    "Chat",
    "Media Player",
    "Maps",
    "City",
    "Text Analysis",
  ];

  const handleSelectCategory = (category: string) => {
    router.push(`?type=store&tag=${category}`);
  };

  useEffect(() => {
    if (tag && !MOCK_UP_CATEGORIES.includes(tag)) {
      handleSelectCategory("All");
    }
  }, [tag]);

  return (
    <div
      className="w-full h-[calc(100vh-48px)] bg-[url('/images/background-main.png')] fixed top-0 left-0 z-20
      md:pl-10 pl-4 pb-10 overflow-y-scroll standard-scroll"
    >
      <h1
        className="flex items-center justify-start gap-4 font-semibold text-xl leading-normal tracking-[-0.8px] text-[#1b1b1b]
         h-16
      "
      >
        <button onClick={() => router.push("?type=store")}>
          <Image src={arrowIcon} alt="Explore" width={20} height={20} />
        </button>
        <span>Explore Apps</span>
      </h1>

      {/* search bar */}
      <div className="w-full mt-6">
        <div
          className="w-full rounded-full py-3 px-4 border-4 border-[rgba(255,255,255,0.50)] flex items-center gap-3 bg-white
        "
        >
          <Image src={searchIcon} alt="Search" width={24} height={24} />

          <input
            type="text"
            placeholder="Search"
            className="outline-none bg-transparent w-full text-sm placeholder:text-[14px] placeholder:leading-5 placeholder:font-medium
          text-[14px] leading-5 tracking-[-0.14px] text-[#1b1b1b] placeholder:text-[#AEAEAE]
          "
          />
        </div>
      </div>

      {/* categories */}
      <div className="w-full my-6 justify-start flex items-center gap-3 flex-wrap text-[14px] leading-5 font-semibold tracking-[-0.14px]">
        {/* all  */}
        <button
          className={`px-8 py-3 rounded-full 
          ${
            tag === "All"
              ? "bg-[#1b1b1b] text-white"
              : "bg-[#FAFAFA] text-[#666] hover:bg-[#1b1b1b] hover:text-white "
          }
          transition-colors duration-200 ease-in-out 

          `}
          onClick={() => handleSelectCategory("All")}
        >
          All
        </button>

        {/* others */}
        {MOCK_UP_CATEGORIES.map((item) => (
          <button
            key={item}
            className={` px-5 py-3 rounded-full
              transition-colors duration-200 ease-in-out 
              ${
                tag === item
                  ? "bg-[#1b1b1b] text-white"
                  : "bg-[#FAFAFA] text-[#666] hover:bg-[#1b1b1b] hover:text-white "
              }
            `}
            onClick={() => handleSelectCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {/* categorized apps */}
      <CategorizedApps category={tag ?? "All"} />
    </div>
  );
}
