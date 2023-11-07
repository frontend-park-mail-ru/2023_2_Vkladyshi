import { View } from '@views/view';
import { store } from '@store/store';
import { router } from '@router/router';
import { actionGetCommentsUser } from '@store/action/actionTemplates';
import { review } from '@utils/config';

export interface CommentsPage {
    state: {
        commentsInfo: []
    };
}
/**
 * Класс формирования подборки фильмов
 * @class CommentsPage
 * @typedef {CommentsPage}
 */
export class CommentsPage extends View {
    private popupEvent: (event) => void;
    /**
     * Конструктор класса
     * @param ROOT
     */
    constructor (ROOT) {
      super(ROOT);
      this.state = {
        commentsInfo: []
      };

      this.subscribeCommentsStatrus = this.subscribeCommentsStatrus.bind(this);
      store.subscribe('userCommentsStatus', this.subscribeCommentsStatrus);
    }

    /**
     * Метод рендеринга элемента
     * @return {string} html авторизации
     */
    render () {
      this.renderDefaultPage();
      store.dispatch(actionGetCommentsUser({ page: 1, per_page: 5 }));
    }

    insertComments () {
      const contentBlockHTML = document.querySelector('.contentBlock');
      const result = this.state.commentsInfo;

      result.forEach(res => {
        const table = {
          user: true,
          film_id: res['film_id'],
          film_name: res['film_name'],
          rating: res['rating'],
          text: res['text']
        };

        contentBlockHTML?.insertAdjacentHTML('beforeend', review.render(table));
      });

      this.componentDidMount();
    }

    componentDidMount () {
      const popup = document.querySelector('.contentBlock');
      const popupEvent = (event) => {
        this.popupEvent = popupEvent;
        switch (true) {
          case event.target.closest('.review__header__film-name.table__header') !== null:
            console.log(2112);
            const filmId = event.target.closest('.review__header__film-name.table__header').getAttribute('data-section');
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
            console.log(99);
            break;
        }
      };
      popup?.addEventListener('click', popupEvent);
    }

    componentWillUnmount () {
      const popup = document.querySelector('.contentBlock');
      popup?.removeEventListener('click', this.popupEvent);
    }

    subscribeCommentsStatrus () {
      const result = store.getState('userCommentsStatus');

      console.log(1);
      if (result?.status === 200) {
        console.log(2);
        this.state.commentsInfo = result.body;
        this.insertComments();
      }
    }
}
