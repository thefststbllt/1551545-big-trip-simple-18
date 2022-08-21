import {generatePoint} from '../mock/point.js';
import {generateOffer} from '../mock/offer.js';

export default class PointsModel {
  #points = Array.from({length: 3}, generatePoint);
  #offers = Array.from({length: 3}, generateOffer);

  get points() {
    return this.#points;
  }

  get offers() {
    return this.#offers;
  }
}
