import CustomizedToast, {
  toastDisplayInfo,
} from "@/components/ui/toast/custom-toast";
import { toast } from "react-toastify";

type ToastType = "warning" | "error" | "success" | "update";

export const triggerToast = (type: ToastType, message: string) => {
  toast(CustomizedToast, {
    data: {
      message: message,
      iconUrl: toastDisplayInfo[type].iconUrl,
    },
    autoClose: 5000,
  });
};
