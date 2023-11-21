import { Component } from '@components/component';
import * as templateFavoriteFilms from '@components/FavoriteFilms/favoriteFilms.hbs';
import { ROOT } from '@utils/config';
class FavoriteFilms extends Component {
  /**
   * Метод рендеринга элемента
   * @param result
   */
  render (result) {
    return templateFavoriteFilms(result);
  }
}

export const favoriteFilms = new FavoriteFilms(ROOT);
