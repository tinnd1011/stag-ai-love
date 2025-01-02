import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface SwiperCardProps {
  title: string;
  description: string;
  icon: string;
  cover: string;
  link: string;
}

interface SwiperProps {
  cards: SwiperCardProps[];
}

const FeaturedAppsSwiper = ({ cards }: SwiperProps) => {

  const router = useRouter();

  return (
    <div className="relative w-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        pagination={{
          clickable: true,
          el: ".swiper-pagination-custom", // Custom pagination element
          bulletClass: "swiper-pagination-bullet-custom",
          bulletActiveClass: "swiper-pagination-bullet-active-custom",
          renderBullet: function (index, className) {
            return `<span class="${className}"></span>`;
          },
        }}
        loop={true}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        watchSlidesProgress
      >
        {cards.map((card, index) => (
          <SwiperSlide
            key={index}
            className="!w-full !h-[382px] md:!h-[299px] overflow-y-hidden"
          >
            <div className="w-full cursor-pointer p-[1px] relative h-full">
              <div className="absolute w-full h-full p-[2px] top-0 left-0 z-0 rounded-[34px] bg-[linear-gradient(130deg,#8EC9FF_9%,#FF306E_56%,#F1D789_95%)]">
                <div className="w-full h-full relative">
                  <Image
                    src={card.cover}
                    alt="cover"
                    fill
                    style={{
                      objectFit: "cover",
                    }}
                    className="rounded-[32px]"
                  />
                </div>
              </div>

              {/*bg-[url('/images/app-store/featured-bg.png')] bg-cover bg-no-repeat bg-left bg-white*/}
              <div
                className="relative z-10
                h-full
                rounded-[32px]
                md:pl-10 md:pr-16 md:py-16
                pl-4 py-8 pr-6
                "
              >
                <div
                  className="flex flex-col-reverse gap-6
                md:items-center md:flex-row md:gap-0
                justify-between"
                >
                  <div className="flex flex-col">
                    {/* app title */}
                    <h3 className="text-[32px] tracking-[-0.8px] text-3xl text-white font-semibold line-clamp-2">
                      {card.title}
                    </h3>

                    {/* app description */}
                    <p
                      className="mt-2 mb-6 
                    h-[40px] line-clamp-2 md:max-w-[800px]
                     text-[14px] leading-5 tracking-[-0.14px] font-medium text-[#fff]"
                    >
                      {card.description}
                    </p>
                    <button
                      onClick={() => router.push(card.link)}
                    className="w-fit rounded-3xl p-1 bg-[linear-gradient(130deg,#8EC9FF_9%,#FF306E_56%,#F1D789_95%)]">
                      <div className="rounded-2xl px-10 py-2 text-[#0E121B] bg-white text-[16px] leading-6 font-semibold tracking-[-0.16px]">
                        Try Now
                      </div>
                    </button>
                  </div>

                  {/* app icon - author icon ? */}
                  <Image
                    src={card.icon}
                    alt="icon"
                    width={161.333}
                    height={161.333}
                    className="shrink-0 hidden md:block rounded-full"
                  />

                  <Image
                    src={card.icon}
                    alt="icon"
                    width={100.833}
                    height={100.833}
                    className="shrink-0 block md:hidden rounded-full"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        {/* Custom pagination container */}
        <div className="swiper-pagination-custom flex justify-center items-center gap-2 mt-8" />
      </Swiper>
    </div>
  );
};

export default FeaturedAppsSwiper;
