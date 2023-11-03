import { Component } from '@components/component';
import * as templateAdditionalInfo from '@components/AdditionalInfo/additionalInfo.hbs';

/**
 * Класс рендеринга авторизации
 * @class AddInfo
 * @typedef {AddInfo}
 */
export class AddInfo extends Component {
  /**
   * Метод рендеринга элемента
   * @param result
   * @returns {string} html авторизации
   */
  render (result) {
    return templateAdditionalInfo(result);
  }
}
