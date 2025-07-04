import { useQueryClient } from "@tanstack/react-query";

export const getToken = () => {
    const data = JSON.parse(sessionStorage.getItem("user"));
    const role = data?.role;
    const token = sessionStorage.getItem("token");

    if (token) return { token, role };
    return null;
};

export const formattedDate = (date) => {
    return date ? new Date(date).toLocaleDateString() : new Date().toLocaleDateString()
}

export const upperCaseLetter = (str) => {
    if (!str) return ""
    return str
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
} 
