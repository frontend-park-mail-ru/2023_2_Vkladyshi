import { Component } from '@components/component'
import * as templateLikeStar from '@components/LikeStar/likeStar.hbs'
import { getLikeOfStar } from '@utils/getCollection'

/**
 * Класс рендеринга авторизации
 * @class LikeStar
 * @typedef {LikeStar}
 */
export class LikeStar extends Component {
  /**
   * Метод рендеринга элемента
   * @param result
   * @returns {string} html авторизации
   */
  render (result) {
    return templateLikeStar(result)
  }
}
