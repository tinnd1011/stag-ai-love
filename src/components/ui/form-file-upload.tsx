import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from "@/components/ui/form";
import { cn, formatFileSize } from "@/lib/utils";

const formImageUploadVariants = cva(
  "w-full", // Base styles
  {
    variants: {
      intent: {
        default:
          "bg-surface-black-3 border-none text-strong-950 placeholder-text-disabled-300 relative",
        error: "bg-red-50 border-red-500",
      },
      size: {
        default: "text-sm",
        small: "p-4 text-sm",
        large: "p-4 text-lg",
      },
    },
    defaultVariants: {
      intent: "default",
      size: "default",
    },
  }
);

export interface FormImageUploadProps
  extends VariantProps<typeof formImageUploadVariants> {
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  buttonLabel?: string;
  className?: string;
  maxSize?: number;
}

export const FormImageUpload: React.FC<FormImageUploadProps> = ({
  name,
  label,
  placeholder,
  description,
  intent,
  size,
  className,
  buttonLabel,
  maxSize
}) => {
  const { control, getValues } = useFormContext();
  const { error } = useFormField();
  const [preview, setPreview] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number>();

  useEffect(() => {
    if (getValues(name)) {
      setPreview(URL.createObjectURL(getValues(name)));
    }
  }, [getValues, name]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (file: File | null) => void
  ) => {
    const file = e.target.files?.[0] || null;
    onChange(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setFileSize(file.size);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange, ...field } }) => (
          <FormControl>
            <div
              className={cn(
                "h-[200px] p-1 relative bg-neutral-50 rounded-2xl flex-col justify-between items-center flex overflow-hidden",
                className
              )}
            >
              <div className="self-stretch grow shrink basis-0 px-1 pb-4 rounded-xl border-dashed border border-[#aeaeae] flex-col justify-between items-center flex">
                {preview ? (
                  <div className="flex w-full p-4 flex-col items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className={cn("relative h-[100px] w-full text-center")}
                      >
                        <Image
                          src={preview}
                          alt="Preview"
                          width={0}
                          height={0}
                          style={{ width: "auto", height: "100%" }}
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="self-stretch grow shrink h-full basis-0 flex-col justify-center items-center gap-2 flex">
                      <div className="p-2.5 bg-[#ff306e]/20 rounded-[999px] justify-center items-center gap-2.5 inline-flex">
                        <div className="p-2 bg-[#ff306e] rounded-[999px] justify-center items-center gap-2.5 flex">
                          <div className="w-4 h-4 justify-center items-center flex">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <path
                                d="M13.9798 0.666687H12.0198C11.1732 0.666687 10.6665 1.17335 10.6665 2.02002V3.98002C10.6665 4.82669 11.1732 5.33335 12.0198 5.33335H13.9798C14.8265 5.33335 15.3332 4.82669 15.3332 3.98002V2.02002C15.3332 1.17335 14.8265 0.666687 13.9798 0.666687ZM14.1265 2.87335C14.0465 2.95335 13.9398 2.99335 13.8332 2.99335C13.7265 2.99335 13.6198 2.95335 13.5398 2.87335L13.4198 2.75335V4.24669C13.4198 4.48002 13.2332 4.66669 12.9998 4.66669C12.7665 4.66669 12.5798 4.48002 12.5798 4.24669V2.75335L12.4598 2.87335C12.2998 3.03335 12.0332 3.03335 11.8732 2.87335C11.7132 2.71335 11.7132 2.44669 11.8732 2.28669L12.7065 1.45335C12.7398 1.42002 12.7865 1.39335 12.8332 1.37335C12.8465 1.36669 12.8598 1.36669 12.8732 1.36002C12.9065 1.34669 12.9398 1.34002 12.9798 1.34002C12.9932 1.34002 13.0065 1.34002 13.0198 1.34002C13.0665 1.34002 13.1065 1.34669 13.1532 1.36669C13.1598 1.36669 13.1598 1.36669 13.1665 1.36669C13.2132 1.38669 13.2532 1.41335 13.2865 1.44669C13.2932 1.45335 13.2932 1.45335 13.2998 1.45335L14.1332 2.28669C14.2932 2.44669 14.2932 2.71335 14.1265 2.87335Z"
                                fill="white"
                              />
                              <path
                                d="M6.00024 6.91998C6.87653 6.91998 7.58691 6.2096 7.58691 5.33331C7.58691 4.45702 6.87653 3.74664 6.00024 3.74664C5.12395 3.74664 4.41357 4.45702 4.41357 5.33331C4.41357 6.2096 5.12395 6.91998 6.00024 6.91998Z"
                                fill="white"
                              />
                              <path
                                d="M13.9802 5.33331H13.6668V8.40665L13.5802 8.33331C13.0602 7.88665 12.2202 7.88665 11.7002 8.33331L8.92683 10.7133C8.40683 11.16 7.56683 11.16 7.04683 10.7133L6.82016 10.5266C6.34683 10.1133 5.5935 10.0733 5.06016 10.4333L2.56683 12.1066C2.42016 11.7333 2.3335 11.3 2.3335 10.7933V5.20665C2.3335 3.32665 3.32683 2.33331 5.20683 2.33331H10.6668V2.01998C10.6668 1.75331 10.7135 1.52665 10.8202 1.33331H5.20683C2.78016 1.33331 1.3335 2.77998 1.3335 5.20665V10.7933C1.3335 11.52 1.46016 12.1533 1.70683 12.6866C2.28016 13.9533 3.50683 14.6666 5.20683 14.6666H10.7935C13.2202 14.6666 14.6668 13.22 14.6668 10.7933V5.17998C14.4735 5.28665 14.2468 5.33331 13.9802 5.33331Z"
                                fill="white"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="text-center text-[#666666] text-sm font-normal leading-tight">
                        JPG, PNG. Max {formatFileSize(maxSize ?? 1024)}.
                      </div>
                    </div>
                  </>
                )}
                <div className="px-4 py-2 rounded-full  cursor-pointer  border border-[#ff306e] justify-center items-center gap-2 inline-flex overflow-hidden hover:bg-[#ff306e] hover:text-[#ffffff] text-center text-[#ff306e] text-xs font-medium  leading-none tracking-tight ">
                  <div>Upload {buttonLabel}</div>
                </div>
              </div>
              <input
                {...field}
                type="file"
                accept="image/*"
                id={`${name}-upload`}
                placeholder={placeholder}
                onChange={(e) => handleFileChange(e, onChange)}
                className="absolute h-full w-full cursor-pointer opacity-0"
              />
            </div>
          </FormControl>
        )}
      />
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
};
