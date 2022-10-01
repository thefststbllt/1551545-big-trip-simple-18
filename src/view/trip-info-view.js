import AbstractView from '../framework/view/abstract-view';

const createCostTemplate = () =>
  `<section class="trip-main__trip-info trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">My BigTrip</h1>
      <p class="trip-info__dates">Sometimes…</p>
    </div>
  </section>`;

export default class TripInfoView extends AbstractView {
  get template() {
    return createCostTemplate();
  }
}
