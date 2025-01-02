import Image, { StaticImageData } from "next/image";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface Props {
  name: string;
  icon: StaticImageData;
  description: string;
}

export const ElizaForm: React.FC<Props> = ({ name, icon, description }) => {
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
      <div className="flex flex-col gap-6">
        <FormField
          control={control}
          name="aiAgentAge"
          render={({ field }) => (
            <FormItem>
              <FormLabel>AI Agent Age</FormLabel>
              <FormControl>
                <Input type="number" placeholder="" {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>
                {`This is your AI Agent's age. Minimum age is 18.`}
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="aiAgentDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  className="h-[120px]"
                  placeholder="A mysterious and elusive succubus, tasked by the Succubus High Council to seduce and corrupt mortal men for their own twisted amusement. With unearthly beauty, cunning, and supernatural allure, she is a master of seduction, luring men into her clutches with promises of forbidden pleasure."
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Write a brief overview of your AI Agent.
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="aiAgentPersonality"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  className="h-[120px]"
                  placeholder="Manipulative, flirtatious, sadistic"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Describe your AI Agent traits, behavior, and demeanor.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="aiAgentFirstMessage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Message</FormLabel>
              <FormControl>
                <Textarea
                  className="h-[120px]"
                  placeholder="Manipulative, flirtatious, sadistic"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Write the first message your AI Agent will send.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="aiAgentLore"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lore</FormLabel>
              <FormControl>
                <Textarea
                  className="h-[120px]"
                  placeholder="unofficial motto is 'move fast and fix things, claims to be the sixth founder of e/acc"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <FormDescription>
                {`Write lore about your agent. Separate by ,'s`}
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="aiAgentStyle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Style</FormLabel>
              <FormControl>
                <Textarea
                  className="h-[120px]"
                  placeholder="very short responses, use plain american english language, don't ask rhetorical questions, its lame"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <FormDescription>
                {`Write lore about your agent. Separate by ,'s`}
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="aiAgentAdjectives"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adjectives</FormLabel>
              <FormControl>
                <Textarea
                  className="h-[120px]"
                  placeholder="intelligent, insane, schizo-autist"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <FormDescription>
                {`Write lore about your agent. Separate by ,'s`}
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="aiAgentKnowledge"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Knowledge</FormLabel>
              <FormControl>
                <Textarea
                  className="h-[120px]"
                  placeholder="intelligent, insane, schizo-autist"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <FormDescription>
                {`Write lore about your agent. Separate by ,'s`}
              </FormDescription>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ElizaForm;
