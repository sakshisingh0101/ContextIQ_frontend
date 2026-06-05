const BASE = import.meta.env.VITE_API_URL;

const req = (url, options = {}) =>
    fetch(`${BASE}${url}`, {
        ...options,
        credentials: "include",
        headers: { "Content-Type": "application/json", ...options.headers }
    }).then(r => r.json());

export const createConversation = (data) =>
    req("api/v1/chat/createConversation", {
        method: "POST",
        body: JSON.stringify(data)  // { documentId, title }
    });

export const sendMessage = (conversationId, message) =>
    req(`api/v1/chat/sendMessage/${conversationId}`, {
        method: "POST",
        body: JSON.stringify({ message })
    });

export const getConversation = (conversationId) =>
    req(`api/v1/chat/getConversation/${conversationId}`);