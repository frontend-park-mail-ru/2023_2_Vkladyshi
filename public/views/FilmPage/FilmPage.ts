import { View } from '@views/view';
import { collections, ROOT } from '@utils/config';
import { store } from '@store/store';
import {
  actionAddFavoriteFilm,
  actionAuth,
  actionFavoriteFilms,
  actionFilm,
  actionGetCommentsFilm,
  actionRemoveComment,
  actionRemoveFavoriteFilm
} from '@store/action/actionTemplates';
import { router } from '@router/router';
import { image } from '@components/Image/image';
import { Review } from '@components/Review/review';
import { ReviewForm } from '@components/ReviewForm/reviewForm';
import { Description } from '@components/Description/description';
import { Slider } from '@components/Slider/slider';
import { FilmSelectionPage } from '@views/FilmSelectionPage/FilmSelectionPage';
import { Component } from '@components/component';

export interface FilmPage {
  state: {
    filmInfo: null;
    components: Component[];
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
      components: [],
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
    store.subscribe('logoutStatus', this.subscribeLogoutFilmPage.bind(this));

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
        country: country || 'Неизвестно',
        date: date || 'Неизвестно',
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

      const genre = document.querySelector('.param-list__right__row-genre');
      const collectionGenreItems = result.genre;
      for (let i = 0; i < collectionGenreItems.length && i < 4; i++) {
        const item = collectionGenreItems[i];
        genre?.insertAdjacentHTML(
          'beforeend',
          `<div class="film-page__genre" >${item.title}</div>`
        );
      }

      const sliderFilms = new Slider(ROOT);
      this.state.components.push(sliderFilms);
      const filmSelection = new FilmSelectionPage(ROOT);

      filmSelection.renderByElement().then(() => {
        sliderFilms.addLine();
      });
    }

    this.addEvents();
  }

  insertComments () {
    const mainHTML = document.querySelector(
      '.film-page__comments'
    ) as HTMLElement;
    const reviewForm = new ReviewForm(ROOT);
    const auth = store.getState('auth');

    if (auth.status === 200) {
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
        text: res['text'],
        userId: res['id_user']
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

    if (
      store.getState('auth')?.role === undefined &&
      store.getState('auth')?.status === 200
    ) {
      store.subscribe('auth', this.subscribeDeleteComment.bind(this));
      store.dispatch(actionAuth());
    }

    reviewForm.event(this.state.fildId);
  }

  addEvents () {
    const popup = document.querySelector('.main-container');
    const popupEvent = (event) => {
      this.popupEvent = popupEvent;
      switch (true) {
        case event.target.closest('.image-watchlist.main-film-card') !== null:
          let active = true;
          const element = document.querySelector(`.video-content`);
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

          if (active) {
            store.dispatch(
              actionAddFavoriteFilm({ film_id: this.state.fildId })
            );
          } else {
            store.dispatch(
              actionRemoveFavoriteFilm({ film_id: this.state.fildId })
            );
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
        case event.target.closest('.trailer') !== null: // @ts-ignore
          const text = '<iframe width="560" height="315" src="https://www.youtube.com/embed/v6TjKMQisn0?si=w2g6vm-zuRRXeHK2" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'// @ts-ignore
          // const text = `<iframe width="720" height="480" src="${this.state?.filmInfo['film']?.trailer_href}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
          // const text = '<iframe width="560" height="315" src="https://www.youtube.com/embed/-dYy1Ack60A?si=TrjGLPM0scGTDFkG" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
          popup?.insertAdjacentHTML('afterbegin', `<div class="trailer-video">${text}</div>`);
          // @ts-ignore
          document.querySelector('body')?.style.overflow = 'hidden';
          break;
        case event.target.closest('.trailer-video') !== null:
          document.querySelector('.trailer-video')?.remove();
          // @ts-ignore
          document.querySelector('body')?.style.overflow = 'auto';
          break;
        case event.target.closest('.cinema') !== null:
          // @ts-ignore
          window.location.href = `https://www.imdb.com/find/?q=${this.state?.filmInfo['film']?.title}`;
          break;
        case event.target.closest('.image-cancel') !== null:
          if (store.getState('auth').status === 200) {
            store.dispatch(
              actionRemoveComment({
                film_id: this.state.fildId,
                user_id: Number(
                  event.target.closest('.comment')?.getAttribute('data-section')
                ),
                deleteFromServiceFilms: true
              })
            );
            store.dispatch(
              actionRemoveComment({
                film_id: this.state.fildId,
                user_id: Number(
                  event.target.closest('.comment')?.getAttribute('data-section')
                ),
                deleteFromServiceFilms: false
              })
            );
            event.target.closest('.comment')?.remove();
          }
          break;
        default:
          break;
      }
    };

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
    store.unsubscribe('logoutStatus', this.subscribeLogoutFilmPage.bind(this));
    store.unsubscribe(
      'filmCommentsStatus',
      this.subscribeCommentsStatrus.bind(this)
    );

    this.state.components.forEach((elem) => {
      elem?.componentWillUnmount();
    });

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
        const orange = document?.querySelector(
          '.orange-watchlist'
        ) as HTMLElement;
        orange?.classList.remove('active');
        orange?.classList.add('noactive');
        red?.classList.remove('noactive');
        red?.classList.add('active');
      }
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

  subscribeDeleteComment () {
    store.unsubscribe('auth', this.subscribeDeleteComment.bind(this));
    const auth = store.getState('auth');

    if (
      auth?.status === 200 &&
      (auth?.body.role === 'super' || auth?.body.role === 'moderator')
    ) {
      const removes = document.querySelectorAll(
        '.comment-header__left__comment-remove'
      );
      removes?.forEach((elem) => {
        elem.classList.remove('noactive');
      });
    }
  }

  subscribeLogoutFilmPage () {
    store.unsubscribe('logoutStatus', this.subscribeLogoutFilmPage.bind(this));

    const removes = document.querySelectorAll(
      '.comment-header__left__comment-remove'
    );
    removes?.forEach((elem) => {
      elem.classList.add('noactive');
    });
  }
}
