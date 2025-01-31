
import { createSlice } from '@reduxjs/toolkit';

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    onlineUsers: [],
  },
  reducers: {
    receiveMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});

export const { receiveMessage, setOnlineUsers } = chatSlice.actions;
export default chatSlice.reducer;
