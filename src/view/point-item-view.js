import {createElement} from '../render.js';
import {humanizePointDueDate, humanizePointDueTime} from '../util.js';

const createNewPointItemTemplate = (point, offers) => {
  const {basePrice, dateFrom, dateTo, type, destination} = point;

  const generatedOfferTemplate = (title, price) => `<li class="event__offer"><span class="event__offer-title">${title}</span> &plus;&euro;&nbsp;<span class="event__offer-price">${price}</span></li>`;

  //Creating an array and making a string out of it
  const finalOffers = [];
  offers.forEach((item) => {
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

export default class PointItemView {
  #element = null;

  constructor(point, offers) {
    this.point = point;
    this.offers = offers;
  }

  get template() {
    return createNewPointItemTemplate(this.point, this.offers);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
