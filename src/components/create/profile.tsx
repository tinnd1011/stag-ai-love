import Image from "next/image";

import coin from "@/images/coin.svg";
import logo from "@/images/logo.png";

export default function Profile() {
  const user = {
    name: "Nico William",
    logo: "coin",
    credits: 3,
    creditsUsed: 1,
  };
  return (
    <div className="inline-flex h-16 items-center justify-start gap-4 rounded-full bg-white py-2 pl-2.5 pr-5">
      <div className="flex items-center justify-center gap-[5.45px] rounded-[544.91px] py-[13.09px]">
        <Image src={logo} alt="logo" width={48} />
      </div>
      <div className="inline-flex flex-col items-start justify-center gap-1">
        <div className="inline-flex items-start justify-start gap-3">
          <div className="font-inter text-sm font-semibold leading-tight text-[#1b1b1b]">
            {user.name}
          </div>
        </div>
        <div className="inline-flex items-center justify-start gap-2">
          <div className="relative h-6 w-6">
            <div className="absolute left-[0.52px] top-0 h-6 w-[22.97px]">
              <Image src={coin} alt="coin" width={24} />
            </div>
            <div className="absolute left-[7.50px] top-[6.75px] h-[9.75px] w-[9.75px]">
              <div className="absolute left-[-6px] top-[-6px] h-[22.35px] w-[22.35px]"></div>
            </div>
          </div>
          <div className="flex items-center justify-start gap-1">
            <div className="font-inter text-base font-semibold leading-normal text-[#ff306e]">
              {user.credits - user.creditsUsed}/{user.credits}
            </div>
            <div className="font-inter text-base font-medium leading-normal text-[#ff306e]">
              Credits
            </div>
          </div>
        </div>
      </div>

      <div className="relative h-8 w-8 rounded-full bg-[#ff306e]/10 hover:cursor-pointer hover:bg-[#ff306e]/20">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z"
            fill="#FF306E"
            fillOpacity="0.1"
          />
          <path
            d="M16.0016 9.6001V22.4001M9.60156 16.0001H22.4016"
            stroke="#FF306E"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
