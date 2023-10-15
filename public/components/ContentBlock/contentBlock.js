import { Component } from '../component.js';
import templateContentBlock from './contentBlock.hbs';
/**
 * Класс рейдера формирования подборки фильмов
 * @class FilmSelection
 * @typedef {FilmSelection}
 */
export class ContentBlock extends Component {
  /**
   * Конструктор, заполняющий класс
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
    return templateContentBlock();
  }
}
