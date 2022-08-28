import {filter} from '../util.js';

export const generateFilter = (tasks) => Object.entries(filter).map(
  ([filterName, filterPoints]) => ({
    name: filterName,
    count: filterPoints(tasks).length
  }),
);
