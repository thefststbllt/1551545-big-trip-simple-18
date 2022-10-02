import {render, remove, RenderPosition} from '../framework/render';
import {sortPointsByPrice, sortPointsByDay, sortPointsByTime, filter} from '../util';
import {SortType, UserAction, UpdateType, FilterType, NoDataMessage} from '../const';

import UiBlocker from '../framework/ui-blocker/ui-blocker';

import PointListView from '../view/point-list-view';
import NoPointView from '../view/no-point-view';
import SortView from '../view/sort-view';
import TripInfoView from '../view/trip-info-view';
import LoadingView from '../view/loading-view';

import ButtonPointAddView from '../view/button-point-add-view';
import PointPresenter from './point-presenter';
import PointAddPresenter from './point-add-presenter';
import FilterPresenter from '../presenter/filter-presenter';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class TripPresenter {
  #tripContainer = null;
  #pointsModel = null;
  #filterModel = null;

  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;

  #pointListComponent = new PointListView();
  #sortComponent = new SortView(this.#currentSortType);
  #loadingComponent = new LoadingView();

  #noPointComponent = null;
  #buttonPointAddComponent = null;
  #headerContainer = null;
  #tripInfoComponent = null;

  #pointPresenter = new Map();
  #pointAddPresenter = null;
  #filterPresenter = null;
  #isLoading = true;
  #uiBlocker = new UiBlocker(TimeLimit.LOWER_LIMIT, TimeLimit.UPPER_LIMIT);

  constructor(tripContainer, pointsModel, filterModel, headerContainer, filterContainer) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#buttonPointAddComponent = new ButtonPointAddView();
    this.#tripInfoComponent = new TripInfoView(this.points);
    this.#headerContainer = headerContainer;
    this.#buttonPointAddComponent.setClickHandler(this.createPoint);

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#pointAddPresenter = new PointAddPresenter(this.#pointListComponent, this.#handleViewAction, this.#buttonPointAddComponent);
    this.#filterPresenter = new FilterPresenter(filterContainer, filterModel, pointsModel);
  }

  get points() {
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
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#pointAddPresenter.init(this.#pointsModel.offers, this.#pointsModel.destinations);
  };

  init = () => {
    this.#filterPresenter.init();
    this.#renderRoute();
    this.#renderTripInfo();
    this.#renderButtonPointAdd();
  };

  #handleModeChange = () => {
    this.#pointAddPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = async (actionType, updateType, point) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenter.get(point.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, point);
        } catch (err) {
          this.#pointPresenter.get(point.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#pointAddPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, point);
        } catch (err) {
          this.#pointAddPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenter.get(point.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, point);
        } catch (err) {
          this.#pointPresenter.get(point.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, point) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(point.id).init(point);
        break;
      case UpdateType.MINOR:
        this.#clearRoute();
        this.#renderRoute();
        break;
      case UpdateType.MAJOR:
        this.#clearRoute({resetSortType: true});
        this.#renderRoute();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderRoute();
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

  #renderTripInfo = () => {
    render(this.#tripInfoComponent, this.#headerContainer, RenderPosition.AFTERBEGIN);
  };

  #renderButtonPointAdd = () => {
    render(this.#buttonPointAddComponent, this.#headerContainer);
  };

  #renderSort = () => {
    const updatedSortComponent = new SortView(this.#currentSortType);
    render(updatedSortComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
    this.#sortComponent = updatedSortComponent;
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointListComponent.element, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point, this.#pointsModel.offers, this.#pointsModel.destinations);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#pointListComponent.element, RenderPosition.AFTERBEGIN);
  };

  #getNoDataPhrase() {
    if (!this.#pointsModel.offers.length || !this.#pointsModel.destinations.length) {
      return NoDataMessage;
    }
  }

  #renderNoPointView = () => {
    this.#noPointComponent = new NoPointView(this.#filterType, this.#getNoDataPhrase());
    render(this.#noPointComponent, this.#tripContainer, RenderPosition.BEFOREEND);
  };

  #clearRoute = ({resetSortType = false} = {}) => {
    this.#pointAddPresenter.destroy();
    this.#pointPresenter.forEach((pointPresenter) => pointPresenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#pointListComponent);
    remove(this.#sortComponent);
    remove(this.#loadingComponent);
    remove(this.#noPointComponent);
    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  };

  #renderRoute = () => {
    render(this.#pointListComponent, this.#tripContainer);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (!this.#pointsModel.offers.length || !this.#pointsModel.destinations.length) {
      this.#buttonPointAddComponent.element.setAttribute('disabled', '');
      this.#sortComponent.setSortDisabled();
    }

    const points = this.points;
    const pointsCount = points.length;
    this.#renderSort();

    if (pointsCount === 0) {
      this.#renderNoPointView();
      return;
    }

    for (let i = 0; i < pointsCount; i++) {
      this.#renderPoint(this.points[i]);
    }
  };
}


