import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RoomData } from "../../../types/interfaces";
import axios from "../../../utils/axios"

interface RoomState {
    room: RoomData | null,
    loading: boolean,
    error: string | null
}

const initialState: RoomState = {
    room: null,
    loading: false,
    error: null 
}

export const connectUser = createAsyncThunk(
    'rooms/connectUser',
    async () => {
        try {
            const { data } = await axios.post('/rooms/connectUser');
            return {room: data};
        } catch (err) {
            console.log(err);
            return { room: null, error: 'Ошибка при подключении к комнате' };
        }
    }
);

export const deleteRoom = createAsyncThunk(
    'rooms/deleteRoom',
    async ({ roomId }) => {
        try {
            const { data } = await axios.delete('/rooms/deleteRoom', {
                roomId,
            });
            return { room: data, error: null };
        } catch (err) {
            console.log(err);
            return { room: null, error: 'Ошибка при удалении комнаты' };
        }
    }
)

export const getRoom = createAsyncThunk(
    'rooms',
    async () => {
        try {
            const { data } = await axios.get('/rooms');
            return { room: data, error: null };
        } catch (err) {
            console.log(err);
            return { room: null, error: 'Ошибка при удалении комнаты' };
        }
    }
)

export const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        
        //Подключение пользователя
        .addCase(connectUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(connectUser.fulfilled, (state, action: PayloadAction<{ room: RoomData, error: string | null }>) => {
            state.loading = false;
            state.error = null;
            state.room = action.payload.room;
        })
        .addCase(connectUser.rejected, (state, action: PayloadAction<{ room: RoomData, error: string | null }>) => {
            state.loading = false;
            state.error = action.payload.error;
        })

        //Удаление комнаты
        .addCase(deleteRoom.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteRoom.fulfilled, (state, action: PayloadAction<{ room: RoomData, error: string | null }>) => {
            state.loading = false;
            state.error = null;
            state.room = action.payload.room;
        })
        .addCase(deleteRoom.rejected, (state, action: PayloadAction<{ room: RoomData, error: string | null }>) => {
            state.loading = false;
            state.error = action.payload.error;
        })

        //Получение данных о комнате
        .addCase(getRoom.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getRoom.fulfilled, (state, action: PayloadAction<{ room: RoomData, error: string | null }>) => {
            state.loading = false;
            state.error = null;
            state.room = action.payload.room;
        })
        .addCase(getRoom.rejected, (state, action: PayloadAction<{ room: RoomData, error: string | null }>) => {
            state.loading = false;
            state.error = action.payload.error;
        })
    },
})

export default roomSlice.reducer;
