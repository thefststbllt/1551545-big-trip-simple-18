import {FilterType} from './const';
import dayjs from 'dayjs';

const humanizePointEditDate = (dueDate) => dayjs(dueDate).format('DD/MM/YY HH:mm');
const humanizePointDueDate = (dueDate) => dayjs(dueDate).format('MMM D');
const humanizePointDueTime = (dueTime) => dayjs(dueTime).format('HH:mm');
const templateCurrentTime = () => new Date().toISOString();

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
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.PAST]: (points) => points.filter(({dateFrom, dateTo}) => isPast(dateFrom, dateTo)),
  [FilterType.FUTURE]: (points) => points.filter(({dateFrom, dateTo}) => isFuture(dateFrom, dateTo)),
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
