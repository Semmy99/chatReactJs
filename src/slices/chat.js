import { createSlice } from '@reduxjs/toolkit';

const ChatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    channels: null,
    currentChat: null,
    correspondence: [],
    allMessagesUser: [],
    sortedChat: [],
  },
  reducers: {
    setMessage: (state, { payload }) => {
      state.messages = [...state.messages, payload];
    },
    setSortedChannel: (state, { payload }) => {
      state.channels = payload;
    },
    setCurrentChat: (state, { payload }) => {
      state.currentChat = payload;
    },

    setCorrespondence: (state, { payload }) => {
      state.correspondence = payload;
    },
    setAllMessagesUser: (state, { payload }) => {
      state.allMessagesUser = payload;
    },
  },
});

export default ChatSlice.reducer;

export const {
  setMessage,
  setSortedChannel,
  setCurrentChat,
  setCorrespondence,
  setAllMessagesUser,
} = ChatSlice.actions;

export const addMessage = message => async dispatch => {
  dispatch(setMessage(message));
};

export const setChannel = data => async dispatch => {
  dispatch(setSortedChannel(data));
};

export const chooseChat = data => async dispatch => {
  dispatch(setCurrentChat(data));
};

export const getCorrespondence = data => async dispatch => {
  dispatch(setCorrespondence(data));
};

export const getAllMessagesUser = data => async dispatch => {
  dispatch(setAllMessagesUser(data));
};

export const setSortedChat = data => async dispatch => {
  dispatch(setAllMessagesUser(data));
};
