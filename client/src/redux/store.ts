import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./features/auth/authSlice";
import { decksSlice } from "./features/decks/decksSlice";
import { roomSlice } from "./features/room/roomSlice";
// import { gameSlice } from "./features/game/gameSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        decks: decksSlice.reducer,
        room: roomSlice.reducer,
        // game: gameSlice.reducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch