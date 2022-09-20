import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';

import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import PointsApiService from './points-api-service.js';

const AUTHORISATION = 'Basic ZMaXFfNVrLiLFA';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip'
const tripMainElement = document.querySelector('.trip-main');
const filtersContainer = tripMainElement.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');
const pointsModel = new PointsModel(new PointsApiService(END_POINT, AUTHORISATION));
const filterModel = new FilterModel();
const tripPresenter = new TripPresenter(tripContainer, pointsModel, filterModel ,tripMainElement);
const filterPresenter = new FilterPresenter(filtersContainer, filterModel, pointsModel);

tripPresenter.init();
filterPresenter.init();


console.log(new Date("2022-09-17T16:38:38.923Z"))
