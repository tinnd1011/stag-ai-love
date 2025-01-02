"use client";
import { useEffect, useCallback } from "react";
import { shortAddress } from "@/utils/address";
import Image from "next/image";
import walletIcon from "@/images/sidebar/wallet.svg";
import profileIcon from "@/images/sidebar/profile.svg";
import moreIcon from "@/images/sidebar/more.svg";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/store/use-user-info-store";
import userInfoService from "@/services/user-info.service";
import { useAppKit, useDisconnect } from "@reown/appkit/react";
import { useAccount } from "wagmi";
import { triggerToast } from "@/utils/trigger-toast";

enum CreateAccountStatus {
  SUCCESS = "Wallet created successfully",
  EXIST = "Address already exist",
  FAIL = "fail",
}

const BtnConnectWallet = ({ isMinimized }: { isMinimized?: boolean }) => {
  const { open: openWalletConnectModal } = useAppKit();
  const { address, isConnected, status } = useAccount();

  const { setUserInfo, userInfo, logOut } = useUserStore();
  const { disconnect } = useDisconnect();

  const handleOnclick = () => {
    console.log("click logout");

    if (isConnected) {
      disconnect();
      logOut();
    } else openWalletConnectModal();
  };

  const fetchUserInfo = async () => {
    if (!address) return null;
    try {
      const savedUserInfo = await userInfoService.getUserInfo(address);
      setUserInfo(savedUserInfo.data);

      return savedUserInfo.data;
    } catch (e) {
      throw new Error("User info not found!");
    }
  };

  const {
    data: userAccount,
    isSuccess,
    isError,
    refetch: login,
  } = useQuery({
    queryKey: ["user", address],
    queryFn: fetchUserInfo,
    enabled: false,
    placeholderData: keepPreviousData,
    gcTime: 1000 * 60 * 60, // 1 hour
    retry: 0,
  });

  const createNewAccount = useCallback(async () => {
    if (!address) throw new Error("No address available");
    const createAccountStatus = await userInfoService.createNewUser({
      address,
      name: "Anonymous",
      avatar:
        process.env.NEXT_PUBLIC_API_DEFAULT_AVATAR ??
        "641b04bc9745387984931f329a55569d.png",
    });
    return createAccountStatus.data;
  }, [address]);

  const { mutate: mutateCreateNewAccount } = useMutation({
    mutationKey: ["user", address],
    mutationFn: createNewAccount,
    onSuccess: async (data) => {
      if (
        data.message === CreateAccountStatus.SUCCESS ||
        data.message === CreateAccountStatus.EXIST
      ) {
        await login();
      }
    },
    onError: () => {
      triggerToast("error", "Cannot register your account!");
    },
  });

  useEffect(() => {
    if (status === "disconnected") {
      if (userInfo !== null) {
        logOut();
      }
    } else if (status === "connected") {
      login();
    }
  }, [status]);

  useEffect(() => {
    if (isError) {
      mutateCreateNewAccount();
    }
  }, [isSuccess, userAccount, isError]);

  return (
    <>
      {isConnected || userInfo !== null ? (
        <button
          onClick={handleOnclick}
          className={`max-w-[160px] md:max-w-[224px]
        rounded-full flex items-center justify-between  
        ${
          isMinimized
            ? ""
            : "mbl:w-full pl-2 py-2 mbl:pr-4 pr-2 border border-[#D8D8D8] bg-[#FAFAFA]"
        }
        `}
        >
          <div className="flex gap-2 items-center w-fit">
            <Image
              src={profileIcon}
              width={isMinimized ? 60 : 40}
              height={isMinimized ? 60 : 40}
              alt="profile icon"
            />

            {!isMinimized && (
              <div className="mbl:flex flex-col items-start hidden">
                <span className="text-[14px] leading-[20px] tracking-[-0.14px] font-semibold text-[#1B1B1B]">
                  {userInfo?.name}
                </span>
                <span className="text-[12px] leading-[16px] tracking-[-0.12px] font-normal text-[#666]">
                  {shortAddress(userInfo?.address ?? "0x1111111111")}
                </span>
              </div>
            )}
          </div>

          {!isMinimized && (
            <Image
              src={moreIcon}
              width={20}
              height={20}
              alt="more icon"
              className="mbl:block hidden"
            />
          )}
        </button>
      ) : (
        <button
          onClick={handleOnclick}
          className={`rounded-[999px] 
            md:w-full 
            bg-[linear-gradient(130deg,#8EC9FF_9%,#FF306E_56%,#F1D789_95%)] p-[3px]`}
        >
          <div
            className={`w-full rounded-full py-3 
          ${isMinimized ? "px-4" : "px-10"}
          flex justify-center items-center bg-[#1B1B1B] text-white`}
          >
            <div className="flex items-center justify-center gap-x-2">
              <Image
                src={walletIcon}
                alt="wallet icon"
                width={20}
                height={20}
                className="shrink-0"
              />
              {!isMinimized && (
                <span className="text-nowrap hidden md:block">
                  Connect Wallet
                </span>
              )}
            </div>
          </div>
        </button>
      )}
    </>
  );
};

export default BtnConnectWallet;
