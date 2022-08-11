import {createElement} from '../render.js';

const createNewPointItemTemplate = () => ('<li class="trip-events__item">\n' +
  '              <div class="event">\n' +
    '                <time class="event__date" datetime="2019-03-18">MAR 18</time>\n' +
    '                <div class="event__type">\n' +
      '                  <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">\n' +
        '                </div>\n' +
    '                <h3 class="event__title">Taxi Amsterdam</h3>\n' +
    '                <div class="event__schedule">\n' +
      '                  <p class="event__time">\n' +
        '                    <time class="event__start-time" datetime="2019-03-18T10:30">10:30</time>\n' +
        '                    &mdash;\n' +
        '                    <time class="event__end-time" datetime="2019-03-18T11:00">11:00</time>\n' +
        '                  </p>\n' +
      '                </div>\n' +
    '                <p class="event__price">\n' +
      '                  &euro;&nbsp;<span class="event__price-value">20</span>\n' +
      '                </p>\n' +
    '                <h4 class="visually-hidden">Offers:</h4>\n' +
    '                <ul class="event__selected-offers">\n' +
      '                  <li class="event__offer">\n' +
        '                    <span class="event__offer-title">Order Uber</span>\n' +
        '                    &plus;&euro;&nbsp;\n' +
        '                    <span class="event__offer-price">20</span>\n' +
        '                  </li>\n' +
      '                </ul>\n' +
    '                <button class="event__rollup-btn" type="button">\n' +
      '                  <span class="visually-hidden">Open event</span>\n' +
      '                </button>\n' +
    '              </div>\n' +
  '            </li>');

export default class PointItemView {
  getTemplate() {
    return createNewPointItemTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
