import { Component } from '@components/component';
import * as templateUserDataForm from '@components/UserDataForm/userDataForm.hbs';

/**
 * Класс рендеринга форм изменения данных пользователя
 * @class UserDataForm
 * @typedef {UserDataForm}
 */
export class UserDataForm extends Component {
  /**
   * Метод рендеринга элемента
   * @param result
   * @returns {string} html элемента блока изменения данных
   */
  render (result) {
    return templateUserDataForm(result);
  }
}
