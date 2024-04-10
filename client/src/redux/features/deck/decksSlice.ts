import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DeckData } from "../../../types/interfaces";
import axios from "../../../utils/axios"

interface DeckState {
    decks: DeckData[],
    loading: boolean,
    error: string | null,
    currentDeckNum: number | null
}

const initialState: DeckState = {
    decks: [],
    loading: false,
    error: null,
    currentDeckNum: 0 
}

export const getDecks = createAsyncThunk(
  'decks',
  async () => {
      try {
          const { data } = await axios.get('/decks');
          return { decks: data, error: null };
      } catch (err) {
          console.log(err);
          return { decks: null, error: 'Ошибка при получении колод' };
      }
  }
)

export const pushCard = createAsyncThunk(
    'decks/pushCard',
    async ({ deckId, cardId }) => {
        try {
            const { data } = await axios.post('/decks/pushCard', {
                deckId,
                cardId,
            });
            return data;
        } catch (err) {
            console.log(err);
        }
    }
);

export const deleteCard = createAsyncThunk(
    'decks/deleteCard',
    async ({ deckId, cardId }) => {
        try {
            const { data } = await axios.delete('/decks/deleteCard', {
                deckId,
                cardId,
              });
            return data;
        } catch (err) {
            console.log(err);
        }
    }
)

export const decksSlice = createSlice({
    name: 'decks',
    initialState,
    reducers: {
        setCurrentDeck: (state: DeckState, action) => {
            state.currentDeckNum = action.payload.currentDeckNum
        }
    },
    extraReducers: (builder) => {
        builder
        
        //Получение колод
        .addCase(getDecks.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getDecks.fulfilled, (state, action: PayloadAction<{ decks: DeckData[], error: string | null }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.decks = action.payload.decks;
        })
        .addCase(getDecks.rejected, (state, action: PayloadAction<{ decks: DeckData[], error: string | null }>) => {
            state.loading = false;
            state.error = action.payload.error;
        })

        //Добавление карты в колоду
        .addCase(pushCard.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(pushCard.fulfilled, (state, action: PayloadAction<{ decks: DeckData[], error: string | null }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.decks = action.payload.decks;
        })
        .addCase(pushCard.rejected, (state, action: PayloadAction<{ decks: DeckData[], error: string | null }>) => {
            state.loading = false;
            state.error = action.payload.error;
        })

        //Удаление карты
        .addCase(deleteCard.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteCard.fulfilled, (state, action: PayloadAction<{ decks: DeckData[], error: string | null }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.decks = action.payload.decks;
        })
        .addCase(deleteCard.rejected, (state, action: PayloadAction<{ decks: DeckData[], error: string | null }>) => {
            state.loading = false;
            state.error = action.payload.error;
        })
    },
})

export const { setCurrentDeck } = decksSlice.actions
export default decksSlice.reducer;
