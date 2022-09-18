import dayjs from 'dayjs';
import {FILTER_TYPE} from './mock/const.js';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const humanizePointDueDate = (dueDate) => dayjs(dueDate).format('MMM D');
const humanizePointEditDate = (dueDate) => dayjs(dueDate).format('DD/MM/YY hh:mm');
const humanizePointDueTime = (dueTime) => dayjs(dueTime).format('hh:mm');

//Filtration
const isFuture = (dateFrom, dateTo) => dayjs(dateFrom).isAfter(dayjs(), 'd') || dayjs(dateTo).isAfter(dayjs(), 'd') || dayjs(dateFrom).isSame(dayjs(), 'd') || dayjs(dateTo).isSame(dayjs(), 'd');
const isPastPoint = (dateFrom, dateTo) => dayjs(dateFrom).isBefore(dayjs(), 'd') || dayjs(dateTo).isBefore(dayjs(), 'd');

const filter = {
  [FILTER_TYPE.everything]: (points) => points,
  [FILTER_TYPE.past]: (points) => points.filter(({dateFrom, dateTo}) => isPastPoint(dateFrom, dateTo)),
  [FILTER_TYPE.future]: (points) => points.filter(({dateFrom, dateTo}) => isFuture(dateFrom, dateTo)),
};

//Sorting
const sortPointsByDay = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
const sortPointsByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;
const sortPointsByTime = (pointA, pointB) => dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom)) - dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));

export {
  getRandomInteger,
  humanizePointDueDate,
  humanizePointDueTime,
  humanizePointEditDate,
  isFuture,
  filter,
  sortPointsByPrice,
  sortPointsByDay,
  sortPointsByTime
};
