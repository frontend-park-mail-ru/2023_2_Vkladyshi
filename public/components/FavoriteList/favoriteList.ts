import { Component } from '@components/component';
import * as templateFavoriteList from '@components/FavoriteList/favoriteList.hbs';
import { ROOT } from '@utils/config';
class FavoriteList extends Component {
  /**
   * Метод рендеринга элемента
   * @param result
   */
  render (result) {
    return templateFavoriteList(result);
  }
}

export const favoriteList = new FavoriteList(ROOT);
