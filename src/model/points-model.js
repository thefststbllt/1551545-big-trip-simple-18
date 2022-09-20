import {generatePoint} from '../mock/point.js';
import {offersCollection} from '../mock/offer.js';
import {destinations} from '../mock/destinations.js';
import Observable from '../framework/observable.js';

export default class PointsModel extends Observable {
  #points = Array.from({length: 10}, generatePoint);
  #offers = offersCollection;
  #destinations = destinations;

  #pointsApiService = null;

  constructor(pointsApiService) {
    super();
    this.#pointsApiService = pointsApiService;

    this.#pointsApiService.points.then((points) => {
      console.log(points.map(this.#adaptToClient), points.map(point => point))
      //
    })
  }

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

  #adaptToClient = (point) => {
    const adaptedPoint = {
      ...point,
      basePrice: point['base_price'],
      dateTo: point['date_to'] !== null ? new Date(point['date_to']) : point['date_to'],
      dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : point['date_from']
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['date_from'];

    return adaptedPoint;
  }
}


