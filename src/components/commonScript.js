import { addMessage } from '../slices/chat';
import { store } from '../App';
const loremIpsum = require('lorem-ipsum').loremIpsum;

let init = true;
let id = 0;
const roomIds = [
  'Rick Sanchez',
  'Morty Smith',
  'Dipper Pines',
  'Mabel Pines',
  'Spongebob Squarepants',
];
export const channelIds = ['VK', 'OK', 'FB'];
// emit();

function emit() {
  if (init) {
    init = false;
  } else {
    handle({
      id: ++id,
      roomId: randomChoose(roomIds),
      channelId: randomChoose(channelIds),
      body: loremIpsum({
        count: randomBetween(1, 5),
        format: 'plain',
        units: randomChoose(['sentences', 'words']),
      }),
      ts: Date.now(),
    });
  }
  // setTimeout(emit, randomBetween(3000, 5000));
}

function randomBetween(min, max) {
  return Math.floor((max - min + 1) * Math.random()) + min;
}

function randomChoose(array) {
  return array[randomBetween(0, array.length - 1)];
}

function handle(message) {
  store.dispatch(addMessage(message));
}

export { emit };
