import { Component } from '@components/component';
import * as templateDirectoryFilms from '@components/DirectoryFilms/directoryFilms.hbs';

export class DirectoryFilms extends Component {
  /**
   * Метод рендеринга элемента
   * @param result
   * @return {string} html авторизации
   */
  render (result) {
    return templateDirectoryFilms(result);
  }
}
