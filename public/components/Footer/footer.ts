import { Component } from '@components/component';

import * as templateFooter from '@components/Footer/footer.hbs';
/**
 * Класс создания нижней панели
 * @class Footer
 * @typedef {Footer}
 */
export class Footer extends Component {
  /**
   * Метод для рендеринга HTML кода
   * @return {string} html нижней панели
   */
  render () {
    return templateFooter();
  }
}
