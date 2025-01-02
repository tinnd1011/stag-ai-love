"use client";

import React from "react";
import { CreateAgentFormContext, CreateAgentProvider } from "./config";
import Nav from "./nav";
import MultiStepForm from "../ui/multi-step-form";
import { useMultiStepForm } from "@/hooks/multi-step-form";
import Profile from "../create/profile";

export default function CreateAgent() {
  return (
    <div className="w-full items-center flex flex-col px-4 md:px-10 py-6 space-y-8">
      <div className="h-16 justify-between w-full items-center md:inline-flex hidden">
        <div className="justify-start items-center gap-4 flex">
          <div className="w-8 h-8 justify-center items-center flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d="M17.9065 7.23996V9.02663C14.4132 9.30663 12.4265 11.5466 12.4265 15.24V21.3333H7.23984C4.1865 21.3333 2.6665 19.8133 2.6665 16.76V7.23996C2.6665 4.18663 4.1865 2.66663 7.23984 2.66663H13.3332C16.3865 2.66663 17.9065 4.18663 17.9065 7.23996Z"
                fill="#FF306E"
              />
              <path
                d="M24.7599 10.6666H18.6666C15.6133 10.6666 14.0933 12.1866 14.0933 15.24V24.76C14.0933 27.8133 15.6133 29.3333 18.6666 29.3333H24.7599C27.8133 29.3333 29.3333 27.8133 29.3333 24.76V15.24C29.3333 12.1866 27.8133 10.6666 24.7599 10.6666ZM24.1733 21H22.9999V22.1733C22.9999 22.72 22.5466 23.1733 21.9999 23.1733C21.4533 23.1733 20.9999 22.72 20.9999 22.1733V21H19.8266C19.2799 21 18.8266 20.5466 18.8266 20C18.8266 19.4533 19.2799 19 19.8266 19H20.9999V17.8266C20.9999 17.28 21.4533 16.8266 21.9999 16.8266C22.5466 16.8266 22.9999 17.28 22.9999 17.8266V19H24.1733C24.7199 19 25.1733 19.4533 25.1733 20C25.1733 20.5466 24.7199 21 24.1733 21Z"
                fill="#FF306E"
              />
            </svg>
          </div>
          <div className="text-[#1b1b1b] text-2xl font-semibold font-inter">
            Create Agent
          </div>
        </div>
          <Profile />
      </div>
      <CreateAgentProvider>
        <div className="md:w-[690px]">
          <Form />
        </div>
      </CreateAgentProvider>
    </div>
  );
}

function Form() {
  const { CurrentForm } = useMultiStepForm(CreateAgentFormContext);

  return (
    <MultiStepForm context={CreateAgentFormContext}>
      <div className="space-y-6">
        <Nav context={CreateAgentFormContext} />

        <div className="w-full p-10 bg-white rounded-[32px] border border-white/5 flex-col justify-start items-start gap-6 inline-flex">
          <CurrentForm />
        </div>
      </div>
    </MultiStepForm>
  );
}
