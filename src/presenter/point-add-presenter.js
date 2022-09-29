import {render, remove, RenderPosition} from '../framework/render';
import PointEditView from '../view/point-edit-view';
import {UserAction, UpdateType} from '../const';
import {isEscPressed} from '../util';

export default class PointAddPresenter {
  #pointListContainer = null;
  #changeData = null;
  #pointEditComponent = null;
  #buttonNewPoint = null;
  #points = null;
  #offers = null;
  #destinations = null;

  constructor(pointListContainer, changeData, buttonNewPoint) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
    this.#buttonNewPoint = buttonNewPoint;
  }

  init = (offers, destinations) => {
    if (this.#pointEditComponent) {
      return;
    }

    this.#offers = offers;
    this.#destinations = destinations;

    this.#pointEditComponent = new PointEditView(this.#points, this.#offers, this.#destinations);
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

  setSaving = () => {
    this.#pointEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  };

  setAborting = () => {
    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointEditComponent.shake(resetFormState);
  };

  #handleFormSubmit = (point) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point
    );
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
