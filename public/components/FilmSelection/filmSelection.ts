import { Component } from '@components/component';
import * as templateFilmSelection from '@components/FilmSelection/filmSelection.hbs';
import { collections, ROOT } from '@utils/config';

/**
 * Класс рендеринга формирования подборки фильмов
 * @class FilmSelection
 * @typedef {FilmSelection}
 */
export class FilmSelection extends Component {
  /**
   * Метод рендеринга элемента
   * @param response
   * @return {string}
   */
  render(response) {
    const result = {
      collection_name: 'Результат поиска',
      haveFilms: true,
    };

    if (response?.length === 0 || response?.length === undefined) {
      result.haveFilms = false;
    }

    return templateFilmSelection(result);
  }
}

const getKeyByValue = (value) => {
  const collectionItems = collections.collection_items;
  for (const item of collectionItems) {
    if (item.value === value) {
      return item.key;
    }
  }
  return null;
};
