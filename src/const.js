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
  everything: 'everything',
  future: 'future',
  past: 'past'
};

const SortType = {
  DAY: 'day',
  PRICE: 'price',
  TIME: 'time'
};

const NoPointsTextType = {
  [FilterType.everything]: 'Click + New event to create your first point',
  [FilterType.future]: 'There are no future events now',
  [FilterType.past]: 'There are no past events now'
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
