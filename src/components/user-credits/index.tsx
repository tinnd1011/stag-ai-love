import Image from "next/image";

import coinIcon from "@/images/coin.svg";
import logoIcon from "@/images/logo.png";
import addCreditsIcon from "@/images/credits/plus.svg";
import { usePopupStore } from "@/store/use-popup-store";

import { useUserStore } from "@/store/use-user-info-store";
export default function UserCredits() {
  const { userInfo } = useUserStore();

  const user = {
    name: "Nico William",
    logo: "coin",
    credits: 3,
    creditsUsed: 1,
  };

  const { open } = usePopupStore();

  if (!userInfo) return null;

  return (
    <div className="inline-flex h-16 items-center justify-start gap-4 rounded-full bg-white py-2 pl-2 pr-5">
      {/* user avatar */}
      <div className="flex items-center justify-center gap-[5.45px] rounded-[544.91px] py-[13.09px]">
        <Image src={logoIcon} alt="logo" width={48} />
      </div>

      {/* user credits info */}
      <div className="flex flex-col items-start justify-center gap-1">
        {/* user name */}
        <div className=" text-[14px] leading-5 font-semibold tracking-[-0.14px]  text-primary-black">
          {userInfo.name}
        </div>

        {/* user credits */}
        <div className="inline-flex items-center justify-start gap-2">
          <Image src={coinIcon} alt="coin" width={23} height={24} />

          <div className="text-[#ff306e] text-[16px] leading-6 font-semibold tracking-[-0.16px]">
            {userInfo.credits}/{userInfo.remainCredits}
            <span className="  font-medium tracking-[-0.32px] ml-1 text-[#ff306e]">
              Credits
            </span>
          </div>
        </div>
      </div>

      {/* add button */}
      <button onClick={() => open("credits")}>
        <Image src={addCreditsIcon} alt="add" width={32} height={32} />
      </button>
    </div>
  );
}
