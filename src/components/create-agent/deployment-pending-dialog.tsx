import { useDeploymentPendingStore } from "@/store/use-deployment-pending-store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "../ui/dialog";

export default function DeploymentPendingDialog() {
  const { isOpen } = useDeploymentPendingStore();
  return (
    <Dialog open={isOpen} onOpenChange={useDeploymentPendingStore().close}>
      <DialogContent className="w-[368px] h-[449px] px-6 py-12 bg-neutral-50 rounded-3xl border-4 border-white flex-col justify-start items-center gap-[30px] inline-flex overflow-hidden">
        <DialogHeader className="self-stretch h-[97px] flex-col justify-start items-center gap-2 flex">
          <DialogTitle className="text-[#1b1b1b] text-2xl font-semibold font-inter">
            Deployment Pending
          </DialogTitle>
          <DialogDescription className="self-stretch text-center text-[#666666] text-sm font-normal font-inter leading-tight">
            If your token isn’t visible on the website after 5 min, you can
            manually setup your token page using the Token Support
          </DialogDescription>
        </DialogHeader>
        <svg
          className="size-[140px] animate-spin text-[#ff306e]"
          xmlns="http://www.w3.org/2000/svg"
          width="140"
          height="140"
          viewBox="0 0 140 140"
          fill="none"
        >
          <path
            d="M140 70C140 108.66 108.66 140 70 140C31.3401 140 0 108.66 0 70C0 31.3401 31.3401 0 70 0C108.66 0 140 31.3401 140 70ZM11.2 70C11.2 102.474 37.5257 128.8 70 128.8C102.474 128.8 128.8 102.474 128.8 70C128.8 37.5257 102.474 11.2 70 11.2C37.5257 11.2 11.2 37.5257 11.2 70Z"
            fill="#FF306E"
            fill-opacity="0.1"
          />
          <path
            d="M134.4 70C137.493 70 140.023 72.5113 139.776 75.5942C138.75 88.3916 134.22 100.7 126.631 111.145C117.942 123.104 105.69 132.006 91.6312 136.574C77.5722 141.142 62.4278 141.142 48.3688 136.574C34.3098 132.006 22.0578 123.104 13.3688 111.145C4.67984 99.1856 -1.29233e-06 84.7825 0 70C1.29233e-06 55.2174 4.67985 40.8144 13.3688 28.855C22.0578 16.8957 34.3098 7.9941 48.3688 3.42604C60.6473 -0.563473 73.7535 -1.06874 86.2417 1.91023C89.2501 2.62787 90.8564 5.81054 89.9007 8.75196C88.945 11.6934 85.7888 13.275 82.7698 12.6033C72.5434 10.328 61.8579 10.8195 51.8298 14.0779C40.0202 17.915 29.7285 25.3924 22.4298 35.4382C15.1311 45.4841 11.2 57.5827 11.2 70C11.2 82.4173 15.1311 94.5159 22.4298 104.562C29.7285 114.608 40.0202 122.085 51.8298 125.922C63.6394 129.759 76.3606 129.759 88.1702 125.922C99.9798 122.085 110.271 114.608 117.57 104.562C123.768 96.0313 127.537 86.0208 128.534 75.5917C128.828 72.5129 131.307 70 134.4 70Z"
            fill="#FF306E"
          />
        </svg>
        <div className="self-stretch p-2 bg-[#ffebec] rounded-xl border border-[#ffc0c5] justify-center items-start gap-3 inline-flex">
          <div className="w-6 h-6 px-[1.25px] pt-[2.33px] pb-[1.75px] justify-center items-center flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="21"
              viewBox="0 0 22 21"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.9019 0.415475C11.3065 0.296404 10.6935 0.296404 10.0981 0.415475C8.77522 0.680056 7.63523 1.5122 6.98005 2.69153L0.794132 13.8262C0.437271 14.4685 0.25 15.1912 0.25 15.926C0.25 18.3141 2.18588 20.25 4.57391 20.25H17.4261C19.8141 20.25 21.75 18.3141 21.75 15.926C21.75 15.1912 21.5627 14.4685 21.2059 13.8262L15.02 2.69153C14.3648 1.5122 13.2248 0.680056 11.9019 0.415475ZM11 11.75C10.5858 11.75 10.25 11.4142 10.25 11V7C10.25 6.58579 10.5858 6.25 11 6.25C11.4142 6.25 11.75 6.58579 11.75 7V11C11.75 11.4142 11.4142 11.75 11 11.75ZM11.75 14.5C11.75 14.9142 11.4142 15.25 11 15.25C10.5858 15.25 10.25 14.9142 10.25 14.5V14C10.25 13.5858 10.5858 13.25 11 13.25C11.4142 13.25 11.75 13.5858 11.75 14V14.5Z"
                fill="#FF6666"
              />
            </svg>
          </div>
          <div className="grow shrink basis-0 text-[#ff6666] text-sm font-medium font-inter leading-tight">
            Do NOT close or refresh this window during the process.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
