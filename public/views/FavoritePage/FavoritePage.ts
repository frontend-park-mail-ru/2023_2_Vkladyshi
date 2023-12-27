import { View } from '@views/view';
import { ROOT } from '@utils/config';
import { favoriteList } from '@components/FavoriteList/favoriteList';
import { store } from '@store/store';
import {
  actionFavoriteActors,
  actionFavoriteFilms,
  actionRemoveFavoriteActor,
  actionRemoveFavoriteFilm,
} from '@store/action/actionTemplates';
import { FilmCard } from '@components/filmCard/filmCard';
import { router } from '@router/router';
import { ActorCard } from '@components/ActorCard/actorCard';
import { addActive, removeActive } from '@utils/std';
import { Modal } from '@components/Modal/modal';
import { inputButton } from '@components/inputButton/inputButton';
import { buttonSubmit } from '@components/ButtonSubmit/buttonSubmit';
import { DirectoryFilms } from '@components/DirectoryFilms/directoryFilms';

export interface FavoritePage {
  state: {
    pageNumber: number;
    perPage: number;
    modal: Modal;
  };
}

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
  constructor(ROOT) {
    super(ROOT);

    this.state = {
      pageNumber: 1,
      perPage: 20,
      modal: new Modal(ROOT),
    };

    store.subscribe('favoriteFilms', this.subscribeFavoriteFilms.bind(this));
    store.subscribe('favoriteActors', this.subscribeFavoriteActor.bind(this));
  }

  /**
   * Метод создания страницы
   */
  render() {
    this.renderDefaultPage({});
    const contentBlockHTML = document.querySelector(
      '.content-block'
    ) as HTMLElement;
    contentBlockHTML.style.display = 'flex';

    if (window.location.pathname === '/watchlist/films') {
      contentBlockHTML?.insertAdjacentHTML(
        'beforeend',
        favoriteList.render({
          title: 'Список фильмов',
          redirect: 'Любимые актёры',
        })
      );

      const body = document.querySelector('.favorite__body');

      store
        .dispatch(
          actionFavoriteFilms({
            page: this.state.pageNumber++,
            per_page: this.state.perPage,
          })
        )
        .then(() => {
          this.componentDidMount();
        });
      return;
    }

    contentBlockHTML?.insertAdjacentHTML(
      'beforeend',
      favoriteList.render({
        title: 'Список актёров',
        redirect: 'Любимые фильмы',
      })
    );
    store
      .dispatch(
        actionFavoriteActors({
          page: this.state.pageNumber++,
          per_page: this.state.perPage,
        })
      )
      .then(() => {
        this.componentDidMount();
      });
  }

  /**
   * Метод обработки нажатий
   * @param isFilms проверка что рендерим фильмы
   */
  componentDidMount() {
    if (this.isFilm) {
      addActive(document.querySelector('.create-direction'));
    } else {
      removeActive(document.querySelector('.create-direction'));
    }

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

          const elementsWithDataSetion = document.querySelectorAll(
            '.actor-selection_actor '
          );
          const elementsFilms = document.querySelectorAll(
            '.film-selection_film'
          );

          if (
            elementsWithDataSetion.length === 0 &&
            elementsFilms.length === 0
          ) {
            const body = document.querySelector('.favorite__body');
            body!.innerHTML = '<div>Ваш список пуст</div>';
            removeActive(document.querySelector('.more-elements'));
          }

          break;
        case event.target.closest('.film-selection_film') !== null:
          this.componentWillUnmount();
          router.go(
            {
              path: '/film',
              props: `/${filmId}`,
            },
            { pushState: true, refresh: false }
          );
          break;
        case event.target.closest('.redirect-to-favorite') !== null:
          this.componentWillUnmount();
          if (this.isFilm) {
            router.go(
              {
                path: '/watchlist/actors',
                props: ``,
              },
              { pushState: true, refresh: false }
            );
          } else {
            router.go(
              {
                path: '/watchlist/films',
                props: ``,
              },
              { pushState: true, refresh: false }
            );
          }
          break;
        case event.target.closest('.more-elements') !== null:
          if (this.isFilm) {
            store.dispatch(
              actionFavoriteFilms({
                page: this.state.pageNumber++,
                per_page: this.state.perPage,
              })
            );
          } else {
            store.dispatch(
              actionFavoriteActors({
                page: this.state.pageNumber++,
                per_page: this.state.perPage,
              })
            );
          }
          break;
        case event.target.closest('.actor-selection_actor') !== null:
          this.componentWillUnmount();
          router.go(
            {
              path: '/actor',
              props: `/${actorId}`,
            },
            { pushState: true, refresh: false }
          );
          break;
        default:
          break;
      }
    };

    const favorites = document.querySelector('.favorite');
    // favorites?.removeEventListener('click', popupEvent);
    favorites?.addEventListener('click', popupEvent);
  }

  /**
   * Метод отписок
   */
  componentWillUnmount() {
    const elements = document.querySelector('.favorite');
    elements?.removeEventListener('click', this.popupEvent);

    store.unsubscribe('favoriteFilms', this.subscribeFavoriteFilms.bind(this));
    store.unsubscribe('favoriteActors', this.subscribeFavoriteActor.bind(this));
  }

  /**
   * Метод для обработки ответа с фильмами
   */
  subscribeFavoriteFilms() {
    this.isFilm = true;
    const contentBlockHTML = document.querySelector(
      '.favorite__body'
    ) as HTMLElement;
    const more = document.querySelector('.more-elements');
    const films = store.getState('favoriteFilms')?.body;
    const status = store.getState('favoriteFilms')?.status;

    const body = document.querySelector('.favorite__body');

    if (
      (films?.length === 0 || status === 404) &&
      this.state.pageNumber === 2
    ) {
      body?.insertAdjacentHTML('beforeend', '<div>Ваш список пуст</div>');
      removeActive(document.querySelector('.more-elements'));
      return;
    } else if (status !== 200) {
      body?.insertAdjacentHTML('beforeend', '<div>Ошибка сервера!</div>');
      removeActive(document.querySelector('.more-elements'));
      return;
    }

    let countFilms = 0;
    // eslint-disable-next-line guard-for-in
    for (const film in films) {
      countFilms++;
      const filmCard = new FilmCard(ROOT);
      contentBlockHTML?.insertAdjacentHTML(
        'beforeend',
        filmCard.render({
          film: films[film],
          alreadyFavorite: true,
          haveRating: true,
        })
      );
    }

    if (countFilms >= this.state.perPage) {
      addActive(more);
    } else {
      removeActive(more);
    }
  }

  /**
   * Метод для обработки ответа с актерами
   */
  subscribeFavoriteActor() {
    this.isFilm = false;
    const contentBlockHTML = document.querySelector(
      '.favorite__body'
    ) as HTMLElement;
    // contentBlockHTML!.innerHTML = '';
    const actors = store.getState('favoriteActors')?.body.actors;
    const status = store.getState('favoriteActors')?.status;
    const more = document.querySelector('.more-elements');

    if (
      (actors?.length === 0 || status === 404) &&
      this.state.pageNumber === 2
    ) {
      contentBlockHTML?.insertAdjacentHTML(
        'beforeend',
        '<div>Ваш список пуст</div>'
      );
      removeActive(document.querySelector('.more-elements'));
      return;
    } else if (status !== 200) {
      contentBlockHTML?.insertAdjacentHTML(
        'beforeend',
        '<div>Ошибка сервера!</div>'
      );
      removeActive(document.querySelector('.more-elements'));
      return;
    }

    let countActors = 0;
    // eslint-disable-next-line guard-for-in
    for (const actor in actors) {
      countActors++;
      const actorCard = new ActorCard(ROOT);
      contentBlockHTML?.insertAdjacentHTML(
        'beforeend',
        actorCard.render({ actor: actors[actor], alreadyFavorite: true })
      );
    }

    if (countActors >= this.state.perPage) {
      addActive(more);
    } else {
      removeActive(more);
    }
  }
}
