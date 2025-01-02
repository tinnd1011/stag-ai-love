import axiosClient from "./axios-client";

type Dapp = {
  id: number;
  created_at: string;
  updated_at: string;
  description: string;
  logo: string;
  status: "draft" | "review" | "published";
  title: string;
  walletAddress: string;
  content: {
    role: "user" | "assistant";
    content: string;
  }[];
};

export function getDappById(id: string) {
  return axiosClient.get<Dapp>(`/api/dapp/${id}`);
}

type UpdateDappRequest = {
  content: {
    role: "user" | "assistant";
    content: string;
  }[];
};

export function updateDappById(id: string, data: UpdateDappRequest) {
  return axiosClient.patch(`/api/dapp/${id}`, data);
}

type CreateDappResponse = {
  walletAddress: string;
  name: string;
  content: {
    role: "user" | "assistant";
    content: string;
  }[];
  id: number;
  created_at: string;
  updated_at: string;
};
export function createDapp({
  address,
  content,
}: {
  address: string;
  content: { role: "user" | "assistant"; content: string }[];
}) {
  return axiosClient.post<CreateDappResponse>("/api/dapp", {
    address,
    content,
  });
}

export function getMyDapps({ address }: { address: string }) {
  return axiosClient.get<Dapp[]>("/api/dapp/my-dapp", {
    params: {
      address,
    },
  });
}

export function publishDapps(id: string, data: {
  "logo": string,
  "cover": string,
  "title": string,
  "description": string,
  "categories": number[]
}) {
  return axiosClient.patch(`/api/dapp/publish/${id}`, data);
}

type Token = {
  walletAddress: string;
  network: string;
  router: string;
  tokenName: string;
  symbol: string;
  totalSupply: string;
  marketingWallet: string;
  devWallet: string;
  marketingBuyFee: string;
  devBuyFee: string;
  lpBuyFee: string;
  buyFee: string;
  marketingSellFee: string;
  devSellFee: string;
  lpSellFee: string;
  sellFee: string;
  totalFee: string;
  maxTransactionAmount: string;
  maxWalletAmount: string;
};

export function uploadToken(token: Token) {
  return axiosClient.post("/api/token", token);
}
