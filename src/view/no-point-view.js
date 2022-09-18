import AbstractView from '../framework/view/abstract-view.js';
import {FILTER_TYPE} from '../mock/const.js';

const NoPointsTextType = {
  [FILTER_TYPE.everything]: 'Click New Event to create your first point',
  [FILTER_TYPE.future]: 'There are no future events now',
  [FILTER_TYPE.past]: 'There are no events in the past for now'
};

const createNoPointTemplate = (filterType) => {
  const createNoPointsText = NoPointsTextType[filterType];
  return `<p class="trip-events__msg">${createNoPointsText}</p>`;
};

export default class NoPointView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoPointTemplate(this.#filterType);
  }
}
