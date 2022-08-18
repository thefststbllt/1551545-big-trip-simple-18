import {createElement} from '../render.js';

const createNewTripEventsTemplate = () => '<section class="trip-events"></section>';

export default class TripEventsView {
  getTemplate() {
    return createNewTripEventsTemplate();
  }

  getElement() {
    if(!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
