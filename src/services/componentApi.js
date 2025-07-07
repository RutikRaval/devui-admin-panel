import axiosInstance from "./axiosInstance"

export const getAllLanguageAPi=() => {
    return axiosInstance.get("language/getalllanguage")
}