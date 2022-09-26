import {render, remove, RenderPosition} from '../framework/render.js';
import ListFilterView from '../view/list-filter-view.js';
import {filter} from '../util.js';
import {FILTER_TYPE, UpdateType} from '../const.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #pointsModel = null;

  #filterComponent = null;

  constructor(filterContainer, filterModel, pointsModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.init);
    this.#filterModel.addObserver(this.init);
  }

  get filters() {
    const points = this.#pointsModel.points;

    return [
      {
        type: FILTER_TYPE.everything,
        name: 'everything',
        count: filter[FILTER_TYPE.everything](points).length,
      },
      {
        type: FILTER_TYPE.future,
        name: 'future',
        count: filter[FILTER_TYPE.future](points).length,
      },
      {
        type: FILTER_TYPE.past,
        name: 'past',
        count: filter[FILTER_TYPE.past](points).length,
      },
    ];
  }

  init() {
    this.#filterComponent = new ListFilterView(this.filters);
    const prevFilterComponent = this.#filterComponent;
    prevFilterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);
    render(prevFilterComponent, this.#filterContainer, RenderPosition.BEFOREEND);
  }

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }
    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
    remove(this.#filterComponent);
  };
}
