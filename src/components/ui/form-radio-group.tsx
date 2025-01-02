import { Controller, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import Image, { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";
import React from "react";

interface Option {
  title: string;
  description: string;
  icon?: StaticImageData;
  value: string;
}

interface Props {
  options: Option[];
  label: string;
  name: string;
  className?: string;
}

const FormRadioGroup: React.FC<Props> = ({ options, label, name, className }) => {
  const { control } = useFormContext();

  return (
    <FormItem className="space-y-4">
      <FormLabel className="text-[#1b1b1b] text-xl font-semibold">
        {label}
      </FormLabel>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <FormControl>
            <div className={cn("flex flex-col gap-3", className)}>
              {options.map((option, index) => (
                <div
                  key={index}
                  className={cn(
                    "p-4  rounded-xl border  justify-start items-start gap-1 inline-flex hover:cursor-pointer",
                    field.value === option.value &&
                      "border-[#ff306e] bg-[#ff306e]/5"
                  )}
                  onClick={() => field.onChange(option.value)}
                >
                  <div className="grow shrink basis-0  justify-start items-start gap-4 flex">
                    {option.icon && (
                      <div className="w-9 h-9 p-2.5 bg-[#ff306e]/10 rounded-[999px] border border-[#ff306e]/5 justify-center items-center flex">
                        <Image src={option.icon} alt={option.title} />
                      </div>
                    )}
                    <div className="grow shrink basis-0 flex-col justify-start items-start gap-3 inline-flex">
                      <div className="self-stretch text-[#1b1b1b] text-base font-semibold  leading-normal">
                        {option.title}
                      </div>
                      <div className="self-stretch text-[#666666] text-sm font-normal  leading-tight">
                        {option.description}
                      </div>
                    </div>
                  </div>
                  <div
                    className={cn(
                      "w-6 h-6 p-[4.50px] relative bg-white/5 rounded-xl border-2 border-[#d8d8d8]  justify-center items-center inline-flex overflow-hidden",
                      field.value === option.value &&
                        "bg-[#ff306e] border-[#ff306e]"
                    )}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M13.0005 4.25L6.12549 11.125L3.00049 8"
                        stroke="white"
                        stroke-width="2.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </FormControl>
        )}
      />
      <FormMessage />
    </FormItem>
  );
};

export default FormRadioGroup;
