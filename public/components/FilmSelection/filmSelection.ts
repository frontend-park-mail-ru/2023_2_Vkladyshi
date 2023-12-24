import { Component } from '@components/component';
import * as templateFilmSelection from '@components/FilmSelection/filmSelection.hbs';

/**
 * Класс рендеринга формирования подборки фильмов
 * @class FilmSelection
 * @typedef {FilmSelection}
 */
export class FilmSelection extends Component {
  /**
   * Метод рендеринга элемента
   * @param response
   * @param collection_name
   * @returns {string}
   */
  render(response, collection_name = 'Результат поиска') {
    const result = {
      collection_name: collection_name,
      haveFilms: true,
    };
    if (response?.films?.length === 0) {
      result.haveFilms = false;
    }

    return templateFilmSelection(result);
  }
}
