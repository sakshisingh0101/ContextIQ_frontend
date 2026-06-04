import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: true,
    error: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        setAuthLoading: (state, action) => {
            state.loading = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        }
    }
});

export const { setCredentials, setAuthLoading, logout } = authSlice.actions;
export default authSlice.reducer;