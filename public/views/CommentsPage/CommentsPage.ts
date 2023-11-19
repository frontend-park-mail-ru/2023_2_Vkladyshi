import { View } from '@views/view';
import { store } from '@store/store';
import { router } from '@router/router';
import {
  actionAuth,
  actionGetCommentsUser
} from '@store/action/actionTemplates';
import {desc, review, reviewForm} from '@utils/config';
import {image} from "@components/Image/image";

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
  constructor (ROOT) {
    super(ROOT);
    this.state = {
      commentsInfo: [],
      rewiewBunch: 1
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
  render (props = null) {
    this.renderDefaultPage();
    store.dispatch(
      actionGetCommentsUser({ page: this.state.rewiewBunch, per_page: 5 })
    );
  }

  insertComments () {
    const comments = document.createElement('all-comments');
    const contentBlockHTML = document.querySelector('.content-block') as HTMLElement;
    // contentBlockHTML.style.marginTop = '100px';
    comments?.insertAdjacentHTML('beforeend', reviewForm.render({ login: true }));
    comments.style.display = 'flex';
    comments.style.flexDirection = 'column';
    // const reviewFormHTML = document.querySelector('.review-form') as HTMLElement;
    // reviewFormHTML.style.marginTop = '100px';

    const result = this.state.commentsInfo['comment'];
    // console.log(result[0].film_id, result)

    result.forEach((res) => {
      const table = {
        user: true,
        film_id: res['film_id'],
        film_name: res['film_name'],
        rating: res['rating'],
        text: res['text']
      };

      const result = document.createElement('buf');
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

      comments?.appendChild(reviewHTML);
    });
    // const mainHTML = document.querySelector('main');
    // mainHTML?.insertAdjacentHTML('afterbegin', image.render({}));
    //
    // const icon = document.querySelector('.image-container') as HTMLElement;
    // const iconsShadow = document.querySelector('.header__container__shadow') as HTMLElement;
    //
    // icon!.style.backgroundImage = 'url("' + '/icons/barbie.jpg' + '")';
    // icon!.style.backgroundAttachment = 'fixed';
    // iconsShadow!.style.backgroundAttachment = 'fixed';
    //
    // const containerHTML = document.querySelector('.image-container');
    // containerHTML?.insertAdjacentHTML('beforeend', desc.render(result));

    contentBlockHTML?.appendChild(comments);
    reviewForm.event(result[0].film_id);

    this.componentDidMount();
  }

  componentDidMount () {
    const popup = document.querySelector('.content-block');
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
              props: `/${filmId}`
            },
            { pushState: true, refresh: false }
          );
          break;
        default:
          break;
      }
    };

    // const handleScroll = () => {
    //   this.scrollEvent = handleScroll;
    //   if (
    //     Math.floor(window.innerHeight + document.documentElement.scrollTop) /
    //       10 ===
    //     Math.floor(document.documentElement.offsetHeight - 1) / 10
    //   ) {
    //     this.state.rewiewBunch += 1;
    //     console.log('inIF');
    //     console.log(this.state.rewiewBunch);
    //     store.dispatch(
    //       actionGetCommentsUser({ page: this.state.rewiewBunch, per_page: 5 })
    //     );
    //   }
    //
    //   console.log(
    //     Math.floor(window.innerHeight + document.documentElement.scrollTop) / 10
    //   );
    //   console.log(Math.floor(document.documentElement.offsetHeight - 1) / 10);
    // };
    //
    // popup?.addEventListener('click', popupEvent);
    // window?.addEventListener('scroll', handleScroll);
  }

  componentWillUnmount () {
    const popup = document.querySelector('.content-block');
    popup?.removeEventListener('click', this.popupEvent);
    window?.removeEventListener('scroll', this.scrollEvent);

    store.unsubscribe('userCommentsStatus', this.subscribeCommentsStatrus);
    store.unsubscribe('removeView', this.componentWillUnmount);
  }

  subscribeCommentsStatrus () {
    const result = store.getState('userCommentsStatus');

    if (result?.status === 200) {
      this.state.commentsInfo = result.body;
      this.insertComments();
    }
  }
}
