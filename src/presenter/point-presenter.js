import {render, replace, remove} from '../framework/render.js';
import PointItemView from '../view/point-item-view.js';
import PointEditView from '../view/point-edit-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #pointListContainer = null;
  #point = null;
  #offers = null;

  #mode = Mode.DEFAULT;

  #changeMode = null;
  #changeData = null;

  #pointItemComponent = null;
  #pointEditComponent = null;

  constructor(pointListContainer, changeData, changeMode) {
    this.#pointListContainer = pointListContainer;
    this.#changeMode = changeMode;
    this.#changeData = changeData;
  }

  init = (point, offers) => {
    this.#point = point;
    this.#offers = offers;

    const prevPointComponent = this.#pointItemComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointItemComponent = new PointItemView(point, this.#offers);
    this.#pointEditComponent = new PointEditView(point, this.#offers);
    this.#pointItemComponent.setClickHandler(this.#handleEditClick);
    this.#pointEditComponent.setEditClickHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setFormSubmitHandler();
    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointItemComponent, this.#pointListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointItemComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  };

  destroy = () => {
    remove(this.#pointItemComponent);
    remove(this.#pointEditComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
    }
  };

  #replacePointToForm = () => {
    replace(this.#pointEditComponent, this.#pointItemComponent);
    document.addEventListener('keydown', this.#onEscKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToPoint = () => {
    replace(this.#pointItemComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#onEscKeyDownHandler);
    this.#mode = Mode.DEFAULT;
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
