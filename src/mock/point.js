import {EVENT_TYPES} from './const.js';
import {getRandomInteger} from '../util.js';
import {generateDestination} from './destination.js';
import {offersCollection} from './offer.js';
import {nanoid} from 'nanoid';


const generateType = () => {
  const randomIndex = getRandomInteger(0, EVENT_TYPES.length - 1);
  return EVENT_TYPES[randomIndex];
};

const idCollection = [];
const generateOffersId = () => {
  const offersArray = offersCollection.slice(0, 5);
  offersArray.forEach((item) => idCollection.push(item.id));
  return new Set(idCollection);
};

//Temporary deleted 'Z' in the end of dateFrom string, got no thoughts about how to cut it off if it'd be remote data
export const generatePoint = () => ({
  id: nanoid(),
  type: generateType(),
  dateFrom: `2019-07-${getRandomInteger(1, 30)}T${getRandomInteger(0,24)}:${getRandomInteger(0,60)}:${getRandomInteger(0,60)}.845`,
  dateTo: `2019-07-${getRandomInteger(10, 30)}T${getRandomInteger(0,24)}:${getRandomInteger(0,60)}:${getRandomInteger(0,60)}.375Z`,
  destination: generateDestination(),
  basePrice: getRandomInteger(1000, 5000),
  offers: generateOffersId(),
});


