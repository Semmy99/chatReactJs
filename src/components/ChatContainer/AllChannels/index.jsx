import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Divider, Paper } from '@material-ui/core';
import { useStyles } from './helpers';
import AllCorrespondence from './AllCorrespondence';
import HeaderChat from '../Chat/components/HeaderChat';

const AllChannels = () => {
  const classes = useStyles();
  const container = useRef();
  const allMessages = useSelector(state => state.chat.messages);
  const currentChat = useSelector(state => state.chat.currentChat);

  useEffect(() => {
    const chatWrap = container.current;
    chatWrap.scrollTop = chatWrap.scrollHeight;
    return () => {
      chatWrap.scrollTop = '';
    };
  }, [allMessages]);

  return (
    <Paper
      justify="space-between"
      direction="row"
      xs={12}
      className={classes.root}
      ref={container}
    >
      {currentChat && <HeaderChat currentChat={currentChat} allChannels />}
      <Divider />
      <AllCorrespondence />
    </Paper>
  );
};

export default AllChannels;
