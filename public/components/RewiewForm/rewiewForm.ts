import { Component } from '@components/component';
import * as templateRewiewForm from '@components/RewiewForm/rewiewForm.hbs';

/**
 * Класс рендеринга формы заполенения отзыва
 * @class RewiewForm
 * @typedef {RewiewForm}
 */
export class RewiewForm extends Component {
  /**
   * Метод рендеринга элемента
   * @return {string} html форма заполенения отзыва
   */
  render () {
    return templateRewiewForm();
  }
}
