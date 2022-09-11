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

//Temporary deleted 'Z' in the end of dateFrom string, got no thoughts about how to cut it off if it'd be remote data
export const generatePoint = () => ({
  pointId: nanoid(),
  type: generateType(),
  dateFrom: `2019-07-${getRandomInteger(1, 30)}T${getRandomInteger(0,24)}:${getRandomInteger(0,60)}:${getRandomInteger(0,60)}.845`,
  dateTo: `2019-07-${getRandomInteger(10, 30)}T${getRandomInteger(0,24)}:${getRandomInteger(0,60)}:${getRandomInteger(0,60)}.375Z`,
  destination: getRandomInteger(1, 28),
  basePrice: getRandomInteger(1000, 5000),
  offers: generateOffersId(),
});


