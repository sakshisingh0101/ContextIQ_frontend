import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import documentReducer from "./documentSlice";
import chatReducer from "./chatSlice";      // ← chatgptSlice se rename ke baad sahi

export const store = configureStore({
    reducer: {
        auth: authReducer,
        documents: documentReducer,
        chat: chatReducer
    }
});