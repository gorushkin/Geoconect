import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import axios, { apiRoutes, authRequest, createUserRequest } from '../api';

const initialState = {
  name: '',
  isAuthorized: false,
  token: '',
  isAdmin: false,
};

const authLogin = createAsyncThunk('user/auth', async (values, { rejectWithValue }) => {
  try {
    const { data } = await authRequest(values);
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const createUser = createAsyncThunk('user/create', async (values, { rejectWithValue }) => {
  try {
    const { data } = await createUserRequest(values);
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const slice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    logout(_state) {
      Cookies.remove('token');
      return initialState;
    },
    userInit(state) {
      const token = Cookies.get('token');
      const user = JSON.parse(localStorage.getItem('user'));
      return token ? { ...state, isAuthorized: true, name: user.name } : initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authLogin.fulfilled, (state, { payload: { token, user } }) => {
      Cookies.set('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      return { ...state, name: user.name, isAuthorized: true, isAdmin: user.role === 'admin' };
    });
    builder.addCase(authLogin.rejected, () => initialState);
  },
});

export const asyncActions = { authLogin, createUser };
export const actions = { ...slice.actions };

export default slice.reducer;
