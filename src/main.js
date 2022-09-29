import TripPresenter from './presenter/trip-presenter.js';

import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';

import PointsApiService from './points-api-service.js';

const AUTHORISATION = 'Basic dMaXYfYNVrLiLFscA';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip';
const tripMainElement = document.querySelector('.trip-main');
const filterContainer = tripMainElement.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');
const pointsModel = new PointsModel(new PointsApiService(END_POINT, AUTHORISATION));
const filterModel = new FilterModel();
const tripPresenter = new TripPresenter(tripContainer, pointsModel, filterModel, tripMainElement, filterContainer);

tripPresenter.init();
pointsModel.init();
