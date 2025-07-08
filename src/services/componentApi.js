import axiosInstance from "./axiosInstance"

export const addComponent =async (data) => {
    return axiosInstance.post(`component/createcomponent`,data)
}
// export const addComponent =async (data) => {
//     return axiosInstance.post()
// }
export const showAllComponent=()=>{
    return axiosInstance.get("/component/getallcomponent")
}
export const updateComponent=({id,body})=>{
    return axiosInstance.put(`/component/editcomponent/${id}`,body)
}
export const deleteComponent=(id)=>{
    return axiosInstance.delete(`/component/deletecomponent/${id}`)
}
