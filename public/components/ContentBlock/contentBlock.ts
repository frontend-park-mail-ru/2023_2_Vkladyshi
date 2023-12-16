import { Component } from '@components/component';
import * as templateContentBlock from '@components/ContentBlock/contentBlock.hbs';

/**
 * Класс рейдера формирования подборки фильмов
 * @class FilmSelection
 * @typedef {FilmSelection}
 */
export class ContentBlock extends Component {
  /**
   * Метод рендеринга элемента
   * @return {string} html авторизации
   */
  render () {
    return templateContentBlock();
  }
}
