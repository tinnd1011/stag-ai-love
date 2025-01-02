import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import arrowIcon from "@/images/app-store/arrow-right.svg";

interface SwiperCardProps {
  title: string;
  description: string;
  icon: string;
}

interface SwiperProps {
  cards: SwiperCardProps[];
}

const TrendingAppsSwiper = ({ cards }: SwiperProps) => {
  return (
    <Swiper
      modules={[Navigation]}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: null, // Disable previous button
      }}
      loop={true}
      slidesPerView={"auto"}
      spaceBetween={16}
      watchSlidesProgress
    >
      {cards.map((card, index) => (
        <SwiperSlide key={index} className="!w-[352px]">
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

            <div className="bg-white rounded-2xl px-4 py-5 shadow-sm flex items-center justify-start gap-4 relative z-20">
              {/* author icon */}
              <Image
                src={card.icon}
                alt="icon"
                width={44}
                height={44}
                className="shrink-0"
              />

              <div className="flex flex-col gap-y-2 items-start">
                {/* app title */}
                <h3 className="font-semibold text-[16px] leading-6 tracking-[-0.16px] text-[#0E121B]">
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
        </SwiperSlide>
      ))}
      <button
        className="swiper-button-next absolute z-10 right-2.5 top-1/2 -translate-y-1/2 
          border-[1.364px] border-[#EAEAEA] bg-[rgba(194,194,194,0.10)]
          shadow-[0px_15px_20px_0px_rgba(0,0,0,0.05)]
          backdrop-blur-[13.636363983154297px]
        w-[60px] h-[60px]  rounded-full flex items-center justify-center transition-colors"
      >
        <Image src={arrowIcon} alt="arrow icon" width={32.73} height={32.73} />
      </button>
    </Swiper>
  );
};

export default TrendingAppsSwiper;
