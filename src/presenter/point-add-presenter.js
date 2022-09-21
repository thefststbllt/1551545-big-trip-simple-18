import {render, remove, RenderPosition} from '../framework/render.js';
import PointEditView from '../view/point-edit-view.js';
import {UserAction, UpdateType} from '../mock/const.js';
import {nanoid} from 'nanoid';
import {isEscPressed} from '../util.js';

export default class PointAddPresenter {
  #pointListContainer = null;
  #changeData = null;
  #pointEditComponent = null;
  #buttonNewPoint = null;

  constructor(pointListContainer, changeData, buttonNewPoint) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
    this.#buttonNewPoint = buttonNewPoint;
  }

  init = () => {

    if (this.#pointEditComponent) {
      return;
    }

    this.#pointEditComponent = new PointEditView();
    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setDeleteClickHandler(this.#handleDeleteClick);
    this.#pointEditComponent.setEditClickHandler(this.#handleDeleteClick);

    render(this.#pointEditComponent, this.#pointListContainer.element, RenderPosition.AFTERBEGIN);
    this.#buttonNewPoint.disable();
    document.addEventListener('keydown', this.#onEscKeyDownHandler);
  };

  destroy = () => {
    if (!this.#pointEditComponent) {
      return;
    }

    this.#buttonNewPoint.enable();
    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#onEscKeyDownHandler);
  };

  #handleFormSubmit = (point) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      {id: nanoid(), ...point}
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #onEscKeyDownHandler = (evt) => {
    if (isEscPressed(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  };
}
