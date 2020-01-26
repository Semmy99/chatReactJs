import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';
import { Provider } from 'react-redux';
import ChatContainer from './components/ChatContainer';

export const store = configureStore({ reducer });
window.store = store;
function App() {
  return (
    <Provider store={store}>
      <ChatContainer />
    </Provider>
  );
}

export default App;
