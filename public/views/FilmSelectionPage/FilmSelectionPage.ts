/* eslint-disable require-jsdoc */
import { View } from '@views/view';
import { store } from '@store/store';
import { ROOT } from '@utils/config';
import {
  actionAddFavoriteActor,
  actionAddFavoriteFilm,
  actionCollectionMain, actionSearchActor, actionSearchFilm
} from '@store/action/actionTemplates';
import { router } from '@router/router';
import { FilmSelection } from '@components/FilmSelection/filmSelection';
import { FilmCard } from '@components/filmCard/filmCard';
import { ActorCard } from '@components/ActorCard/actorCard';

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

    if (
      window.location.pathname === '/films/' ||
        window.location.pathname === '/films' ||
        window.location.pathname === '/'
    ) {
      if (window.location.pathname === '/') {
        await store.dispatch(actionCollectionMain({ collection_id: 0 }));
        buf = store.getState('collectionMain');
      } else {
        const url = new URL(window.location.href);

        const searchParams = url.searchParams;

        const title = searchParams.get('title');
        const dateFrom = searchParams.get('date_from');
        const dateTo = searchParams.get('date_to');
        const ratingFrom = searchParams.get('rating_from');
        const ratingTo = searchParams.get('rating_to');
        const mpaa = searchParams.get('mpaa');
        const genre = searchParams.get('genre');
        const actors = searchParams.get('actors');
        // console.log(title, dateFrom, dateTo, ratingFrom, ratingTo, mpaa, genre?.split(',').map(Number), actors?.split(','));

        await store.dispatch(
          actionSearchFilm({
            title: <string>title,
            dateFrom: <string>dateFrom,
            dateTo: <string>dateTo,
            ratingFrom: Number(ratingFrom),
            ratingTo: Number(ratingTo),
            mpaa: mpaa,
            genre: genre ? genre.split(',').map(Number) : [],
            actors: actors?.split(',')
          })
        );

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
      for (const film in buf.body.films) {
        const filmCard = new FilmCard(ROOT);
        contentBlock?.insertAdjacentHTML(
          'beforeend',
          filmCard.render({
            film: buf.body.films[film],
            alreadyFavorite: false
          })
        );
      }

      this.componentDidMount(true);
    } else {
      this.renderDefaultPage();

      const url = new URL(window.location.href);

      const searchParams = url.searchParams;

      const name = searchParams.get('name');
      const amplua = searchParams.get('amplua');
      const country = searchParams.get('country');
      const birthday = searchParams.get('birthday');
      const films = searchParams.get('films');

      await store.dispatch(
        actionSearchActor({
          name: <string>name,
          amplua: amplua ? amplua?.split(',') : [''],
          county: <string>country,
          birthday: <string>birthday,
          films: films ? films?.split(',') : ['']
        })
      );

      const actors = store.getState('resultSearchActor');
      const contentBlockHTML = document.querySelector('.content-block');

      const filmSelect = new FilmSelection(ROOT);

      contentBlockHTML?.insertAdjacentHTML(
        'beforeend',
        filmSelect.render(actors)
      );

      // const actors = store.getState('resultSearchActor')?.body.actors;
      const contentBlock = document.querySelector('.film-selection_films');

      // eslint-disable-next-line guard-for-in
      for (const actor in actors) {
        const actorCard = new ActorCard(ROOT);
        contentBlock?.insertAdjacentHTML(
          'beforeend',
          actorCard.render({ actor: actors[actor], alreadyFavorite: false })
        );
      }
      this.componentDidMount(false);
    }
  }

  renderByElement (HTMLElement) {
    return store
      .dispatch(actionCollectionMain({ collection_id: 0 }))
      .then((response) => {
        // const filmSelect = new FilmSelection(ROOT);
        const buf = store.getState('collectionMain');
          console.log(buf,44)
        // if (buf === undefined || buf === null || buf.body === undefined) {
        //   return;
        // }



        const contentBlockHTML = document.querySelector('.similar-movies');

        const filmSelect = new FilmSelection(ROOT);

        contentBlockHTML?.insertAdjacentHTML(
            'beforeend',
            filmSelect.render(buf.body)
        );

        const contentBlock = document.querySelector('.film-selection_films');

        // eslint-disable-next-line guard-for-in
        for (const film in buf.body.films) {
          const filmCard = new FilmCard(ROOT);
          contentBlock?.insertAdjacentHTML(
              'beforeend',
              filmCard.render({
                film: buf.body.films[film],
                alreadyFavorite: false
              })
          );
        }

        this.componentDidMount(true);


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
              // this.subscribeSearchActors();
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
    // store.unsubscribe('resultSearchFilm', this.subscribeSearchFilms.bind(this));
    // router.go(
    //     {
    //       path: `/films`,
    //       props: `/${this.state.dataSection}`,
    //     },
    //     { pushState: true, refresh: false }
    // );
  }

  subscribeSearchActors () {
    // store.unsubscribe(
    //     'resultSearchActor',
    //     this.subscribeSearchActors.bind(this)
    // );
    // router.go(
    //     {
    //       path: `/actors`,
    //       props: `/${this.state.dataSection}`,
    //     },
    //     { pushState: true, refresh: false }
    // );
  }
}
