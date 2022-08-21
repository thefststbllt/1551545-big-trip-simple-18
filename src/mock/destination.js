import {CITIES_COLLECTION, DESCRIPTIONS} from './const.js';
import {getRandomInteger} from '../util.js';

const generateDescription = () => {
  const randomDescription = getRandomInteger(0, DESCRIPTIONS.length - 1);
  return DESCRIPTIONS[randomDescription];
};

const generateCity = () => CITIES_COLLECTION[getRandomInteger(0, CITIES_COLLECTION.length - 1)];

export const generateDestination = () => ({
  id: getRandomInteger(0, 5),
  description: generateDescription(),
  name: generateCity(),
  pictures: [
    {
      src: 'http://picsum.photos/300/200?r=0.0762563005163317',
      description: generateDescription()
    }
  ]
});
