import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import Correspondence from '../../Chat/components/Correspondence';

const AllCorrespondence = () => {
  const allMessagesUser = useSelector(state => state.chat.allMessagesUser);
  return Object.entries(allMessagesUser).map(channel => {
    return (
      channel[1].length > 0 && (
        <Grid
          key={channel[0]}
          container
          direction="column"
          justify="center"
          alignItems="center"
          style={{ width: '95%' }}
        >
          <Typography>{channel[0]}</Typography>
          {channel[1].map(messageData => (
            <Correspondence key={messageData.id} messageData={messageData} />
          ))}
        </Grid>
      )
    );
  });
};

export default AllCorrespondence;
