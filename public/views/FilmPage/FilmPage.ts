import { View } from '@views/view';
import { desc, info, footer, countLikeFilm, reviewForm } from '@utils/config';
import { store } from '@store/store';
import { actionFilm, actionGetCommentsUser } from '@store/action/actionTemplates';
import { router } from '@router/router';
import { response } from 'express';

export interface FilmPage {
  state: {
    filmInfo: null;
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
      filmInfo: null
    };

    this.subscribeActorStatus = this.subscribeActorStatus.bind(this);

    store.subscribe('filmInfo', this.subscribeActorStatus);
  }
  /**
   * Метод создания страницы
   * @param props
   */
  render (props) {
    this.renderDefaultPage();

    console.log(props, 1212121);

    if (props != null) {
      store.dispatch(actionFilm({ filmId: props.replace('/', '') }));
    }
    this.componentDidMount();
  }

  componentDidMount () {
    const contentBlockHTML = document.querySelector('.contentBlock');

    if (contentBlockHTML != null) {
      contentBlockHTML!.innerHTML = '';
    }

    let result;

    if (this.state.filmInfo) {
      const { actors, rating, number, genre, film } = this.state.filmInfo;
      // eslint-disable-next-line camelcase
      const { poster, title, country, release_date, info_text } = film;

      const fullDate = new Date(release_date);
      const date = fullDate.getFullYear().toString();

      result = {
        film: true,
        body: this.state.filmInfo,
        genre,
        actors,
        poster,
        country,
        date,
        title,
        // eslint-disable-next-line camelcase
        infoText: info_text,
        header: 'О фильме',
        headerAbout: 'Описание',
        headerComment: 'Отзывы',
        isHeader: true,
        stars_burning: [true, true, true, false, false],
        mark: rating,
        mark_number: number
      };
    }

    if (contentBlockHTML != null) {
      contentBlockHTML?.insertAdjacentHTML('beforeend', desc.render(result));
      contentBlockHTML?.insertAdjacentHTML('beforeend', countLikeFilm.render(result)
      );
      contentBlockHTML?.insertAdjacentHTML('beforeend', info.render(result));
    }

    const popup = document.querySelector('.contentBlock');
    const popupEvent = (event) => {
      this.popupEvent = popupEvent;
      switch (true) {
        case event.target.closest('.table__actor__text') !== null:
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
        case event.target.closest('.about-film') !== null:
          this.redirectToAbout();
          break;
        case event.target.closest('.comments-film') !== null:
          this.redirectToComments();
          break;
        default:
          break;
      }

      this.componentWillUnmount();
    };
    popup?.addEventListener('click', popupEvent);
  }

  redirectToComments () {
    const infoHTML = document.querySelector('.contentBlock');
    const comments = document.createElement('div');
    comments.className = 'popupSign';

    infoHTML?.appendChild(comments);


    store.dispatch(actionGetCommentsUser({ page: 1, per_page: 5 }));

    if (!document.querySelector('.reviewForm')) {
      infoHTML?.insertAdjacentHTML('beforeend', reviewForm.render());
    }
  }

  redirectToAbout () {
    const infoHTML = document.querySelector('.additional-info__content.table__row__text');
    infoHTML!.innerHTML = '';
  }

  componentWillUnmount () {
    const popup = document.querySelector('.filmSelection');

    popup?.addEventListener('click', this.popupEvent);
  }

  subscribeActorStatus () {
    this.state.filmInfo = store.getState('filmInfo');
    store.unsubscribe('filmInfo', this.subscribeActorStatus);
    this.componentDidMount();
  }
}
