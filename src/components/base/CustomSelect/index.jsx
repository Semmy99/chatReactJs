import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { makeStyles } from '@material-ui/core/styles';
import { useStyles } from './helpers';
import { InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import { chooseChat } from '../../../slices/chat';

// const useStyles = makeStyles(theme => ({
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//     width: '84%',
//     maxWidth: '100%',
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
// }));

const CustomSelect = ({ currentChat, onChange }) => {
  const allMessagesUser = useSelector(state => state.chat.allMessagesUser);
  const allMessages = useSelector(state => state.chat.messages);

  const dispatch = useDispatch();
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = useState('');

  const [values, setValues] = useState([]);

  useEffect(() => {
    setSelectedValue(currentChat.channelId);
  }, [currentChat]);

  useEffect(() => {
    const channels = Object.entries(allMessagesUser)
      .map(el => {
        if (el[1].length > 0) return el[0];
      })
      .filter(el => !!el);
    setValues(channels);
  }, [allMessagesUser]);
  const handleChange = event => {
    const nameChannel = event.target.value;
    const newCurrentChat = allMessages.find(mes => {
      if (mes.channelId === nameChannel && mes.roomId === currentChat.roomId)
        return mes;
    });
    dispatch(chooseChat(newCurrentChat));
    setSelectedValue(event.target.value);
  };
  return (
    <FormControl className={classes.formControl}>
      <InputLabel
        id="demo-simple-select-label"
        style={{
          width: '100%',
          textAlign: 'center',
        }}
      >
        Change the room
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedValue}
        onChange={handleChange}
      >
        {values.map((chanName, i) => (
          <MenuItem key={chanName + i} value={chanName}>
            {chanName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default CustomSelect;
