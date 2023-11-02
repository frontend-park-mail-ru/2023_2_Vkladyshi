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
    return templateFilmSelection(response);
  }
}
