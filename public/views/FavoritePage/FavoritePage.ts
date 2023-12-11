import { View } from '@views/view';
import { ROOT } from '@utils/config';
import { favoriteList } from '@components/FavoriteList/favoriteList';
import { store } from '@store/store';
import {
  actionFavoriteActors,
  actionFavoriteFilms,
  actionRemoveFavoriteActor,
  actionRemoveFavoriteFilm
} from '@store/action/actionTemplates';
import { FilmCard } from '@components/filmCard/filmCard';
import { router } from '@router/router';
import { ActorCard } from '@components/ActorCard/actorCard';

/**
 * Класс формирования окна сохранённых подборок фильмов и актёров
 * @class FavoritePage
 * @typedef {FavoritePage}
 */
export class FavoritePage extends View {
  private popupEvent: (event) => void;
  private isFilm = true;
  /**
   * Конструктор для формирования родительского элемента
   * @param ROOT
   * @class
   */
  constructor (ROOT) {
    super(ROOT);

    store.subscribe('favoriteFilms', this.subscribeFavoriteFilms.bind(this));
    store.subscribe('favoriteActors', this.subscribeFavoriteActor.bind(this));
  }

  /**
   * Метод создания страницы
   */
  render () {
    this.renderDefaultPage();
    const contentBlockHTML = document.querySelector(
      '.content-block'
    ) as HTMLElement;
    contentBlockHTML.style.display = 'flex';

    if (window.location.pathname === '/watchlist/films') {
      contentBlockHTML?.insertAdjacentHTML(
        'beforeend',
        favoriteList.render({
          title: 'Список фильмов',
          redirect: 'Любимые акторы'
        })
      );
      store
        .dispatch(actionFavoriteFilms({ page: 1, per_page: 20 }))
        .then(() => {
          this.componentDidMount();
        });
      return;
    }

    contentBlockHTML?.insertAdjacentHTML(
      'beforeend',
      favoriteList.render({
        title: 'Список актёров',
        redirect: 'Любимые фильмы'
      })
    );
    store.dispatch(actionFavoriteActors({ page: 1, per_page: 20 })).then(() => {
      this.componentDidMount();
    });
  }

  /**
   * Метод обработки нажатий
   * @param isFilms проверка что рендерим фильмы
   */
  componentDidMount () {
    const popupEvent = (event) => {
      this.popupEvent = popupEvent;
      const filmId = event.target
        .closest('.film-selection_film')
        ?.getAttribute('data-section');
      const actorId = event.target
        .closest('.actor-selection_actor')
        ?.getAttribute('data-section');

      switch (true) {
        case event.target.closest('.image-cancel') !== null:
          let id;

          if (this.isFilm) {
            id = filmId;
            store.dispatch(actionRemoveFavoriteFilm({ film_id: filmId }));
          } else {
            id = actorId;
            store.dispatch(actionRemoveFavoriteActor({ actor_id: actorId }));
          }

          const element = document.querySelector(`[data-section="${id}"]`);
          element?.remove();
          break;
        case event.target.closest('.film-selection_film') !== null:
          this.componentWillUnmount();
          router.go(
            {
              path: '/film',
              props: `/${filmId}`
            },
            { pushState: true, refresh: false }
          );
          break;
        case event.target.closest('.redirect-to-favorite') !== null:
          // this.componentWillUnmount();
          // if (this.isFilm) {
          //   router.go(
          //     {
          //       path: '/watchlist/actors',
          //       props: ``
          //     },
          //     { pushState: true, refresh: false }
          //   );
          // } else {
          //   router.go(
          //     {
          //       path: '/watchlist/films',
          //       props: ``
          //     },
          //     { pushState: true, refresh: false }
          //   );
          // }
          break;
        case event.target.closest('.actor-selection_actor') !== null:
          this.componentWillUnmount();
          router.go(
            {
              path: '/actor',
              props: `/${actorId}`
            },
            { pushState: true, refresh: false }
          );
          break;
        default:
          break;
      }
    };

    const elements = document.querySelector('.favorite');
    elements?.removeEventListener('click', popupEvent);
    elements?.addEventListener('click', popupEvent);
  }

  /**
   * Метод отписок
   */
  componentWillUnmount () {
    const elements = document.querySelector('.favorite');
    elements?.removeEventListener('click', this.popupEvent);
  }

  /**
   * Метод для обработки ответа с фильмами
   */
  subscribeFavoriteFilms () {
    const contentBlockHTML = document.querySelector(
      '.favorite__body'
    ) as HTMLElement;
    contentBlockHTML!.innerHTML = '';
    const films = store.getState('favoriteFilms')?.body;

    // eslint-disable-next-line guard-for-in
    for (const film in films) {
      const filmCard = new FilmCard(ROOT);
      contentBlockHTML?.insertAdjacentHTML(
        'beforeend',
        filmCard.render({ film: films[film], alreadyFavorite: true })
      );
    }
    this.isFilm = true;
    // this.componentDidMount();
  }

  /**
   * Метод для обработки ответа с актерами
   */
  subscribeFavoriteActor () {
    const contentBlockHTML = document.querySelector(
      '.favorite__body'
    ) as HTMLElement;
    contentBlockHTML!.innerHTML = '';
    const actors = store.getState('favoriteActors')?.body.actors;

    // eslint-disable-next-line guard-for-in
    for (const actor in actors) {
      const actorCard = new ActorCard(ROOT);
      contentBlockHTML?.insertAdjacentHTML(
        'beforeend',
        actorCard.render({ actor: actors[actor], alreadyFavorite: true })
      );
    }
    this.isFilm = false;
    // this.componentDidMount();
  }
}
