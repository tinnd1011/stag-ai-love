// use axiosClient from the axios-client.ts file, create a function that gets back response under stream format like AI normally used to

import { ChatMessage } from "@/types";
import axiosClient from "./axios-client";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type StreamResponse = {
  id: string;
  type: string;
  role: string;
  model: string;
  content: {
    type: string;
    text: string;
  }[];
  stop_reason: string;
  stop_sequence: null;
  usage: {
    input_tokens: number;
    cache_creation_input_tokens: number;
    cache_read_input_tokens: number;
    output_tokens: number;
  };
};
export function getStreamResponse(messages: Message[]) {
  return axiosClient.post<StreamResponse>("/api/claude/stream", { messages });
}

export const messagesForChat8: ChatMessage[] = [
  {
    role: "user",
    content:
      "After this message, I will input the string. \n Your task is: \n - if the address I input not match ETH or SOL address, you response: '''It error, not match ETH or SOL''' or you can response with same mean like this - If the address match, response View this link: https://app.bubblemaps.io/eth token/${tokenAddress}",
  },
  {
    role: "assistant",
    content: "Understood! Please input the address.",
  },
  {
    role: "user",
    content: "12312312",
  },
];

export function getStreamResponseForChat8() {
  return axiosClient.post<StreamResponse>("/api/claude/stream", {
    messagesForChat8,
  });
}
