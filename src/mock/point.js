import {EVENT_TYPES} from './const.js';
import {getRandomInteger} from '../util.js';
import {generateDestination} from './destination.js';
import {generateOffer} from './offer.js';

const generateType = () => {
  const randomIndex = getRandomInteger(0, EVENT_TYPES.length - 1);
  return EVENT_TYPES[randomIndex];
};

const idCollection = [];
const generateOffersId = () => {
  const offersArray = Array.from({length: 5}, generateOffer);
  offersArray.forEach((item) => idCollection.push(item.id));
  return new Set(idCollection);
};

export const generatePoint = () => ({
  basePrice: getRandomInteger(1000, 5000),
  dateFrom: `2019-07-${getRandomInteger(10, 30)}T22:55:56.845Z`,
  dateTo: `2019-07-${getRandomInteger(10, 30)}T11:22:13.375Z`,
  destination: generateDestination(),
  id: '0',
  offers: generateOffersId(),
  type: generateType(),
});
