import creatorIcon from "@/images/earn/creator.svg";
import innovatorIcon from "@/images/earn/innovator.svg";
import exploreIcon from "@/images/earn/explore.svg";
import { Card } from "@/components/earn/card";
import { useState } from "react";

export default function CreditsPopup() {
  const cards = [
    {
      icon: exploreIcon,
      title: "Explore",
      price: 9,
      credits: 225,
    },
    {
      icon: innovatorIcon,
      title: "Innovator",
      price: 19,
      credits: 475,
    },
    {
      icon: creatorIcon,
      title: "Creator",
      price: 29,
      credits: 725,
    },
  ];

  const [active, setActive] = useState(cards[0]);

  return (
    <div className="flex flex-col items-center w-full py-10">
      {/* title */}
      <div
        className="text-[24px] tracking-[-0.48px]
      md:text-[32px] md:tracking-[-0.8px]
      font-semibold leading-normal text-primary-black"
      >
        Choose a Credit Package to Keep Going
      </div>
      {/* note */}
      <div
        className="mt-6 text-left
      md:mt-4 md:text-center
      text-[#666] text-[18px] tracking-[-0.18px] leading-normal"
      >
        {`You're out of credit. Pick the package that works best for you and get
        back on track in no time!`}
      </div>

      {/* plans */}
      <div
        className="mt-6 flex flex-col w-full
      md:mt-8 md:flex-row
      items-center justify-center gap-6"
      >
        {cards.map((card, index) => (
          <div key={index} className="w-full" onClick={() => setActive(card)}>
            <Card
              id={index + 1}
              key={index}
              icon={card.icon}
              title={card.title}
              price={String(card.price)}
              credits={String(card.credits)}
              active={active.title === card.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
