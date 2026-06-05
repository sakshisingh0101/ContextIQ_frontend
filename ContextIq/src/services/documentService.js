const BASE = import.meta.env.VITE_API_URL;

export const uploadDocument = (formData) =>
    fetch(`${BASE}/api/v1llmEngine/uploadDocument`, {
        method: "POST",
        credentials: "include",
        body: formData  // FormData — NO Content-Type header, browser sets it
    }).then(r => r.json());

export const getDocuments = () =>
    fetch(`${BASE}/api/v1/llmEngine/getDocuments`, {
        credentials: "include"
    }).then(r => r.json());

export const deleteDocument = (id) =>
    fetch(`${BASE}/api/v1/users/deletedocumentsById/${id}`, {
        method: "DELETE",
        credentials: "include"
    }).then(r => r.json());

export const deleteAllDocuments = ()=>
    fetch(`${BASE}/api/v1/users/deleteAllDocuments`,{
        method:"DELETE",
        credentials:"include"
    }).then(r=>r.json());