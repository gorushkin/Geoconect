import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    isAuthorized: false,
  }
})

export default slice.reducer
