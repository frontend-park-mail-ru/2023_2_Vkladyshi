import { get } from '@utils/ajax';
import {
  collections,
  responseStatuses,
  urls,
  errorInputs, filmSelectionPage,
} from '@utils/config';
import { Component } from '@components/component';
import {router} from "@router/Router";
// @ts-ignore
const templateSelectCollection = require('./selectCollection.hbs');

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
  constructor(ROOT) {
    super(ROOT);
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
    addEvent() {
    const popup = document.querySelector('.popupSelectCollection');

    const popupEvent = (event) => {
      if (
        event.target.closest('.selectCollection-frame-img')
      ) {
        router.go({
          path: '/',
          props: '/',
        }, { pushState: false, refresh: false });

      } else if (event.target.closest('.selectCollection-frame-list-item')) {
        const dataSection = event.target.getAttribute('data-section');

        get({
          url: urls.basket,
          query: { collection_id: dataSection },
        }).then((response) => {
          if (response["status"] === responseStatuses.success) {
            filmSelectionPage.render(response["body"]);
            return response;
          } else {
            return errorInputs.ServerError;
          }
        });
      }
    };

    popup?.addEventListener('click', popupEvent);
  }
}
