import {render} from '../render.js';
import TripEventsView from '../view/trip-events.js';
import PointListView from '../view/point-list-view.js';
import PointAddView from '../view/point-add-view.js';
import EditPointView from '../view/edit-point.js';
import PointItemView from '../view/point-item-view.js';

export default class TripPresenter {
  tripComponent = new TripEventsView();
  pointListComponent = new PointListView();
  pointAddView = new PointAddView();
  editPointView = new EditPointView();

  init = (tripContainer) => {
    this.tripContainer = tripContainer;

    render(this.editPointView, this.tripContainer);
    render(this.pointAddView, this.tripContainer);
    render(this.tripComponent, this.tripContainer);
    render(this.pointListComponent, this.tripComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new PointItemView(), this.pointListComponent.getElement());
    }
  };
}
