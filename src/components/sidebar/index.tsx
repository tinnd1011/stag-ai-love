import { useEffect, useState } from "react";
import { menus } from "@/utils/menu";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import BtnConnectWallet from "../button/connect-wallet";
import { IconItem } from "./icons";
import collapseIcon from "@/images/sidebar/collapse.svg";
import logoIcon from "@/images/sidebar/logo.svg";

const SideBar = ({
  isMinimized,
  setIsMinimized,
}: {
  isMinimized: boolean;
  setIsMinimized: (value: boolean) => void;
}) => {
  const currentPage = useSearchParams().get("type");
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768; // md breakpoint
      setIsMinimized(isMobile);
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsMinimized]);

  const handleActiveTab = (index: number) => {
    const newTab = menus[index].hash;
    router.push(`?type=${newTab}`);
  };

  const isTabActive = (pageHash: string) => {
    return currentPage === pageHash;
  };

  return (
    <section
      className={`border-r-2 border-[#F5F5F7]
    py-8 bg-[#FFF] h-svh lg:flex flex-col justify-between
    transition-all duration-300 ease-in-out
    ${
      isMinimized
        ? "md:w-[104px] w-0 md:overflow-visible overflow-hidden"
        : "w-[272px]"
    }
      absolute top-0 left-0 md:relative
      z-[5]
    `}
    >
      <div className="w-full relative">
        <div className="w-full flex items-center justify-between relative">
          <div
            className={`flex items-center justify-center cursor-pointer
            ${
              isMinimized
                ? "justify-center w-full"
                : "ml-6 justify-start gap-x-3"
            }
            `}
          >
            <figure>
              <Image src={logoIcon} alt="icon logo" width={32} height={32} />
            </figure>
            <span
              className={`
                lg:text-[24px] overflow-hidden font-semibold text-primary-black font-neueHass text-nowrap
                ${isMinimized ? "w-0" : "w-[101px]"}
                transition-all duration-300 ease-in-out
                `}
            >
              Xetra AI{" "}
            </span>
          </div>

          <button
            className={`absolute transition-all duration-300 ease-in-out bg-white
            ${isMinimized ? " translate-x-1/2 right-0 rotate-180" : "right-6"}
            `}
            onClick={() => setIsMinimized(!isMinimized)}
          >
            <Image
              src={collapseIcon}
              alt="collapse icon"
              width={32}
              height={32}
            />
          </button>
        </div>

        <div className="w-full pr-6">
          <div className="mt-10 relative z-[2] w-full">
            {menus.map((menu, index) => (
              <button
                onClick={() => handleActiveTab(index)}
                key={index}
                className={`w-full flex cursor-pointer mb-2 items-center gap-x-5`}
              >
                <div
                  className={`w-2 h-11 rounded-r-[3px] shrink-0
                ${isTabActive(menu.hash) ? "bg-[#1B1B1B]" : "bg-transparent"}
                `}
                ></div>
                <div
                  className={`
                    w-full flex items-center py-3 px-4 h-[48px] rounded-lg
                    ${
                      isTabActive(menu.hash)
                        ? "bg-[rgba(27,27,27,0.05)]"
                        : "bg-transparent"
                    }
                    ${
                      isMinimized ? "justify-start" : "justify-start gap-x-2.5 "
                    }
                    `}
                >
                  <div className="shrink-0">
                    <IconItem
                      index={index}
                      isActive={menu.hash === currentPage}
                    />
                  </div>
                  <span
                    className={`text-[#1B1B1B] text-[14px] leading-[20px] tracking-[-0.14px] font-semibold text-nowrap text-left
                    ${isMinimized ? "w-0" : "w-[158px]"}
                    overflow-hidden transition-all duration-100 ease-in-out
                    `}
                  >
                    {menu.title}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full px-6 relative z-[2]">
        <BtnConnectWallet isMinimized={isMinimized} />
      </div>
    </section>
  );
};

export default SideBar;
