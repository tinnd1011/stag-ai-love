import axios from "axios";

const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
};

const axiosClient = axios.create({
  baseURL: getBaseUrl(),
});

export default axiosClient;
