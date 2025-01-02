"use client";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Controller, useFormContext } from "react-hook-form";
import ElizaForm from "./eliza-form";
import OtherAgentForm from "./other-agent-form";
import BaseAgent from "@/images/base-agent.svg";
import AgentkitAgent from "@/images/agentkit-agent.svg";
import ElizaAgent from "@/images/eliza-agent.svg";
import CustomAgent from "@/images/custom-agent.svg";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useMultiStepForm } from "@/hooks/multi-step-form";
import { CreateAgentFormContext } from "./config";
import { cn } from "@/lib/utils";
import DeploymentPendingDialog from "./deployment-pending-dialog";
import { useDeploymentPendingStore } from "@/store/use-deployment-pending-store";

const agents = [
  {
    key: "agentkit",
    name: "Agentkit",
    description:
      "The Agentkit by Coinbase simplifies bringing your AI Agents onchain.\nBuilt using LangChain.",
    icon: AgentkitAgent,
  },
  {
    key: "baseagent",
    name: "Base Agent",
    description: "A product by Coinbase to build on-chain agents.",
    icon: BaseAgent,
  },
  {
    key: "eliza",
    name: "Eliza",
    description: "Eliza is a simple, fast, and lightweight AI agent framework",
    icon: ElizaAgent,
  },
  {
    key: "customagent",
    name: "Custom Agent",
    description: "Custom image running by users.",
    icon: CustomAgent,
  },
];

const features = [
  {
    value: "x-access",
    icon: "🐦",
    name: "X Access",
    description: "🔥 Burn 1,000 $UNI",
  },
  {
    value: "discord-access",
    icon: "👾",
    name: "Discord Access",
    description: "🔥 Burn 500 $UNI",
  },
  {
    value: "twitter-access",
    icon: "💬",
    name: "Twitter Access",
    description: "🔥 Burn 500 $UNI",
  },
  {
    value: "telegram-access",
    icon: "📱",
    name: "Telegram Access",
    description: "🔥 Burn 500 $UNI",
  },
  {
    value: "twitter-access-2",
    icon: "⚡",
    name: "Twitter Access",
    description: "🔥 Burn 1,000 $UNI",
  },
];
const Step3 = () => {
  const form = useFormContext();
  const aiAgent = form.getValues("template");
  const agent = agents.find((agent) => agent.key === aiAgent);
  const { previousStep } = useMultiStepForm(CreateAgentFormContext);
  const open = useDeploymentPendingStore((s) => s.open);
  const close = useDeploymentPendingStore((s) => s.close);

  // function handleClick() {
  //   form.trigger();
  //   if (form.formState.isValid) {
  //     open();
  //   }

  //   //TODO: call real API and close after finish
  //   setTimeout(() => {
  //     close();
  //   }, 5 * 1000);
  // }

  return (
    <div className="flex flex-col gap-10">
      {aiAgent === "eliza" && <ElizaForm {...agent!} />}
      {aiAgent !== "eliza" && <OtherAgentForm {...agent!} />}

      <Separator />

      <div className="h-[52px] justify-between items-center inline-flex">
        <div className="text-[#1b1b1b] text-2xl font-semibold font-inter">
          X Intergration
        </div>
        <Button
          variant="ghost"
          className="px-6 py-2 bg-[#eaeaea] rounded-[999px] justify-center items-center gap-2 flex"
        >
          <div className="w-5 h-5 relative  overflow-hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M1.91454 2.5L8.18847 10.7735L1.875 17.5H3.29602L8.82359 11.6107L13.2895 17.5H18.125L11.4979 8.76125L17.3745 2.5H15.9535L10.8631 7.92376L6.75 2.5H1.91454ZM4.00422 3.53247H6.2256L16.0351 16.4678H13.8137L4.00422 3.53247Z"
                fill="#1B1B1B"
              />
            </svg>
          </div>
          <div className="text-center text-[#1b1b1b] text-sm font-semibold font-inter leading-tight">
            Connect X
          </div>
        </Button>
      </div>

      <Separator />

      <FormItem>
        <Controller
          control={form.control}
          name="features"
          render={({ field }) => (
            <div className="w-full flex-col justify-start items-start gap-4 inline-flex">
              <div className="self-stretch justify-start items-start gap-2 inline-flex">
                <div className="text-[#1b1b1b] text-2xl font-semibold font-inter">
                  Feature
                </div>
              </div>
              <div className="self-stretch p-3 bg-[#f5f5f7]  rounded-xl flex-col md:flex-row justify-center flex-wrap items-start gap-3 inline-flex overflow-hidden">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="w-full md:w-[180px] h-[170px] py-4 bg-white rounded-xl border border-[#d8d8d8] flex-col justify-start items-center gap-4 inline-flex overflow-hidden"
                  >
                    <div className="text-[#1b1b1b] text-2xl font-bold font-inter">
                      {feature.icon}
                    </div>
                    <div className="flex-col justify-start items-center gap-2 flex">
                      <div className="text-[#1b1b1b] text-lg font-semibold font-inter">
                        {feature.name}
                      </div>
                      <div className="text-[#666666] text-sm font-normal font-inter leading-tight">
                        {feature.description}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      type="button"
                      className={cn(
                        "px-4 py-2 rounded-[999px] border border-[#ff306e] justify-center items-center gap-2 inline-flex overflow-hidden text-center text-[#ff306e] text-xs font-medium font-inter leading-none hover:text-[#ff306e]"
                      )}
                      onClick={() => {
                        if (field.value.includes(feature.value)) {
                          // remove
                          field.onChange(
                            field.value.filter(
                              (value: string) => value !== feature.value
                            )
                          );
                        } else {
                          // add
                          field.onChange([...field.value, feature.value]);
                        }
                      }}
                    >
                      <div className={cn("")}>
                        {field.value.includes(feature.value)
                          ? "Disable"
                          : "Enable"}
                      </div>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        />
      </FormItem>

      <div className="h-14 justify-start items-start gap-6 inline-flex">
        <div
          className="w-[180px] h-14 px-6 py-3 rounded-2xl justify-center items-center gap-2 flex hover:cursor-pointer"
          onClick={() => previousStep()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M11.0452 11.9991L15.5002 16.4541L14.2276 17.7267L8.5 11.9991L14.2276 6.27148L15.5002 7.54408L11.0452 11.9991Z"
              fill="#FF306E"
            />
          </svg>
          <div className="text-[#ff306e] text-lg font-semibold  tracking-tight">
            Back
          </div>
        </div>
        <Button
          type="submit"
          className="grow h-full shrink basis-0 self-stretch px-6 py-3 bg-[#1b1b1b] rounded-[999px] justify-center items-center gap-2 flex hover:cursor-pointer"
        >
          <div className="text-white text-base font-semibold  leading-normal">
            Create token
          </div>
        </Button>

        <DeploymentPendingDialog />
      </div>
    </div>
  );
};

export default Step3;
