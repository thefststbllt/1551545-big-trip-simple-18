import {render} from '../render.js';
import PointListView from '../view/point-list-view.js';
import PointAddView from '../view/point-add-view.js';
import PointItemView from '../view/point-item-view.js';
import PointEditView from '../view/point-edit-view.js';

export default class TripPresenter {
  pointListView = new PointListView();
  pointAddView = new PointAddView();
  pointEditView = new PointEditView();

  init = (tripEvents, pointsModel) => {
    this.tripContainer = tripEvents;
    this.pointsModel = pointsModel;
    this.tripPoints = [...this.pointsModel.getPoints()];
    this.tripOffers = [...this.pointsModel.getOffers()];
    render(this.pointEditView, this.tripContainer);
    render(this.pointAddView, this.tripContainer);
    render(this.pointListView, this.tripContainer);
    const selectedOffers = this.tripOffers;

    for (let i = 0; i < this.tripPoints.length; i++) {
      render(new PointItemView(this.tripPoints[i], selectedOffers), this.pointListView.getElement());
    }
  };
}
