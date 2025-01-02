import axiosClient from "./axios-client";

export type Plan = {
  id: number;
  name: string;
  price: string;
  credit: string;
};

export type Stake = {
  stake: {
    timestamp: string;
    amount: string;
  }[];
  reward: {
    timestamp: string;
    amount: string;
  }[];
};

export const getPlan = () => {
  return axiosClient.get<Plan[]>("/api/plan");
};

export const buyPlan = (planId: number, walletAddress: string) => {
  return axiosClient.post("/api/plan", {
    walletAddress,
    planId,
  });
};

export const getStakes = (walletAddress: string) => {
  return axiosClient.get<Stake>(`/api/stake/${walletAddress}`);
};
