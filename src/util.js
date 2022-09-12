import dayjs from 'dayjs';
import {FilterType} from './mock/const.js';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const humanizePointDueDate = (dueDate) => dayjs(dueDate).format('MMM D');
const humanizePointEditDate = (dueDate) => dayjs(dueDate).format('DD/MM/YY hh:mm');
const humanizePointDueTime = (dueTime) => dayjs(dueTime).format('hh:mm');

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => point.dateFrom > dayjs())
};

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

const sortPointsByDay = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

const sortPointsByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

export {
  getRandomInteger,
  humanizePointDueDate,
  humanizePointDueTime,
  humanizePointEditDate,
  filter,
  sortPointsByPrice,
  sortPointsByDay,
  updateItem
};
