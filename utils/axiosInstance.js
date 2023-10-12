import axios from "axios";

const baseURL = "https://branchcontacts.sundarban.delivery/api"; // Replace this with your API base URL

const axiosInstance = axios.create({
  baseURL: baseURL,
});

export default axiosInstance;
