import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import dapp from "@/images/dapp.svg";
import eth from "@/images/eth.svg";
import hash from "@/images/hash.svg";
import image from "@/images/image.svg";
import send from "@/images/send.svg";
import text from "@/images/text.svg";
import widgetAdd from "@/images/widget-add.svg";

import UserCredits from "@/components/user-credits/";
import messageLoading from "@/gifs/loading-message.gif";
import appImage from "@/images/app-image.png";
import { getStreamResponse } from "@/services/claude";
import { createDapp, updateDappById } from "@/services/dapp";
import { ChatMessage } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAccount } from "wagmi";
import { CustomFeature } from "./custom-feature";

export default function Create() {
  const prompt =
    "Assume like you have just created a Dapp according to my prompt, answer like you have just created one and ask me whether I want to 'Go to Dapp' or to 'Publish' it, don't say anything unnecessary.\nMy prompt: ";
  const app = {
    name: "Image generator",
    image: appImage,
    description:
      "A GPT specialized in generating and refining images with a mix of professional and friendly tone.",
  };
  const suggestions = [
    {
      value: "Create a memecoin landing page with Pepe related",
      icon: eth,
    },
    {
      value: "Create a Pac-man game",
      icon: dapp,
    },
    {
      value: "Create a Weather App with clean, modern design",
      icon: dapp,
    },
    {
      value: "Create a moon phase BTC price tracker",
      icon: dapp,
    },
    {
      value: "Create a Crypto Profit/Loss Tracker",
      icon: text,
    },
    {
      value:
        "Create a feature-rich calculator with basic arithmetic, scientific functions, and history tracking",
      icon: image,
    },
  ];

  const { address, isConnected, isConnecting, isReconnecting, isDisconnected } =
    useAccount();

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]); // Store streamed text
  const [isLoading, setIsLoading] = useState(false); // Show loading indicator

  const [streamingMessage, setStreamingMessage] = useState<string>("");
  const [dapps, setDapps] = useState<string[]>([]);

  async function handleSend() {
    if (!address) return;
    setIsLoading(true);
    setMessages((messages) => [...messages, { role: "user", content: input }]);
    getStreamResponse([
      ...messages,
      { role: "user", content: prompt + input },
    ]).then((response) => {
      createDapp({
        address: address,
        content: [
          {
            role: "user",
            content: input,
          },
        ],
      }).then((res) => {
        if (res.status === 201) {
          setDapps((dapps) => [...dapps, res.data.id.toString()]);
          getStreamResponse([
            {
              role: "user",
              content: input,
            },
          ]).then((response) => {
            if (response.status === 201) {
              const data = response.data;
              const newMessages: ChatMessage[] = [
                ...messages,
                { role: "user", content: input },
                ...data.content.map<ChatMessage>((item) => ({
                  role: "assistant",
                  content: item.text,
                })),
              ];
              updateDappById(res.data.id.toString(), {
                content: newMessages,
              }).then((responseUpdate) => {
                if (responseUpdate.status === 200) {
                  setIsLoading(false); // Set loading to false after the update
                }
              });
            }
          });
        }
        if (response.status === 201) {
          handleCreate();
          const data = response.data;
          const newMessages: ChatMessage[] = [
            ...messages,
            { role: "user", content: input },
            ...data.content.map<ChatMessage>((item) => ({
              role: "assistant",
              content: item.text,
            })),
          ];
          streamMessage(data.content[0].text, () => {
            setMessages(newMessages);
          });
        }
      });
    });
    setInput("");
  }
  function streamMessage(message: string, callback: () => void) {
    const chunks = message.split(" ");
    for (let i = 0; i < chunks.length + 1; i++) {
      if (i === chunks.length) {
        setTimeout(() => {
          setStreamingMessage("");
          callback();
        }, 100 * i);
      } else {
        setTimeout(() => {
          setStreamingMessage((prevMessage) => prevMessage + " " + chunks[i]);
        }, 100 * i);
      }
    }
  }

  // console.log(isLoading);

  const handleKeyDown = (e: {
    key: string;
    shiftKey: any;
    preventDefault: () => void;
  }) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent default to avoid new line
      if (address) handleSend();
    }
  };

  const router = useRouter();
  async function handleCreate() {}
  return (
    <div className="relative h-full md:py-0 py-2 animate-slide-in-right">
      <div className="md:flex sticky px-4 md:px-10 space-y-4  w-full justify-between">
        <div className="flex items-center gap-4">
          <Image src={widgetAdd} alt="widget-add" width={32} />
          <div className="font-inter text-2xl font-semibold text-[#1b1b1b]">
            Create your AI Dapps
          </div>
        </div>
        <UserCredits />
      </div>

      <div
        className={`flex relative py-8 flex-col px-4 md:px-10 focus-visible:outline-0 overflow-auto ${
          messages.length == 0
            ? "justify-center items-center md:h-[calc(100%-348px)]"
            : "h-[calc(100%-248px)]"
        }`}
      >
        <div className="flex flex-col items-center md:justify-center gap-4">
          <div className="flex flex-col items-center justify-center gap-4">
            <Image src={hash} alt="hash" width={64} />
            <div className="text-[#1b1b1b] text-[42px] font-semibold font-['Neue Haas Grotesk Display Pro']">
              Xetra AI
            </div>
          </div>
          <div className="font-inter text-lg font-semibold text-[#1b1b1b]">
            Describe your AI Dapp here, and we’ll bring it to life!
          </div>
        </div>
        <div className="flex flex-col gap-8 mt-4">
          {messages.map((message, index) => {
            return message.role === "user" ? (
              <div className="flex w-full justify-end">
                <div className="inline-flex max-w-[344px] md:max-w-[551px] flex-col items-start justify-center gap-1 rounded-[20px] bg-white px-4 py-3 shadow">
                  <div className="self-stretch font-inter text-base font-normal leading-normal text-[#232631]">
                    {message.content}
                  </div>
                </div>
              </div>
            ) : message.role === "assistant" && !isLoading ? (
              <div className="inline-flex w-full items-start justify-start gap-3">
                <Image
                  className="rounded-[192px]"
                  alt="app logo"
                  src={app.image}
                  width={48}
                />
                <div className="flex shrink grow basis-0 flex-col items-start justify-center gap-1 rounded-bl-xl rounded-br-xl rounded-tl rounded-tr-xl pt-3">
                  <p className="self-stretch whitespace-pre-line font-inter text-base font-normal leading-normal text-[#232631]">
                    {message.content}
                  </p>
                  <div className="flex rounded-4xl items-center justify-start gap-2">
                    <Button
                      onClick={() =>
                        router.push(
                          `?type=app&appId=${dapps[Math.floor(index / 2)]}`
                        )
                      }
                    >
                      Go to Dapp
                    </Button>
                    <Button>Publish</Button>
                  </div>
                </div>
              </div>
            ) : null;
          })}
          {(isLoading || streamingMessage !== "") && (
            <div className="inline-flex w-full items-start justify-start gap-3">
              <Image
                className="rounded-[192px]"
                alt="app logo"
                src={app.image}
                width={48}
              />
              <div className="flex shrink grow basis-0 flex-col items-start justify-center gap-1 rounded-bl-xl rounded-br-xl rounded-tl rounded-tr-xl pt-3">
                {isLoading ? (
                  <div className="flex items-start justify-start">
                    <p className="self-stretch whitespace-pre-line font-inter text-base font-normal leading-normal text-[#232631]">
                      Im working on creating your app now. This might be take a
                      minute
                    </p>
                    <Image
                      unoptimized={true}
                      src={messageLoading}
                      alt="loading"
                      height={24}
                    />
                  </div>
                ) : (
                  <div>
                    <p className="self-stretch whitespace-pre-line font-inter text-base font-normal leading-normal text-[#232631]">
                      {streamingMessage}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center absolute md:bottom-0 bottom-[80px] mx-auto w-full">
        <div className="flex justify-center md:mb-8 mb-2 w-[calc(100%-32px)] md:w-[calc(100%-80px)]">
          {messages.length === 0 && (
            <div className="flex w-full overflow-x-auto no-scrollbar md:flex-wrap gap-4">
              {suggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant={"outline"}
                  className="h-11 max-w-max rounded-lg border border-[#eaeaea] bg-white p-3"
                  onClick={() => setInput(suggestion.value)}
                >
                  <Image
                    src={suggestion.icon}
                    alt="suggestion"
                    className="text-black"
                    width={20}
                  />
                  <p className="font-inter text-xs font-medium leading-none text-[#1b1b1b]">
                    {suggestion.value}
                  </p>
                </Button>
              ))}
            </div>
          )}
        </div>
        <div
          className="w-[calc(100%-32px)] md:w-[calc(100%-80px)] h-[160px] rounded-3xl p-0.5"
          style={{
            background: "linear-gradient(to right, #6767FF, #F06DFF)",
          }}
        >
          <div className="relative rounded-[22px] bg-white p-0">
            <Textarea
              onKeyDown={handleKeyDown}
              placeholder="Describe your AI idea here, and let’s make it real with Xetra-powered GPT!"
              className="relative inline-flex min-h-[149px] resize-none font-inter appearance-none items-start justify-start gap-4 border-none bg-transparent md:p-6 p-4 md:pl-20 pl-14 font-inter text-base font-normal leading-normal placeholder-[#aeaeae]"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Image
              src={hash}
              alt="hash"
              width={40}
              className="absolute md:left-6 md:top-6 top-4 left-4 md:w-10 md:h-10 w-6 h-6"
            />
            <CustomFeature>
              <Button
                variant={"outline"}
                className="absolute bottom-4 left-4 items-center bg-white  text-black border rounded-lg flex hover:cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M5 10H15"
                    stroke="#FF306E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 15V5"
                    stroke="#FF306E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p>Add Custom Feature</p>
              </Button>
            </CustomFeature>
            <Button
              size={"icon"}
              className="absolute bottom-4 right-4 rounded-full hover:cursor-pointer"
              disabled={!address}
              onClick={handleSend}
            >
              {isLoading || streamingMessage !== "" ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.3 21H14.7C19.2 21 21 19.2 21 14.7V9.3C21 4.8 19.2 3 14.7 3H9.3C4.8 3 3 4.8 3 9.3V14.7C3 19.2 4.8 21 9.3 21Z"
                    fill="white"
                  />
                </svg>
              ) : (
                <Image src={send} alt="send" width={24} />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
