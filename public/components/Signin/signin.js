import { Component } from '../component.js';
import templateSignin from './signin.hbs';

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
    return templateSignin();
  }
}
