/* eslint-disable react-hooks/rules-of-hooks */
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import messageLoading from "@/gifs/loading-message.gif";
import appImage from "@/images/app-image.png";
import arrowLeft from "@/images/arrow-left.svg";
import chatMessageCopy from "@/images/chat-message-copy.svg";
import dots from "@/images/dots.svg";
import chatLogo from "@/images/logo-chat.png";
import send from "@/images/send.svg";
import { getStreamResponse, messagesForChat8 } from "@/services/claude";
import { getDappById, updateDappById } from "@/services/dapp";
import { ChatMessage } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function Chat() {
  const app = {
    name: "Bot Assistant",
    image: appImage,
    description:
      "A GPT specialized in generating and refining images with a mix of professional and friendly tone.",
  };
  const router = useRouter();
  const dappId = useSearchParams().get("chatId");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]); // Store streamed text
  const [isLoading, setIsLoading] = useState(false); // Show loading indicator
  const [appData, setAppData] = useState<any>(app);

  const og = useSearchParams().get("og");

  if (!dappId) {
    return <div>wrong id</div>;
  }

  useEffect(() => {
    getDappById(dappId).then((response) => {
      if (response.status === 200) {
        const data = response.data;
        setAppData({
          name: data.title || "Bot Assistant",
          image: data.logo || appImage,
          description:
            data.description ||
            "A GPT specialized in generating and refining images with a mix of professional and friendly tone.",
        });
        setMessages(data.content || []);
      }
    });

    if (dappId === "8") {
      setMessages(messagesForChat8);
      getStreamResponse(messagesForChat8).then((response) => {
        if (response.status === 201) {
          const data = response.data;
          const newMessages: ChatMessage[] = [
            ...messagesForChat8,
            ...data.content.map<ChatMessage>((item) => ({
              role: "assistant",
              content: item.text,
            })),
          ];
          updateDappById(dappId!, {
            content: newMessages,
          });
          streamMessage(data.content[0].text, () => {
            setMessages(newMessages);
          });
        }
      });
    }
  }, []);

  const [streamingMessage, setStreamingMessage] = useState<string>("");

  function handleSend() {
    setIsLoading(true);
    setMessages((messages) => [...messages, { role: "user", content: input }]);
    getStreamResponse([...messages, { role: "user", content: input }]).then(
      (response) => {
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
          updateDappById(dappId!, {
            content: newMessages,
          });
          setIsLoading(false);
          streamMessage(data.content[0].text, () => {
            setMessages(newMessages);
          });
        }
      }
    );
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

  const handleKeyDown = (e: {
    key: string;
    shiftKey: any;
    preventDefault: () => void;
  }) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent default to avoid new line
      handleSend();
    }
  };

  console.log(appData);

  return (
    <div className="relative flex h-full flex-col md:py-0 py-6">
      <div className="flex sticky px-4 md:px-10 top-0 items-center w-full justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={arrowLeft}
            alt="arrow left"
            width={24}
            className="hover:cursor-pointer"
            onClick={() => {
              if (og) {
                router.push("?type=store");
              } else {
                router.push("?type=my-apps");
              }
            }}
          />
          <div className="flex items-center gap-[13px]">
            <Image src={app.image} alt="widget-add" width={32} />
            <div className="font-inter text-2xl font-semibold text-[#1b1b1b]">
              {appData.name}
            </div>
          </div>
          <div className="md:hidden hover:cursor-pointer">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.2594 3.59997L5.04936 12.29C4.73936 12.62 4.43936 13.27 4.37936 13.72L4.00936 16.96C3.87936 18.13 4.71936 18.93 5.87936 18.73L9.09936 18.18C9.54936 18.1 10.1794 17.77 10.4894 17.43L18.6994 8.73997C20.1194 7.23997 20.7594 5.52997 18.5494 3.43997C16.3494 1.36997 14.6794 2.09997 13.2594 3.59997Z"
                stroke="#666666"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.8906 5.05005C12.3206 7.81005 14.5606 9.92005 17.3406 10.2"
                stroke="#666666"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3 22H21"
                stroke="#666666"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
        <Image
          src={chatLogo}
          alt="arrow left"
          width={60}
          className="hidden md:block"
        />
      </div>
      <div
        className={`flex relative h-[calc(100%-200px)] py-8 flex-col px-4 md:px-10 focus-visible:outline-0 overflow-auto ${
          messages.length == 0 ? "justify-center items-center" : ""
        }`}
      >
        <div className="relative flex flex-col gap-4 ">
          <div className="relative inline-flex flex-col items-center justify-center gap-4">
            <div className="flex flex-col items-center justify-center gap-4">
              <Image src={app.image} alt="hash" width={64} />
              <div className="font-inter text-4xl font-semibold text-[#1b1b1b] text-center">
                {appData.name}
              </div>
            </div>
            <div className="max-w-[518px] text-center font-inter text-lg font-normal text-[#666666]">
              {appData.description}
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 -translate-y-16">
              <Image src={dots} alt="hash" width={400} />
            </div>
          </div>
          <div className="flex flex-col gap-8">
            {messages.map((message) => {
              return message.role === "user" ? (
                <div className="flex w-full justify-end">
                  <div className="inline-flex max-w-[344px] md:max-w-[551px] flex-col items-start justify-center gap-1 rounded-[20px] bg-white px-4 py-3 shadow">
                    <div className="self-stretch font-inter text-base font-normal leading-normal text-[#232631]">
                      {message.content}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="inline-flex w-full items-start justify-start gap-3">
                  <Image
                    className="rounded-[192px]"
                    alt="app logo"
                    src={app.image}
                    width={48}
                  />
                  <div className="flex shrink grow basis-0 flex-col items-start justify-center gap-1 rounded-bl-xl rounded-br-xl rounded-tl rounded-tr-xl pt-3">
                    {/* {message.type === "TEXT" ? ( */}
                    <>
                      <p className="self-stretch whitespace-pre-line font-inter text-base font-normal leading-normal text-[#232631]">
                        {message.content}
                      </p>
                      <div
                        className="inline-flex items-center justify-start gap-2.5 p-1 hover:cursor-pointer"
                        onClick={() => {
                          navigator.clipboard.writeText(message.content);
                        }}
                      >
                        <Image
                          className="rounded-xl"
                          alt="image"
                          src={chatMessageCopy}
                          width={20}
                        />
                      </div>
                    </>
                    {/* ) : (
                    <>
                      <Image
                        className="h-60 w-[429.26px] rounded-xl"
                        alt="image"
                        src={message.content}
                        width={429}
                        height={240}
                      />
                      <div className="inline-flex items-center justify-start gap-2.5 p-1 hover:cursor-pointer">
                        <Image
                          className="rounded-xl"
                          alt="image"
                          src={chatImageDownload}
                          width={20}
                        />
                      </div>
                    </>
                  )} */}
                  </div>
                </div>
              );
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
                    <Image
                      unoptimized={true}
                      src={messageLoading}
                      alt="loading"
                      height={48}
                    />
                  ) : (
                    <div>
                      <p className="self-stretch whitespace-pre-line font-inter text-base font-normal leading-normal text-[#232631]">
                        {streamingMessage}
                      </p>
                      <div className="inline-flex items-center justify-start gap-2.5 p-1 hover:cursor-pointer">
                        <Image
                          className="rounded-xl"
                          alt="image"
                          src={chatMessageCopy}
                          width={20}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className="absolute md:bottom-6 bottom-[80px] left-1/2 -translate-x-1/2 w-[calc(100%-32px)] md:w-[calc(100%-80px)] h-[112px] rounded-3xl p-0.5"
        style={{
          background: "linear-gradient(to right, #6767FF, #F06DFF)",
        }}
      >
        <div className="relative rounded-[22px] bg-white p-0">
          <Textarea
            placeholder="Try something like: 'A futuristic city at sunset, filled with flying cars and neon lights, in a cyberpunk style.'"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="relative inline-flex min-h-[101px] resize-none appearance-none items-start justify-start gap-4 border-none bg-transparent p-6 pr-12 font-inter text-base font-normal leading-normal placeholder-[#aeaeae]"
          />
          <Button
            size={"icon"}
            className="absolute bottom-4 right-4 rounded-full hover:cursor-pointer"
            onClick={handleSend}
          >
            <Image src={send} alt="send" width={24} />
          </Button>
        </div>
      </div>
    </div>
  );
}
