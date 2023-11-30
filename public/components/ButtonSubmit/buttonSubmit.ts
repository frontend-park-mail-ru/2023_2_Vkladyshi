import { Component } from '@components/component';
import * as templateButtonSubmit from '@components/ButtonSubmit/buttonSubmit.hbs';
import { ROOT } from '@utils/config';

/**
 * Класс создания инпута
 * @class ButtonSubmit
 * @typedef {ButtonSubmit}
 */
class ButtonSubmit extends Component {
  /**
   * Метод для рендеринга HTML кода
   * @param info
   * @return {string} html нижней панели
   */
  render (info) {
    return templateButtonSubmit(info);
  }
}
export const buttonSubmit = new ButtonSubmit(ROOT);
