import authorProfileImage from "@/images/app-store/author.png";
import loadIcon from "@/images/my-apps/Loading.svg";
import checkIcon from "@/images/my-apps/check.svg";
import globalIcon from "@/images/my-apps/global.svg";
import { PopupType, usePopupStore } from "@/store/use-popup-store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AppInfo } from ".";
import { usePublishStore } from "@/store/use-publish-app-store";

interface DAppsCardProps {
  app: AppInfo;
}

interface ButtonProps {
  open: (type: PopupType) => void;
  appInfo?: AppInfo;
}

export default function DAppCard({ app }: DAppsCardProps) {
  const { open } = usePopupStore();
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`?type=app&appId=${app.id}`)}
      className="px-4 py-6 rounded-2xl bg-[#FFF] max-w-[260px]"
    >
      <Image
        src={authorProfileImage}
        alt={app.title ?? "App Logo"}
        width={40}
        height={40}
      />
      {/* app title */}
      <div className="mt-4 text-[16px] h-[48px] leading-6 font-semibold tracking-[-0.16px] text-primary-black line-clamp-2">
        {app.title ?? "No title"}
      </div>
      {/* app description */}
      <div
        className="md:w-[228px] md:h-[48px]
        line-clamp-3
      mt-1.5 text-[#666] text-[12px] leading-[16px] tracking-[-0.2px]"
      >
        {app.description ?? "No description"}
      </div>
      {/* button */}
      <div className="mt-10 w-full text-[14px] leading-5 font-semibold tracking-[-0.14px]">
        {app.status === "draft" && <PublishButton open={open} appInfo={app} />}
        {app.status === "review" && <ReviewButton open={open} />}
        {app.status === "published" && <PublishedButton open={open} />}
      </div>
    </div>
  );
}

const PublishButton = ({ open, appInfo }: ButtonProps) => {
  const { setPublishData } = usePublishStore();
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        setPublishData({
          id: appInfo?.id.toString() ?? "",
          title: "Test",
          description: "",
          categories: [""],
          imgUrl: "",
          isPublished: false,
        });
        open("publish");
      }}
      className={`
        hover:scale-105 transition-all duration-300 ease-in-out
        bg-[linear-gradient(130deg,#8EC9FF_9%,#FF306E_56%,#F1D789_95%)] p-[2px] w-full rounded-full `}
    >
      <div className="flex items-center justify-center rounded-full px-8 py-1.5 bg-[#1B1B1B] text-white gap-2">
        <Image src={globalIcon} alt="Publish" width={16} height={16} />
        <span>Publish</span>
      </div>
    </button>
  );
};

const ReviewButton = ({ open }: ButtonProps) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={`
        hover:scale-105 transition-all duration-300 ease-in-out
    bg-[#F6B51E] p-[2px] w-full rounded-full `}
    >
      <div className="flex items-center justify-center rounded-full px-8 py-1.5 bg-[#FFFAEB] text-[#F6B51E] gap-2">
        <Image
          src={loadIcon}
          alt="Publish"
          width={16}
          height={16}
          className="animate-spin "
        />
        <span>In review</span>
      </div>
    </button>
  );
};

const PublishedButton = ({ open }: ButtonProps) => {
  return (
    <button
      className={`
        hover:scale-105 transition-all duration-300 ease-in-out
    bg-[#1FC16B] p-[2px] w-full rounded-full `}
    >
      <div className="flex items-center justify-center rounded-full px-8 py-1.5 bg-[#E6F7F0] text-[#1FC16B] gap-2">
        <Image src={checkIcon} alt="Publish" width={16} height={16} />
        <span>Published</span>
      </div>
    </button>
  );
};
