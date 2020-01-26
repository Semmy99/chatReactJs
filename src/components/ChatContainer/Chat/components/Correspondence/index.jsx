import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './helpers';

const Correspondence = ({ messageData = {} }) => {
  const { body, myMessage = false } = messageData;
  const classes = useStyles();
  return !myMessage ? (
    <Typography className={classes.typography}>{body}</Typography>
  ) : (
    <Typography className={classes.myMessage}>{body}</Typography>
  );
};

export default Correspondence;
