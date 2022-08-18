import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const humanizePointDueDate = (dueDate) => dayjs(dueDate).format('MMM D');
const humanizePointDueTime = (dueTime) => dayjs(dueTime).format('HH:HH');

export {getRandomInteger, humanizePointDueDate, humanizePointDueTime};
