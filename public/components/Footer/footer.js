import { Component } from '../component.js';

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
  constructor() {
    super();
  }

  /**
   * Метод для рендеринга HTML кода
   * @return {string} html нижней панели
   */
  render() {
    return Handlebars.templates['footer.hbs']();
  }
}
