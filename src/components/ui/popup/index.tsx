import LoadingPopup from "@/components/stake/loading-popup";
import StakeDetailPopup from "@/components/stake/stake-detail-popup";
import { PopupType, usePopupStore } from "@/store/use-popup-store";
import { useEffect } from "react";
import CreditsPopup from "./credit-popup";
import PublishPopup from "./publish-popup";
import StakeSuccessPopup from "@/components/stake/stake-success-popup";
import StakeFailPopup from "@/components/stake/stake-fail-popup";

// Import your specific popup components here

const SettingsPopup = () => <div>Settings Content</div>;

const POPUP_COMPONENTS: Record<NonNullable<PopupType>, React.FC> = {
  credits: CreditsPopup,
  publish: PublishPopup,
  settings: SettingsPopup,
  stakeDetail: StakeDetailPopup,
  stakeLoading: LoadingPopup,
  stakeSuccess: StakeSuccessPopup,
  stakeFail: StakeFailPopup,
};

export default function Popup() {
  const { isOpen, type, close } = usePopupStore();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, close]);

  if (!isOpen || !type) return null;

  const PopupContent = POPUP_COMPONENTS[type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      // onClick={close}
      />

      {/* Popup Content */}
      <div
        className={`relative bg-white rounded-2xl shadow-xl h-[calc(100vh-80px)] overflow-y-auto md:h-fit
          md:p-6
          px-4 py-6 
      animate-in fade-in zoom-in duration-200
        ${type === "stakeDetail" || "stakeLoading" ? "max-w-[368px] rounded-3xl" : ""}
        ${type === "publish" ? "max-w-[680px]" : "max-w-[1008px]"}
        md:w-full
        w-[calc(100%-32px)]
        `}
      >
        {/* Close button */}
        {
          type !== "stakeDetail" && type !== "stakeLoading" && type !== "stakeSuccess" && type !== "stakeFail" &&
          (
            <button
              onClick={close}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )
        }

        {/* Dynamic Content */}
        <div className="overflow-y-auto">
          <PopupContent />
        </div>
      </div>
    </div>
  );
}
