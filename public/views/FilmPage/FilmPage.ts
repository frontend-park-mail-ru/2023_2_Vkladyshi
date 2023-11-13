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
      icon!.style.backgroundImage = 'url("' + result.poster + '")';

      const containerHTML = document.querySelector('.image-container');
      containerHTML?.insertAdjacentHTML('beforeend', desc.render(result));
      containerHTML?.insertAdjacentHTML(
        'beforeend',
        countLikeFilm.render(result)
      );
      containerHTML?.insertAdjacentHTML('beforeend', info.render(result));
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
    const infoHTML = document.querySelector('.additional-info__review');

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
              film_id: res.film_id,
              name: res.name,
              rating: res.rating,
              text: res.text
            };

            const result = document.createElement('buf');
            result?.insertAdjacentHTML('beforeend', review.render(table));
            const reviewHTML = result?.querySelector('.review') as HTMLElement;

            switch (true) {
              case table.rating < 4:
                reviewHTML.style.background = 'red';
                break;
              case table.rating > 6:
                reviewHTML.style.background = 'green';
                break;
              default:
                reviewHTML.style.background = 'orange';
                break;
            }

            div1?.appendChild(reviewHTML);
          });
          store.dispatch(actionAuth()).then((response) => {
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

                store
                  .dispatch(
                    actionAddComment({
                      film_id: this.state.fildId,
                      rating: select,
                      text: text
                    })
                  )
                  .then((response) => {
                    if (response!['addCommentStatus'] === 200) {
                      router.refresh();
                    } else {
                      document.querySelector('.input__form')!.innerHTML =
                        '<h4>Вы уже писали отзыв</h4>';
                    }
                  });
              };
              const review = document.querySelector('.review-form');
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
        });
    }
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
