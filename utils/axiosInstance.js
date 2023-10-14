import axios from "axios";

const baseURL = "https://branchcontacts.sundarban.delivery/api";

const axiosInstance = axios.create({
  baseURL: baseURL,
});

export default axiosInstance;
