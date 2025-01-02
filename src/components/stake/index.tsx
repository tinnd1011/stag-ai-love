import myAppsIcon from "@/images/stake/layer.png";
import Image from 'next/image';
import UserCredits from '../user-credits';
import ClaimSection from "./claim-section";
import StakeSection from './stake-section';

const Stake = () => {
  return (
    <div className="w-full flex flex-col pb-20 md:pb-0 animate-slide-in-right space-y-8 h-[calc(100vh-50px)] overflow-y-auto
    standard-scroll
    ">
      <div className="md:flex justify-between md:px-10 px-4">
        {/* header */}
        <h1
          className="flex items-center justify-start gap-4 font-semibold text-[32px] leading-normal tracking-[-0.8px] text-[#1b1b1b]
         h-16
      "
        >
          <Image src={myAppsIcon} alt="Explore" width={32} height={32} />
          <span>Stake</span>
        </h1>

        {/* user credits */}
        <div className="">
          <UserCredits />
        </div>
      </div>
      <StakeSection />
      <ClaimSection />
    </div>
  )
}

export default Stake