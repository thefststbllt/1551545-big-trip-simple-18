import TripPresenter from './presenter/trip-presenter';

import PointsModel from './model/points-model';
import FilterModel from './model/filter-model';
import PointsApiService from './points-api-service';

const AUTHORISATION = 'Basic KMaXYfYNVrLiLFscA';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip';

const tripMainElement = document.querySelector('.trip-main');
const tripContainer = document.querySelector('.trip-events');
const filterContainer = tripMainElement.querySelector('.trip-controls__filters');

const pointsModel = new PointsModel(new PointsApiService(END_POINT, AUTHORISATION));
const filterModel = new FilterModel();
const tripPresenter = new TripPresenter(tripContainer, pointsModel, filterModel, tripMainElement, filterContainer);

tripPresenter.init();
pointsModel.init();
