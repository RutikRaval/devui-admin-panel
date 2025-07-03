import axiosInstance from "./axiosInstance"

export const loginApi=(data) => {
 return axiosInstance.post("/user/login",data)
};