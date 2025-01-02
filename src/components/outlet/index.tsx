"use client";

import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { memo, Suspense } from "react";

import { ToastContainer } from "react-toastify";
import CustomApp from "../custom-app";
import DeployApp from "../deploy-app";
import Crypto from "../scan-dapps/crypto";
import EVMAlphaWallet from "../scan-dapps/evm";
import SolanaAlphaScan from "../scan-dapps/solana";
import SongMakerApp from "../song-maker";
import Stake from "../stake";
import Loading from "./loading";
import CreateAgent from "../create-agent";

const AppStore = memo(
  dynamic(() => import("../app-store"), {
    loading: () => <Loading />,
    ssr: false,
  })
);

const MyDApps = dynamic(() => import("../my-apps"), {
  loading: () => <Loading />,
  ssr: false,
});

const Create = memo(
  dynamic(() => import("../create"), {
    loading: () => <Loading />,
    ssr: false,
  })
);

const Earn = memo(
  dynamic(() => import("../earn"), {
    loading: () => <Loading />,
    ssr: false,
  })
);

const Chat = memo(
  dynamic(() => import("../chat"), {
    loading: () => <Loading />,
    ssr: false,
  })
);

const PrebuiltApp = memo(
  dynamic(() => import("../pre-built-app"), {
    loading: () => <Loading />,
    ssr: false,
  })
);

const Outlet = () => {
  const type = useSearchParams().get("type");
  const router = useRouter();

  if (type === null) router.push("?type=store");

  return (
    <main
      className="bg-[url('/images/background-main.png')] 
      py-6 invis-scroll
      w-full h-svh overflow-y-scroll overflow-x-hidden"
    >
      <Suspense fallback={<div>Loading...</div>}>
        {(type === "store" || type === null) && <AppStore />}
        {type === "my-apps" && <MyDApps />}
        {type === "create" && <Create />}
        {type === "earn" && <Earn />}
        {type === "chat" && <Chat />}
        {type === "pb-apps" && <PrebuiltApp />}
        {type === "solana-scan" && <SolanaAlphaScan />}
        {type === "evm-scan" && <EVMAlphaWallet />}
        {type === "crypto" && <Crypto />}
        {type === "song-maker" && <SongMakerApp />}
        {type === "deploy" && <DeployApp />}
        {type === "app" && <CustomApp />}
        {type === "stake" && <Stake />}
        {type === "create-agent" && <CreateAgent />}
      </Suspense>
      <ToastContainer closeButton={false} hideProgressBar={true} />
    </main>
  );
};

export default Outlet;
