
import { createSlice } from '@reduxjs/toolkit';

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: { username: null },
  reducers: {
    login: (state, action) => {
      state.username = action.payload;
    },
    logout: (state) => {
      state.username = null;
    },
    
  },
});

// Export actions
export const { login, logout } = authenticationSlice.actions;

// Export reducer
export default authenticationSlice.reducer;