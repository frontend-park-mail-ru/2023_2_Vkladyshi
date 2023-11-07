import { View } from '@views/view';
import { desc, info, countLikeFilm, reviewForm, review } from '@utils/config';
import { store } from '@store/store';
import {
  actionAddComment,
  actionAuth,
  actionFilm,
  actionGetCommentsFilm
} from '@store/action/actionTemplates';
import { router } from '@router/router';

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
        country: country || 'Неизвестно',
        date: date || 'Неизвестно',
        title,
        // eslint-disable-next-line camelcase
        infoText: info,
        header: 'О фильме',
        headerAbout: 'Описание',
        headerComment: 'Отзывы',
        isHeader: true,
        stars_burning: [true, true, true, false, false],
        // @ts-ignore
        mark: rating.toFixed(1),
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
        case event.target.closest('.about-Image') !== null:
          this.redirectToAbout();
          break;
        case event.target.closest('.comments-Image') !== null:
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
            per_page: 20
          })
        )
        .then((response) => {
          const result = store.getState('filmCommentsStatus').body.comment;

          result.forEach((res) => {
            const table = {
              film: true,
              film_id: res['film_id'],
              name: res['name'],
              rating: res['rating'],
              text: res['text']
            };

            div1?.insertAdjacentHTML('beforeend', review.render(table));
          });

          if (
            !document.querySelector('.reviewForm') &&
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
                '.reviewForm__body__text'
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
              ).then(response => {
                if (response!['body']['status'] === 200) {
                  document.querySelector('.input__form')!.innerHTML = '';
                } else {
                  document.querySelector('.input__form')!.innerHTML = '<h4>Вы уже писали отзыв</h4>';
                }
              });
            };
            const review = document.querySelector('.reviewForm');
            review?.addEventListener('submit', Event);
          } else if (store.getState('statusAuth') !== 200) {
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

    const popup = document.querySelector('.filmSelection');
    popup?.removeEventListener('click', this.popupEvent);
  }

  subscribeActorStatus () {
    this.state.filmInfo = store.getState('filmInfo');
    store.unsubscribe('filmInfo', this.subscribeActorStatus);
    this.componentDidMount();
  }
}
