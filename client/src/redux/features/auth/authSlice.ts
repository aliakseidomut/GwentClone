import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/axios"
import { UserData } from "../../../types/interfaces";

export interface UserState {
  user: UserData | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  token: null,
  loading: false,
  error: null,
}

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({username, password}: UserData) => {
    try {
      const { data } = await axios.post('/auth/register', {
        username,
        password,
      });
  
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
  
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({username, password}: User) => {
    try {
      const { data } = await axios.post('/auth/login', {
        username,
        password
      });
  
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
  
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const getUser = createAsyncThunk(
  'auth/getUser',
  async () => {
    try {
      const { data } = await axios.get('/auth/user');
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('token');
    }
  },
  extraReducers: (builder) => {
    builder
      //Регистрация
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<UserState>) => {
        state.loading = false;
        state.error = action.payload.error;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<UserState>) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      
      //Логин
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<UserState>) => {
        state.loading = false;
        state.error = action.payload.error;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<UserState>) => {
        state.loading = false;
        state.error = action.payload.error
      })

      //Проверка авторизации
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload?.user;
        state.token = action.payload?.token;
      })
      .addCase(getUser.rejected, (state, action: PayloadAction<UserState>) => {
        state.loading = false;
        state.error = action.payload.error
      })
  },
});

export const { logout } = authSlice.actions