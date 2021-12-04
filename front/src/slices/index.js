import { combineReducers, configureStore } from '@reduxjs/toolkit';

import alert, { actions as alertActions } from './alert';
import modal, { actions as modalActions } from './modal';
import user, { asyncActions as userAsyncActions, actions as userActions } from './user';

const reducer = combineReducers({ user, modal, alert });

export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['modal/showModal'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['items.dates'],
      },
    }),
});
export const actions = { ...userAsyncActions, ...userActions, ...modalActions, ...alertActions };
