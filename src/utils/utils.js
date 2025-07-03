export const getToken = () => {
    const data = JSON.parse(sessionStorage.getItem("user"));
    const role = data?.role;
    const token = sessionStorage.getItem("token");

    if (token) return { token, role };
    return null;
};
