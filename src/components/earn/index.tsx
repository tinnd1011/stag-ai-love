import creator from "@/images/earn/creator.svg";
import earn from "@/images/earn/earn.svg";
import explore from "@/images/earn/explore.svg";
import innovator from "@/images/earn/innovator.svg";
import Image from "next/image";
import { useState } from "react";
import UserCredits from "../user-credits";
import { Card } from "./card";

const Earn = () => {
  const cards = [
    {
      id: 1,
      icon: explore,
      title: "Explore",
      price: "9",
      credits: "225",
    },
    {
      id: 2,
      icon: innovator,
      title: "Innovator",
      price: "19",
      credits: "475",
    },
    {
      id: 3,
      icon: creator,
      title: "Creator",
      price: "29",
      credits: "725",
    },
  ];

  const [active, setActive] = useState(cards[0]);

  return (
    <main className="py-6 md:px-10 px-4 flex flex-col items-center gap-8 animate-slide-in-right">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center md:gap-4 gap-2">
          <Image src={earn} alt="earn" width={32} height={32} />
          <h1 className="text-[#1B1B1B] md:text-[32px] text-2xl font-semibold">
            Earn
          </h1>
        </div>
        <UserCredits />
      </div>
      <div className="flex flex-col md:items-center items-start justify-center md:gap-8 gap-6 w-full">
        <h2 className="text-[#1B1B1B] text-[32px] font-semibold">
          Make your plan
        </h2>
        <div className="flex items-center md:flex-row w-full flex-col gap-6">
          {cards.map((card, index) => (
            <div key={index} className="w-full" onClick={() => setActive(card)}>
              <Card
                key={index}
                id={card.id}
                icon={card.icon}
                title={card.title}
                price={card.price}
                credits={card.credits}
                active={active.title === card.title}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Earn;
