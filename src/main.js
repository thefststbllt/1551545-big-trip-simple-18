import ListFilterView from './view/list-filter-view.js';
import SortView from './view/sort-view.js';
import {render} from './framework/render.js';
import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model.js';
import {generateFilter} from './mock/filter.js';

const tripMainElement = document.querySelector('.trip-main');
const tripMainFilters = tripMainElement.querySelector('.trip-controls__filters');
const mainElement = document.querySelector('main');
const tripEvents = mainElement.querySelector('.trip-events');
const pointsModel = new PointsModel();
const tripPresenter = new TripPresenter(tripEvents, pointsModel);

const filters = generateFilter(pointsModel.points);

render(new ListFilterView(filters), tripMainFilters);
render(new SortView(), tripEvents);

tripPresenter.init();
