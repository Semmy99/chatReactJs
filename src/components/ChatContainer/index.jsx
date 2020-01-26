import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, Button, Grid, Paper } from '@material-ui/core';
import { emit, channelIds } from '../commonScript';
import Channel from './Channel';
import Chat from './Chat';
import AllChannels from './AllChannels';
import { setChannel } from '../../slices/chat';
import { useStyles, sortByChannel, preparingChannelData } from './helpers';

const ChatContainer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [sortedChat, setSortedChat] = useState([]);
  const [textMessage, setTextMessage] = useState('');

  const allMessages = useSelector(state => state.chat.messages);
  const channels = useSelector(state => state.chat.channels);

  useEffect(() => {
    dispatch(setChannel(preparingChannelData(allMessages)));
    setSortedChat(
      sortByChannel(channelIds, allMessages, (a, b) => a.ts - b.ts)
    );
  }, [allMessages]);

  return (
    <Grid
      container
      direction="column"
      justify="space-between"
      alignItems="center"
    >
      <Grid container spacing={2} style={{ width: '99%' }}>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <List
              component="nav"
              className={classes.listRoot}
              aria-label="mailbox folders"
            >
              {channels &&
                channels.map(channel => (
                  <Channel
                    key={channel.id}
                    channel={channel}
                    sortedChat={sortedChat}
                    setTextMessage={setTextMessage}
                    allMessages={allMessages}
                  />
                ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={4}>
          <Chat
            sortedChat={sortedChat}
            textMessage={textMessage}
            setTextMessage={setTextMessage}
          />
        </Grid>

        <Grid item xs={4}>
          <AllChannels />
        </Grid>
      </Grid>
      <Button
        onClick={() => {
          emit();
        }}
        variant="contained"
        color="primary"
        style={{ marginTop: 10 }}
      >
        Запустить генерацию сообщений
      </Button>
    </Grid>
  );
};

export default ChatContainer;
