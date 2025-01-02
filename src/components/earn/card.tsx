import layer from "@/images/earn/layer.png";
import { cn } from "@/lib/utils";
import { buyPlan } from "@/services/plan";
import { triggerToast } from "@/utils/trigger-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { useAccount } from "wagmi";

const RadioButton = ({
  checked = false,
  className = "",
}: {
  checked?: boolean;
  className?: string;
}) => {
  const innerColor = checked ? "#FF306E" : "white";

  return (
    <div
      className={`relative inline-block cursor-pointer ${className}`}
      role="radio"
      aria-checked={checked}
    >
      {/* Outer circle */}
      <div className={`w-[37px] h-[36px] relative`}>
        <div
          className={`absolute inset-0 rounded-full transition-colors duration-200`}
          style={{
            border: checked ? "2px solid #FF306E" : "1px solid #EAEAEA",
            backgroundColor: checked ? "#F5F5F7" : "#EAEAEA",
          }}
        />

        {/* Inner circle with shadow */}
        <div
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[20px] h-[20px] rounded-full transition-colors duration-200`}
          style={{
            backgroundColor: innerColor,
            boxShadow: "0px 2px 6px rgba(27, 27, 27, 0.24)",
            filter: checked
              ? "drop-shadow(0px 2px 6px rgba(255, 48, 110, 0.5))"
              : undefined,
          }}
        />
      </div>
    </div>
  );
};

export const Card = ({
  id,
  icon,
  title,
  price,
  credits,
  active,
}: {
  id: number;
  containerClassName?: string;
  animate?: boolean;
  icon: StaticImageData;
  title: string;
  price: string;
  credits: string;
  active?: boolean;
}) => {
  const { address } = useAccount();
  const queryClient = useQueryClient();

  // console.log("address", address);

  // const handleBuyPlan = async (planId: number, walletAddress: string) => {
  //   const response = await buyPlan(planId, walletAddress);
  //   if (response.data) {
  //     triggerToast("success", "Successfully bought plan");
  //   } else {
  //     triggerToast("error", "Failed to buy plan");
  //   }
  // }

  const { mutate } = useMutation({
    mutationKey: ["user", address],
    mutationFn: ({
      planId,
      walletAddress,
    }: {
      planId: number;
      walletAddress: string;
    }) => buyPlan(planId, walletAddress),
    onSuccess: () => {
      triggerToast("success", "Successfully bought plan");
      if (address) {
        queryClient.invalidateQueries({ queryKey: ["user", address] });
      }
    },
    onError: () => {
      triggerToast("error", "Failed to buy plan");
    },
  });

  return (
    <div
      className={cn(
        "relative p-[4px] group md:min-w-[293px] w-full cursor-pointer overflow-hidden rounded-3xl",
        {
          "border border-[#D8D8D8]": !active,
        }
      )}
    >
      {active && (
        <motion.div
          className="absolute inset-[-50%] rounded-3xl z-10"
          style={{
            background:
              "linear-gradient(90deg, #FFFFFF 30%, rgba(103, 103, 255, 0.1) 43%, #F06DFF 57%, #F1D789 70%)",
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            ease: "linear",
            repeat: Infinity,
          }}
        />
      )}
      {!active && <div className="absolute inset-0 rounded-3xl bg-[#FAFAFA]" />}

      <div
        className={cn(
          "relative z-10 rounded-3xl h-full md:min-h-[405px] min-h-[300px] p-6 bg-[#FAFAFA] flex flex-col md:justify-between gap-4",
          "backdrop-blur-sm bg-opacity-95"
        )}
      >
        {active && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Image src={layer} alt="layer" width={293} height={405} />
          </div>
        )}
        <div className="flex flex-col gap-4 z-20 w-full">
          <div className="flex items-center justify-between">
            <Image src={icon} alt="icon" width={48} height={48} />
            <RadioButton checked={active} />
          </div>
          <h2 className="text-lg font-semibold text-[#1B1B1B]">{title}</h2>
          <h3 className="text-[32px] font-semibold text-[#1B1B1B]">
            {price} $XETRA
          </h3>
          <span className="text-base text-[#FF306E] font-semibold">
            For {credits} credits
          </span>
        </div>
        <button
          onClick={() => {
            if (address) {
              mutate({ planId: id, walletAddress: address });
            } else {
              triggerToast("error", "Please connect your wallet");
            }
          }}
          className={cn(
            "hover:scale-105 transition-all duration-250 ease-in-out border z-20 py-4 w-full border-[#EAEAEA] rounded-xl bg-[#FFF] shadow-[0px_7px_10px_0px_rgba(0,0,0,0.10)]",
            {
              "bg-[linear-gradient(91deg,#FACC69_-0.26%,#FF8965_100.36%)]":
                active,
            }
          )}
        >
          <span className="text-[#1B1B1B] text-base font-semibold">
            Pay now
          </span>
        </button>
      </div>
    </div>
  );
};
