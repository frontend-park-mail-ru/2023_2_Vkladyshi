import { Component } from '@components/component';
import * as templateFilmRating from '@components/FilmRating/filmRating.hbs';

/**
 * Класс рендеринга авторизации
 * @class FilmRating
 * @typedef {FilmRating}
 */
export class FilmRating extends Component {
  /**
   * Метод рендеринга элемента
   * @param result
   * @returns {string} html авторизации
   */
  render (result) {
    return templateFilmRating(result);
  }
}
