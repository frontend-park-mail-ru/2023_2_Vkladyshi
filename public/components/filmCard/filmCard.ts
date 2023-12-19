import { Component } from '@components/component';
import * as templateFilmCard from '@components/filmCard/filmCard.hbs';
import { router } from '@router/router';
import { store } from '@store/store';
import {
  actionAddFavoriteActor,
  actionAddFavoriteFilm,
  actionRemoveFavoriteActor,
  actionRemoveFavoriteFilm,
} from '@store/action/actionTemplates';

/**
 * Класс рендеринга формирования подборки фильмов
 * @class FilmCard
 * @typedef {FilmCard}
 */
export class FilmCard extends Component {
  con;
  /**
   * Метод рендеринга элемента
   * @return {string}
   * @param film.film
   * @param film.alreadyFavorite
   * @param film.haveRating
   * @param film
   */
  render({ film, alreadyFavorite, haveRating = false }) {
    const result = {
      id: film.id,
      title: film.title,
      poster: film.poster,
      rating: film.rating === undefined ? 8 : film.rating.toFixed(1),
      alreadyFavorite: alreadyFavorite,
      haveRating: haveRating,
    };

    return templateFilmCard(result);
  }

  addEvent(filmId) {
    const element = document.querySelector(
      `[data-section="${filmId}"].film-selection_film`
    );

    element?.addEventListener('click', (event) => {
      if (!event) {
        return;
      }

      switch (true) {
        case (event?.target as Element | null)?.closest('.image-watchlist') !==
          null:
          let active;
          const orange = element?.querySelector(
            '.red-watchlist'
          ) as HTMLElement;
          const red = element?.querySelector(
            '.orange-watchlist'
          ) as HTMLElement;
          if (element?.querySelector('.orange-watchlist.active')) {
            active = true;
            red.classList.remove('active');
            red.classList.add('noactive');
            orange.classList.remove('noactive');
            orange.classList.add('active');
          } else {
            active = false;
            red.classList.remove('noactive');
            red.classList.add('active');
            orange.classList.remove('active');
            orange.classList.add('noactive');
          }

          if (store.getState('auth').status === 200) {
            store.dispatch(actionAddFavoriteFilm({ film_id: filmId }));
          } else {
            router.go(
              {
                path: '/login',
                props: ``,
              },
              { pushState: true, refresh: false }
            );
          }
          break;
        // @ts-ignore
        case event.target.closest('.film-selection_film') !== null:
          router.go(
            {
              path: '/film',
              props: `/${filmId}`,
            },
            { pushState: true, refresh: false }
          );
          break;
        default:
          break;
      }
    });
  }
}
