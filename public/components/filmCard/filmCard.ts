import { Component } from '@components/component';
import * as templateFilmCard from '@components/filmCard/filmCard.hbs';

/**
 * Класс рендеринга формирования подборки фильмов
 * @class FilmCard
 * @typedef {FilmCard}
 */
export class FilmCard extends Component {
  con;
  /**
   * Метод рендеринга элемента
   * @param response
   * @return {string}
   */
  render(response) {
    const film = response.films.film1;
    const result = {
      // eslint-disable-next-line camelcase
      // collection_name: name,
      id: film.film_id,
      title: film.title,
      poster: film.poster,
      rating: film.rating,
    };

    return templateFilmCard(result);
  }
}
