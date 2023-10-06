import { get } from '../../utils/ajax.js';
import {
  collections,
  responseStatuses,
  urls,
  filmSelection,
  errorInputs,
} from '../../utils/config.js';
import { Component } from '../component.js';

/**
 * Класс формирования окна выбора подборки фильмов
 * @class SelectCollection
 * @typedef {SelectCollection}
 */
export class SelectCollection extends Component {
  /**
   * Конструктор для формирования родительского элемента
   * @class
   */
  constructor() {
    super();
  }

  /**
   * Метод рендеринга элемента
   * @return {string} html авторизации
   */
  render() {
    return Handlebars.templates['selectCollection.hbs'](collections);
  }

  /**
   * Метод обработки нажатий на выбранную коллекцию
   * @return {Promise} Promise ответа
   */
  async addEvent() {
    const buttons = document.getElementsByClassName(
      'selectCollection-frame-list-item'
    );

    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function () {
        // eslint-disable-next-line no-invalid-this
        const dataSection = this.getAttribute('data-section');

        get({
          url: urls.basket,
          query: { collection_id: dataSection },
        }).then((response) => {
          if (response.status === responseStatuses.success) {
            filmSelection.render(response.data.body);
            return response;
          } else {
            return errorInputs.ServerError;
          }
        });
      });
    }
  }
}
