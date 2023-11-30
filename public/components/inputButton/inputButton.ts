import { Component } from '@components/component';
import * as templateInputButton from '@components/inputButton/inputButton.hbs';
import { ROOT } from '@utils/config';

/**
 * Класс создания инпута
 * @class InputButton
 * @typedef {InputButton}
 */
class InputButton extends Component {
  /**
   * Метод для рендеринга HTML кода
   * @param info
   * @returns {string} html нижней панели
   */
  render (info) {
    return templateInputButton(info);
  }
}
export const inputButton = new InputButton(ROOT);
