import {render} from '../render.js';
import PointListView from '../view/point-list-view.js';
import PointAddView from '../view/point-add-view.js';
import PointItemView from '../view/point-item-view.js';
import PointEditView from '../view/point-edit-view.js';

export default class TripPresenter {
  #pointListView = new PointListView();
  #pointAddView = new PointAddView();

  init = (tripEvents, pointsModel) => {
    this.tripContainer = tripEvents;
    this.pointsModel = pointsModel;
    this.tripPoints = this.pointsModel.points;
    this.tripOffers = this.pointsModel.offers;
    render(this.#pointAddView, this.tripContainer);
    render(this.#pointListView, this.tripContainer);
    const selectedOffers = this.tripOffers;

    for (let i = 0; i < this.tripPoints.length; i++) {
      this.#renderPoint(this.tripPoints[i], selectedOffers);
    }
  };

  #renderPoint = (point, offers) => {
    const pointItemView = new PointItemView(point, offers);
    const pointEditView = new PointEditView();

    const replacePointToForm = () => {
      this.#pointListView.element.replaceChild(pointEditView.element, pointItemView.element);
    };

    const replaceFormToPoint = () => {
      this.#pointListView.element.replaceChild(pointItemView.element, pointEditView.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointItemView.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditView.element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditView.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceFormToPoint();
    });

    render(pointItemView, this.#pointListView.element);
  };
}


