import AbstractView from '../framework/view/abstract-view';

const createNoPointTemplateView = () => (
  '<div class="trip-events__preloader">\n' +
  '  <hr/><hr/><hr/><hr/>\n' +
  '</div>'
);

export default class LoadingView extends AbstractView {
  get template() {
    return createNoPointTemplateView();
  }
}
