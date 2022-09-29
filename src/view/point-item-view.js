import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import {humanizePointDueDate, humanizePointDueTime} from '../util';
import he from 'he';

const createPointItemTemplate = (point, offers, destinations) => {
  const {basePrice, dateFrom, dateTo, type, destination, isFavorite} = point;
  const currentDestination = destinations.find((item) => item.id === destination || item.name === destination);
  const {name} = currentDestination;

  const rightTypes = offers?.filter((item) => item.type === point.type).shift() ?? null;
  const rightTypeOffers = rightTypes?.offers ?? null;

  const getOfferTemplate = (offer) => `<li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
    </li>`;

  const generatedOfferTemplate = rightTypeOffers?.map((offer) => point.offers.includes(offer.id) ? getOfferTemplate(offer) : '') ?? '';

  const stringSelectedOffers = generatedOfferTemplate?.join('') ?? '';
  const stringifiedPrice = basePrice.toString();

  const eventDate = dateFrom ? humanizePointDueDate(dateFrom) : '';
  const endTime = dateTo ? humanizePointDueTime(dateTo) : '';
  const startTime = dateFrom ? humanizePointDueTime(dateFrom) : '';

  return (
    `<li class="trip-events__item">
        <div class="event">
            <time class="event__date" datetime="2019-03-18">${eventDate}</time>
            <div class="event__type">
                <img class="event__type-icon" width="42" height="42" src="img/icons/${type ?? ''}.png" alt="Event type icon">
            </div>
            <h3 class="event__title">${type ?? ''} ${name}</h3>
            <div class="event__schedule">
                <p class="event__time">
                    <time class="event__start-time" datetime="2019-03-18T10:30">${startTime}</time>&mdash;<time class="event__end-time" datetime="2019-03-18T11:00">${endTime}</time>
                </p>
            </div>
            <p class="event__price">&euro;&nbsp;<span class="event__price-value">${he.encode(stringifiedPrice)}</span></p>
            <h4 class="visually-hidden">Offers:</h4>
            <ul class="event__selected-offers">
                ${stringSelectedOffers}
            </ul>
            <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
                <span class="visually-hidden">Add to favorite</span>
                    <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
                </svg>
            </button>
            <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
            </button>
        </div>
    </li>`
  );
};

export default class PointItemView extends AbstractStatefulView {
  #offers = null;
  #destinations = null;

  constructor(point, offers, destinations) {
    super();
    this._state = PointItemView.parsePointToState(point);
    this.#offers = offers;
    this.#destinations = destinations;
  }

  static parsePointToState = (point) => ({...point});

  static parseStateToPoint = (state) => ({...state});

  reset = (point) => {
    this.updateElement(PointItemView.parsePointToState(point));
  };

  get template() {
    return createPointItemTemplate(this._state, this.#offers, this.#destinations);
  }

  setClickHandler = (cb) => {
    this._callback.click = cb;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  setFavoriteClickHandler = (cb) => {
    this._callback.favoriteClick = cb;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  };

  #favoriteClickHandler = () => {
    this._callback.favoriteClick(PointItemView.parsePointToState(this._state));
  };
}


