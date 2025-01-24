import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
});

axiosInstance.interceptors.request.use((config) => {
  if (!process.env.NEXT_PUBLIC_KAKAO_API_KEY) {
    throw new Error("NEXT_PUBLIC_KAKAO_API_KEY is not defined");
  }

  config.headers["Authorization"] =
    `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_API_KEY}`;
  return config;
});

export default axiosInstance;
