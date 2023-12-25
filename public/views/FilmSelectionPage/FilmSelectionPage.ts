import { View } from '@views/view';
import { store } from '@store/store';
import { ROOT } from '@utils/config';
import {
  actionAddFavoriteActor,
  actionAddFavoriteFilm,
  actionCollectionMain,
  actionFavoriteActors,
  actionFavoriteFilms,
  actionGetTrends,
  actionRemoveFavoriteActor,
  actionRemoveFavoriteFilm,
  actionSearchActor,
  actionSearchFilm,
} from '@store/action/actionTemplates';
import { router } from '@router/router';
import { FilmSelection } from '@components/FilmSelection/filmSelection';
import { FilmCard } from '@components/filmCard/filmCard';
import { ActorCard } from '@components/ActorCard/actorCard';
import { Slider } from '@components/Slider/slider';
import { addActive, removeActive } from '@utils/std';
import { Component } from '@components/component';

export interface FilmSelectionPage {
  state: {
    dataSection: string;
    current: string;
    pageNumber: number;
    perPage: number;
    components: Component[];
    filmData: {
      title: string;
      dateFrom: string;
      dateTo: string;
      ratingFrom: number;
      ratingTo: number;
      mpaa: string;
      genre: any;
      actors: any;
    };
    actorData: {
      name: string;
      amplua: string;
      country: string;
      birthday: string;
      films: string;
    };
  };
}

/**
 * Класс формирования подборки фильмов
 * @class FilmSelectionPage
 * @typedef {FilmSelectionPage}
 */

export class FilmSelectionPage extends View {
  private popupEvent: (event) => void;

  constructor(ROOT) {
    super(ROOT);
    this.state = {
      dataSection: '',
      components: [],
      current: 'none',
      pageNumber: 1,
      perPage: 20,
      filmData: {
        title: '',
        dateFrom: '',
        dateTo: '',
        ratingFrom: 1,
        ratingTo: 10,
        mpaa: '',
        genre: [],
        actors: [''],
      },
      actorData: {
        name: '',
        amplua: '',
        country: '',
        birthday: '',
        films: '',
      },
    };
  }

  /**
   * Метод рендеринга элемента
   * @param isMain
   */
  async render(isMain = false) {
    if (
      window.location.pathname === '/films/' ||
      window.location.pathname === '/films' ||
      window.location.pathname === '/'
    ) {
      if (window.location.pathname === '/') {
        store.subscribe('collectionMain', this.addFilmToMain.bind(this));
        store.subscribe('getTrends', this.getTrends.bind(this));
        store.dispatch(actionGetTrends());
        store.dispatch(actionCollectionMain({ collection_id: 0 }));
      } else {
        store.subscribe(
          'resultSearchFilm',
          this.subscribeSearchFilms.bind(this)
        );
        this.renderDefaultPage({});
        this.sendDataFilm(
          this.getDataFilmFromQuery(),
          this.state.pageNumber,
          this.state.perPage,
          'film'
        );

        if (!navigator.onLine) {
          this.Offline();
          return;
        }

        if (!navigator.onLine) {
          console.error('offline');
          this.Offline();
        }
      }
    } else {
      store.subscribe(
        'resultSearchActor',
        this.subscribeSearchActors.bind(this)
      );
      this.renderDefaultPage({});
      this.sendDataActor(
        this.getDataActorFromQuery(),
        this.state.pageNumber,
        this.state.perPage,
        'actor'
      );

      if (!navigator.onLine) {
        this.Offline();
      }
    }
  }

  async renderEqualFilms() {
    const genre = store.getState('filmInfo')?.genre;

    await store.dispatch(
      actionSearchFilm({
        title: '',
        dateFrom: '',
        dateTo: '',
        ratingFrom: 1,
        ratingTo: 10,
        mpaa: '',
        genre: genre ? genre.map((elem) => elem.genre_id) : [],
        actors: [''],
        page: this.state.pageNumber,
        per_page: this.state.perPage,
      })
    );

    const buf = store.getState('resultSearchFilm');
    const sliderLiner = document.querySelector('.slider-container');

    if (buf?.body?.films?.length === 0 || buf?.status !== 200) {
      const slider = document.querySelector('.slider-equal');
      slider?.remove();
      return;
    }

    this.addFilmsToPage(sliderLiner, buf.body.films, true);
  }

  async renderByElement() {
    await this.renderEqualFilms();
  }

  componentDidMount(isFilms) {
    const popup = document.querySelector('.content-block');

    const popupEvent = (event) => {
      this.popupEvent = popupEvent;
      const filmId = event.target
        .closest('.film-selection_film')
        ?.getAttribute('data-section');
      const actorId = event.target
        .closest('.actor-selection_actor')
        ?.getAttribute('data-section');

      switch (true) {
        case event.target.closest('.more-elements') !== null:
          console.log('.more-elements');
          if (isFilms) {
            store.subscribe(
              'resultSearchFilm',
              this.subscribeSearchFilms.bind(this)
            );
            this.sendDataFilm(
              this.state.filmData,
              this.state.pageNumber,
              this.state.perPage,
              'film'
            );
          } else {
            store.subscribe(
              'resultSearchActor',
              this.subscribeSearchActors.bind(this)
            );
            this.sendDataActor(
              this.state.actorData,
              this.state.pageNumber,
              this.state.perPage,
              'actor'
            );
          }
          break;
        case event.target.closest('.image-watchlist') !== null:
          let active = false;

          let elements;
          if (isFilms) {
            elements = Array.from(
              document.querySelectorAll(`[data-section="${filmId}"]`)
            );
          } else {
            elements = Array.from(
              document.querySelectorAll(`[data-section="${actorId}"]`)
            );
          }

          const orange = elements.flatMap((elem) =>
            Array.from(elem.querySelectorAll('.red-watchlist'))
          );
          const red = elements.flatMap((elem) =>
            Array.from(elem.querySelectorAll('.orange-watchlist'))
          );

          if (
            elements.some(
              (elem) =>
                elem.querySelectorAll('.orange-watchlist.active').length > 0
            )
          ) {
            active = true;
          }

          red.forEach((red) => {
            red.classList.remove('noactive');
            red.classList.add('active');
          });

          orange.forEach((orange) => {
            orange.classList.remove('active');
            orange.classList.add('noactive');
          });

          if (active) {
            red.forEach((red) => {
              red.classList.remove('active');
              red.classList.add('noactive');
            });
            orange.forEach((orange) => {
              orange.classList.remove('noactive');
              orange.classList.add('active');
            });
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
                store.dispatch(
                  actionRemoveFavoriteActor({ actor_id: actorId })
                );
              }
            }
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
          if (isFilms) {
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

    // popup?.removeEventListener('click', popupEvent);
    popup?.addEventListener('click', popupEvent);
  }

  componentWillUnmount() {
    const popup = document.querySelector('.content-block');
    store.unsubscribe('collectionMain', this.addFilmToMain.bind(this));
    store.unsubscribe('getTrends', this.getTrends.bind(this));
    store.unsubscribe('resultSearchFilm', this.subscribeSearchFilms.bind(this));
    store.unsubscribe(
      'resultSearchActor',
      this.subscribeSearchActors.bind(this)
    );
    store.unsubscribe('favoriteFilms', this.getFavoriteFilmsList.bind(this));
    this.state.components.forEach((elem) => {
      elem?.componentWillUnmount();
    });
    popup?.removeEventListener('click', this.popupEvent);
  }

  subscribeSearchFilms() {
    this.addFilmToPage();
  }

  subscribeSearchActors() {
    this.addActorsToPage();
  }

  addActorsToPage() {
    store.unsubscribe(
      'resultSearchActor',
      this.subscribeSearchActors.bind(this)
    );
    store.subscribe('favoriteActors', this.getFavoriteActorsList.bind(this));
    this.state.current = 'actor';
    this.sendDataActor(
      {},
      this.state.pageNumber,
      this.state.perPage,
      'favorite'
    );
    this.state.pageNumber++;

    const actors = store.getState('resultSearchActor')?.body?.actors;
    const contentBlockHTML = document.querySelector('.content-block');
    const filmSelect = new FilmSelection(ROOT);

    if (!document.querySelector('.film-selection_films')) {
      contentBlockHTML?.insertAdjacentHTML(
        'beforeend',
        filmSelect.render(actors)
      );
    }

    const contentBlock = document.querySelector('.film-selection_films');
    const more = document.querySelector('.more-elements');

    if (
      actors?.length === 0 ||
      store.getState('resultSearchActor')?.status === 404
    ) {
      contentBlock?.insertAdjacentHTML(
        'beforeend',
        '<p>Ничего не найдено</p><img class="image404-ui" src="/icons/404image.svg">'
      );
      return;
    } else if (store.getState('resultSearchActor')?.status !== 200) {
      contentBlock?.insertAdjacentHTML(
        'beforeend',
        '<div>Ошибка сервера!</div>'
      );
      return;
    }

    let countActor = 0;
    // eslint-disable-next-line guard-for-in
    for (const actor in actors) {
      countActor++;
      const actorCard = new ActorCard(ROOT);
      contentBlock?.insertAdjacentHTML(
        'beforeend',
        actorCard.render({ actor: actors[actor], alreadyFavorite: false })
      );
    }

    if (countActor >= this.state.perPage) {
      addActive(more);
    } else {
      removeActive(more);
    }

    if (this.state.pageNumber <= 2) {
      this.componentDidMount(false);
    }
  }
  addFilmToPage() {
    store.unsubscribe('resultSearchFilm', this.subscribeSearchFilms.bind(this));
    store.subscribe('favoriteFilms', this.getFavoriteFilmsList.bind(this));

    this.state.current = 'film';
    this.sendDataFilm(
      {},
      this.state.pageNumber,
      this.state.perPage,
      'favorite'
    );
    this.state.pageNumber++;

    const buf = store.getState('resultSearchFilm');
    if (buf === undefined || buf === null || buf.body === undefined) {
      return;
    }

    const contentBlockHTML = document.querySelector('.content-block');
    const filmSelect = new FilmSelection(ROOT);

    if (!document.querySelector('.film-selection')) {
      contentBlockHTML?.insertAdjacentHTML(
        'beforeend',
        filmSelect.render(buf.body)
      );
    }

    const contentBlock = document.querySelector('.film-selection_films');
    const more = document.querySelector('.more-elements');
    if (buf?.body?.films?.length === 0 || buf?.status === 404) {
      contentBlock?.insertAdjacentHTML(
        'beforeend',
        '<p>Ничего не найдено</p><img class="image404-ui" src="/icons/404image.svg">'
      );
      return;
    } else if (buf?.status !== 200) {
      contentBlock?.insertAdjacentHTML(
        'beforeend',
        '<div>Ошибка сервера!</div>'
      );
      return;
    }

    const countFilms = this.addFilmsToPage(contentBlock, buf.body.films);

    if (countFilms >= this.state.perPage) {
      addActive(more);
    } else {
      removeActive(more);
    }

    console.log('DAAA');
    if (this.state.pageNumber <= 2) {
      this.componentDidMount(true);
    }
  }

  getFavoriteFilmsList() {
    const favoriteFilms = store.getState('favoriteFilms');
    store.unsubscribe('favoriteFilms', this.getFavoriteFilmsList.bind(this));
    if (favoriteFilms?.status !== 200) {
      return;
    }
    const array = favoriteFilms?.body;
    array?.forEach((key) => {
      // const film = document.querySelectorAll(`[data-section="${key?.id}"]`);/
      const elements = Array.from(
        document.querySelectorAll(`[data-section="${key?.id}"]`)
      );
      if (elements.length > 0) {
        // const elements = Array.from(document.querySelectorAll(`[data-section="${key?.id}"]`));
        const orange = elements.flatMap((elem) =>
          Array.from(elem.querySelectorAll('.red-watchlist'))
        );
        const red = elements.flatMap((elem) =>
          Array.from(elem.querySelectorAll('.orange-watchlist'))
        );

        red.forEach((elem) => {
          elem.classList.remove('active');
          elem.classList.add('noactive');
        });
        orange.forEach((elem) => {
          elem.classList.remove('noactive');
          elem.classList.add('active');
        });
      }
    });
  }

  getFavoriteActorsList() {
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

  addFilmsToPage(html, films, addEvent = false) {
    let countFilms = 0;
    // eslint-disable-next-line guard-for-in
    for (const film in films) {
      countFilms++;
      const filmCard = new FilmCard(ROOT);
      html?.insertAdjacentHTML(
        'beforeend',
        filmCard.render({
          film: films[film],
          alreadyFavorite: false,
          haveRating: true,
        })
      );
      if (addEvent) {
        filmCard.addEvent(films[film].id);
      }
    }
    return countFilms;
  }

  addFilmToMain() {
    store.unsubscribe('collectionMain', this.addFilmToMain.bind(this));
    this.state.current = 'main';

    if (store.getState('auth')?.status === 200) {
      store.subscribe('favoriteFilms', this.getFavoriteFilmsList.bind(this));
      this.sendDataFilm(
        {},
        this.state.pageNumber,
        this.state.perPage,
        'favorite'
      );
    }

    const buf = store.getState('collectionMain');
    if (buf === undefined || buf === null || buf.body === undefined) {
      return;
    }

    const sliderNew = new Slider(ROOT);
    this.state.components.push(sliderNew);

    const sliderLiner = document.querySelector('.slider-container');
    const sliderNAme = document.querySelector('.slider-name');
    const filmSelect = new FilmSelection(ROOT);

    sliderNAme?.insertAdjacentHTML('beforeend', filmSelect.render(buf.body));

    this.addFilmsToPage(sliderLiner, buf.body.films);

    const divName = document.querySelector(
      '.film-selection_name'
    ) as HTMLElement;
    const divFilm = document.querySelector('.film-selection_films');
    if (divName) {
      divName!.textContent = 'Новинки';
    }
    divFilm?.remove();

    console.log('add MAin');
    sliderNew.addEventsLine();
    this.componentDidMount(true);
  }

  sendDataFilm(data, page, per_page, mode = 'film') {
    if (mode === 'film') {
      store.dispatch(
        actionSearchFilm({
          title: data.title || '',
          dateFrom: data.dateFrom || '',
          dateTo: data.dateTo || '',
          ratingFrom: data.ratingFrom || 1,
          ratingTo: data.ratingTo || 10,
          mpaa: data.mpaa || '',
          genre: data.genre ? data.genre.split(',').map(Number) : [],
          actors: data.actors?.split(','),
          page: page,
          per_page: per_page,
        })
      );
    } else if (mode === 'favorite') {
      store.dispatch(actionFavoriteFilms({ page: page, per_page: per_page }));
    }
  }

  sendDataActor(data, page, per_page, mode = 'actor') {
    if (mode === 'actor') {
      store.dispatch(
        actionSearchActor({
          name: data.name || '',
          amplua: data.amplua ? data.amplua?.split(',') : [''],
          county: data.country || '',
          birthday: data.birthday || '',
          films: data.films ? data.films?.split(',') : [''],
          page: page,
          per_page: per_page,
        })
      );
    } else if (mode === 'favorite') {
      store.dispatch(actionFavoriteActors({ page: page, per_page: per_page }));
    }
  }

  getDataFilmFromQuery() {
    const url = new URL(window.location.href);

    const searchParams = url.searchParams;

    this.state.filmData.title = <string>searchParams.get('title');
    this.state.filmData.dateFrom = <string>searchParams.get('date_from');
    this.state.filmData.dateTo = <string>searchParams.get('date_to');
    this.state.filmData.ratingFrom = Number(searchParams.get('rating_from'));
    this.state.filmData.ratingTo = Number(searchParams.get('rating_to'));
    this.state.filmData.mpaa = <string>searchParams.get('mpaa');
    this.state.filmData.genre = searchParams.get('genre');
    this.state.filmData.actors = searchParams.get('actors');

    return this.state.filmData;
  }

  getDataActorFromQuery() {
    const url = new URL(window.location.href);

    const searchParams = url.searchParams;

    this.state.actorData.name = <string>searchParams.get('name');
    this.state.actorData.amplua = <string>searchParams.get('amplua');
    this.state.actorData.country = <string>searchParams.get('country');
    this.state.actorData.birthday = <string>searchParams.get('birthday');
    this.state.actorData.films = <string>searchParams.get('films');

    return this.state.actorData;
  }

  getTrends() {
    store.unsubscribe('getTrends', this.getTrends.bind(this));
    this.state.current = 'main';

    const buf = store.getState('getTrends');
    if (buf === undefined || buf === null || buf.body === undefined) {
      return;
    }

    const sliderNew = new Slider(ROOT);
    this.state.components.push(sliderNew);
    document
      .querySelector('.content-block')
      ?.insertAdjacentHTML('beforeend', sliderNew.renderLine());

    const sliderLiner = document.querySelectorAll('.slider-container');
    const sliderName = document.querySelectorAll('.slider-name');
    const filmSelect = new FilmSelection(ROOT);

    sliderName[1]?.insertAdjacentHTML(
      'beforeend',
      filmSelect.render(buf.body, 'В тренде')
    );
    this.addFilmsToPage(sliderLiner[1], buf.body.films);
    sliderNew.addLine();
  }

  Offline() {
    this.renderDefaultPage({});
    const contentBlockHTML = document.querySelector('.content-block');

    const filmSelect = new FilmSelection(ROOT);

    contentBlockHTML?.insertAdjacentHTML('beforeend', filmSelect.render(''));

    const contentBlock = document.querySelector('.film-selection_films');
    contentBlock?.insertAdjacentHTML(
      'beforeend',
      '<div>Отсутствует интернет</div>'
    );
  }
}
