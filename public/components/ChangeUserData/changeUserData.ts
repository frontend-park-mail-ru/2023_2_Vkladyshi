import { Component } from '@components/component';
import * as templatechangeUserData from '@components/ChangeUserData/changeUserData.hbs';

/**
 * Класс рендеринга форм изменения данных пользователя
 * @class ChangeUserData
 * @typedef {ChangeUserData}
 */
export class ChangeUserData extends Component {
  /**
   * Метод рендеринга элемента
   * @param result
   * @returns {string} html элемента блока изменения данных
   */
  render(result) {
    return templatechangeUserData();
  }
}
