"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";
import { FormImageUpload } from "@/components/ui/form-file-upload";
import { useMultiStepForm } from "@/hooks/multi-step-form";
import { CreateAgentFormContext } from "./config";
const Step1 = () => {
  const { control } = useFormContext();
  const { goToStep, nextStep, form } = useMultiStepForm(CreateAgentFormContext);
  return (
    <div className="flex flex-col">
      <div className="h-[162px] flex-col justify-start items-start gap-6 inline-flex">
        <div className="w-12 h-12 px-4 py-3 bg-[#7d52f4] rounded-3xl justify-center items-center gap-2.5 inline-flex">
          <div className="w-6 h-6 relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g clip-path="url(#clip0_1_1222)">
                <path
                  d="M7.67572 10.8551C7.75006 11.1334 7.98692 11.3372 8.27146 11.3712L12.1645 11.8354L12.6286 15.7284C12.6628 16.017 12.8713 16.2512 13.1447 16.3241C13.4229 16.3984 13.7176 16.296 13.89 16.0663L16.238 12.9269L19.8411 14.4713C20.1058 14.5845 20.4122 14.5258 20.6156 14.3223C20.819 14.1189 20.8778 13.8125 20.7647 13.5479L19.2202 9.94477L22.3596 7.59671C22.5893 7.42435 22.6918 7.1296 22.6174 6.85144C22.5432 6.57319 22.3062 6.3683 22.0217 6.33535L18.1288 5.87119L17.6646 1.97818C17.631 1.69313 17.4267 1.45669 17.1484 1.38244C16.8703 1.3081 16.5755 1.41061 16.4031 1.64025L14.0552 4.77966L10.452 3.23522C10.1874 3.12202 9.88105 3.1808 9.67752 3.38424C9.47408 3.58768 9.41539 3.89405 9.5285 4.15871L11.0729 7.7618L7.93353 10.1099C7.70389 10.2822 7.60152 10.577 7.67572 10.8551Z"
                  fill="white"
                />
                <path
                  d="M20.6155 4.37831L21.6099 3.38395C21.8847 3.10912 21.8847 2.66442 21.6099 2.38959C21.3351 2.11476 20.8903 2.11476 20.6155 2.38959L19.6212 3.38395C19.3463 3.65878 19.3463 4.10358 19.6212 4.37831C19.896 4.65314 20.3407 4.65314 20.6155 4.37831Z"
                  fill="white"
                />
                <path
                  d="M13.5089 2.7406C13.8841 2.6401 14.1065 2.25455 14.006 1.87927L13.6419 0.520738C13.5404 0.14541 13.1559 -0.0769652 12.7805 0.0235348C12.4053 0.124035 12.1829 0.509582 12.2834 0.884863L12.6475 2.24339C12.747 2.61511 13.1306 2.84138 13.5089 2.7406Z"
                  fill="white"
                />
                <path
                  d="M16.7845 14.9656C16.4092 15.0661 16.1868 15.4516 16.2873 15.8269L16.6515 17.1854C16.751 17.5571 17.1345 17.7834 17.5128 17.6826C17.8882 17.5821 18.1105 17.1966 18.01 16.8213L17.6459 15.4628C17.5448 15.088 17.1594 14.8646 16.7845 14.9656Z"
                  fill="white"
                />
                <path
                  d="M8.53686 6.35417L7.17833 5.99009C6.803 5.88959 6.41745 6.11188 6.31695 6.4872C6.21613 6.86605 6.44295 7.2492 6.81416 7.34853L8.17269 7.7127C8.54802 7.8132 8.93347 7.59083 9.03402 7.2155C9.134 6.8397 8.91064 6.45416 8.53686 6.35417Z"
                  fill="white"
                />
                <path
                  d="M21.2588 10.4911C21.158 10.8698 21.3848 11.253 21.7561 11.3524L23.1146 11.7165C23.4899 11.817 23.8754 11.5947 23.9759 11.2194C24.0765 10.844 23.8522 10.4576 23.4788 10.358L22.1203 9.99387C21.7449 9.89337 21.3593 10.1157 21.2588 10.4911Z"
                  fill="white"
                />
                <path
                  d="M1.2005 23.7935C1.47524 24.0684 1.92004 24.0684 2.19486 23.7935L11.1107 14.8778L10.8988 13.1009L9.12205 12.889L0.206051 21.8049C-0.0686836 22.0797 -0.0686836 22.5244 0.206051 22.7992L1.2005 23.7935Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_1_1222">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
        <div className="flex-col justify-start items-start gap-2 flex">
          <div className="text-[#1b1b1b] text-2xl md:text-5xl font-semibold">
            Create a new token
          </div>
          <div className="text-[#666666] text-base font-normal  leading-normal">
            Fill in the details and launch your token into the Uni!
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{`What's your token called?`}</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: ShibaInu" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="symbol"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pick a Short Symbol for Your Token!</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: SHIB" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Tell us about your token" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        <div className="flex-col justify-start items-start gap-6 inline-flex">
          <div className="flex-col justify-center items-start gap-2 flex">
            <div className="w-[300px] text-[#1b1b1b] text-2xl font-semibold ">
              Upload{" "}
            </div>
            <div className="text-[#666666] text-base font-normal  leading-normal">
              Define your token’s identity with a custom logo and banner.
            </div>
          </div>
          <div className="self-stretch space-y-4 md:space-y-0 justify-start md:flex-row md:items-start gap-4 md:inline-flex">
            <div className="w-[200px]">
              <FormImageUpload
                name="logo"
                label="Token Logo"
                placeholder="1920 x 1080"
                buttonLabel="Logo"
                maxSize={2097152}
              />
            </div>
            <div className="md:flex-1">
              <FormImageUpload
                name="banner"
                label="Add a Banner to Stand Out "
                placeholder="1920 x 1080"
                buttonLabel="Banner"
                maxSize={5242880}
              />
            </div>
            {/* <div className="flex-col justify-start items-start gap-2 inline-flex">
              <div className="self-stretch justify-start items-start gap-2 inline-flex">
                <div className="text-[#1b1b1b] text-sm font-medium  leading-tight">
                  Token Logo
                </div>
              </div>
              <div className="w-[200px] h-[200px] p-1 bg-neutral-50 rounded-2xl flex-col justify-between items-center flex overflow-hidden">
                <div className="self-stretch grow shrink basis-0 px-1 pb-4 rounded-xl border-dashed border border-[#aeaeae] flex-col justify-between items-center flex">
                  <div className="self-stretch grow shrink basis-0 flex-col justify-center items-center gap-2 flex">
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
                      JPG, PNG. Max 2MB.
                    </div>
                  </div>
                  <div className="px-4 py-2 rounded-[999px] border border-[#ff306e] justify-center items-center gap-2 inline-flex overflow-hidden">
                    <div className="text-center text-[#ff306e] text-xs font-medium  leading-none tracking-tight">
                      Upload Logo
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            {/* <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
              <div className="self-stretch justify-start items-start gap-2 inline-flex">
                <div className="text-[#1b1b1b] text-sm font-medium  leading-tight">
                  Add a Banner to Stand Out{" "}
                </div>
              </div>
              <div className="self-stretch h-[200px] p-1 bg-neutral-50 rounded-2xl flex-col justify-between items-center flex overflow-hidden">
                <div className="self-stretch grow shrink basis-0 px-1 pb-4 rounded-xl border-dashed border border-[#aeaeae] flex-col justify-between items-center flex">
                  <div className="self-stretch grow shrink basis-0 flex-col justify-center items-center gap-2 flex">
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
                    <div className="text-center text-[#666666] text-sm font-normal  leading-tight">
                      JPG, PNG. Max 5MB.{" "}
                    </div>
                  </div>
                  <div className="px-4 py-2 rounded-[999px] border border-[#ff306e] justify-center items-center gap-2 inline-flex overflow-hidden">
                    <div className="text-center text-[#ff306e] text-xs font-medium  leading-none tracking-tight">
                      Upload Banner
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        <Separator />

        <div className="flex flex-col gap-6">
          <div className="h-[61px] flex-col justify-center items-start gap-2 inline-flex">
            <div className="w-[300px] text-[#1b1b1b] text-2xl font-semibold ">
              Social Links
            </div>
            <div className="self-stretch text-[#666666] text-base font-normal  leading-normal">
              Connect your token to the world through your social platforms.
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <FormField
              control={control}
              name="linkWebsite"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute flex items-center justify-center w-8 h-full -inset-y-0 ps-3 start-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                        >
                          <path
                            d="M16.0002 27.3229C22.2536 27.3229 27.3231 22.2534 27.3231 16C27.3231 9.74649 22.2536 4.67705 16.0002 4.67705C9.74669 4.67705 4.67725 9.74649 4.67725 16C4.67725 22.2534 9.74669 27.3229 16.0002 27.3229Z"
                            stroke="#1B1B1B"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M4.67725 16H27.3231"
                            stroke="#1B1B1B"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M15.9999 4.67705C18.832 7.77766 20.4416 11.8015 20.529 16C20.4416 20.1985 18.832 24.2223 15.9999 27.3229C13.1677 24.2223 11.5582 20.1985 11.4707 16C11.5582 11.8015 13.1677 7.77766 15.9999 4.67705Z"
                            stroke="#1B1B1B"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                      <Input {...field} className="ps-10" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="linkTelegram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telegram</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute flex items-center justify-center w-8 h-full -inset-y-0 ps-3 start-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                        >
                          <g clip-path="url(#clip0_12_2085)">
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M1.41068 9.81797C6.91912 7.41804 10.5923 5.83585 12.4302 5.07142C17.6777 2.88881 18.768 2.50966 19.4787 2.49714C19.635 2.49439 19.9845 2.53313 20.2109 2.71683C20.4021 2.87194 20.4547 3.08148 20.4799 3.22854C20.505 3.37561 20.5364 3.71063 20.5115 3.9724C20.2271 6.96023 18.9967 14.2109 18.3707 17.5573C18.1058 18.9733 17.5843 19.4481 17.0793 19.4946C15.982 19.5955 15.1488 18.7694 14.086 18.0727C12.423 16.9826 11.4834 16.3039 9.86916 15.2402C8.00357 14.0108 9.21295 13.3351 10.2761 12.2308C10.5544 11.9418 15.3891 7.54425 15.4827 7.14532C15.4944 7.09543 15.5053 6.90946 15.3948 6.81125C15.2843 6.71305 15.1212 6.74663 15.0035 6.77334C14.8367 6.8112 12.18 8.56721 7.03329 12.0414C6.27918 12.5592 5.59613 12.8115 4.98414 12.7983C4.30947 12.7837 3.01168 12.4168 2.0469 12.1032C0.863568 11.7186 -0.0769244 11.5152 0.0049713 10.8619C0.0476277 10.5217 0.516198 10.1737 1.41068 9.81797Z"
                              fill="#1B1B1B"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_12_2085">
                              <rect width="22" height="22" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <Input {...field} className="ps-10" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="linkTwitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitter</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute flex items-center justify-center w-8 h-full -inset-y-0 ps-3 start-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="17"
                          viewBox="0 0 16 17"
                          fill="none"
                        >
                          <g clip-path="url(#clip0_12_1396)">
                            <path
                              d="M12.5944 1H15.0361L9.70281 7.79111L16 17H11.0522L7.19679 11.4178L2.76305 17H0.321285L6.04016 9.74667L0 1H5.07631L8.57831 6.12L12.5944 1ZM11.7269 15.3644H13.0763L4.33735 2.52889H2.85944L11.7269 15.3644Z"
                              fill="#1B1B1B"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_12_1396">
                              <rect
                                width="16"
                                height="16"
                                fill="white"
                                transform="translate(0 0.96582)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <Input {...field} className="ps-10" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="h-56 flex-col justify-start items-start gap-6 inline-flex">
            <div className="self-stretch">
              <span className="text-[#1b1b1b] text-base font-normal  leading-normal">
                Only pay gas fees and the initial{" "}
              </span>
              <span className="text-[#ff306e] text-base font-normal  leading-normal">
                1 ETH
              </span>
              <span className="text-[#1b1b1b] text-base font-normal  leading-normal">
                {" "}
                for the liquidity which will be returned to you in less than{" "}
              </span>
              <span className="text-[#ff306e] text-base font-normal  leading-normal">
                24 hours.
              </span>
            </div>
            <Button
              type="submit"
              className="self-stretch h-14 px-6 py-3 bg-[#1b1b1b] rounded-[999px] justify-center items-center gap-2 inline-flex"
            >
              <div className="text-white text-base font-semibold  leading-normal">
                Next
              </div>
            </Button>
            <ul className="self-stretch text-[#666666] text-base font-normal leading-normal list-inside list-disc">
              <li>
            {`Please read the Tutorial if you don't know how to make a token.`}
              </li>
              <li>Only file types allowed are .png, .jpeg and .gif.</li>
              <li>Maximum file size allowed is 1 MB.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1;
