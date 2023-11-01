import { Component } from '@components/component';
import { router } from '@router/router';
import * as templateHeader from '@components/Header/header.hbs';
import { config } from '@utils/config';
import { store } from '@store/store';
import { actionLogout } from '@store/action/actionTemplates';

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
    this.config = config.menu;
    this.eventFunc = () => {};

    this.subscribeHeader = this.subscribeHeader.bind(this);
    store.subscribe('user', this.subscribeHeader);
  }

  /**
   * Разбивает конфиг на определенные элементы, которые подставляются в шаблон
   * @readonly
   * @type {Array}
   */
  get items () {
    return Object.entries(this.config).map(
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
   * @param isAuthorized
   * @return {string} - html шапки
   */
  render (isAuthorized = false) {
    const brand = this.items.find((item) => item.key === 'main');
    const signin = this.items.find((item) => item.key === 'signin');
    const basket = this.items.find((item) => item.key === 'basket');
    const profile = this.items.find((item) => item.key === 'profile');
    const selection = this.items.find((item) => item.key === 'selection');

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
        case target.closest('.loginHeader') !== null:
          router.go(
            {
              path: '/signin',
              props: ''
            },
            { pushState: true, refresh: false }
          );
          break;
        case target.closest('.brandHeader') !== null:
          router.go(
            {
              path: '/',
              props: ''
            },
            { pushState: true, refresh: false }
          );
          break;
        case target.closest('.logoutHeader') !== null:
          store.dispatch(actionLogout());
          break;
        case target.closest('.menuHeader') !== null:
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

  subscribeHeader () {
    this.render();
  }
}
