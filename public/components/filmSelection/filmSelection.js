import { get } from '../../modules/ajax.js';
import { responseStatuses, urls } from '../../modules/config.js';

/**
 * Класс формирования подборки фильмов
 * @class FilmSelection
 * @typedef {FilmSelection}
 */
export class FilmSelection {
  /**
   * Родительский элемент в который добаляеться шаблон
   * @type {object}
   */
  #parent;

  /**
   * Коструктор, заполняющий класс
   * @class
   * @param {object} parent - указатель на родителя в DOM дереве
   */
  constructor(parent) {
    this.#parent = parent;
  }

  /**
   * Метод рендера элемента
   */
  render() {
    get({
      url: urls.basket,
      query: { collection_id: 'new' },
    }).then((response) => {
      if (response.status === responseStatuses.success) {
        const template = Handlebars.templates['filmSelection.hbs'];
        console.log(response);
        this.#parent.innerHTML = template(response.data.body);
      } else {
        console.log(response.status);
      }
    });
  }
}
