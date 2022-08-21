import {createElement} from '../render.js';

const createNewTripEventsTemplate = () => '<section class="trip-events"></section>';

export default class TripEventsView {
  #element = null;
  get template() {
    return createNewTripEventsTemplate();
  }

  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
