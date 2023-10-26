import { Component } from '@components/component';
// @ts-ignore
const templateContentBlock = require('./contentBlock.hbs');
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
  constructor(ROOT) {
    super(ROOT);
  }

  /**
   * Метод рендеринга элемента
   * @return {string} html авторизации
   */
  render() {
    return templateContentBlock();
  }
}
