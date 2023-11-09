import { View } from '@views/view';
import { desc, info, countLikeFilm, reviewForm, review } from '@utils/config';
import { store } from '@store/store';
import {
  actionAddComment,
  actionAuth,
  actionFilm,
  actionGetCommentsFilm,
  actionGetCommentsUser
} from '@store/action/actionTemplates';
import { router } from '@router/router';
import { response } from 'express';

export interface FilmPage {
  state: {
    filmInfo: null;
    fildId: number;
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
      fildId: 0
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
    store.dispatch(actionAuth());

    this.renderDefaultPage();

    if (props != null) {
      store.dispatch(actionFilm({ filmId: props.replace('/', '') }));
    }
    // this.componentDidMount();
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
        country,
        date,
        title,
        // eslint-disable-next-line camelcase
        infoText: info,
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

    this.addEvents();
  }

  addEvents () {
    const popup = document.querySelector('.contentBlock');
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
        case event.target.closest('.about-film') !== null:
          this.redirectToAbout();
          break;
        case event.target.closest('.comments-film') !== null:
          this.redirectToComments();
          break;
        default:
          break;
      }
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

      const divElement = document.querySelector(
        '.additional-info__content.table__row__text'
      ) as HTMLDivElement;
      divElement.style.display = 'none';

      infoHTML?.appendChild(comments);

      // @ts-ignore
      store
        .dispatch(
          actionGetCommentsFilm({
            film_id: this.state.fildId,
            page: 1,
            per_page: 10
          })
        )
        .then((response) => {
          const result = store.getState('filmCommentsStatus').body.comment;

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

          if (
            !document.querySelector('.review-form') &&
            store.getState('statusAuth') === 200
          ) {
            div2?.insertAdjacentHTML(
              'beforeend',
              reviewForm.render({ login: true })
            );

            const Event = (event) => {
              event.preventDefault();
              const selectHTML = document.querySelector('.rating__form');
              const textHTML = document.querySelector(
                '.review-form__body__text'
              );

              // @ts-ignore
              const select = parseInt(selectHTML.value);
              // @ts-ignore
              const text = textHTML.value;

              store.dispatch(
                actionAddComment({
                  film_id: this.state.fildId,
                  rating: select,
                  text: text
                })
              );
            };
            const review = document.querySelector('.review-form');
            review?.addEventListener('submit', Event);
          } else if (store.getState('statusAuth') !== 200) {
            div2?.insertAdjacentHTML(
              'beforeend',
              reviewForm.render({ login: false })
            );

            div2.addEventListener('click', (event) => {
              router.go(
                { path: '/login', props: `` },
                { pushState: true, refresh: false }
              );
            });
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
