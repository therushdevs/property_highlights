// src/utils/axiosInstance.ts
import axios from "axios";
// const localBaseUrl = "http://localhost:5000";
const remoteBaseUrl = "https://property-highlights-server-qfpa.onrender.com";

const axiosInstance = axios.create({
  baseURL: `${remoteBaseUrl}/api`,
});

export default axiosInstance;
