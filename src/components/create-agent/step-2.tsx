"use client";
import { useMultiStepForm } from "@/hooks/multi-step-form";
import Cross from "@/images/cross.svg";
import Tick from "@/images/tick.svg";
import { Button } from "../ui/button";
import FormRadioGroup from "../ui/form-radio-group";
import { CreateAgentFormContext } from "./config";

const deploymentTypeOptions = [
  {
    title: "Verifiable(TEE)",
    description:
      "Verifiable agents run in a Trusted Execution Environment (TEE) such as Intel SGX, Intel TDX, AWS Nitro Enclave and AMD SEV. Such agents guarantee non human/machine interference and generate verifiable proofs of correct execution.",
    icon: Tick,
    value: "verifiable",
  },
  {
    title: "Non-Verifiable(NVM)",
    description:
      "Non-verifiable agents run on standard hardware and do not provide any guarantees of non human/machine interference.",
    icon: Cross,
    value: "non-verifiable",
  },
];

const templateOptions = [
  {
    title: "Agentkit",
    description:
      "The Agentkit by Coinbase simplifies bringing your AI Agents onchain. Built using LangChain.",
    value: "agentkit",
  },
  {
    title: "Base Agent",
    description: "A product by Coinbase to build on-chain agents.",
    value: "baseagent",
  },
  {
    title: "Eliza",
    description: "Eliza is a simple, fast, and lightweight AI agent framework",
    value: "eliza",
  },
  {
    title: "Custom",
    description: "Custom image running by users.",
    value: "custom",
  },
];
const Step2 = () => {
  const { previousStep } = useMultiStepForm(CreateAgentFormContext);
  return (
    <div className="flex flex-col gap-10">
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
              <g clip-path="url(#clip0_1_1447)">
                <path
                  d="M5.40968 22.7751C5.68117 22.5036 5.89654 22.1813 6.04349 21.8266C6.19043 21.4719 6.26608 21.0918 6.2661 20.7078C6.26612 20.3239 6.19052 19.9437 6.04362 19.589C5.89671 19.2343 5.68138 18.912 5.40991 18.6405C5.13844 18.369 4.81616 18.1536 4.46146 18.0067C4.10676 17.8597 3.72659 17.7841 3.34265 17.7841C2.95872 17.784 2.57854 17.8596 2.22382 18.0065C1.86911 18.1534 1.5468 18.3688 1.2753 18.6402C0.462019 19.4531 0.140456 20.7135 0.0396751 21.8549C-0.0180563 22.5007 -0.0142894 23.1505 0.0509251 23.7956C0.0682688 23.9573 0.223894 23.9938 0.250613 23.9985H0.258581C0.323738 23.9985 1.25796 24.0196 1.54577 23.1079C1.59746 22.9379 1.6734 22.7762 1.77124 22.6279C1.8118 22.5694 1.87092 22.5263 1.93902 22.5056C2.00712 22.485 2.08021 22.4879 2.14645 22.5139C2.21269 22.5399 2.2682 22.5876 2.30398 22.6491C2.33976 22.7106 2.35371 22.7825 2.34358 22.8529C2.29683 23.1992 2.3687 23.5511 2.54749 23.8513C2.56703 23.8848 2.59614 23.9116 2.63107 23.9283C2.666 23.945 2.70514 23.9508 2.74342 23.9451C3.72217 23.7951 4.72436 23.4604 5.40968 22.7751Z"
                  fill="white"
                />
                <path
                  d="M23.9769 2.19287C23.9061 0.969902 23.03 0.0938084 21.8071 0.0230271C17.653 -0.224473 13.0236 1.53709 9.41332 5.1474L8.45051 6.11022C8.10332 6.45709 7.77363 6.81303 7.46144 7.17803H4.42582C3.78129 7.20287 3.21129 7.57459 2.88879 8.12021L1.10426 11.6897C1.0566 11.8179 1.02327 11.9509 1.00488 12.0863C1.00769 12.316 1.10033 12.5354 1.26294 12.6976C1.42556 12.8597 1.64523 12.9518 1.87488 12.954H4.12863C3.83613 13.9383 4.03113 14.9072 4.65691 15.5321L8.46738 19.3426C9.09269 19.9683 10.0611 20.1633 11.0455 19.8708V22.1269C11.0483 22.3562 11.1406 22.5753 11.3027 22.7374C11.4648 22.8995 11.6839 22.9918 11.9132 22.9946C12.0486 22.9762 12.1816 22.9429 12.3097 22.8952L15.8793 21.1107C16.4249 20.7882 16.7966 20.2201 16.8214 19.5737V16.5385C17.1855 16.226 17.5414 15.8963 17.8893 15.5494L18.8521 14.5866C22.4628 10.9763 24.2244 6.34693 23.9769 2.19287ZM18.9191 9.42615C18.4894 9.85588 17.9419 10.1485 17.3459 10.2671C16.7498 10.3857 16.132 10.3248 15.5705 10.0923C15.0091 9.85971 14.5292 9.46588 14.1916 8.96058C13.8539 8.45529 13.6737 7.86122 13.6737 7.2535C13.6737 6.64578 13.8539 6.05171 14.1916 5.54641C14.5292 5.04111 15.0091 4.64728 15.5705 4.41472C16.132 4.18216 16.7498 4.12132 17.3459 4.23989C17.9419 4.35846 18.4894 4.65111 18.9191 5.08084C19.4953 5.65707 19.819 6.4386 19.819 7.2535C19.819 8.0684 19.4953 8.84992 18.9191 9.42615Z"
                  fill="white"
                />
                <path
                  d="M3.70859 4.79228C3.54111 4.62473 3.44702 4.39753 3.44702 4.16063C3.44702 3.92374 3.54111 3.69654 3.70859 3.52899L6.02234 1.21524C6.19017 1.04741 6.4178 0.953125 6.65515 0.953125C6.8925 0.953125 7.12013 1.04741 7.28796 1.21524C7.4558 1.38308 7.55008 1.61071 7.55008 1.84806C7.55008 2.08541 7.4558 2.31304 7.28796 2.48087L4.97421 4.79462C4.89106 4.87775 4.79231 4.94364 4.68364 4.98853C4.57496 5.03341 4.45849 5.05641 4.34091 5.05619C4.22333 5.05597 4.10695 5.03255 3.99845 4.98726C3.88994 4.94197 3.79144 4.87571 3.70859 4.79228Z"
                  fill="white"
                />
                <path
                  d="M0.354625 4.26193C0.187716 4.09446 0.0939941 3.86766 0.0939941 3.63122C0.0939941 3.39478 0.187716 3.16799 0.354625 3.00052L1.54103 1.81224C1.70962 1.64996 1.93515 1.56031 2.16914 1.56254C2.40313 1.56477 2.62691 1.65872 2.79237 1.82418C2.95783 1.98965 3.05178 2.21342 3.05401 2.44741C3.05624 2.6814 2.96659 2.90693 2.80431 3.07552L1.61791 4.26193C1.53514 4.34519 1.43672 4.41127 1.32832 4.45636C1.21992 4.50145 1.10367 4.52466 0.986266 4.52466C0.868861 4.52466 0.752614 4.50145 0.644213 4.45636C0.535812 4.41127 0.437395 4.34519 0.354625 4.26193Z"
                  fill="white"
                />
                <path
                  d="M19.1329 20.2161C19.0496 20.1333 18.9835 20.0349 18.9384 19.9265C18.8933 19.8181 18.8701 19.7018 18.8701 19.5844C18.8701 19.467 18.8933 19.3508 18.9384 19.2424C18.9835 19.134 19.0496 19.0355 19.1329 18.9528L21.4461 16.6414C21.6137 16.4735 21.841 16.3791 22.0781 16.3789C22.3153 16.3787 22.5428 16.4727 22.7106 16.6402C22.8784 16.8077 22.9728 17.0351 22.9731 17.2722C22.9733 17.5093 22.8793 17.7368 22.7118 17.9047L20.3985 20.2184C20.3153 20.3015 20.2166 20.3674 20.1079 20.4123C19.9992 20.4572 19.8828 20.4802 19.7652 20.48C19.6476 20.4798 19.5312 20.4563 19.4227 20.411C19.3142 20.3658 19.2157 20.2995 19.1329 20.2161Z"
                  fill="white"
                />
                <path
                  d="M19.6624 23.5696C19.495 23.402 19.4009 23.1748 19.4009 22.9379C19.4009 22.701 19.495 22.4738 19.6624 22.3063L20.8489 21.1199C20.9318 21.0368 21.0303 20.9708 21.1387 20.9258C21.2472 20.8808 21.3634 20.8575 21.4808 20.8574C21.5983 20.8573 21.7145 20.8803 21.8231 20.9252C21.9316 20.97 22.0302 21.0358 22.1133 21.1187C22.1964 21.2017 22.2624 21.3002 22.3074 21.4086C22.3524 21.517 22.3757 21.6333 22.3758 21.7507C22.3759 21.8681 22.3529 21.9844 22.308 22.0929C22.2632 22.2014 22.1974 22.3001 22.1145 22.3832L20.9281 23.5696C20.8451 23.6529 20.7465 23.719 20.6379 23.7642C20.5293 23.8093 20.4129 23.8325 20.2953 23.8325C20.1777 23.8325 20.0612 23.8093 19.9526 23.7642C19.844 23.719 19.7454 23.6529 19.6624 23.5696Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_1_1447">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
        <div className="flex-col justify-start items-start gap-2 flex">
          <div className="text-[#1b1b1b] text-5xl font-semibold">
            Deploy an agent
          </div>
          <div className="text-[#666666] text-base font-normal  leading-normal">
            Fill in the details and launch your token into the Xetra
          </div>
        </div>
      </div>
      <FormRadioGroup
        label="Select deployment type"
        name="deploymentType"
        options={deploymentTypeOptions}
      />
      <FormRadioGroup
        label="Select a template"
        name="template"
        options={templateOptions}
        className="md:grid grid-cols-2"
      />
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
        <Button className="grow h-full shrink basis-0 self-stretch px-6 py-3 bg-[#1b1b1b] rounded-[999px] justify-center items-center gap-2 flex hover:cursor-pointer">
          <div className="text-white text-base font-semibold  leading-normal">
            Next
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Step2;
