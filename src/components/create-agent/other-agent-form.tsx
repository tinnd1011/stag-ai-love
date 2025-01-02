import { StaticImageData } from "next/image";
import Image from "next/image";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useFormContext } from "react-hook-form";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

interface Props {
  name: string;
  icon: StaticImageData;
  description: string;
}

const OtherAgentForm: React.FC<Props> = ({ name, icon, description }) => {
  const { control } = useFormContext();
  return (
    <div className="flex flex-col gap-10">
      <div className="h-[162px] flex-col justify-start items-start gap-6 inline-flex">
        <Image src={icon} alt={name} />
        <div className="flex-col justify-start items-start gap-2 flex">
          <div className="text-[#1b1b1b] text-5xl font-semibold font-inter">
            {name}
          </div>
          <div className="text-[#666666] text-base font-normal font-inter leading-normal">
            {description}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="text-[#1b1b1b] text-2xl font-semibold font-inter">
          Setup environmental variables
        </div>
        <FormField
          control={control}
          name="aiAgentAge"
          render={({ field }) => (
            <FormItem>
              <FormLabel>AI Agent Age</FormLabel>
              <FormControl>
                <Input type="number" placeholder="OpenAI Key" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="aiAgentApiKeyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CDP API Key Name</FormLabel>
              <FormControl>
                <Input placeholder="CDP API Key Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="aiAgentPrivateKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CDP Private Key</FormLabel>
              <FormControl>
                <Input placeholder="CDP Private Key" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default OtherAgentForm;
