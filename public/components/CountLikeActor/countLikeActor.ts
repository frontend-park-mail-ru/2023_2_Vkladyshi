import { Component } from '@components/component';
import * as templateLikeStar from '@components/CountLikeActor/countLikeActor.hbs';

/**
 * Класс рендеринга авторизации
 * @class CountLikeActor
 * @typedef {CountLikeActor}
 */
export class CountLikeActor extends Component {
  /**
   * Метод рендеринга элемента
   * @param result
   * @returns {string} html авторизации
   */
  render (result) {
    return templateLikeStar(result);
  }
}
