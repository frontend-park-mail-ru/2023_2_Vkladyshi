import { get } from '../../utils/ajax.js';
import {
  collections,
  responseStatuses,
  urls,
  filmSelection,
  errorInputs,
} from '../../utils/config.js';
import { Component } from '../component.js';
import templateSelectCollection from './selectCollection.hbs';

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
    return templateSelectCollection(collections);
  }

  /**
   * Метод обработки нажатий на выбранную коллекцию
   * @return {Promise} Promise ответа
   */
  async addEvent() {
    const popup = document.querySelector('.popupSelectCollection');

    document.body.style.paddingRight =
      window.innerWidth - document.querySelector('main').offsetWidth + 1 + 'px';

    popup.onclick = (event) => {
      if (
        event.target.closest('.selectCollection-frame-img') ||
        !event.target.closest('.selectCollection')
      ) {
        document.body.style.paddingRight = '0px';
        popup.classList.remove('active');
        document.body.classList.remove('none-active');
      } else if (event.target.closest('.selectCollection-frame-list-item')) {
        const dataSection = event.target.getAttribute('data-section');

        get({
          url: urls.basket,
          query: { collection_id: dataSection },
        }).then((response) => {
          if (response.data.status === responseStatuses.success) {
            document.body.classList.remove('none-active');
            filmSelection.render(response.data.body);
            document.body.style.paddingRight = '0px';
            return response;
          } else {
            return errorInputs.ServerError;
          }
        });
      }
    };

    document.body.classList.add('none-active');
  }
}
