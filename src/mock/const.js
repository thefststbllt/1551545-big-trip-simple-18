const CITIES_COLLECTION = [
  'Saint-Petersburg',
  'Los-Angeles',
  'Tokyo',
  'Paris',
  'Moscow',
  'Rome',
  'Helsinki',
  'Riodežaneiro',
];

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.'
];

const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const OFFER_TITLES = [
  'Upgrade to a business class',
  'Order a taxi',
  'Business lounge',
  'Choose the check-in time',
  'Entertainment for kids'
];

const OFFER_IDS = ['1', '2', '3', '4', '5'];

const OFFER_PRICES = ['100', '200', '150', '120', '170'];

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future'
};

const SortType = {
  DEFAULT: 'default',
  DATE_DOWN: 'date-down',
  DATE_UP: 'date-up'
};

export {CITIES_COLLECTION, DESCRIPTIONS, OFFER_TITLES, OFFER_IDS, OFFER_PRICES, EVENT_TYPES, FilterType, SortType};
