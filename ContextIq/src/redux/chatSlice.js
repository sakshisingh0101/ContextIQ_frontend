import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        conversationId: null,
        messages: [],
        loading: false
    },
    reducers: {
        setConversationId: (state, action) => { state.conversationId = action.payload; },
        setMessages: (state, action) => { state.messages = action.payload; },
        addMessage: (state, action) => { state.messages.push(action.payload); },
        setLoading: (state, action) => { state.loading = action.payload; },
        resetChat: (state) => {
            state.conversationId = null;
            state.messages = [];
        }
    }
});

export const { setConversationId, setMessages, addMessage, setLoading, resetChat } = chatSlice.actions;
export default chatSlice.reducer;