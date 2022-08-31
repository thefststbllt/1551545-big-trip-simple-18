import {render, RenderPosition} from '../framework/render.js';
import PointListView from '../view/point-list-view.js';
import PointAddView from '../view/point-add-view.js';
import NoPointView from '../view/no-point-view.js';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter.js';

const POINTS_COUNT = 3;

export default class TripPresenter {
  #tripContainer = null;
  #pointsModel = null;

  #tripPoints = [];
  #tripOffers = [];

  #pointListView = new PointListView();
  #pointAddView = new PointAddView();
  #noPointComponent = new NoPointView();
  #sortComponent = new SortView();

  // #renderedPointsCount = POINTS_COUNT;

  #pointPresenter = new Map();

  constructor(tripEvents, pointsModel) {
    this.#tripContainer = tripEvents;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#tripPoints = this.#pointsModel.points;
    this.#tripOffers = this.#pointsModel.offers;
    render(this.#pointAddView, this.#tripContainer);

    this.#renderTripEvents();
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  };

  #renderPoint = (point, offers) => {
    const pointPresenter = new PointPresenter(this.#pointListView.element, this.#handleModeChange);
    pointPresenter.init(point, offers);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = (from, to) => {
    this.#tripPoints
      .slice(from, to)
      .forEach((point) => this.#renderPoint(point, this.#tripOffers));
  };

  #renderNoPointView = () => {
    render(this.#noPointComponent, this.#tripContainer, RenderPosition.BEFOREEND);
  };

  // #clearPointList = () => {
  //   this.#pointPresenter.forEach((presenter) => presenter.destroy());
  //   this.#pointPresenter.clear();
  //   this.#renderedPointsCount = POINTS_COUNT;
  // };

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
}


