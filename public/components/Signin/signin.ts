import { Component } from '@components/component';
// @ts-ignore
const templateSignin = require('./signin.hbs');

/**
 * Класс рендеринга авторизации
 * @class Signin
 * @typedef {Signin}
 */
export class Signin extends Component {
  /**
   * Конструктор класса
   */
  constructor(ROOT) {
    super(ROOT);
  }

  /**
   * Метод рендеринга элемента
   * @return {string} html авторизации
   */
  render() {
    return templateSignin();
  }
}
