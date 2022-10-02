const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past'
};

const SortType = {
  DAY: 'day',
  PRICE: 'price',
  TIME: 'time'
};

const NoPointsTextType = {
  [FilterType.EVERYTHING]: 'Click + New event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now'
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

const NoDataMessage = 'Ooops! Something went wrong. Please try again later...';

export {
  NoPointsTextType,
  NoDataMessage,
  FilterType,
  UserAction,
  UpdateType,
  SortType,
  Method,
};
