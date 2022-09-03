import AbstractView from '../framework/view/abstract-view.js';
import {humanizePointDueDate, humanizePointDueTime} from '../util.js';

const createNewPointItemTemplate = (point, offers) => {
  const {basePrice, dateFrom, dateTo, type, destination} = point;

  const eventOffers = offers ? offers.shift().offers : '';

  const generatedOfferTemplate = (title, price) => `<li class="event__offer"><span class="event__offer-title">${title}</span> &plus;&euro;&nbsp;<span class="event__offer-price">${price}</span></li>`;

  //Creating an array and making a string out of it
  const finalOffers = [];
  eventOffers.forEach((item) => {
    finalOffers.push(generatedOfferTemplate(item.title, item.price));
  });
  const stringOffers = finalOffers.join('');

  const eventDate = dateFrom ? humanizePointDueDate(dateFrom) : '';

  const endTime = dateTo ? humanizePointDueTime(dateTo) : '';

  const startTime = dateFrom ? humanizePointDueTime(dateFrom) : '';

  return (
    `<li class="trip-events__item">
  <div class="event">
  <time class="event__date" datetime="2019-03-18">${eventDate}</time>
  <div class="event__type">
  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
  </div>
  <h3 class="event__title">${type} ${destination.name}</h3>
  <div class="event__schedule">
  <p class="event__time">
  <time class="event__start-time" datetime="2019-03-18T10:30">${startTime}</time>
  &mdash;
  <time class="event__end-time" datetime="2019-03-18T11:00">${endTime}</time>
  </p>
  </div>
  <p class="event__price">
  &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
  </p>
  <h4 class="visually-hidden">Offers:</h4>


  <ul class="event__selected-offers">
    ${stringOffers}
  </ul>


  <button class="event__rollup-btn" type="button">
  <span class="visually-hidden">Open event</span>
  </button>
  </div>
  </li>`
  );
};

export default class PointItemView extends AbstractView {
  #point = null;
  #offers = null;

  constructor(point, offers) {
    super();
    this.#point = point;
    this.#offers = offers;
  }

  #rightTypes = (point, offers) => offers.filter((item) => item.type === point.type);

  get template() {
    return createNewPointItemTemplate(this.#point, this.#rightTypes(this.#point, this.#offers));
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };
}


