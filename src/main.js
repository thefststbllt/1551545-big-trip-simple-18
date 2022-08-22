import ListFilterView from './view/list-filter-view.js';
import SortView from './view/sort-view.js';
import {render} from './render.js';
import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model.js';

const tripMainElement = document.querySelector('.trip-main');
const tripMainFilters = tripMainElement.querySelector('.trip-controls__filters');
const mainElement = document.querySelector('main');
const tripEvents = mainElement.querySelector('.trip-events');
const pointsModel = new PointsModel();
const tripPresenter = new TripPresenter(tripEvents, pointsModel);

render(new ListFilterView(), tripMainFilters);
render(new SortView(), tripEvents);

tripPresenter.init();
