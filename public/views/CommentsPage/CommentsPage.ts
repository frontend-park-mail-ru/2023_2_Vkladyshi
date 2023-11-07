/* eslint-disable require-jsdoc */
import { View } from '@views/view';
import { store } from '@store/store';
import { router } from '@router/router';
import { actionGetCommentsUser } from '@store/action/actionTemplates';
import { review } from '@utils/config';

export interface CommentsPage {
  state: {
    commentsInfo: [];
    rewiewBunch: number;
  };
}
/**
 * Класс формирования подборки фильмов
 * @class CommentsPage
 * @typedef {CommentsPage}
 */
export class CommentsPage extends View {
  private popupEvent: (event) => void;
  private scrollEvent: () => void;
  /**
   * Конструктор класса
   * @param ROOT
   */
  constructor(ROOT) {
    super(ROOT);
    this.state = {
      commentsInfo: [],
      rewiewBunch: 1,
    };

    this.subscribeCommentsStatrus = this.subscribeCommentsStatrus.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);

    store.subscribe('userCommentsStatus', this.subscribeCommentsStatrus);
    store.subscribe('removeView', this.componentWillUnmount);

  }

  /**
   * Метод рендеринга элемента
   * @param props
   * @returns {string} html авторизации
   */
  render(props) {
    this.renderDefaultPage();
    store.dispatch(
      actionGetCommentsUser({ page: this.state.rewiewBunch, per_page: 5 })
    );
  }

  insertComments() {
    const contentBlockHTML = document.querySelector('.contentBlock');
    const result = this.state.commentsInfo;

    result.forEach((res) => {
      const table = {
        user: true,
        film_id: res['film_id'],
        film_name: res['film_name'],
        rating: res['rating'],
        text: res['text'],
      };

      contentBlockHTML?.insertAdjacentHTML('beforeend', review.render(table));
    });

    this.componentDidMount();
  }

  componentDidMount() {
    const popup = document.querySelector('.contentBlock');
    const popupEvent = (event) => {
      this.popupEvent = popupEvent;
      switch (true) {
        case event.target.closest(
          '.review__header__film-name.table__header'
        ) !== null:
          const filmId = event.target
            .closest('.review__header__film-name.table__header')
            .getAttribute('data-section');
          this.componentWillUnmount();
          router.go(
            {
              path: '/film',
              props: `/${filmId}`,
            },
            { pushState: true, refresh: false }
          );
          break;
        default:
          console.log(99);
          break;
      }
    };

    const handleScroll = () => {
      this.scrollEvent = handleScroll;
      if (
        Math.floor(window.innerHeight + document.documentElement.scrollTop) /
          10 ===
        Math.floor(document.documentElement.offsetHeight - 1) / 10
      ) {
        this.state.rewiewBunch += 1;
        console.log('inIF');
        console.log(this.state.rewiewBunch);
        store.dispatch(
          actionGetCommentsUser({ page: this.state.rewiewBunch, per_page: 5 })
        );
      }
      console.log('height');
      console.log(
        Math.floor(window.innerHeight + document.documentElement.scrollTop) / 10
      );
      console.log(Math.floor(document.documentElement.offsetHeight - 1) / 10);
    };

    console.log('handleScroll');
    popup?.addEventListener('click', popupEvent);
    window?.addEventListener('scroll', handleScroll);
  }

  componentWillUnmount() {
    const popup = document.querySelector('.contentBlock');
    popup?.removeEventListener('click', this.popupEvent);
    window?.removeEventListener('scroll', this.scrollEvent);

    store.unsubscribe('userCommentsStatus', this.subscribeCommentsStatrus);
    store.unsubscribe('removeView', this.componentWillUnmount);
  }

  subscribeCommentsStatrus() {
    const result = store.getState('userCommentsStatus');

    if (result?.status === 200) {
      this.state.commentsInfo = result.body;
      this.insertComments();
    }
  }
}
