import {generatePoint} from '../mock/point.js';
import {offersCollection} from '../mock/offer.js';

export default class PointsModel {
  #points = Array.from({length: 10}, generatePoint);
  #offers = offersCollection;

  get points() {
    return this.#points;
  }

  get offers() {
    return this.#offers;
  }
}
