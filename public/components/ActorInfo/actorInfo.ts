import { Component } from '@components/component';
import * as templateActorInfo from '@components/ActorInfo/actorInfo.hbs';
import { ROOT } from '@utils/config';

/**
 * Класс рендеринга авторизации
 * @class ActorInfo
 * @typedef {ActorInfo}
 */
export class ActorInfo extends Component {
  /**
   * Метод рендеринга элемента
   * @param result
   * @returns {string} html авторизации
   */
  render (result) {
    return templateActorInfo(result);
  }
}

export const actorInfo = new ActorInfo(ROOT);
