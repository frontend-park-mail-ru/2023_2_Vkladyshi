import { Component } from '../component.js';

/**
 * Класс рендеринга авторизации
 * @class Signin
 * @typedef {Signin}
 */
export class Signin extends Component {
  /**
   * Конструктор класса
   */
  constructor() {
    super();
  }

  /**
   * Метод рендеринга элемента
   * @return {string} html авторизации
   */
  render() {
    return Handlebars.templates['signin.hbs']();
  }
}
