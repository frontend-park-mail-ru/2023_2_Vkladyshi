import { Component } from '@components/component';
import * as templateSignup from '@components/Signup/signup.hbs';

export interface Signup {
  state: {
    statusSignup: number;
    isSubscribed: boolean;
    isUserSubscriber: boolean;
    login: string;
    password: string;
  };
}

/**
 * Класс рендеринга регистрации пользователя
 * @class Signup
 * @typedef {Signup}
 */
export class Signup extends Component {
  /**
   * Метод рендеринга элемента
   * @return {string} html авторизации
   */
  render () {
    return templateSignup();
  }
}
