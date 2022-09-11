import {generatePoint} from '../mock/point.js';
import {offersCollection} from '../mock/offer.js';
import {destinations} from '../mock/destinations.js';

export default class PointsModel {
  #points = Array.from({length: 10}, generatePoint);
  #offers = offersCollection;
  #destinations = destinations;

  get points() {
    return this.#points;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }
}

