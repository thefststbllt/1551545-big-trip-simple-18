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

const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const FILTER_TYPE = {
  everything: 'everything',
  future: 'future',
  past: 'past'
};

const SortType = {
  DAY: 'day',
  PRICE: 'price',
  TIME: 'time'
};

export {UserAction, UpdateType, EVENT_TYPES, FILTER_TYPE, SortType};
