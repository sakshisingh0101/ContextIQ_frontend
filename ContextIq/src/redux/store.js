import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import documentReducer from "./documentSlice.js";
import chatReducer from "./chatSlice.js";      // ← chatgptSlice se rename ke baad sahi

export const store = configureStore({
    reducer: {
        auth: authReducer,
        documents: documentReducer,
        chat: chatReducer
    }
});