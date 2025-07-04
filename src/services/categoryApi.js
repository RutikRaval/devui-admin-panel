import axiosInstance from "./axiosInstance"

export const addCategory = (data) => {
    return axiosInstance.post("category/addcategory",data)
}
export const showAllCategory = () => {
    return axiosInstance.get("category/getallcategory")
}