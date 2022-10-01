import {NoPointsTextType} from '../const';

import AbstractView from '../framework/view/abstract-view';

const createNoPointTemplate = (filterType, noData) => {
  const createNoPointsText = NoPointsTextType[filterType];
  return `<p class="trip-events__msg">${noData ?? createNoPointsText}</p>`;
};

export default class NoPointView extends AbstractView {
  #filterType = null;
  #noData = null;

  constructor(filterType, noData) {
    super();
    this.#filterType = filterType;
    this.#noData = noData;
  }

  get template() {
    return createNoPointTemplate(this.#filterType, this.#noData);
  }
}
