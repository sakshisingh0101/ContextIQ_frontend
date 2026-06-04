const BASE = import.meta.env.VITE_API_URL;

const req = (url, options = {}) =>
    fetch(`${BASE}${url}`, {
        ...options,
        credentials: "include",
        headers: { "Content-Type": "application/json", ...options.headers }
    }).then(r => r.json());

export const getProfile = () =>
    req("/users/profile");  // GET — app load pe call hoga

export const updateProfile = (data) =>
    req("/users/updateProfile", {
        method: "PUT",
        body: JSON.stringify(data)  // { username, email }
    });

export const updatePassword = (data) =>
    req("/users/changePassword", {
        method: "PUT",
        body: JSON.stringify(data)  // { currentPassword, newPassword }
    });