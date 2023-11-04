import { View } from '@views/view';
import {
  ROOT,
  header,
  contentBlock,
  footer,
  filmSelectionPage,
} from '@utils/config';
import { store } from '@store/store';
import { actionAuth } from '@store/action/actionTemplates';

// import { ActorDescritionPage } from '@views/ActorPage/ActorPage';
import { FilmPage } from '@views/FilmPage/FilmPage';

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
  /**
   * Конструктор для формирования родительского элемента
   * @param ROOT
   * @class
   */
  constructor(ROOT) {
    super(ROOT);
    this.state = {
      isAuth: false,
      isCurrentView: true,
    };

    this.subscribeAuthStatus = this.subscribeAuthStatus.bind(this);
    this.subscribeLogoutStatus = this.subscribeLogoutStatus.bind(this);

    store.subscribe('statusAuth', this.subscribeAuthStatus);
    store.subscribe('logoutStatus', this.subscribeLogoutStatus);
  }

  /**
   * Метод создания страницы
   */
  render() {
    this.renderDefaultPage();

    filmSelectionPage.render(false)?.then((response) => {
      document
        .querySelector('.contentBlock')
        ?.insertAdjacentHTML('beforeend', <string>response);
    });

    // Это заглушка для просмотра того, что ренедерить вьюха
    // this.state.isCurrentView = false;
    // const actorPage = new ActorDescritionPage(ROOT);
    // actorPage.render();

    // Это заглушка для просмотра того, что ренедерить вьюха
    this.state.isCurrentView = false;
    const filmPage = new FilmPage(ROOT);
    filmPage.render();

    store.dispatch(actionAuth());
  }

  subscribeAuthStatus() {
    this.state.isAuth = store.getState('statusAuth') === 200;

    this.changeHeader(this.state.isAuth);
  }

  subscribeLogoutStatus() {
    const isLogout = store.getState('logoutStatus') === 200;
    if (isLogout) {
      this.changeHeader(!isLogout);
      return;
    }
    this.changeHeader(this.state.isAuth);
  }

  changeHeader(isAuth) {
    const headerHTML = document.querySelector('header');

    headerHTML!.innerHTML = header.render(isAuth);
    header.componentDidMount();
  }
}
