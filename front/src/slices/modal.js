import { createSlice } from '@reduxjs/toolkit';

const initialState = { show: false, body: '', type: '', color: 'info' };

const slice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal(state, { payload }) {
      return { ...state, show: true, ...payload };
    },
    hideModal() {
      return initialState;
    },
  },
});

export const actions = { ...slice.actions };

export default slice.reducer;
