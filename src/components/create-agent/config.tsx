import type {
  Form,
  UseMultiStepFormTypeOptions,
} from "@/types/multi-step-form";
import type { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import Step1 from "./step-1";
import Step2 from "./step-2";
import Step3 from "./step-3";

import buildMultiStepForm from "@/lib/multi-step-form";
import { useDeploymentPendingStore } from "@/store/use-deployment-pending-store";

//  1 - Define the full fields for the entire form
export const CreateAgentFormSchema = z.object({
  name: z.string().min(5),
  symbol: z.string().max(5),
  description: z.string(),
  logo: z.any().refine((val) => val !== null, "Logo is required"),
  banner: z.any().refine((val) => val !== null, "Banner is required"),
  linkWebsite: z.string().nullable(),
  linkTelegram: z.string().nullable(),
  linkTwitter: z.string().nullable(),
  deploymentType: z.enum(["verifiable", "non-verifiable"]),
  template: z.enum(["agentkit", "baseagent", "eliza", "custom"]),
  aiAgentAge: z
    .string()
    .refine((val) => !!val, "Age is required")
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
    })
    .refine((val) => parseInt(val, 10) >= 18, {
      message: "Age must be at least 18",
    }),
  aiAgentDescription: z.string(),
  aiAgentPersonality: z.string(),
  aiAgentFirstMessage: z.string(),
  aiAgentLore: z.string(),
  aiAgentStyle: z.string(),
  aiAgentAdjectives: z.string(),
  aiAgentKnowledge: z.string(),
  aiAgentApiKeyName: z.string(),
  aiAgentPrivateKey: z.string().nonempty("Private key is required"),
  features: z.array(z.string()),
});

//  2 - create the type
export type CreateAgentFormType = z.infer<typeof CreateAgentFormSchema>;

//  3 - Initial Data for fields
export const initialFormData: CreateAgentFormType = {
  name: "",
  symbol: "",
  description: "",
  logo: null,
  banner: null,
  linkWebsite: null,
  linkTelegram: null,
  linkTwitter: null,
  deploymentType: "verifiable",
  template: "agentkit",
  aiAgentAge: "18",
  aiAgentDescription: "",
  aiAgentPersonality: "",
  aiAgentFirstMessage: "",
  aiAgentLore: "",
  aiAgentStyle: "",
  aiAgentAdjectives: "",
  aiAgentKnowledge: "",
  aiAgentApiKeyName: "",
  aiAgentPrivateKey: "",
  features: [],
};

//  4 - Define the final end step submit function
const saveFormData: SubmitHandler<CreateAgentFormType> = async (values) => {
  console.log("Your custom save function");
  console.log(values);
  useDeploymentPendingStore.setState({ isOpen: true });
  setTimeout(() => {
    useDeploymentPendingStore.setState({ isOpen: false });
  }, 5 * 1000);
};

//  5 - Define the steps and sub-forms and each field for step
export const forms: Form<CreateAgentFormType>[] = [
  {
    id: 1,
    label: "Create token",
    form: Step1,
    fields: [
      "name",
      "symbol",
      "description",
      "logo",
      "banner",
      "linkWebsite",
      "linkTelegram",
      "linkTwitter",
    ],
  },
  {
    id: 2,
    label: "Deploy",
    form: Step2,
    fields: ["deploymentType", "template"],
  },
  {
    id: 3,
    label: "Template",
    form: Step3,
    fields: [
      "aiAgentAge",
      "aiAgentDescription",
      "aiAgentPersonality",
      "aiAgentFirstMessage",
      "aiAgentLore",
      "aiAgentStyle",
      "aiAgentAdjectives",
      "aiAgentKnowledge",
      "aiAgentApiKeyName",
      "aiAgentPrivateKey",
      "features",
    ],
  },
];

//  6 - Define initial Form Options
const initialFormOptions: UseMultiStepFormTypeOptions<CreateAgentFormType> = {
  schema: CreateAgentFormSchema,
  currentStep: 0,
  setCurrentStep: (value) => {},
  forms,
  saveFormData,
};

// 7 - Build the Context and Provider
export const {
  FormContext: CreateAgentFormContext,
  FormProvider: CreateAgentProvider,
} = buildMultiStepForm(
  initialFormOptions,
  CreateAgentFormSchema,
  initialFormData
);
