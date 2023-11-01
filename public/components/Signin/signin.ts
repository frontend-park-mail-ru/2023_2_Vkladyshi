import { Component } from '@components/component';
import * as templateSignin from '@components/Signin/signin.hbs';

/**
 * Класс рендеринга авторизации
 * @class Signin
 * @typedef {Signin}
 */
export class Signin extends Component {
  /**
   * Метод рендеринга элемента
   * @return {string} html авторизации
   */
  render () {
    return templateSignin();
  }
}
