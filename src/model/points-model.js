import {generatePoint} from '../mock/point.js';
import {generateOffer} from '../mock/offer.js';

export default class PointsModel {
  points = Array.from({length: 3}, generatePoint);
  offers = Array.from({length: 3}, generateOffer);

  getPoints = () => this.points;
  getOffers = () => this.offers;
}
