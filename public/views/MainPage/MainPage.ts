import { View } from '@views/view';
import {
  header, filmSelectionPage
} from '@utils/config';
import { store } from '@store/store';
import { actionAuth } from '@store/action/actionTemplates';
import { router } from '@router/router';

export interface MainPage {
  state: {
    isAuth: boolean;
    isCurrentView: boolean;
  };
}
/**
 * Класс формирования главной страницы
 * @class MainPage
 * @typedef {MainPage}
 */
export class MainPage extends View {
  private popupEvent: (event) => void;
  /**
   * Конструктор для формирования родительского элемента
   * @param ROOT
   * @class
   */
  constructor (ROOT) {
    super(ROOT);
    this.state = {
      isAuth: false,
      isCurrentView: true
    };

    this.subscribeMainPageStatus = this.subscribeMainPageStatus.bind(this);
    this.subscribeLogoutStatus = this.subscribeLogoutStatus.bind(this);

    store.subscribe('statusAuth', this.subscribeMainPageStatus);
    store.subscribe('logoutStatus', this.subscribeLogoutStatus);
  }
  /**
   * Метод создания страницы
   */
  render () {
    this.renderDefaultPage();
    const contentBlockHTML = document.querySelector('.contentBlock');

    if (contentBlockHTML) {
      filmSelectionPage.render(false).then((response) => {
        if (this.state.isCurrentView) {
          contentBlockHTML.insertAdjacentHTML('beforeend', <string>response);
          this.componentDidMount();
        }
      });
    }

    store.dispatch(actionAuth());

    // actorPage.render();
    // filmPage.render();
  }

  subscribeMainPageStatus () {
    this.state.isAuth = store.getState('statusAuth') === 200;

    this.changeHeader(this.state.isAuth);
  }

  componentDidMount () {
    const popup = document.querySelector('.filmSelection');
    const popupEvent = (event) => {
      this.popupEvent = popupEvent;
      switch (true) {
        case event.target.closest('.filmSelection_film') !== null:
          const filmId = event.target.closest('.filmSelection_film').getAttribute('data-section');
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
    popup?.addEventListener('click', popupEvent);
  }

  componentWillUnmount () {
    const popup = document.querySelector('.filmSelection');

    popup?.removeEventListener('click', this.popupEvent);
  }

  subscribeLogoutStatus () {
    this.state.isAuth = store.getState('logoutStatus') === 200;

    this.changeHeader(!this.state.isAuth);
  }

  changeHeader (isAuth) {
    const headerHTML = document.querySelector('header');

    headerHTML!.innerHTML = header.render(isAuth);
    header.componentDidMount();
  }
}
