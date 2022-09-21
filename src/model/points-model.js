import {generatePoint} from '../mock/point.js';
import {offersCollection} from '../mock/offer.js';
import {destinations} from '../mock/destinations.js';
import Observable from '../framework/observable.js';

export default class PointsModel extends Observable {
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

  updatePoint = (updateType, update) => {
    const index = this.#points.findIndex((item) => item.id === update.id);

    if (index === -1) {
      throw new Error('Seems there is no item to update');
    }

    this.#points = [...this.#points.slice(0, index), update, ...this.#points.slice(index + 1)];

    this._notify(updateType, update);
  };

  addPoint = (updateType, update) => {
    this.#points = [update, ...this.#points];
    this._notify(updateType, update);
  };

  deletePoint = (updateType, update) => {
    const index = this.#points.findIndex((item) => item.id === update.id);

    if (index === -1) {
      throw new Error('Seems there is no item to delete');
    }

    this.#points = [...this.#points.slice(0, index), ...this.#points.slice(index + 1)];

    this._notify(updateType, update);
  };
}


