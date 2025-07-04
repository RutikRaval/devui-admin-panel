import axiosInstance from "./axiosInstance"

export const addLanguage=async(data)=>{
    return await axiosInstance.post("language/addlanguage",data)
}