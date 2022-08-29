import {render, replace} from '../framework/render.js';
import PointItemView from '../view/point-item-view.js';
import PointEditView from '../view/point-edit-view.js';

export default class PointPresenter {
  #pointListContainer = null;
  #point = null;

  #pointItemComponent = null;
  #pointEditComponent = null;

  constructor(pointListContainer) {
    this.#pointListContainer = pointListContainer;
  }

  init = (point, offers) => {
    this.#point = point;

    this.#pointItemComponent = new PointItemView(point, offers);
    this.#pointEditComponent = new PointEditView();
    this.#pointItemComponent.setClickHandler(this.#handleEditClick);
    this.#pointEditComponent.setClickHandler(this.#handleFormSubmit);

    render(this.#pointItemComponent, this.#pointListContainer);
  };

  #replacePointToForm = () => {
    replace(this.#pointEditComponent, this.#pointItemComponent);
    document.addEventListener('keydown', this.#onEscKeyDownHandler);
  };

  #replaceFormToPoint = () => {
    replace(this.#pointItemComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#onEscKeyDownHandler);
  };

  #onEscKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#onEscKeyDownHandler);
    }
  };

  #handleEditClick = () => {
    this.#replacePointToForm();
  };

  #handleFormSubmit = () => {
    this.#replaceFormToPoint();
  };
}
