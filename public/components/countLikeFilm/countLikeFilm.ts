import { Component } from '@components/component';
import * as templateСountLikeFilm from '@components/countLikeFilm/countLikeFilm.hbs';

/**
 * Класс рендеринга элемента оценки фильма
 * @class СountLikeFilm
 * @typedef {СountLikeFilm}
 */
export class СountLikeFilm extends Component {
  /**
   * Метод рендеринга элемента
   * @param result
   * @returns {string} html элемента оценки фильма
   */
  render (result) {
    return templateСountLikeFilm(result);
  }
}
