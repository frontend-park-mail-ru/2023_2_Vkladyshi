import { Component } from '@components/component';
import * as templateDescriptionFilm from '@components/Description/description.hbs';

/**
 * Класс рендеринга авторизации
 * @class Description
 * @typedef {Description}
 */
export class Description extends Component {
  /**
   * Метод рендеринга элемента
   * @param result
   * @returns {string} html авторизации
   */
  render (result) {
    return templateDescriptionFilm(result);
  }
}
