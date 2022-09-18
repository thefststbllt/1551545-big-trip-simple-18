import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';

import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';

const tripMainElement = document.querySelector('.trip-main');
const filtersContainer = tripMainElement.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const tripPresenter = new TripPresenter(tripContainer, pointsModel, filterModel ,tripMainElement);
const filterPresenter = new FilterPresenter(filtersContainer, filterModel, pointsModel);

tripPresenter.init();
filterPresenter.init();
