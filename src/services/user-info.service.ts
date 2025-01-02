import axiosClient from "./axios-client";

type CreateUserRequestParams = {
  address: `0x${string}`;
  name: string;
  avatar: string
}

const userInfoService = {
  createNewUser: (userInfo: CreateUserRequestParams) => {
    return axiosClient.post("/api/wallet", userInfo);
  },
  getUserInfo: (address: string) => {
    return axiosClient.get(`/api/wallet/${address}`);
  },
}

export default userInfoService;
