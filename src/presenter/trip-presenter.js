import {render, RenderPosition, remove} from '../framework/render.js';
import PointListView from '../view/point-list-view.js';
import PointAddView from '../view/point-add-view.js';
import NoPointView from '../view/no-point-view.js';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter.js';

const POINTS_COUNT = 10;

export default class TripPresenter {
  #tripContainer = null;
  #pointsModel = null;

  #tripPoints = [];
  #tripOffers = [];

  #pointListView = new PointListView();
  #noPointComponent = new NoPointView();
  #sortComponent = new SortView();

  #pointAddComponent = null;

  #pointPresenter = new Map();

  constructor(tripEvents, pointsModel) {
    this.#tripContainer = tripEvents;
    this.#pointsModel = pointsModel;
  }

  init = (yellowButton) => {
    this.#tripPoints = this.#pointsModel.points;
    this.#tripOffers = this.#pointsModel.offers;

    this.#pointAddComponent = new PointAddView();

    this.#pointAddComponent.setClickHandler(this.#renderPointAdd, yellowButton);
    this.#pointAddComponent.setRemoveHandler(this.#handleRemoveClick);

    this.#renderTripEvents();
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointListView.element, this.#handleModeChange);
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

  #renderPointList = () => {
    render(this.#pointListView, this.#tripContainer);
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
  #handleRemoveClick = () => {
    this.#removePointAddView();
  };
}


