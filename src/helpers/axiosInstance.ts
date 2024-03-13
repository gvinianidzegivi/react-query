import axios, { AxiosInstance } from "axios";

const API_URI = "http://localhost:8080";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URI,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
