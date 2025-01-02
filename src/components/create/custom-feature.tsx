import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface CustomFeatureProps {
  children: React.ReactNode;
}
export function CustomFeature({ children }: CustomFeatureProps) {
  const [features, setFeatures] = useState([
    {
      name: "Auto",
      value: true,
    },
    {
      name: "Normal model",
      value: false,
    },
    {
      name: "Weather API",
      value: false,
    },
    {
      name: "Video/Audio API",
      value: true,
    },
    {
      name: "Token Price API",
      value: true,
    },
    {
      name: "Map API",
      value: false,
    },
    {
      name: "OCR Analyzer",
      value: false,
    },
    {
      name: "Youtube Downloader",
      value: true,
    },
    {
      name: "City Guesser API",
      value: false,
    },
    {
      name: "Stocks API",
      value: false,
    },
    {
      name: "Blockchain Token API",
      value: false,
    },
    {
      name: "Speech to Text API",
      value: false,
    },
    {
      name: "Currency API",
      value: false,
    },
    {
      name: "News API",
      value: false,
    },
  ]);

  function toggleFeature(index: number) {
    const newFeatures = [...features];
    newFeatures[index].value = !newFeatures[index].value;
    setFeatures(newFeatures);
    check();
  }

  function check() {
    const [auto, ...rest] = features;
    if (auto.value) {
      if (rest.some((feature) => feature.value)) {
        toggleFeature(0);
      }
    } else {
      if (!rest.some((feature) => feature.value)) {
        toggleFeature(0);
      }
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Custom feature{"(Paid Model)"}</DialogTitle>
        </DialogHeader>
        <div className="flex items-center flex-wrap gap-3">
          {features.map((feature, index) => (
            <Button
              disabled={true}
              key={feature.name}
              variant={"outline"}
              className={`h-12 px-4 py-3  rounded-full border  justify-start items-center gap-2 inline-flex hover:cursor-pointer
                ${
                  feature.value
                    ? "bg-[#ff306e]/10 border-[#ff306e] text-[#ff306e] hover:bg-[#ff306e]/20 hover:text-[#ff306e]"
                    : "bg-white border-[#eaeaea]"
                }`}
              onClick={() => toggleFeature(index)}
            >
              <div className=" text-base font-semibold font-inter leading-normal">
                {feature.name}
              </div>
            </Button>
          ))}
        </div>
        <DialogFooter className="sm:justify-end">
          <Button type="button" className="rounded-full">
            Save change
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
