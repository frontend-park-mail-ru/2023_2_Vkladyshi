import { get } from '../../utils/ajax.js';
import { errorInputs, responseStatuses, urls } from '../../utils/config.js';
import { Component } from '../component.js';
import templateDescription from './filmSelection.hbs';

/**
 * Класс рендеринга формирования подборки фильмов
 * @class FilmSelection
 * @typedef {FilmSelection}
 */
export class FilmSelection extends Component {
  /**
   * Конструктор, заполняющий класс
   * @class
   */
  constructor() {
    super();
  }

  /**
   * Метод рендеринга элемента
   * @returns {string} html авторизации
   */
  async render() {
    return await get({
      url: urls.basket,
      query: { collection_id: 'new' },
    }).then(async (response) => {
      if (response.data.status === responseStatuses.success) {
        const haveFilms = this.checkFilms(
          Object.keys(response.data.body.films)
        );
        const templateData = Object.assign({}, response.data.body, {
          haveFilms: haveFilms,
        });
        return templateFilmSelection(templateData);
      } else {
        return errorInputs.ServerError;
      }
    });
  }

  /**
   * Метод рендеринга элемента
   * @param object объект JSON
   * @return {string} html авторизации
   */
  renderTemplate(object) {
    const haveFilms = this.checkFilms(Object.keys(object.films));
    const templateData = Object.assign({}, object, { haveFilms: haveFilms });
    return templateFilmSelection(templateData);
  }

  /**
   * Проверка на наличие фильмов
   * @param {list} films список фильмов
   * @return {boolean} результат наличия фильмов в списке
   */
  checkFilms(films) {
    return films.length > 0;
  }
}
