import { createSlice } from "@reduxjs/toolkit";

const documentSlice = createSlice({
    name: "documents",
    initialState: {
        documents: [],
        currentDocument: null,
        uploading: false,
        error: null
    },
    reducers: {
        setDocuments: (state, action) => { state.documents = action.payload; },
        addDocument: (state, action) => { state.documents.unshift(action.payload); },
        removeDocument: (state, action) => {
            state.documents = state.documents.filter(d => d.id !== action.payload);
        },
        setCurrentDocument: (state, action) => { state.currentDocument = action.payload; },
        setUploading: (state, action) => { state.uploading = action.payload; }
    }
});

export const { setDocuments, addDocument, removeDocument, setCurrentDocument, setUploading } = documentSlice.actions;
export default documentSlice.reducer;