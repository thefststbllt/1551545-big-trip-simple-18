import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {humanizePointEditDate, humanizePointDueTime, templateCurrentTime} from '../util.js';
import dayjs from 'dayjs';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/material_blue.css';
import he from 'he';

const BLANC_EVENT = {
  price: null,
  dateFrom: templateCurrentTime(),
  dateTo: templateCurrentTime(),
  destination: null,
  offers: [],
  type: null,
  basePrice: '',
  isFavorite: false,
};

const createTypeTemplate = (type, checked) => `<div class="event__type-item">
    <input id="event-type-${type}" class="event__type-input visually-hidden" type="radio" name="event-type" value="${type}" ${checked ? 'checked' : ''}>
    <label class="event__type-label event__type-label--${type}" for="event-type-${type}">${type}</label>
  </div>`;

const createEventTypeTemplate = (types, type) => {
  const typesTemplate = types ? types.map((item) => createTypeTemplate(item, item === type)).join('') : '';
  const icon = `<img class="event__type-icon" width="17" height="17" src="img/icons/${type ? type : 'question-mark'}.png" alt="Event type icon">`;

  return (
    `<div class="event__type-wrapper">
      <label class="event__type event__type-btn" for="event-type-toggle">
        <span class="visually-hidden">Choose event type</span>
        ${icon}
      </label>
      <input class="event__type-toggle visually-hidden" id="event-type-toggle" type="checkbox">
      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${typesTemplate}
        </fieldset>
      </div>
    </div>`
  );
};

const createNewEditTemplate = (point, offersCollection, destinations) => {
  const {type, destination, dateFrom, dateTo, basePrice, offers, isFavorite} = point;
  const rightType = offersCollection ? offersCollection.find((item) => item.type === type) : '';
  const rightTypeOffers = rightType ? rightType.offers : '';

  const offersComponent = rightTypeOffers ? rightTypeOffers.map((offer) => {
    const checked = (offers.includes(offer.id)) ? 'checked' : '';
    return `<div class="event__offer-selector">
     <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}" type="checkbox" name="event-offer" ${checked}>
       <label class="event__offer-label" for="event-offer-${offer.id}">
         <span class="event__offer-title">${offer.title}</span>
                                  &plus;&euro;&nbsp;
         <span class="event__offer-price">${offer.price}</span>
         </label>
      </div>`;
  }).join('') : '';

  const currentDestination = destinations ? destinations.find((item) => item.id === destination || item.name === destination) : '';
  const createEventDestinationTemplate = (eventType) => {

    const optionsTemplate = destinations.map(({name}) => `<option value="${name}"></option>`).join('');

    return `<div class="event__field-group event__field-group--destination">
      <label class="event__label event__type-output" for="event-destination-1">${eventType ? eventType : ''}</label>
      <input class="event__input event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${currentDestination ? currentDestination.name : ''}" list="destination-list-1" required>
      <datalist id="destination-list-1">
        ${optionsTemplate}
      </datalist>
    </div>`;
  };

  const currentPicturesComponent = currentDestination ? currentDestination.pictures.map((pic) => `<img class="event__photo" src="${pic ? pic.src : ''}" alt="${pic ? pic.description : ''}">`).join('') : '';
  const typesOfEvents = offersCollection ? offersCollection.map((offer) => offer.type) : '';
  const stringifiedPrice = basePrice ? basePrice.toString() : '';

  const slashDateFrom = dateFrom ? humanizePointEditDate(dateFrom) : humanizePointEditDate(dayjs());
  const slashDateTo = dateTo ? humanizePointEditDate(dateTo) : humanizePointEditDate(dayjs());
  const startTime = dateFrom ? humanizePointDueTime(dateFrom) : humanizePointDueTime(dayjs());
  const endTime = dateTo ? humanizePointDueTime(dateTo) : humanizePointDueTime(dayjs());

  return `<li class="trip-events__item">
            <form class="event event--edit" action="#" method="post">
               <header class="event__header">
                 ${createEventTypeTemplate(typesOfEvents, type)}
                 ${createEventDestinationTemplate(type)}
                 <div class="event__field-group  event__field-group--time">
                   <label class="visually-hidden" for="event-start-time-1">From</label>
                   <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${slashDateFrom} ${startTime}">
                   &mdash;
                   <label class="visually-hidden" for="event-end-time-1">To</label>
                   <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${slashDateTo} ${endTime}">
                 </div>

                 <div class="event__field-group  event__field-group--price">
                   <label class="event__label" for="event-price-1">
                     <span class="visually-hidden">Price</span>
                     &euro;
                   </label>
                   <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${he.encode(stringifiedPrice)}" min="1" required>
                 </div>

                 <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                 <button class="event__reset-btn" type="reset">Delete</button>
                 <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
                     <span class="visually-hidden">Add to favorite</span>
                        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
                        </svg>
                 </button>
                 <button class="event__rollup-btn" type="button">
                   <span class="visually-hidden">Open event</span>
                 </button>
               </header>
               <section class="event__details">
                 <section class="event__section  event__section--offers">
                   <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                   <div class="event__available-offers">
                       ${offersComponent}
                   </div>
                 </section>

                 <section class="event__section  event__section--destination">
                   <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                   <p class="event__destination-description">${currentDestination ? currentDestination.description : ''}</p>
                   <div class="event__photos-container">
                      <div class="event__photos-tape">
                      ${currentPicturesComponent}
                      </div>
                   </div>
                 </section>
               </section>
             </form>
           </li>`;
};

export default class PointEditView extends AbstractStatefulView {
  #datepickerStart = null;
  #datepickerEnd = null;
  #offers = null;
  #destinations = null;
  #cities = [];

  constructor(point = BLANC_EVENT, offers, destinations) {
    super();
    this._state = PointEditView.parsePointToState(point);
    this.#offers = offers;
    this.#destinations = destinations;
    this.#setInnerHandlers();
    this.#cities = this.#destinations ? this.#destinations.map(({name}) => name) : '';
  }

  get template() {
    return createNewEditTemplate(this._state, this.#offers, this.#destinations);
  }

  removeElement() {
    super.removeElement();
    if (this.#datepickerStart) {
      this.#datepickerEnd = null;
    }
    if (this.#datepickerEnd) {
      this.#datepickerStart = null;
    }
  }

  #setDateStartPicker = () => {
    this.#datepickerStart = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y / h:i',
        defaultDate: this._state.dateFrom,
        onChange: this.#dueDateStartChangeHandler
      }
    );
  };

  #setDateEndPicker = () => {
    this.#datepickerEnd = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y / h:i',
        defaultDate: this._state.dateTo,
        minDate: this.element.querySelector('#event-start-time-1').value,
        onChange: this.#dueDateEndChangeHandler,
      }
    );
  };

  #dueDateStartChangeHandler = ([dateFrom]) => {
    this.updateElement({
      dateFrom
    });
  };

  #dueDateEndChangeHandler = ([dateTo]) => {
    this.updateElement({
      dateTo
    });
  };

  #setDatePicker = () => {
    this.#setDateStartPicker();
    this.#setDateEndPicker();
  };

  static parsePointToState = (point) => ({...point});

  static parseStateToPoint = (state) => ({...state});

  reset = (point) => {
    this.updateElement(PointEditView.parsePointToState(point));
  };

  #setInnerHandlers = () => {
    Array.from(
      this.element.querySelectorAll('.event__type-input')).forEach((element) => element.addEventListener('click', this.#eventTypeToggleHandler));
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#eventDestinationInputHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceInputHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteChangeHandler.bind(this));
    this.element.querySelectorAll('.event__offer-checkbox').forEach((checkbox) => checkbox.addEventListener('click', this.#checkboxClickHandler));
    this.element.addEventListener('submit', this.#formSubmitHandler);
    this.#setDatePicker();
  };

  #checkboxClickHandler = (evt) => {
    evt.preventDefault();
    let offers = [...this._state.offers];
    const offerId = Number((evt.target.id.slice(-1)));

    if (evt.target.checked) {
      const offersByType = this.#offers.find((item) => item.type === this._state.type).offers;
      const offer = offersByType.find(({id}) => offerId === id);
      offers.push(offer.id);
    } else {
      offers = this._state.offers.filter(({id}) => offerId === id);
    }

    this.updateElement({
      offers,
    });
  };

  #eventTypeToggleHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: [],
    });
  };

  #eventDestinationInputHandler = (evt) => {
    evt.preventDefault();
    if (this.#cities.includes(evt.target.value)) {
      this.updateElement({
        destination: this.#destinations.find((item) => item.name === evt.target.value).id,
      });
    } else {
      evt.target.style.color = 'tomato';
      evt.target.value = 'Use the list please';
    }
  };


  #priceInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: Number(evt.target.value),
      isFavorite: false,
    });
  };

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.addEventListener('submit', this.#formSubmitHandler);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    const destinationValue = this.element.querySelector('.event__input--destination').value;
    if (this.#cities.includes(destinationValue)) {
      this._callback.formSubmit(PointEditView.parseStateToPoint(this._state));
    }
  };

  setDeleteClickHandler = (callback) => {
    this._callback.formDelete = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteHandler);
  };

  #formDeleteHandler = (evt) => {
    evt.preventDefault();
    this._callback.formDelete(PointEditView.parsePointToState(this._state));
  };

  #favoriteChangeHandler() {
    this.updateElement({
      isFavorite: !this._state.isFavorite
    });
  }

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setEditClickHandler(this._callback.editClick);
    this.#setDatePicker();
    this.setDeleteClickHandler(this._callback.formDelete);
  };
}
