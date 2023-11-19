import { View } from '@views/view';
import { desc, countLikeFilm, reviewForm, review, info } from '@utils/config';
import { store } from '@store/store';
import {
  actionAddComment,
  actionAuth,
  actionFilm,
  actionGetCommentsFilm
} from '@store/action/actionTemplates';
import { router } from '@router/router';
import { image } from '@components/Image/image';
import { addErrorsActive, insertText } from '@utils/addError';
import { validateReview } from '@utils/validate';

export interface FilmPage {
  state: {
    filmInfo: null;
    fildId: number;
    mapFilms: {};
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
      mapFilms: {}
    };

    this.subscribeActorStatus = this.subscribeActorStatus.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
  }
  /**
   * Метод создания страницы
   * @param props
   */
  render (props) {
    store.subscribe('filmInfo', this.subscribeActorStatus);
    store.subscribe('removeView', this.componentWillUnmount);
    this.renderDefaultPage();

    if (props != null) {
      this.state.fildId = props.replace('/', '');
      store.dispatch(actionFilm({ filmId: props.replace('/', '') }));
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
      const iconsShadow = document.querySelector('.header__container__shadow') as HTMLElement;

      icon!.style.backgroundImage = 'url("' + result.poster + '")';
      icon!.style.backgroundAttachment = 'fixed';
      iconsShadow!.style.backgroundAttachment = 'fixed';

      const containerHTML = document.querySelector('.image-container');
      containerHTML?.insertAdjacentHTML('beforeend', desc.render(result));
    }

    this.addEvents();
  }

  addEvents () {
    const popup = document.querySelector('.main-container');
    const popupEvent = (event) => {
      this.popupEvent = popupEvent;
      switch (true) {
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
        // case event.target.closest('.about-film') !== null:
        //   this.redirectToAbout();
        //   break;
        case event.target.closest('.review-button') !== null:
          this.redirectToComments();
          break;
        default:
          break;
      }
    };

    popup?.addEventListener('click', popupEvent);
  }

  redirectToComments () {
    router.go(
      {
        path: '/comments',
        props: `/${this.state.fildId}`
      },
      { pushState: true, refresh: false }
    );
  }

  redirectToAbout () {
    const commentsBlock = document.querySelector('.additional-info__review');
    const infoHTML = document.querySelector('.additional-info');

    if (commentsBlock) {
      commentsBlock!.innerHTML = '';
    }

    const divElement = document.querySelector(
      '.additional-info__content.table__row__text'
    ) as HTMLDivElement;
    divElement.style.display = 'block';
  }

  componentWillUnmount () {
    store.unsubscribe('removeView', this.componentWillUnmount);
    store.unsubscribe('filmInfo', this.subscribeActorStatus);

    const popup = document.querySelector('.film-selection');
    popup?.removeEventListener('click', this.popupEvent);
  }

  subscribeActorStatus () {
    this.state.filmInfo = store.getState('filmInfo');
    store.unsubscribe('filmInfo', this.subscribeActorStatus);

    this.componentDidMount();
  }
}
