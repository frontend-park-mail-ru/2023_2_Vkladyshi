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
   * @return {string}
   */
  render (response) {
    const result = {
      collection_name: 'Результат поиска',
      haveFilms: true
    };
    if (response?.films?.length === 0) {
      result.haveFilms = false;
    }

    return templateFilmSelection(result);
  }
}
