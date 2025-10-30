import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: {
        feed: null
    },
    reducers: {
        addFeed(state, data) {
            state.feed = data.payload
        },
        removeSpecificFeed(state, payload) {
            // state.= null
        },
        clearFeed() {
            return null;
        }  
    }
});

export const { addFeed, removeSpecificFeed, clearFeed } = feedSlice.actions;
export default feedSlice.reducer;