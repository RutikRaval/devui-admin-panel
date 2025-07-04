import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://192.168.54.42:3000/app",
  headers: {
    "Content-Type": "application/json",
  }
});


axiosInstance.interceptors.request.use((config) => {

  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
},
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error?.response?.data?.message);
  }
);

export default axiosInstance;
