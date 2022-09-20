import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class PointsApiService extends ApiService {
  get points() {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  updatePoint = async (point) => {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    return await ApiService.parseResponse(response);

  };

  #adaptToServer = (point) => {
    const adaptedPoint = {
      ...point,
      'base_price': point.basePrice,
      'date_to': point.dateTo instanceof Date ? point.dateTo.toISOString() : null,
      'dateFrom': point.dateFrom instanceof Date ? point.dateFrom.toISOString() : null
    };

    delete adaptedPoint.basePrice;
    delete adaptedPoint.dateTo;
    delete adaptedPoint.dateFrom;

    return adaptedPoint;
  }
}
