import Image from "next/image";
import UserCredits from "../user-credits";
import arrowIcon from "@/images/pre-built-app/arrow-left.svg";
import { useRouter, useSearchParams } from "next/navigation";
import { getAppById } from "./app-store/apps";
import React, { useState } from "react";

export default function PrebuiltApp() {
  const router = useRouter();
  const appId = useSearchParams().get("appId") ?? "";
  const tag = useSearchParams().get("tag") ?? "";

  const [isGameStarted, setIsGameStarted] = useState(false);

  const handleBackStore = () => {
    router.push(`?type=store&tag=${tag}`);
  };

  return (
    <div className="w-full flex flex-col pb-20 md:pb-0 animate-slide-in-right">
      {/* head bar */}
      <div className="md:flex justify-between md:px-10 px-4">
        {/* header */}
        <h1
          className="flex items-center justify-start gap-4 font-semibold text-[32px] leading-normal tracking-[-0.8px] text-[#1b1b1b]
         h-16
      "
        >
          <button onClick={handleBackStore}>
            <Image src={arrowIcon} alt="Explore" width={24} height={24} />
          </button>
          <span>My AI DApp</span>
        </h1>

        {/* user credits */}
        <UserCredits />
      </div>

      {/* app content */}
      <div className="w-full h-[calc(100vh-64px-48px-24px)] mt-6 flex items-center justify-center">
        {/* app space */}
        <div
          className="px-2 pt-2 pb-[16px] rounded-3xl max-w-[calc(100%-60px)] max-h-[calc(100%-60px)] 
          overflow-y-auto flex flex-col items-end 
          transition-all duration-300 ease-in-out
        bg-[linear-gradient(153deg,#FFF4F4_14.31%,#6767FF_79.97%,#F06DFF_89.07%,#F1D789_100.43%)]
        "
        >
          <div className="w-full max-h-[calc(100%-60px)] overflow-y-scroll custom-scrollbar rounded-3xl relative">
            {!isGameStarted && (
              <div className="flex items-center justify-center absolute left-0 bg-white top-0 w-full h-full z-50">
                <button
                  onClick={() => setIsGameStarted(true)}
                  className="hover:scale-105 transition-all duration-200 ease-in-out
              p-[3px] rounded-full bg-[linear-gradient(130deg,#8EC9FF_9%,#FF306E_56%,#F1D789_95%)]"
                >
                  <div className="px-10 py-3 text-[#FFF] text-[16px] font-semibold leading-6 tracking-[-0.16px] bg-primary-black rounded-full">
                    Start Game
                  </div>
                </button>
              </div>
            )}

            {React.createElement(getAppById(appId).component)}
          </div>

          <div
            className="w-full text-center mt-4
          text-[24px] font-semibold leading-normal tracking-[-0.48px] text-[#F5F6FA]
          "
          >
            {getAppById(appId).title}
          </div>
        </div>
      </div>
    </div>
  );
}
