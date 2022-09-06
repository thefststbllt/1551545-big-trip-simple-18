import {render, remove, RenderPosition} from '../framework/render.js';
import PointListView from '../view/point-list-view.js';
import PointAddView from '../view/point-add-view.js';
import NoPointView from '../view/no-point-view.js';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter.js';
import {sortPointsByPrice, sortPointsByDay, updateItem} from '../util.js';
import {SortType} from '../mock/const.js';
import {yellowButton} from '../main.js';

const POINTS_COUNT = 10;

export default class TripPresenter {
  #tripContainer = null;
  #pointsModel = null;

  #tripPoints = [];
  #tripOffers = [];

  #pointListComponent = new PointListView();
  #noPointComponent = new NoPointView();
  #sortComponent = new SortView();

  #pointAddComponent = null;

  #pointPresenter = new Map();
  #currentSortType = null;
  #sourcedBoardPoints = [];

  constructor(tripEvents, pointsModel) {
    this.#tripContainer = tripEvents;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#tripPoints = [...this.#pointsModel.points];

    this.#sourcedBoardPoints = [...this.#pointsModel.points];
    this.#tripOffers = this.#pointsModel.offers;

    this.#pointAddComponent = new PointAddView(yellowButton, this.#handleDestroyPointAddClick);

    this.#pointAddComponent.setPointAddHandler(this.#renderPointAdd);
    this.#pointAddComponent.setDestroyPointAddHandler(this.#handleDestroyPointAddClick);

    this.#renderTripEvents();
    this.#renderSort();
    this.#sortPoints(this.#currentSortType);
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#tripPoints = updateItem(this.#tripPoints, updatedPoint);
    this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatedPoint);

    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortType.DAY:
        this.#tripPoints.sort(sortPointsByDay);
        break;
      case SortType.PRICE:
        this.#tripPoints.sort(sortPointsByPrice);
        break;
      default:
        this.#tripPoints = [...this.#sourcedBoardPoints];
    }
    this.#currentSortType = sortType;
  };

  //Хендлер для сортировки
  #handlerSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPointList();
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handlerSortTypeChange);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointListComponent.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point, this.#tripOffers);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = (from, to) => {
    this.#tripPoints
      .slice(from, to)
      .forEach((point) => this.#renderPoint(point));
  };

  #renderNoPointView = () => {
    render(this.#noPointComponent, this.#tripContainer, RenderPosition.BEFOREEND);
  };

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) =>
      presenter.destroy());
    this.#pointPresenter.clear();

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }
  };

  #renderPointList = () => {
    render(this.#pointListComponent, this.#tripContainer);
    this.#renderPoints(0, Math.min(this.#tripPoints.length, POINTS_COUNT));
  };

  #renderTripEvents = () => {
    if (this.#tripPoints.length === 0) {
      this.#renderNoPointView();
      return;
    }

    this.#renderSort();
    this.#renderPointList();
  };

  //рендерим форму редактирования
  #renderPointAdd = () => {
    render(this.#pointAddComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  };

  //удаляем форму редактирования
  #removePointAddView = () => {
    remove(this.#pointAddComponent);
  };

  //Хендлер для удаления формы редактирования
  #handleDestroyPointAddClick = () => {
    this.#removePointAddView();
  };
}


