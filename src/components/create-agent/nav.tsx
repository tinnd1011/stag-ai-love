import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React, { Context } from "react";
import { useState } from "react";
import { CreateAgentProvider } from "./config";
import { useMultiStepForm } from "@/hooks/multi-step-form";
import { UseMultiStepFormTypeOptions } from "@/types/multi-step-form";

function NavButton<T extends UseMultiStepFormTypeOptions<any>>({
  index,
  context,
}: {
  index: number;
  context: Context<T>;
}) {
  const { currentStep, goToStep } = useMultiStepForm(context);
  const props = Object.create(null);
  if (index < currentStep) {
    props.onClick = () => {
      if (index < currentStep) {
        goToStep(index);
      }
    };
  }
  return (
    <Button
      type={index == currentStep + 1 ? "submit" : "button"}
      role="tab"
      variant={"ghost"}
      className={`flex size-10 items-center justify-center rounded-full p-[3.20px]  gap-[3.20px] text-sm font-semibold  leading-tight
                     ${
                       index <= currentStep
                         ? index == currentStep
                           ? "bg-[#ff306e]/10 text-[#ff306e] hover:bg-[#ff306e]/20 hover:text-[#ff306e] "
                           : "bg-[#1fc16b] hover:bg-[#1fc16b]/80 "
                         : "border-2 border-[#aeaeae] text-[#aeaeae] bg-none hover:bg-[#aeaeae]/10 hover:text-[#aeaeae]"
                     }`}
      {...props}
    >
      {index < currentStep ? (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 10.72L8.51429 13.6L14.8 6.40002"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ) : (
        index + 1
      )}
    </Button>
  );
}
export default function Nav<T extends UseMultiStepFormTypeOptions<any>>({
  context,
}: {
  context: Context<T>;
}) {
  const { currentStepLabel, labels, currentStep, goToStep } =
    useMultiStepForm(context);

  return (
    <div className="flex justify-between relative gap-4">
      {labels.map((step, index, array) => (
        <React.Fragment key={index}>
          <div className="flex flex-col justify-center items-center gap-2">
            <NavButton index={index} context={context} />
            <li className="flex flex-col items-center gap-2 flex-shrink-0">
              <span
                className={`text-sm font-semibold
                 ${
                   index <= currentStep
                     ? index == currentStep
                       ? " text-[#ff306e]"
                       : "text-black"
                     : " text-[#aeaeae]"
                 } `}
              >
                {step}
              </span>
            </li>
          </div>
          {index < array.length - 1 && (
            <Separator
              className={`flex-1 relative top-[18px] h-1 ${
                index < currentStep
                  ? index == currentStep - 1
                    ? "bg-[#ff306e]"
                    : "bg-[#1fc16b]"
                  : "bg-[#d8d8d8]"
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
