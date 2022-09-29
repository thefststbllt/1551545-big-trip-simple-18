import {remove, render, RenderPosition, replace} from '../framework/render';
import ListFilterView from '../view/list-filter-view';
import {filter} from '../util';
import {FILTER_TYPE, UpdateType} from '../const';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #pointsModel = null;

  #filterComponent = null;

  constructor(filterContainer, filterModel, pointsModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const points = this.#pointsModel.points;

    return Object.values(FILTER_TYPE).map((type) => ({
      type,
      checked: type === this.#filterModel.filter,
      disabled: !filter[type](points).length,
    }));
  }


  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new ListFilterView(filters);
    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

    if (!prevFilterComponent) {
      render(this.#filterComponent, this.#filterContainer, RenderPosition.BEFOREEND);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  };

  #handleModelEvent = () => this.init();

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }
    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
