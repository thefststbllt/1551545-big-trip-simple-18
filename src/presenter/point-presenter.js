import {render, replace, remove} from '../framework/render';
import {UserAction, UpdateType} from '../const';
import {isEscPressed} from '../util';

import PointItemView from '../view/point-item-view';
import PointEditView from '../view/point-edit-view';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #pointListContainer = null;
  #point = null;
  #offers = null;
  #destinations = null;

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

  init = (point, offers, destinations) => {
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;

    const prevPointComponent = this.#pointItemComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointItemComponent = new PointItemView(point, this.#offers, this.#destinations);
    this.#pointEditComponent = new PointEditView(point, this.#offers, this.#destinations);
    this.#pointItemComponent.setClickHandler(this.#handleClickOpen);
    this.#pointItemComponent.setFavoriteClickHandler(this.#handleFavoriteClick.bind(this));
    this.#pointEditComponent.setEditClickHandler(this.#handleFormClose);
    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setDeleteClickHandler(this.#handleFormDelete);

    if (!prevPointComponent || !prevPointEditComponent) {
      render(this.#pointItemComponent, this.#pointListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointItemComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
      this.#mode = Mode.DEFAULT;
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

  setSaving = () => {
    if (this.#mode === Mode.EDITING) {
      this.#pointEditComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  };

  setDeleting = () => {
    if (this.#mode === Mode.EDITING) {
      this.#pointEditComponent.updateElement({
        isDisabled: true,
        isSaving: false,
        isDeleting: true,
      });
    }
  };

  setAborting = () => {
    if (this.#mode === Mode.DEFAULT) {
      this.#pointItemComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointEditComponent.shake(resetFormState);
  };

  #replacePointToForm = () => {
    replace(this.#pointEditComponent, this.#pointItemComponent);
    document.addEventListener('keydown', this.#EscKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToPoint = () => {
    replace(this.#pointItemComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#EscKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #EscKeyDownHandler = (evt) => {
    if (isEscPressed(evt)) {
      evt.preventDefault();
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#EscKeyDownHandler);
    }
  };

  #handleClickOpen = () => {
    this.#replacePointToForm();
  };

  #handleFormSubmit = (point) => {
    this.#changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      point
    );
  };

  #handleFormDelete = (point) => {
    this.#changeData(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point
    );
  };

  #handleFavoriteClick = (point) => {
    this.#changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      Object.assign(
        {},
        point,
        {isFavorite: !point.isFavorite},
      ),
    );
  };

  #handleFormClose = () => {
    this.#pointEditComponent.reset(this.#point);
    this.#replaceFormToPoint();
  };
}
