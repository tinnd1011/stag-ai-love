import Image from "next/image";
import warningIcon from "@/images/toast/warning.svg";
import closeIcon from "@/images/toast/close.svg";
import errorIcon from "@/images/toast/error.svg";
import successIcon from "@/images/toast/success.svg";
import updateIcon from "@/images/toast/update.svg";

interface WarningToastProps {
  readonly closeToast: () => void;
  readonly toastProps: any;
}

export const toastDisplayInfo = {
  warning: {
    iconUrl: warningIcon.src,
  },
  error: {
    iconUrl: errorIcon.src,
  },
  success: {
    iconUrl: successIcon.src,
  },
  update: {
    iconUrl: updateIcon.src,
  },
};

export default function CustomizedToast({ closeToast, toastProps }: any) {
  return (
    <div className="py-[14px] pl-[14px] pr-4 flex gap-3">
      <Image
        src={toastProps.data.iconUrl}
        alt="warning"
        width={20}
        height={20}
      />
      <p>{toastProps.data.message}</p>
      <button onClick={closeToast}>
        <Image src={closeIcon} alt="close" width={20} height={20} />
      </button>
    </div>
  );
}
