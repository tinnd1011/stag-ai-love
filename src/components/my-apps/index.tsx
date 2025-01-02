import myAppsIcon from "@/images/my-apps/my-apps.svg";
import noAppImage from "@/images/my-apps/no-app.png";
import plusIcon from "@/images/my-apps/plus.svg";
import { getMyDapps } from "@/services/dapp";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import UserCredits from "../user-credits";
import DAppCard from "./app-cards";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { usePublishStore } from "@/store/use-publish-app-store";
import { use, useEffect } from "react";

export interface AppInfo {
  id: number;
  title?: string;
  description?: string;
  logo?: string;
  status: "draft" | "review" | "published";
}

export default function MyDApps() {
  const { title } = usePublishStore();

  const { address, isConnected, isConnecting, isReconnecting, isDisconnected } =
    useAccount();

  const router = useRouter();

  const fetchMyDapps = async () => {
    const data = await getMyDapps({ address: address ?? "0x1" });
    return data;
  };

  useEffect(() => {
    if (title === "" && address) {
      refetchMyApps();
    }
  }, [title]);

  const {
    data,
    isLoading,
    isError,
    isSuccess,
    refetch: refetchMyApps,
  } = useQuery({
    queryKey: ["my-apps", "all"],
    queryFn: fetchMyDapps,
    placeholderData: keepPreviousData,
    gcTime: 1000 * 30, // 30 seconds
    enabled: !!address,
  });

  return (
    <div
      className="w-full flex flex-col pb-20 md:pb-0 animate-slide-in-right h-[calc(100vh-50px)] overflow-y-auto
    standard-scroll
    "
    >
      <div className="md:flex justify-between md:px-10 px-4">
        {/* header */}
        <h1
          className="flex items-center justify-start gap-4 font-semibold text-[32px] leading-normal tracking-[-0.8px] text-[#1b1b1b]
         h-16
      "
        >
          <Image src={myAppsIcon} alt="Explore" width={32} height={32} />
          <span>My AI DApp</span>
        </h1>

        {/* user credits */}
        <UserCredits />
      </div>

      <div
        className="flex flex-wrap gap-4 w-full mt-8
      md:px-10 px-4 "
      >
        {isConnected &&
          isSuccess &&
          data !== null &&
          typeof data === "object" &&
          data?.data.length > 0 &&
          data?.data.map((app) => <DAppCard app={app} key={app.id} />)}
      </div>

      {/* no dapp created */}
      {(data === null || data?.data.length === 0 || isDisconnected) && (
        <div
          className="w-full  
      h-[calc(100vh-64px-32px-48px)] mt-8 
        flex flex-col items-center justify-center
      "
        >
          {/* image */}
          <div
            className="relative
          w-[177.5px] h-[175.5px] mb-8
          "
          >
            <Image
              src={noAppImage}
              alt="No App"
              fill
              style={{
                objectFit: "contain",
              }}
            />
          </div>

          <p className="text-[16px] leading-[24px] tracking-[-0.16px] text-primary-black font-semibold mb-5">
            {isDisconnected
              ? "You haven't logged in!"
              : "You haven’t created any dapps!"}
          </p>

          {/* TODO: link to create page */}
          {/* create button */}
          {!isDisconnected && (
            <button
              onClick={() => router.push("?type=create")}
              className="hover:scale-105 transition-all duration-300 ease-in-out
          rounded-full p-1 bg-[linear-gradient(130deg,#8EC9FF_9%,#FF306E_56%,#F1D789_95%)] bg-opacity-20"
            >
              <div
                className="flex items-center justify-center gap-2 px-10 py-3 rounded-full bg-primary-black
            text-white
          "
              >
                <Image src={plusIcon} alt="Create" width={16} height={16} />
                <span className="text-[16px] leading-none font-semibold font-neueHass">
                  Create
                </span>
              </div>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
