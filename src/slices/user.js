import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import axios, { routes, authRequest } from '../api';

const initialState = {
  name: '',
  isAuthorized: false,
  token: '',
};

const authLoginhRequest = createAsyncThunk('user/auth', async (values) => {
  const { data } = await authRequest(values);
  return data;
});

const slice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    logout(state) {
      return initialState;
    },
    userInit(state, { payload }) {
      console.log('payload: ', payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authLoginhRequest.fulfilled, (state, { payload: { token } }) => {
      Cookies.set('token', token);
      return { ...state, isAuthorized: true };
    });
    builder.addCase(authLoginhRequest.rejected, (state, action) => {
      return { ...state, isAuthorized: false };
    });
  },
});

export const asyncActions = { authLoginhRequest };
export const actions = { ...slice.actions };

export default slice.reducer;
