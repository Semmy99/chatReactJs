import React from 'react';
import { Grid, Divider, ListItem, Typography } from '@material-ui/core';

const HeaderChat = ({
  currentChat = {},
  showMenu = _ => _,
  allChannels = false,
}) => {
  const { roomId = '', channelId = '' } = currentChat;

  return (
    <ListItem button onClick={showMenu} style={{ height: 40 }}>
      <Grid
        justify="space-between"
        alignItems="flex-start"
        container
        direction="row"
      >
        <Typography>{roomId}</Typography>
        <Typography>{allChannels ? 'allChannels' : channelId}</Typography>
      </Grid>
      <Divider />
    </ListItem>
  );
};

export default HeaderChat;
