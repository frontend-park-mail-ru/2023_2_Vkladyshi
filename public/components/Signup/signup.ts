import { Component } from '@components/component';
const templateSignup = require('./signup.hbs');

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
  constructor(ROOT) {
    super(ROOT);
  }

  /**
   * Метод рендеринга элемента
   * @return {string} html авторизации
   */
  render() {
    return templateSignup();
  }
}
