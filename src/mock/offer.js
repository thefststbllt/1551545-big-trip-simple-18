import {OFFER_TITLES, OFFER_IDS, OFFER_PRICES} from './const.js';
import {getRandomInteger} from '../util.js';

export const generateOffer = () => ({
  'id': OFFER_IDS[getRandomInteger(0, OFFER_IDS.length - 1)],
  'title': OFFER_TITLES[getRandomInteger(0, OFFER_TITLES.length - 1)],
  'price': OFFER_PRICES[getRandomInteger(0, OFFER_PRICES.length - 1)],
});
