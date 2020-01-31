import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  username: null,
  loading: false,
  error: null,
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      const {username, token} = action.payload;
      state.loading = false;
      state.error = null;
      state.username = username;
      state.token = token;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.username = null;
    },
    logoutFinished(state) {
      state.username = null;
    },
  },
});

export const {loginSuccess, loginFailure, logoutFinished} = auth.actions;
export default auth.reducer;
