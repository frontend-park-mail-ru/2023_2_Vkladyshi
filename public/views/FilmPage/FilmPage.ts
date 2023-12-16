/* eslint-disable require-jsdoc */
import { View } from '@views/view';
import { ROOT } from '@utils/config';
import { store } from '@store/store';
import {
  actionAddFavoriteActor,
  actionAddFavoriteFilm, actionFavoriteFilms,
  actionFilm,
  actionGetCommentsFilm, actionRemoveFavoriteActor, actionRemoveFavoriteFilm
} from '@store/action/actionTemplates';
import { router } from '@router/router';
import { image } from '@components/Image/image';
import { Review } from '@components/Review/review';
import { ReviewForm } from '@components/ReviewForm/reviewForm';
import { Description } from '@components/Description/description';
import { Slider } from '@components/Slider/slider';
import { FilmSelectionPage } from '@views/FilmSelectionPage/FilmSelectionPage';

export interface FilmPage {
  state: {
    filmInfo: null;
    fildId: number;
    mapFilms: {};
    rewiewBunch: number;
    commentsInfo: [];
  };
}

export class FilmPage extends View {
  private popupEvent: (event) => void;
  /**
   * Конструктор для формирования родительского элемента
   * @param ROOT
   * @class
   */
  constructor (ROOT) {
    super(ROOT);
    this.state = {
      filmInfo: null,
      fildId: 0,
      commentsInfo: [],
      rewiewBunch: 1,
      mapFilms: {}
    };

    store.subscribe(
      'filmCommentsStatus',
      this.subscribeCommentsStatrus.bind(this)
    );
  }
  /**
   * Метод создания страницы
   * @param props
   */
  render (props) {
    store.subscribe('filmInfo', this.subscribeActorStatus.bind(this));
    store.subscribe('removeView', this.componentWillUnmount.bind(this));
    this.renderDefaultPage({});

    if (props != null) {
      this.state.fildId = props.replace('/', '');
      store.dispatch(actionFilm({ filmId: this.state.fildId })).then(() => {
        store.dispatch(
          actionGetCommentsFilm({
            film_id: this.state.fildId,
            page: this.state.rewiewBunch,
            per_page: 5
          })
        );
      });
    }
  }

  componentDidMount () {
    const contentBlockHTML = document.querySelector(
      '.content-block'
    ) as HTMLElement;

    if (contentBlockHTML != null) {
      contentBlockHTML!.innerHTML = '';
    }

    let result;

    if (this.state.filmInfo) {
      const { actors, rating, number, genre, film } = this.state.filmInfo;
      // eslint-disable-next-line camelcase
      const { poster, title, country, release_date, info } = film;

      // @ts-ignore
      this.state.fildId = film.id;
      const fullDate = new Date(release_date);
      const date = fullDate.getFullYear().toString();

      result = {
        film: true,
        body: this.state.filmInfo,
        genre,
        actors,
        poster,
        country: country || 'Страна неизвестна',
        date: date || 'Год неизвестен',
        title,
        infoText: info,
        header: 'О фильме',
        headerAbout: 'Описание',
        headerComment: 'Отзывы',
        isHeader: true,
        stars_burning: [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false
        ],
        // @ts-ignore
        mark: rating.toFixed(1),
        mark_number: number
      };
    }

    if (contentBlockHTML != null) {
      const mainHTML = document.querySelector('main');
      mainHTML!.innerHTML = '';

      mainHTML?.insertAdjacentHTML('afterbegin', image.render({}));

      const icon = document.querySelector('.image-container') as HTMLElement;
      const iconsShadow = document.querySelector(
        '.header__container__shadow'
      ) as HTMLElement;

      icon!.style.backgroundImage = 'url("' + result.poster + '")';
      icon!.style.backgroundAttachment = 'fixed';
      iconsShadow!.style.backgroundAttachment = 'fixed';

      const containerHTML = document.querySelector('.image-container');
      const description = new Description(ROOT);
      containerHTML?.insertAdjacentHTML(
        'beforeend',
        description.render(result)
      );

      const similarMovies = document.querySelector('.similar-movies');
      const sliderContainer = document.querySelector('.slider-container');

      const sliderFilms = new Slider();
      similarMovies?.insertAdjacentHTML('beforeend', sliderFilms.render());
      sliderFilms.addEventsLine();

      const filmSelection = new FilmSelectionPage(ROOT);

      filmSelection.renderByElement('');
    }

    this.addEvents();
  }

  insertComments () {
    const mainHTML = document.querySelector(
      '.film-page__comments'
    ) as HTMLElement;
    const reviewForm = new ReviewForm(ROOT);

    if (store.getState('auth').status === 200) {
      mainHTML?.insertAdjacentHTML(
        'beforeend',
        reviewForm.render({ login: true })
      );
    }

    const result = this.state.commentsInfo['comment'];

    result.forEach((res) => {
      const table = {
        user: true,
        photo: res['photo'],
        name: res['name'],
        rating: res['rating'],
        text: res['text']
      };

      const result = document.createElement('buf');
      const review = new Review(ROOT);
      result?.insertAdjacentHTML('beforeend', review.render(table));
      const reviewHTML = result?.querySelector('.comment') as HTMLElement;

      switch (true) {
        case table.rating < 4:
          reviewHTML.style.background = 'rgba(255, 229, 229, 0.9)';
          break;
        case table.rating > 6:
          reviewHTML.style.background = 'rgba(189, 230, 189, 0.9)';
          break;
        default:
          reviewHTML.style.background = 'rgba(255, 240, 195, 0.9)';
          break;
      }

      mainHTML?.appendChild(reviewHTML);
    });

    reviewForm.event(this.state.fildId);

    // this.componentDidMount();
  }

  addEvents () {
    const popup = document.querySelector('.main-container');
    const popupEvent = (event) => {
      event.preventDefault();
      this.popupEvent = popupEvent;
      switch (true) {
        case event.target.closest('.image-watchlist') !== null:
          let active = true;
          const element = document.querySelector(`.video-content`);
          // const element = document.querySelector(`[data-section="${this.state.fildId}"]`);
          const orange = element?.querySelector('.red-watchlist') as HTMLElement;
          const red = element?.querySelector('.orange-watchlist') as HTMLElement;
          // console.log(element)
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

          if (active) {
            store.dispatch(actionAddFavoriteFilm({ film_id: this.state.fildId }));
          } else {
            store.dispatch(actionRemoveFavoriteFilm({ film_id: this.state.fildId }));
          }
          break;
        case event.target.closest('.table__actor__text') !== null:
          this.componentWillUnmount();
          const actorId = event.target
            .closest('.table__actor__text')
            .getAttribute('data-section');
          router.go(
            {
              path: '/actor',
              props: `/${actorId}`
            },
            { pushState: true, refresh: false }
          );
          break;
        case event.target.closest('.review-button') !== null:
          this.redirectToComments();
          break;
        default:
          break;
      }
    };
    // const kek = document.querySelector('.similar-movies');

    popup?.addEventListener('click', popupEvent);
  }

  redirectToComments () {
    const status = store.getState('auth').status;
    if (status !== 200) {
      router.go(
        {
          path: '/login',
          props: ``
        },
        { pushState: true, refresh: false }
      );
    } else {
      const element = document.querySelector('.film-page__comments__header');
      element?.scrollIntoView();
    }
  }

  componentWillUnmount () {
    store.unsubscribe('removeView', this.componentWillUnmount.bind(this));
    store.unsubscribe('filmInfo', this.subscribeActorStatus.bind(this));
    store.unsubscribe(
      'filmCommentsStatus',
      this.subscribeCommentsStatrus.bind(this)
    );

    const popup = document.querySelector('.film-selection');
    popup?.removeEventListener('click', this.popupEvent);
  }

  getFavoriteFilmsList () {
    const favoriteFilms = store.getState('favoriteFilms');
    store.unsubscribe('favoriteFilms', this.getFavoriteFilmsList.bind(this));
    if (favoriteFilms?.status !== 200) {
      return;
    }
    const array = favoriteFilms?.body;
    array?.forEach((key) => {
      const film = document.querySelector('.image-watchlist');
      if (film && key?.id === this.state.fildId) {
        const red = document?.querySelector('.red-watchlist') as HTMLElement;
        const orange = document?.querySelector('.orange-watchlist') as HTMLElement;
        orange?.classList.remove('active');
        orange?.classList.add('noactive');
        red?.classList.remove('noactive');
        red?.classList.add('active');
      }
      // console.log(key?.id)
    });
  }

  subscribeActorStatus () {
    this.state.filmInfo = store.getState('filmInfo');
    store.unsubscribe('filmInfo', this.subscribeActorStatus.bind(this));
    store.unsubscribe('removeView', this.componentWillUnmount.bind(this));
    store.subscribe('favoriteFilms', this.getFavoriteFilmsList.bind(this));
    store.dispatch(actionFavoriteFilms({ page: 1, per_page: 20 }));

    this.componentDidMount();
  }

  subscribeCommentsStatrus () {
    const result = store.getState('filmCommentsStatus');
    if (result?.status === 200) {
      store.unsubscribe(
        'filmCommentsStatus',
        this.subscribeCommentsStatrus.bind(this)
      );
      this.state.commentsInfo = result.body;
      this.insertComments();
    }
  }
}
