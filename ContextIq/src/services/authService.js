const BASE = import.meta.env.VITE_API_URL;

const req = (url, options = {}) =>
    fetch(`${BASE}${url}`, {
        ...options,
        credentials: "include",  // cookies har request mein jayenge
        headers: { "Content-Type": "application/json", ...options.headers }
    }).then(r => r.json());

export const register = (data) =>
    req("/auth/register", {
        method: "POST",
        body: JSON.stringify(data)  // { userName, email, password }
    });

export const verifyEmail = (data) =>
    req("/auth/verifyEmail", {
        method: "POST",
        body: JSON.stringify(data)  // { email, otp }
    });

export const login = (data) =>
    req("/auth/login", {
        method: "POST",
        body: JSON.stringify(data)  // { email, password }
    });

export const logout = () =>
    req("/auth/logout");  // GET, cookie se sessionId automatically jayega

export const refreshToken = () =>
    req("/auth/refreshAccessToken");  // GET