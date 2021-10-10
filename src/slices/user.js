import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios, { routes, authRequest } from '../api';

const authLoginhRequest = createAsyncThunk('user/auth', async (values) => {
  console.log('data: ', data);
  const { data } = await authRequest(values);
  return data
})

const slice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    isAuthorized: false,
    token: '',
  },
  reducers: {
    setUser(state, { payload }) {
      console.log(payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(authLoginhRequest.fulfilled, (state, { payload: { token } }) => {
      return { ...state, token, isAuthorized: true }
    });
    builder.addCase(authLoginhRequest.rejected, (state, action) => {
      return { ...state, token: '', isAuthorized: false }
    });
  }

})

export const asyncActions = { authLoginhRequest }

export default slice.reducer
