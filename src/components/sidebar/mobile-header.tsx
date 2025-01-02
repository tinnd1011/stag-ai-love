import Image from "next/image";
import hamburgerIcon from "@/images/sidebar/Hamburger Menu.svg";
import logoIcon from "@/images/sidebar/logo.svg";
import BtnConnectWallet from "../button/connect-wallet";

export default function MobileHeader({
  setIsMinimized,
}: {
  readonly setIsMinimized: (value: boolean) => void;
}) {
  return (
    <div className="p-4 flex items-center justify-between md:hidden w-full">
      {/* left section */}
      <div className="flex items-center justify-between gap-[14px]">
        <button onClick={() => setIsMinimized(false)}>
          <Image
            src={hamburgerIcon}
            alt="Hamburger Icon"
            width={40}
            height={40}
          />
        </button>

        <div className="flex items-center gap-3">
          <Image src={logoIcon} alt="icon logo" width={32} height={32} />
          <div className="text-[24px] leading-normal font-semibold text-primary-black font-neueHass">
            Xetra AI
          </div>
        </div>
      </div>

      {/* right wallet button */}
      <BtnConnectWallet />
    </div>
  );
}
