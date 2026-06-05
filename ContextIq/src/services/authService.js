const BASE = import.meta.env.VITE_API_URL;

const req = (url, options = {}) =>
    fetch(`${BASE}${url}`, {
        ...options,
        credentials: "include",  // cookies har request mein jayenge
        headers: { "Content-Type": "application/json", ...options.headers }
    }).then(r => r.json());

export const register = (data) =>
    req("api/v1/auth/register", {
        method: "POST",
        body: JSON.stringify(data)  // { userName, email, password }
    });

export const verifyEmail = (data) =>
    req("api/v1/auth/verifyEmail", {
        method: "POST",
        body: JSON.stringify(data)  // { email, otp }
    });

export const login = (data) =>
    req("api/v1/auth/login", {
        method: "POST",
        body: JSON.stringify(data)  // { email, password }
    });

export const logout = () =>
    req("api/v1/auth/logout");  // GET, cookie se sessionId automatically jayega

export const refreshToken = () =>
    req("api/v1/auth/refreshAccessToken");  // GET