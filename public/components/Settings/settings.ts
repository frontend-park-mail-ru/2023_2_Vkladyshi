import { Component } from '@components/component';
import * as templateSettings from '@components/Settings/settings.hbs';
import { ROOT } from '@utils/config';

/**
 * Класс рендеринга авторизации
 * @class Settings
 * @typedef {Settings}
 */
export class Settings extends Component {
  /**
   * Метод рендеринга элемента
   * @param result
   * @return {string} html авторизации
   */
  render (result) {
    return templateSettings(result);
  }
}

export const settings = new Settings(ROOT);
