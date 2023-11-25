import { Component } from '@components/component';
import { router } from '@router/router';
import * as templateHeader from '@components/Header/header.hbs';
import { config, signinPage } from '@utils/config';
import { store } from '@store/store';
import { actionLogout } from '@store/action/actionTemplates';

export interface Header {
  state: {
    config: any;
    isAuth: boolean;
  };
}

/**
 * Класс создания верхней шапки
 * @class Header
 * @typedef {Header}
 */
export class Header extends Component {
  private readonly config = {};
  private eventFunc: (event) => void;
  /**
   * Конструктор для формирования родительского элемента
   * @class
   * @param ROOT
   */
  constructor (ROOT) {
    super(ROOT);
    this.state = {
      config: config.menu,
      isAuth: false
    };
    this.eventFunc = () => {};

    this.subscribeLogoutStatus = this.subscribeLogoutStatus.bind(this);
    this.subscribeLoginHeaderStatus = this.subscribeLoginHeaderStatus.bind(this);
    this.subscribeAuthStatus = this.subscribeAuthStatus.bind(this);

    store.subscribe('auth', this.subscribeAuthStatus);
    store.subscribe('login', this.subscribeLoginHeaderStatus);
    store.subscribe('logoutStatus', this.subscribeLogoutStatus);
  }

  /**
   * Разбивает конфиг на определенные элементы, которые подставляются в шаблон
   * @readonly
   * @type {Array}
   */
  get items () {
    return Object.entries(this.state.config).map(
      // @ts-expect-error
      // eslint-disable-next-line camelcase
      ([key, { href, png_name, name }]) => ({
        key,
        href,
        // eslint-disable-next-line camelcase
        png_name,
        name
      })
    );
  }

  /**
   * Рендер шапки для незарегистрированного пользователя
   * @return {string} - html шапки
   */
  render () {
    const isAuthorized= this.state.isAuth;

    const [brand, signin, basket, profile, selection] = [
      'main',
      'signin',
      'basket',
      'profile',
      'selection'
    ].map((key) => this.items.find((item) => item.key === key));

    return templateHeader({
      isAuthorized,
      signin,
      basket,
      profile,
      selection,
      brand
    });
  }

  /**
   * Рендер шапки для зарегистрированного пользователя
   */
  componentDidMount () {
    const headerContainer = document.querySelector('header');
    headerContainer?.removeEventListener('click', this.eventFunc);

    this.eventFunc = (event) => {
      const target = event.target;

      switch (true) {
        case target.closest('.header_login-header') !== null:
          router.go(
            {
              path: '/login',
              props: ''
            },
            { pushState: true, refresh: false }
          );
          break;
        case target.closest('.header_brand-header') !== null:
          router.go(
            {
              path: '/',
              props: ''
            },
            { pushState: true, refresh: false }
          );
          break;
        case target.closest('.header_logout-header') !== null:
          store.dispatch(actionLogout({ redirect: true }));
          break;
        case target.closest('.header_settings-header') !== null:
          router.go(
            {
              path: '/settings',
              props: ''
            },
            { pushState: true, refresh: false }
          );
          break;
        case target.closest('.header_basket-item') !== null:
          router.go(
            {
              path: '/watchlist/films',
              props: ''
            },
            { pushState: true, refresh: false }
          );
          break;
        case target.closest('.header_menu-header') !== null:
          router.go(
            {
              path: '/selection',
              props: ''
            },
            { pushState: true, refresh: false }
          );
          break;
        default:
          break;
      }
    };
    headerContainer?.addEventListener('click', this.eventFunc);
  }

  componentWillUnmount () {
    const headerContainer = document.querySelector('header');
    headerContainer?.removeEventListener('click', this.eventFunc);
  }

  subscribeAuthStatus () {
    this.state.isAuth = store.getState('auth').status === 200;
    this.changeHeader();
  }

  subscribeLoginHeaderStatus () {
    this.state.isAuth = store.getState('login').status === 200;
    this.changeHeader();
  }

  subscribeLogoutStatus () {
    this.state.isAuth = store.getState('logoutStatus') !== 200;
    this.changeHeader();
  }

  changeHeader () {
    const headerHTML = document.querySelector('header');
    if (headerHTML) {
      headerHTML!.innerHTML = this.render();
      this.componentDidMount();
    }
  }
}
