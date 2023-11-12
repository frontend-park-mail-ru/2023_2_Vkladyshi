import { Component } from '@components/component';
import * as templateFilmSelection from '@components/FilmSelection/filmSelection.hbs';
import { collections } from '@utils/config';

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
  render (response) {
    const buf = response.collection_name;
    let name;

    name = getKeyByValue(parseFloat(response.collection_name));

    if (name === null) {
      name = 'Новинки';
    }

    const result = {
      // eslint-disable-next-line camelcase
      collection_name: name,
      films: response.films,
      haveFilms: response.haveFilms
    };

    return templateFilmSelection(result);
  }
}

const getKeyByValue = (value) => {
  const collectionItems = collections.collections.collection1.collection_items;
  for (const item of collectionItems) {
    if (item.value === value) {
      return item.key;
    }
  }
  return null;
};
