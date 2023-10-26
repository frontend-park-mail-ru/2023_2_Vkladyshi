import { Component } from '@components/component';
// @ts-ignore
const templateFooter = require('./footer.hbs');

/**
 * Класс создания нижней панели
 * @class Footer
 * @typedef {Footer}
 */
export class Footer extends Component {
  /**
   * Конструктор для формирования родительского элемента
   * @class
   */
  constructor(ROOT) {
    super(ROOT);
  }

  /**
   * Метод для рендеринга HTML кода
   * @return {string} html нижней панели
   */
  render() {
    return templateFooter();
  }
}
