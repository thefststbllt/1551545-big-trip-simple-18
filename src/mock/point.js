import {EVENT_TYPES} from './const.js';
import {getRandomInteger} from '../util.js';
import {nanoid} from 'nanoid';


const generateType = () => {
  const randomIndex = getRandomInteger(0, EVENT_TYPES.length - 1);
  return EVENT_TYPES[randomIndex];
};

const generateOffersId = () => {
  const commonOffersId = [1, 2, 3, 4, 5, 6];
  return commonOffersId.slice(0, getRandomInteger(0, commonOffersId.length - 1));
};

const getDateTime = (time) => time > 9 ? time.toString() : `0${time}`;

export const generatePoint = () => ({
  pointId: nanoid(),
  type: generateType(),
  dateFrom: `2022-${getDateTime(getRandomInteger(1, 12))}-${getDateTime(getRandomInteger(1, 30))}T${getDateTime(getRandomInteger(0,23))}:${getDateTime(getRandomInteger(0, 59))}:${getDateTime(getRandomInteger(0, 59))}.845Z`,
  dateTo: `2022-${getDateTime(getRandomInteger(1, 12))}-${getDateTime(getRandomInteger(1, 30))}T${getDateTime(getRandomInteger(0,23))}:${getDateTime(getRandomInteger(0, 59))}:${getDateTime(getRandomInteger(0, 59))}.375Z`,
  destination: getRandomInteger(1, 28),
  basePrice: getRandomInteger(1000, 5000),
  offers: generateOffersId(),
});
