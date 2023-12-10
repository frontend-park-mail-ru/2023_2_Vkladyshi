/* eslint-disable require-jsdoc */
import { View } from '@views/view';
import { store } from '@store/store';
import { ROOT } from '@utils/config';
import {
  actionAddFavoriteActor,
  actionAddFavoriteFilm,
  actionCollectionMain
} from '@store/action/actionTemplates';
import { router } from '@router/router';
import { FilmSelection } from '@components/FilmSelection/filmSelection';
import { FilmCard } from '@components/filmCard/filmCard';
import { ActorCard } from '@components/ActorCard/actorCard';

const actors1 = [
  {
    actor_id: 1,
    actor_name: 'Джейсон Стэйтем',
    actor_photo: '/icons/star.png'
  },
  { actor_id: 2, actor_name: 'Фифти Сент', actor_photo: '/icons/star.png' },
  { actor_id: 3, actor_name: 'Меган Фокс', actor_photo: '/icons/star.png' },
  {
    actor_id: 4,
    actor_name: 'Сильвестр Сталлоне',
    actor_photo: '/icons/star.png'
  }
];

export interface FilmSelectionPage {
  state: {
    dataSection: string;
  };
}

/**
 * Класс формирования подборки фильмов
 * @class FilmSelectionPage
 * @typedef {FilmSelectionPage}
 */

export class FilmSelectionPage extends View {
  private popupEvent: (event) => void;

  constructor (ROOT) {
    super(ROOT);
    this.state = {
      dataSection: ''
    };

    store.subscribe('resultSearchFilm', this.subscribeSearchFilms.bind(this));
    store.subscribe('resultSearchActor', this.subscribeSearchActors.bind(this));
  }

  /**
   * Метод рендеринга элемента
   * @param isMain
   */
  async render (isMain = false) {
    let buf;

    if (isMain === false) {
      return;
    }

    if (
      window.location.pathname === '/films/' ||
      window.location.pathname === '/films' ||
      window.location.pathname === '/'
    ) {
      if (window.location.pathname === '/') {
        await store.dispatch(actionCollectionMain({ collection_id: 0 }));
        buf = store.getState('collectionMain');
      } else {
        buf = store.getState('resultSearchFilm');
        if (buf === undefined || buf === null || buf.body === undefined) {
          return;
        }
        this.renderDefaultPage();
      }

      if (buf === undefined || buf === null || buf.body === undefined) {
        return;
      }

      const contentBlockHTML = document.querySelector('.content-block');

      const filmSelect = new FilmSelection(ROOT);

      contentBlockHTML?.insertAdjacentHTML(
        'beforeend',
        filmSelect.render(buf.body)
      );

      const contentBlock = document.querySelector('.film-selection_films');

      // eslint-disable-next-line guard-for-in
      for (const film in buf.body) {
        const filmCard = new FilmCard(ROOT);
        contentBlock?.insertAdjacentHTML(
          'beforeend',
          filmCard.render({
            film: buf.body[film],
            alreadyFavorite: false
          })
        );
      }

      this.componentDidMount(true);
    } else {
      this.renderDefaultPage();
      const contentBlockHTML = document.querySelector('.content-block');

      const filmSelect = new FilmSelection(ROOT);

      contentBlockHTML?.insertAdjacentHTML(
        'beforeend',
        filmSelect.render(actors1)
      );

      // const actors = store.getState('resultSearchActor')?.body.actors;
      const contentBlock = document.querySelector('.film-selection_films');

      // eslint-disable-next-line guard-for-in
      for (const actor in actors1) {
        const actorCard = new ActorCard(ROOT);
        contentBlock?.insertAdjacentHTML(
          'beforeend',
          actorCard.render({ actor: actors1[actor], alreadyFavorite: false })
        );
      }
      this.componentDidMount(false);
    }
  }

  returnTemplate (collectionId) {
    return store
      .dispatch(actionCollectionMain({ collection_id: collectionId }))
      .then((response) => {
        const filmSelect = new FilmSelection(ROOT);
        return filmSelect.render(store.getState('collectionMain')?.body.films);
      });
  }

  componentDidMount (isFilms) {
    const popup = document.querySelector('.film-selection_films');
    const popupEvent = (event) => {
      this.popupEvent = popupEvent;
      const filmId = event.target
        .closest('.film-selection_film')
        ?.getAttribute('data-section');
      const actorId = event.target
        .closest('.actor-selection_actor')
        ?.getAttribute('data-section');

      switch (true) {
        case event.target.closest('.image-watchlist') !== null:
          if (store.getState('auth').status === 200) {
            if (isFilms) {
              store.dispatch(actionAddFavoriteFilm({ film_id: filmId }));
            } else {
              store.dispatch(actionAddFavoriteActor({ actor_id: actorId }));
              this.subscribeSearchActors();
            }
          } else {
            router.go(
              {
                path: '/login',
                props: ``
              },
              { pushState: true, refresh: false }
            );
          }
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
          this.componentWillUnmount();
          if (isFilms) {
            router.go(
              {
                path: '/watchlist/actors',
                props: ``
              },
              { pushState: true, refresh: false }
            );
          } else {
            router.go(
              {
                path: '/watchlist/films',
                props: ``
              },
              { pushState: true, refresh: false }
            );
          }
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

    popup?.removeEventListener('click', popupEvent);
    popup?.addEventListener('click', popupEvent);
  }

  componentWillUnmount () {
    const popup = document.querySelector('.film-selection_films');
    popup?.removeEventListener('click', this.popupEvent);
  }

  subscribeSearchFilms () {
    store.unsubscribe('resultSearchFilm', this.subscribeSearchFilms.bind(this));
    router.go(
      {
        path: `/films`,
        props: `/${this.state.dataSection}`
      },
      { pushState: true, refresh: false }
    );
  }

  subscribeSearchActors () {
    store.unsubscribe(
      'resultSearchActor',
      this.subscribeSearchActors.bind(this)
    ); // props: `/${this.state.dataSection}`
    router.go(
      {
        path: `/actors`,
        props: `/${this.state.dataSection}`
      },
      { pushState: true, refresh: false }
    );
  }
}
