import { Component } from '@components/component';
import * as templateAdminPanel from '@components/AdminPanel/adminPanel.hbs';

/**
 * Класс рендеринга панели админа
 * @class AdminPanel
 * @typedef {AdminPanel}
 */
export class AdminPanel extends Component {
  /**
   * Метод рендеринга элемента
   * @param result
   * @return {string} html авторизации
   */
  render() {
    return templateAdminPanel();
  }
}
