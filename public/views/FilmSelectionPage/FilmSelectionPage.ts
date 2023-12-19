import { View } from '@views/view';
import { store } from '@store/store';
import { ROOT } from '@utils/config';
import {
  actionAddFavoriteActor,
  actionAddFavoriteFilm,
  actionCollectionMain, actionFavoriteActors,
  actionFavoriteFilms,
  actionRemoveFavoriteActor,
  actionRemoveFavoriteFilm,
  actionSearchActor,
  actionSearchFilm

} from '@store/action/actionTemplates';
import { router } from '@router/router';
import { FilmSelection } from '@components/FilmSelection/filmSelection';
import { FilmCard } from '@components/filmCard/filmCard';
import { ActorCard } from '@components/ActorCard/actorCard';
import { Slider } from '@components/Slider/slider';

export interface FilmSelectionPage {
  state: {
    dataSection: string;
    current: string;
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
      dataSection: '',
      current: 'none'
    };

    // store.subscribe('resultSearchFilm', this.subscribeSearchFilms.bind(this));
    // store.subscribe('collectionMain', this.addFilmToMain.bind(this));
    // store.subscribe('resultSearchActor', this.subscribeSearchActors.bind(this));
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
        store.subscribe('collectionMain', this.addFilmToMain.bind(this));
        store.dispatch(actionCollectionMain({ collection_id: 0 }));
        // buf = store.getState('collectionMain');
      } else {
        store.subscribe('resultSearchFilm', this.subscribeSearchFilms.bind(this));
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

        if (!navigator.onLine) {
          this.Offline();
          return;
        }

        store.dispatch(
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

        if (!navigator.onLine) {
          console.error('offline');
          this.Offline();
        }
      }
    } else {
      store.subscribe('resultSearchActor', this.subscribeSearchActors1.bind(this));
      this.renderDefaultPage({});

      const url = new URL(window.location.href);

      const searchParams = url.searchParams;

      const name = searchParams.get('name');
      const amplua = searchParams.get('amplua');
      const country = searchParams.get('country');
      const birthday = searchParams.get('birthday');
      const films = searchParams.get('films');

      if (!navigator.onLine) {
        this.Offline();
        return;
      }

      store.dispatch(
        actionSearchActor({
          name: <string>name,
          amplua: amplua ? amplua?.split(',') : [''],
          county: <string>country,
          birthday: <string>birthday,
          films: films ? films?.split(',') : ['']
        })
      );
    }
  }

  async renderEqualFilms() {
    // await store.dispatch(actionCollectionMain({collection_id: 0}));/
    const genre = store.getState('filmInfo')?.genre;

    // const idArray = genre.map(elem => elem.id);
    await store.dispatch(
        actionSearchFilm({
          title: '',
          dateFrom: '',
          dateTo: '',
          ratingFrom: 0,
          ratingTo: 10,
          mpaa: '',
          genre: genre ? genre.map(elem => elem.genre_id) : [],
          actors: ['']
        })
    );

    //slider-equal

    const buf = store.getState('resultSearchFilm');
    const sliderLiner = document.querySelector('.slider-container');

    if (buf?.body?.films?.length === 0 || buf?.status !== 200) {
      const slider = document.querySelector('.slider-equal');
      slider?.remove();
      return;
    }

    for (const film in buf.body.films) {
      const filmCard = new FilmCard(ROOT);
      sliderLiner?.insertAdjacentHTML(
          'beforeend',
          filmCard.render({
            film: buf.body.films[film],
            alreadyFavorite: false
          })
      );

      filmCard.addEvent(buf.body.films[film].id);
    }
  }

  renderByElement () {
    this.renderEqualFilms();
  }

  componentDidMount (isFilms) {
    let popup;
    if (this.state.current === 'film') {
      popup = document.querySelector('.film-selection_films');
    } else if (this.state.current === 'main') {
      popup = document.querySelector('.slider-container');
    } else {
      popup = document.querySelector('.film-selection_films');
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
        case event.target.closest('.image-watchlist') !== null:
          let active = true;
          let element;
          if (isFilms) {
            element = document.querySelector(`[data-section="${filmId}"]`);
          } else {
            element = document.querySelector(`[data-section="${actorId}"]`);
          }

          const orange = element?.querySelector('.red-watchlist') as HTMLElement;
          const red = element?.querySelector('.orange-watchlist') as HTMLElement;
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
            if (isFilms) {
              if (active) {
                store.dispatch(actionAddFavoriteFilm({ film_id: filmId }));
              } else {
                store.dispatch(actionRemoveFavoriteFilm({ film_id: filmId }));
              }
            } else {
              if (active) {
                store.dispatch(actionAddFavoriteActor({ actor_id: actorId }));
              } else {
                store.dispatch(actionRemoveFavoriteActor({ actor_id: actorId }));
              }
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
    this.addFilmToPage();
  }

  subscribeSearchActors1 () {
    this.addActorsToPage();
  }

  addActorsToPage () {
    store.unsubscribe('resultSearchActor', this.subscribeSearchActors1.bind(this));
    store.subscribe('favoriteActors', this.getFavoriteActorsList.bind(this));
    this.state.current = 'actor';
    store.dispatch(actionFavoriteActors({ page: 1, per_page: 20 }));
    const actors = store.getState('resultSearchActor')?.body?.actors;
    const contentBlockHTML = document.querySelector('.content-block');
    const filmSelect = new FilmSelection(ROOT);

    const selection = document.querySelector('.film-selection');

    if (selection) {
      selection.remove();
    }

    contentBlockHTML?.insertAdjacentHTML(
      'beforeend',
      filmSelect.render(actors)

    );

    // const actors = store.getState('resultSearchActor')?.body.actors;
    const contentBlock = document.querySelector('.film-selection_films');

    if (actors?.length === 0 || store.getState('resultSearchActor')?.status === 404) {
      contentBlock?.insertAdjacentHTML('beforeend', '<p>Ничего не найдено</p><img class="image404-ui" src="/icons/404image.svg">');
      return;
    } else if (store.getState('resultSearchActor')?.status !== 200) {
      contentBlock?.insertAdjacentHTML('beforeend', '<div>Ошибка сервера!</div>');
      return;
    }

    // eslint-disable-next-line guard-for-in
    for (const actor in actors) {
      const actorCard = new ActorCard(ROOT);
      contentBlock?.insertAdjacentHTML(
        'beforeend',
        actorCard.render({ actor: actors[actor], alreadyFavorite: false })
      );
    }
    // console.log(document.querySelector('.film-selection_films'))
    this.componentDidMount(false);
  }
  addFilmToPage () {
    store.unsubscribe('resultSearchFilm', this.subscribeSearchFilms.bind(this));
    store.subscribe('favoriteFilms', this.getFavoriteFilmsList.bind(this));
    this.state.current = 'film';
    store.dispatch(actionFavoriteFilms({ page: 1, per_page: 20 }));
    const buf = store.getState('resultSearchFilm');
    if (buf === undefined || buf === null || buf.body === undefined) {
      return;
    }
    this.renderDefaultPage({});

    const contentBlockHTML = document.querySelector('.content-block');

    const filmSelect = new FilmSelection(ROOT);

    contentBlockHTML?.insertAdjacentHTML(
      'beforeend',
      filmSelect.render(buf.body)
    );

    const contentBlock = document.querySelector('.film-selection_films');
    if (buf?.body?.films?.length === 0 || buf?.status === 404) {
      contentBlock?.insertAdjacentHTML('beforeend', '<p>Ничего не найдено</p><img class="image404-ui" src="/icons/404image.svg">');
      return;
    } else if (buf?.status !== 200) {
      contentBlock?.insertAdjacentHTML('beforeend', '<div>Ошибка сервера!</div>');
      return;
    }

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
  }

  getFavoriteFilmsList () {
    const favoriteFilms = store.getState('favoriteFilms');
    store.unsubscribe('favoriteFilms', this.getFavoriteFilmsList.bind(this));
    if (favoriteFilms?.status !== 200) {
      return;
    }
    const array = favoriteFilms?.body;
    array?.forEach((key) => {
      const film = document.querySelector(`[data-section="${key?.id}"]`);
      if (film) {
        const orange = film?.querySelector('.red-watchlist') as HTMLElement;
        const red = film?.querySelector('.orange-watchlist') as HTMLElement;
        red.classList.remove('active');
        red.classList.add('noactive');
        orange.classList.remove('noactive');
        orange.classList.add('active');
      }
    });
  }

  getFavoriteActorsList () {
    const favoriteActors = store.getState('favoriteActors');
    store.unsubscribe('favoriteActors', this.getFavoriteActorsList.bind(this));
    if (favoriteActors?.status !== 200) {
      return;
    }
    const array = favoriteActors?.body?.actors;
    array?.forEach((key) => {
      const film = document.querySelector(`[data-section="${key?.actor_id}"]`);
      if (film) {
        const orange = film?.querySelector('.red-watchlist') as HTMLElement;
        const red = film?.querySelector('.orange-watchlist') as HTMLElement;
        red.classList.remove('active');
        red.classList.add('noactive');
        orange.classList.remove('noactive');
        orange.classList.add('active');
      }
    });
  }

  addFilmToMain () {
    store.unsubscribe('collectionMain', this.addFilmToMain.bind(this));
    this.state.current = 'main';
    store.subscribe('favoriteFilms', this.getFavoriteFilmsList.bind(this));
    store.dispatch(actionFavoriteFilms({ page: 1, per_page: 20 }));
    const buf = store.getState('collectionMain');

    if (buf === undefined || buf === null || buf.body === undefined) {
      return;
    }

    const sliderNew = new Slider();
    sliderNew.addEventsLine();
    const sliderLiner = document.querySelector('.slider-container');
    const sliderNAme = document.querySelector('.slider-name');

    const filmSelect = new FilmSelection(ROOT);

    sliderNAme?.insertAdjacentHTML(
      'beforeend',
      filmSelect.render(buf.body)
    );

    // eslint-disable-next-line guard-for-in
    for (const film in buf.body.films) {
      const filmCard = new FilmCard(ROOT);
      sliderLiner?.insertAdjacentHTML(
        'beforeend',
        filmCard.render({
          film: buf.body.films[film],
          alreadyFavorite: false,
          haveRating: true
        })
      );
    }

    const divName = document.querySelector('.film-selection_name') as HTMLElement;
    const divFilm = document.querySelector('.film-selection_films');
    if (divName) {
      divName!.textContent = 'Новинки';
      // divName.style.marginTop = '40px';
    }
    divFilm?.remove();

    this.componentDidMount(true);
  }

  Offline () {
    this.renderDefaultPage({});
    const contentBlockHTML = document.querySelector('.content-block');

    const filmSelect = new FilmSelection(ROOT);

    contentBlockHTML?.insertAdjacentHTML(
      'beforeend',
      filmSelect.render('')
    );

    const contentBlock = document.querySelector('.film-selection_films');
    contentBlock?.insertAdjacentHTML('beforeend', '<div>Отсутствует интернет</div>');
  }
}
