import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Button,
  Grid,
  Paper,
  TextareaAutosize,
} from '@material-ui/core';

import CustomSelect from '../../base/CustomSelect';
import { addMessage } from '../../../slices/chat';
import Correspondence from './components/Correspondence';
import HeaderChat from './components/HeaderChat';
import { useStyles, uniqId } from './helpers';

const Chat = ({ textMessage, setTextMessage }) => {
  const currentChat = useSelector(state => state.chat.currentChat);
  const correspondence = useSelector(state => state.chat.correspondence);

  const classes = useStyles();
  const dispatch = useDispatch();
  const [visibleMenu, setVisibleMenu] = useState(false);
  const container = useRef();
  const showMenu = () => {
    setVisibleMenu(!visibleMenu);
  };

  useEffect(() => {
    const chatWrap = container.current;
    chatWrap.scrollTop = chatWrap.scrollHeight;
    return () => {
      chatWrap.scrollTop = '';
    };
  }, [correspondence]);

  return (
    <Paper className={classes.paper}>
      {currentChat && (
        <Grid style={{ width: '100%' }}>
          <HeaderChat currentChat={currentChat} showMenu={showMenu} />
          <CustomSelect currentChat={currentChat} />
        </Grid>
      )}
      <Container ref={container} className={classes.root}>
        {visibleMenu && (
          <Grid container>
            {correspondence.map(c => (
              <Correspondence key={c.body} messageData={c} />
            ))}
          </Grid>
        )}
      </Container>
      {visibleMenu && (
        <Paper className={classes.btnWrap}>
          <TextareaAutosize
            autoFocus
            rowsMax={15}
            aria-label="maximum height"
            placeholder="enter the text"
            style={{ width: '80%', padding: 20 }}
            value={textMessage}
            onChange={e => setTextMessage(e.target.value)}
          />
          <Button
            style={{ width: '100%', padding: 20 }}
            onClick={() => {
              if (!textMessage.trim()) return;
              dispatch(
                addMessage({
                  id: uniqId(),
                  roomId: currentChat.roomId,
                  channelId: currentChat.channelId,
                  body: textMessage,
                  ts: Date.now(),
                  myMessage: true,
                })
              );
              setTextMessage('');
            }}
          >
            Отправить
          </Button>
        </Paper>
      )}
    </Paper>
  );
};

export default Chat;
