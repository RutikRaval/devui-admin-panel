import axiosInstance from "./axiosInstance"

export const addComponent =async (data) => {
    return axiosInstance.post(`component/createcomponent`,data)
}