/* eslint-disable require-jsdoc */
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
        country,
        date,
        title,
        // eslint-disable-next-line camelcase
        infoText: info,
        header: 'О фильме',
        headerAbout: 'Описание',
        headerComment: 'Отзывы',
        isHeader: true,
        stars_burning: [false, false, false, false, false, false, false, false, false, false],
        mark: rating,
        mark_number: number
      };
    }

    if (contentBlockHTML != null) {
      contentBlockHTML?.insertAdjacentHTML('beforeend', desc.render(result));

      // TODO
      // если 10 шкала - изменить пороги
      for (let i = 0; i < result.mark; i++) {
        result.stars_burning[i] = true;
      }

      contentBlockHTML?.insertAdjacentHTML(
        'beforeend',
        countLikeFilm.render(result)
      );

      // TODO
      // если 10 шкала - изменить пороги
      const markElement = document.querySelector('.countLikeActor__mark');
      if (markElement) {
        if (result.mark >= 7) {
          markElement.classList.add('countLikeActor__mark_good');
        } else if (result.mark > 4 && result.mark < 7) {
          markElement.classList.add('countLikeActor__mark_mid');
        } else {
          markElement.classList.add('countLikeActor__mark_bad');
        }
      }
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
            store.getState('statusAuth') === 200 &&
            this.state.mapFilms[this.state.fildId] === undefined
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

              console.log(this.state.fildId, this.state.mapFilms);
              if (this.state.mapFilms[this.state.fildId] == null) {
                this.state.mapFilms[this.state.fildId] = true;

                // @ts-ignore
                document.querySelector('.input__form').innerHTML = '';
              }

              store.dispatch(
                actionAddComment({
                  film_id: this.state.fildId,
                  rating: select,
                  text: text
                })
              );
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
/**
 *
 * @param arg0
 */
function elseif (arg0: boolean) {
  throw new Error('Function not implemented.');
}
