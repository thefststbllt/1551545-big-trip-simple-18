import {render, remove, RenderPosition} from '../framework/render.js';
import PointListView from '../view/point-list-view.js';
import NoPointView from '../view/no-point-view.js';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter.js';
import ButtonPointAddView from '../view/button-point-add-view.js';
import {sortPointsByPrice, sortPointsByDay, sortPointsByTime} from '../util.js';
import {SortType, UserAction, UpdateType, FILTER_TYPE} from '../mock/const.js';
import PointAddPresenter from './point-add-presenter.js';
import {filter} from '../util.js';

export default class TripPresenter {
  #tripContainer = null;
  #pointsModel = null;
  #filterModel = null;

  #tripOffers = [];
  #tripDestinations = [];

  #currentSortType = null;
  #filterType = FILTER_TYPE.everything;

  #pointListComponent = new PointListView();
  #noPointComponent = null;
  #sortComponent = new SortView(this.#currentSortType);
  #buttonPointAddComponent = null;
  #buttonPointAddContainer = null;

  #pointPresenter = new Map();
  #pointAddPresenter = null;

  constructor(tripContainer, pointsModel, filterModel, buttonPointAddContainer) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#buttonPointAddComponent = new ButtonPointAddView();
    this.#buttonPointAddContainer = buttonPointAddContainer;
    this.#buttonPointAddComponent.setClickHandler(this.createPoint);

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#pointAddPresenter = new PointAddPresenter(this.#pointListComponent, this.#handleViewAction, this.#buttonPointAddComponent);
  }

  get points () {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort(sortPointsByDay);
      case SortType.PRICE:
        return filteredPoints.sort(sortPointsByPrice);
      case SortType.TIME:
        return filteredPoints.sort(sortPointsByTime);
    }
    return filteredPoints;
  }

  createPoint = () => {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FILTER_TYPE.everything);
    this.#pointAddPresenter.init();
  };

  init = () => {
    this.#tripOffers = this.#pointsModel.offers;
    this.#tripDestinations = this.#pointsModel.destinations;

    this.#renderRoute();
    this.#renderButtonPointAdd();
  };

  #handleModeChange = () => {
    this.#pointAddPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        // this.#renderSort();
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearRoute();
        this.#renderRoute();
        break;
      case UpdateType.MAJOR:
        this.#clearRoute();
        this.#renderRoute({resetSortType: true});
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearRoute();
    this.#renderRoute();
  };

  #renderButtonPointAdd = () => {
    render(this.#buttonPointAddComponent, this.#buttonPointAddContainer);
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointListComponent.element, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point, this.#tripOffers, this.#tripDestinations);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderNoPointView = () => {
    this.#noPointComponent = new NoPointView(this.#filterType);
    render(this.#noPointComponent, this.#tripContainer, RenderPosition.BEFOREEND);
  };

  #clearRoute = ({resetSortType = false} = {}) => {
    this.#pointAddPresenter.destroy();
    this.#pointPresenter.forEach((pointPresenter) => pointPresenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#pointListComponent);
    remove(this.#sortComponent);
    remove(this.#noPointComponent);
    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  };

  #renderRoute = () => {
    const points = this.points;
    const pointsCount = points.length;
    this.#renderSort();

    render(this.#pointListComponent, this.#tripContainer);
    if (pointsCount === 0) {
      this.#renderNoPointView();
      return;
    }
    for (let i = 0; i < pointsCount; i++) {
      this.#renderPoint(this.points[i]);
    }
  };
}


