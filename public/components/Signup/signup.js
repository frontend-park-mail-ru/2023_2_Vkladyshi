import { Component } from '../component.js';
import templateSignup from './signup.hbs';

/**
 * Класс рендеринга регистрации пользователя
 * @class Signup
 * @typedef {Signup}
 */
export class Signup extends Component {
  /**
   * Конструктор для формирования родительского элемента
   * @class
   */
  constructor() {
    super();
  }

  /**
   * Метод рендеринга элемента
   * @return {string} html авторизации
   */
  render() {
    return templateSignup();
  }
}
