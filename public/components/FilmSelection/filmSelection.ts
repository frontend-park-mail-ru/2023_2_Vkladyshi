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

    if (response.films.length === 0) {
      return templateFilmSelection({ haveFilms: false });
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
