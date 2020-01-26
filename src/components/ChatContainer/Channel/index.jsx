import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from './helpers';
import { Divider, ListItem, Typography, Grid } from '@material-ui/core';
import {
  chooseChat,
  getCorrespondence,
  getAllMessagesUser,
} from '../../../slices/chat';

const Channel = ({ channel, sortedChat = {}, setTextMessage }) => {
  const { roomId = '', channelId = '', body = '' } = channel;
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentChat = useSelector(state => state.chat.currentChat);

  useEffect(() => {
    if (!currentChat) return;
    const userChannels = {};
    let currentCorrespondence = [];
    Object.keys(sortedChat).map(name => {
      if (name.toLowerCase() === currentChat.channelId.toLowerCase()) {
        sortedChat[name].forEach(c => {
          if (c.roomId === currentChat.roomId) {
            currentCorrespondence = [...currentCorrespondence, c];
          }
        });
      }

      userChannels[name] = sortedChat[name].filter(
        message => message.roomId === currentChat.roomId
      );
    });
    dispatch(getCorrespondence(currentCorrespondence));
    dispatch(getAllMessagesUser({ ...userChannels }));
  }, [currentChat]);

  return (
    <>
      <ListItem
        button
        onClick={() => {
          dispatch(chooseChat(channel));
          setTextMessage('');
        }}
      >
        <Grid container className={classes.root}>
          <Grid
            justify="space-between"
            alignItems="flex-start"
            direction="row"
            container
          >
            <Typography>{roomId}</Typography>
            <Typography>{channelId}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>{body}</Typography>
          </Grid>
        </Grid>
      </ListItem>
      <Divider />
    </>
  );
};

export default Channel;
