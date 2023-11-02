import { View } from '@views/view';
import {header, filmSelectionPage, config} from '@utils/config';
import { store } from '@store/store';
import { actionAuth } from '@store/action/actionTemplates';

export interface MainPage {
  state: {
    isAuth: boolean
  }
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
  constructor (ROOT) {
    super(ROOT);
    this.state = {
      isAuth: false
    };

    this.subscribeMainPageStatus = this.subscribeMainPageStatus.bind(this);

    store.subscribe('statusAuth', this.subscribeMainPageStatus);
    store.subscribe('logoutStatus', this.subscribeMainPageStatus);
    // store.subscribe('statusLogin', this.subscribeMainPageStatus);
    // store.subscribe('statusSignup', this.subscribeMainPageStatus);
  }

  /**
   * Метод создания страницы
   */
  render () {
    this.renderDefaultPage();

    filmSelectionPage.render(false).then((response) => {
      document.querySelector('.contentBlock')?.insertAdjacentHTML('beforeend', <string>response);
    });

    store.dispatch(actionAuth());

  }

  subscribeMainPageStatus () {
    this.state.isAuth = store.getState('statusAuth') === 200;

    //this.state.isAuth = store.getState('statusLogin') === 200;
    const isLogout = store.getState('logoutStatus') === 200;

    if (isLogout) {
      this.changeHeader(!isLogout);
      return;
    }
    this.changeHeader(this.state.isAuth);
  }


  changeHeader (isAuth) {
    const headerHTML = document.querySelector('header');

    headerHTML!.innerHTML = header.render(isAuth);
    header.componentDidMount();
  }
}
