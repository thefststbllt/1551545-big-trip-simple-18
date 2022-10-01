import AbstractView from '../framework/view/abstract-view';

const createNewEventButtonTemplate = () => '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';

export default class ButtonPointAddView extends AbstractView {
  get template() {
    return createNewEventButtonTemplate();
  }

  enable() {
    this.element.disabled = false;
  }

  disable() {
    this.element.disabled = true;
  }

  setClickHandler = (cb) => {
    this._callback.openPointAdd = cb;
    this.element.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.openPointAdd();
  };
}
