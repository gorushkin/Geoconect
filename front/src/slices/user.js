import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import { authRequest, createUserRequest } from '../api';

const initialState = {
  name: '',
  isAuthorized: false,
  token: '',
  isAdmin: false,
  role: 'guest',
  access: {},
};

const authLogin = createAsyncThunk('user/auth', async (values) => {
  const { data } = await authRequest(values);
  return data;
});

const createUser = createAsyncThunk('user/create', async (values) => {
  const { data } = await createUserRequest(values);
  return data;
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
      const isAdmin = Cookies.get('isAdmin');
      const user = JSON.parse(localStorage.getItem('user'));
      return token && user
        ? {
          ...state,
          isAuthorized: true,
          name: user.name,
          isAdmin,
          role: user.role,
          access: {
            user: user.role === 'user',
            guest: user.role === 'guest',
            admin: user.role === 'admin',
          },
        }
        : initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authLogin.fulfilled, (state, { payload: { token, user } }) => {
      Cookies.set('token', token);
      Cookies.set('isAdmin', user.role === 'admin');
      localStorage.setItem('user', JSON.stringify(user));
      return {
        ...state,
        name: user.name,
        isAuthorized: true,
        isAdmin: user.role === 'admin',
        token,
        role: user.role,
        access: {
          user: user.role === 'user',
          guest: user.role === 'guest',
          admin: user.role === 'admin',
        },
      };
    });
    builder.addCase(authLogin.rejected, () => initialState);
  },
});

export const asyncActions = { authLogin, createUser };
export const actions = { ...slice.actions };

export default slice.reducer;
