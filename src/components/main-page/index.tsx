import Outlet from "@/components/outlet";
import SideBar from "@/components/sidebar";
import MobileHeader from "@/components/sidebar/mobile-header";
import Popup from "@/components/ui/popup";
import { useState } from "react";

export default function MainPage() {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <main className="flex fixed w-full">
      <SideBar isMinimized={isMinimized} setIsMinimized={setIsMinimized} />
      {/* set min-w to ensure trending app width overflow */}
      <div className="grow flex flex-col min-w-[350px]">
        <MobileHeader setIsMinimized={setIsMinimized} />
        <Outlet />
      </div>
      <Popup />
    </main>
  );
}
