import dayjs from 'dayjs';
import {FilterType} from './mock/const.js';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const humanizePointDueDate = (dueDate) => dayjs(dueDate.slice(0, dueDate.length - 1)).format('MMM D');
const humanizePointDueTime = (dueTime) => dayjs(dueTime).format('HH:HH');

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => point.dateFrom > dayjs())
};

export {getRandomInteger, humanizePointDueDate, humanizePointDueTime, filter};
