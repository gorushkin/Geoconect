import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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
  },
  extraReducers: (builder) => {
    builder.addCase(authLoginhRequest.fulfilled, (state, { payload: { token } }) => {
      return { ...state, token, isAuthorized: true };
    });
    builder.addCase(authLoginhRequest.rejected, (state, action) => {
      return { ...state, token: '', isAuthorized: false };
    });
  },
});

export const asyncActions = { authLoginhRequest };
export const actions = { ...slice.actions };

export default slice.reducer;
