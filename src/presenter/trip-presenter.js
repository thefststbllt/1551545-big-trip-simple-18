import {render, RenderPosition} from '../framework/render.js';
import PointListView from '../view/point-list-view.js';
import PointAddView from '../view/point-add-view.js';
import NoPointView from '../view/no-point-view.js';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter.js';

export default class TripPresenter {
  #tripContainer = null;
  #pointsModel = null;

  #tripPoints = [];
  #tripOffers = [];

  #pointListView = new PointListView();
  #pointAddView = new PointAddView();
  #noPointComponent = new NoPointView();
  #sortComponent = new SortView();

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

  #renderSort = () => {
    render(this.#sortComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  };

  #renderPoint = (point, offers) => {
    const pointPresenter = new PointPresenter(this.#pointListView.element);
    pointPresenter.init(point, offers);
  };

  #renderPointList = () => {
    render(this.#pointListView, this.#tripContainer);
  };

  #renderPoints = () => {
    this.#tripPoints.forEach((point) => this.#renderPoint(point, this.#tripOffers));
  };

  #renderNoPointView = () => {
    render(this.#noPointComponent, this.#tripContainer, RenderPosition.BEFOREEND);
  };

  #renderTripEvents = () => {
    if (this.#tripPoints.length === 0) {
      this.#renderNoPointView();
    } else {
      this.#renderPointList();
      this.#renderPoints();
    }

    this.#renderSort();
  };
}


