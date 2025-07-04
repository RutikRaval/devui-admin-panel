import axiosInstance from "./axiosInstance"

export const addLanguage = async (data) => {
    return await axiosInstance.post("language/addlanguage", data)
}

export const showAllLanguage = () => {
    return axiosInstance.get("language/getalllanguage")
}
export const deleteLanguage = (id) => {
    return axiosInstance.delete(`language/deletelanguage/${id}`)
}

export const updateLanguage = ({id,name}) => {
    return axiosInstance.put(`language/updatelanguage/${id}`,{name})
}