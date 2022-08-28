import AbstractView from '../framework/view/abstract-view.js';

const createFilterItemTemplate = (filter, isChecked) => {

  const {name} = filter;

  return `<input id="filter-${name}" class="trip-filters__filter-input visually-hidden" type="radio" name="trip-filter" value="${name}" ${isChecked ? 'checked' : ''}/>` +
    `<label class ="trip-filters__filter-label" for="filter-${name}">${name}</label></div><div class="trip-filters__filter">`;
};

const createFilterTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems.map((filter) => createFilterItemTemplate(filter));

  return '<form class="trip-filters" action="#" method="get">' +
    '<div class="trip-filters__filter">' +
    `${filterItemsTemplate.join('')}` +
    '</div>' +
    '<button class="visually-hidden" type="submit">Accept filter</button>' +
    '</form>';
};

export default class ListFilterView extends AbstractView {
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }
}

