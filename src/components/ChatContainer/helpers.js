import { makeStyles } from '@material-ui/core/styles';
import { channelIds } from '../commonScript';

export const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  listRoot: {
    width: '100%',
    height: '80vh',
    padding: 0,
    backgroundColor: theme.palette.background.paper,
  },
}));

export const sortByChannel = (
  channels,
  allMessages,
  sortFn = (a, b) => b.ts - a.ts
) => {
  const newData = {};
  channels.forEach(networkName => {
    newData[networkName] = allMessages
      .filter(
        message => message.channelId.toLowerCase() === networkName.toLowerCase()
      )
      .sort(sortFn);
  });
  return newData;
};

export const preparingChannelData = (allMessages = []) => {
  if (!allMessages.length > 0) return;
  // формируем данные по каналам в объекте
  // Сортируем по дате
  const allChannels = sortByChannel(channelIds, allMessages);

  let newData = [];

  Object.keys(allChannels).forEach((channelName, i) => {
    if (allChannels[channelName].length > 0) {
      newData = [...newData, allChannels[channelName][0]];
    }
  });
  return [...newData.sort((a, b) => b.ts - a.ts)];
};
