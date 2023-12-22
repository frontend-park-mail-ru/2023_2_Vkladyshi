import { Component } from '@components/component';
import * as templateAddFilm from '@components/AddFilm/addFilm.hbs';
import { ROOT } from '@utils/config';

/**
 * Класс рендеринга создания фильма
 * @class AddFilm
 * @typedef {AddFilm}
 */
export class AddFilm extends Component {
  /**
   * Метод рендеринга элемента
   * @param result
   * @return {string} html авторизации
   */
  render() {
    return templateAddFilm();
  }
}

export const addFilm = new AddFilm(ROOT);
