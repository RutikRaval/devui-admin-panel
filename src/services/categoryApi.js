import axiosInstance from "./axiosInstance"

export const addCategory = (data) => {
    return axiosInstance.post("category/addcategory",data)
}
export const showAllCategory = () => {
    return axiosInstance.get("category/getallcategory")
}
export const deleteCategory = (id) => {
    return axiosInstance.delete(`category/deletecategory/${id}`)
}
export const updateCategory = ({id,name}) => {
    return axiosInstance.put(`category/updatecategory/${id}`,{name})
}