// pages/api/axios.js (or axios.ts for TypeScript)
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  // other configuration options
});

export default axiosInstance;
