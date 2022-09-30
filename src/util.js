import {FILTER_TYPE} from './const';
import dayjs from 'dayjs';
const utc = require('dayjs/plugin/utc'); // eslint-disable-line

dayjs.extend(utc);

const humanizePointEditDate = (dueDate) => dayjs(dueDate).format('DD/MM/YY hh:mm');
const humanizePointDueDate = (dueDate) => dayjs(dueDate).format('MMM D');
const humanizePointDueTime = (dueTime) => dayjs(dueTime).format('hh:mm');
const templateCurrentTime = () => dayjs.utc().format();

const sortPointsByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;
const sortPointsByTime = (pointA, pointB) => dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom)) - dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
const sortPointsByDay = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

const isEscPressed = (evt) => (evt.key === 'Escape' || evt.key === 'Esc');

const isFuture = (dateFrom, dateTo) =>
  dayjs(dateFrom).isAfter(dayjs(), 'd') ||
  dayjs(dateTo).isAfter(dayjs(), 'd') ||
  dayjs(dateFrom).isSame(dayjs(), 'd') ||
  dayjs(dateTo).isSame(dayjs(), 'd');

const isPast = (dateFrom, dateTo) =>
  dayjs(dateFrom).isBefore(dayjs(), 'd') ||
  dayjs(dateTo).isBefore(dayjs(), 'd');

const filter = {
  [FILTER_TYPE.everything]: (points) => points,
  [FILTER_TYPE.past]: (points) => points.filter(({dateFrom, dateTo}) => isPast(dateFrom, dateTo)),
  [FILTER_TYPE.future]: (points) => points.filter(({dateFrom, dateTo}) => isFuture(dateFrom, dateTo)),
};

export {
  humanizePointEditDate,
  humanizePointDueDate,
  humanizePointDueTime,
  templateCurrentTime,
  sortPointsByPrice,
  sortPointsByTime,
  sortPointsByDay,
  isEscPressed,
  isFuture,
  filter
};
