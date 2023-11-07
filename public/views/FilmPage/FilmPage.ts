import { View } from '@views/view';
import {desc, info, footer, countLikeFilm, reviewForm, review} from '@utils/config';
import { store } from '@store/store';
import {
  actionFilm,
  actionGetCommentsUser
} from '@store/action/actionTemplates';
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
      contentBlockHTML?.insertAdjacentHTML(
        'beforeend',
        countLikeFilm.render(result)
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

    if (!document.querySelector('.comments__block')) {
      const comments = document.createElement('div');
      comments.className = 'comments__block';

      const div1 = document.createElement('div');
      div1.className = 'comments__all';

      const div2 = document.createElement('div');
      div2.className = 'input__form';

      comments.appendChild(div1);
      comments.appendChild(div2);

      const divElement = document.querySelector('.additional-info__content.table__row__text') as HTMLDivElement;
      divElement.style.display = 'none';

      infoHTML?.appendChild(comments);

      store.dispatch(actionGetCommentsUser({ page: 1, per_page: 5 })).then(response => {
        const result = store.getState('userCommentsStatus').body;

        result.forEach((res) => {
          const table = {
            user: true,
            film_id: res['film_id'],
            film_name: res['film_name'],
            rating: res['rating'],
            text: res['text']
          };

          div1?.insertAdjacentHTML('beforeend', review.render(table));
        });

        if (!document.querySelector('.reviewForm')) {
          div2?.insertAdjacentHTML('beforeend', reviewForm.render());
        }
      });
    }
  }

  redirectToAbout () {
    const commentsBlock = document.querySelector('.comments__block');
    const infoHTML = document.querySelector('.contentBlock');

    if (commentsBlock) {
      infoHTML?.removeChild(commentsBlock);
    }

    const divElement = document.querySelector('.additional-info__content.table__row__text') as HTMLDivElement;
    divElement.style.display = 'block';
  }

  componentWillUnmount () {
    store.unsubscribe('removeView', this.componentWillUnmount);
    store.unsubscribe('filmInfo', this.subscribeActorStatus);
    const popup = document.querySelector('.filmSelection');
    popup?.addEventListener('click', this.popupEvent);
  }

  subscribeActorStatus () {
    this.state.filmInfo = store.getState('filmInfo');
    store.unsubscribe('filmInfo', this.subscribeActorStatus);
    this.componentDidMount();
  }
}
