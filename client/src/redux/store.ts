import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./features/auth/authSlice";
import { decksSlice } from "./features/deck/decksSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        decks: decksSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch