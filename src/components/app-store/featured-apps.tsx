import trendingAuthorProfileImage from "@/images/app-store/author-big.svg";
import FeaturedAppsSwiper from "../ui/swiper/auto-app-swiper";
import firstIcon from "@/images/app-store/featured/1.png";
import secondIcon from "@/images/app-store/featured/2.png";
import thirdIcon from "@/images/app-store/featured/3.png";
import fourthIcon from "@/images/app-store/featured/4.png";
import fifthIcon from "@/images/app-store/featured/5.png";
import sixthIcon from "@/images/app-store/featured/6.png";

import cover1Icon from "@/images/app-store/featured/cover1.png";
import cover2Icon from "@/images/app-store/featured/cover2.png";
import cover3Icon from "@/images/app-store/featured/cover3.png";
import cover4Icon from "@/images/app-store/featured/cover4.png";
import cover5Icon from "@/images/app-store/featured/cover5.png";
import cover6Icon from "@/images/app-store/featured/cover6.png";

export default function FeaturedApps() {
  const MOCK_TRENDING_APP = [
    {
      title: "Solana Alpha Wallets Scanner",
      description: "Track and analyze Solana wallets with advanced accuracy.",
      icon: firstIcon.src,
      cover: cover1Icon.src,
      link: "?type=solana-scan"
    },
    {
      title: "Ethereum Alpha Wallets For Maestro and Banana Gun",
      description:
        "Detailed Ethereum wallet insights, optimised for advanced tools.",
      icon: secondIcon.src,
      cover: cover2Icon.src,
      link: "?type=evm-scan"
    },
    {
      title: "Song Maker",
      description:
        "Turn your ideas, themes, or keywords into your personal song in minutes. Share your creativity, and let Xetra AI help craft lyrics that speak to you, and bring your unique melody to life.",
      icon: thirdIcon.src,
      cover: cover3Icon.src,
      link: "?type=song-maker"
    },
    {
      title: "Deploy ERC20 Token on ETH Network",
      description:
        "Easily deploy and manage your custom tokens on the Ethereum blockchain.",
      icon: fourthIcon.src,
      cover: cover4Icon.src,
      link: "?type=deploy"
    },
    {
      title: "Bubblemaps Scanner",
      description:
        "Unlock and navigate blockchain data through interactive visual mapping tools.",
      icon: fifthIcon.src,
      cover: cover5Icon.src,
      link: "?type=chat&chatId=8"
    },
    {
      title: "Crypto Buy Signal ",
      description:
        "Receive instant alerts for the best cryptocurrency buying opportunities in real-time.",
      icon: sixthIcon.src,
      cover: cover6Icon.src,
      link: "?type=crypto"
    },
  ];

  return (
    <div
      className="w-full 
  md:px-10 px-4
"
    >
      <FeaturedAppsSwiper cards={MOCK_TRENDING_APP} />
    </div>
  );
}
