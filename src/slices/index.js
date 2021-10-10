import { combineReducers, configureStore } from '@reduxjs/toolkit';

import user, { asyncActions as userAsyncActions } from './user';

const reducer = combineReducers({ user });

export default configureStore({ reducer });
export const actions = { ...userAsyncActions }
