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
   * @returns {string}
   * @param film.film
   * @param film.alreadyFavorite
   * @param film
   */
  render ({ film, alreadyFavorite }) {
    const result = {
      id: film.film.id,
      title: film.title,
      poster: film.poster,
      rating: film.rating.toFixed(1),
      alreadyFavorite: alreadyFavorite
    };

    return templateFilmCard(result);
  }
}
