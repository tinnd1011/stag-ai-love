import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import arrowIcon from "@/images/app-store/arrow-right.svg";
import { useRouter } from "next/navigation";

interface SwiperCardProps {
  title: string;
  description: string;
  icon: string;
  id: string;
  type: string;
  cover?: string;
}

interface SwiperProps {
  category: string;
  cards: SwiperCardProps[];
}

const CategorizedAppsSwiper = ({ category, cards }: SwiperProps) => {
  const router = useRouter();

  const handleTryApp = (id: string, type: string) => {
    if (type === "prebuilt") {
      router.push(`?type=pb-apps&appId=${id}&tag=${category}`);
    } else {
      router.push(`?type=chat&chatId=${id}&og=store`);
    }
  };

  return (
    <div className="relative w-full ">
      <h2 className="mb-4 text-[24px] font-semibold leading-normal tracking-[-0.48px] text-primary-black">
        {category}
      </h2>

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
          <SwiperSlide key={index} className="!w-[260px]">
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

              <div className="bg-white rounded-2xl shadow-sm relative z-20">
                {card.cover && (
                  <div className="w-full h-full absolute top-0 left-0 rounded-2xl">
                    <div className="w-full h-full relative">
                      <Image
                        src={card.cover}
                        alt="icon"
                        fill
                        style={{ objectFit: "cover" }}
                        className="rounded-2xl"
                      />
                    </div>
                  </div>
                )}

                <div className="w-full h-full px-6 pb-4 relative z-20 rounded-2xl pt-16 bg-gradient-to-t from-black via-black via-[20%] to-transparent">
                  {/* app title */}
                  <h3 className="font-semibold text-[16px] leading-6 tracking-[-0.16px] text-white mb-1.5 mt-4">
                    {card.title}
                  </h3>

                  {/* app description */}
                  <p className="text-[#fff] text-[12px] leading-4 font-normal tracking-[-0.12px] h-[48px] line-clamp-3">
                    {card.description}
                  </p>

                  {/* app button */}
                  <button
                    onClick={() => handleTryApp(card.id, card.type)}
                    className="mt-8 bg- rounded-3xl p-1 bg-[linear-gradient(130deg,#8EC9FF_9%,#FF306E_56%,#F1D789_95%)]"
                  >
                    <div
                      className="rounded-2xl px-8 py-1.5 text-[#0E121B] bg-white
                  text-[14px] leading-5 font-semibold tracking-[-0.14px]
                "
                    >
                      Try Now
                    </div>
                  </button>
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
          <Image
            src={arrowIcon}
            alt="arrow icon"
            width={32.73}
            height={32.73}
          />
        </button>
      </Swiper>
    </div>
  );
};

export default CategorizedAppsSwiper;
