import { Component } from '@components/component';
import { logout } from '@utils/logout';
import { router } from '@router/Router';
const templateHeader = require('./header.hbs');
import { config } from "@utils/config";

/**
 * Класс создания верхней шапки
 * @class Header
 * @typedef {Header}
 */
export class Header extends Component {
  private config = {};
  private state = {};
  /**
   * Конструктор для формирования родительского элемента
   * @class
   * @param ROOT
   */
  constructor(ROOT) {
    super(ROOT);
    this.config = config.menu;
    this.state = {};
  }

  /**
   * Разбивает конфиг на определенные элементы, которые подставляются в шаблон
   * @readonly
   * @type {Array}
   */
  get items() {
    return Object.entries(this.config).map(
      // eslint-disable-next-line camelcase
        // @ts-ignore
      ([key, { href, png_name, name }]) => ({
        key,
        href,
        // eslint-disable-next-line camelcase
        png_name,
        name,
      })
    );
  }

  /**
   * Рендер шапки для незарегистрированного пользователя
   * @param {boolean} [isAuthorized] - пользователь не авторизован
   * @return {string} - html шапки
   */
  render(isAuthorized = false) {
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
      brand,
    });
  }

  /**
   * Рендер шапки для зарегистрированного пользователя
   * @param {boolean} isAuth - пользователь не авторизован
   */
  addToHeaderEvent(isAuth = false) {
    const loginHeader = document.querySelector('.loginHeader');
    const brandHeader = document.querySelector('.brandHeader');
    const logoutHeader = document.querySelector('.logoutHeader');
    const menuHeader = document.querySelector('.menuHeader');

    /**
     * ивент на клик loginHeader
     * @param event ивент с кнопки
     */
    const clickLogin = (event) => {
      event.composedPath().forEach(function (element) {
        const classNames = element.className;
        if (classNames === 'loginHeader') {
          router.go({
            path: '/signin',
            props: '/signin',
          }, { pushState: true, refresh: false });
        }
      });
    };

    /**
     * ивент на клик brandHeader
     * @param event ивент с кнопки
     */
    const clickHandler = (event) => {
      event.composedPath().forEach(function (element) {
        const classNames = element.className;
        if (classNames === 'brandHeader') {
          //goToPageByEvent(event);
          router.go({
            path: '/',
            props: '/',
          }, { pushState: true, refresh: false });
        }
      });
    };

    /**
     * ивент на клик logoutHeader
     * @param event ивент с кнопки
     */
    const clickLogout = (event) => {
      event.composedPath().forEach(function (element) {
        const classNames = element.className;
        if (classNames === 'logoutHeader') {
          logout();
        }
      });
    };

    /**
     * ивент на клик menuHeader
     * @param event ивент с кнопки
     */
    const clickMenu = (event) => {
      event.composedPath().forEach(function (element) {
        const classNames = element.className;
        if (classNames === 'menuHeader') {
          router.go({
            path: '/selection',
            props: '/selection',
          }, { pushState: true, refresh: false });
         // goToPageByEvent(event);
        }
      });
    };

    if (loginHeader) {
      loginHeader.addEventListener('click', clickLogin);
    }
    if (logoutHeader) {
      logoutHeader.addEventListener('click', clickLogout);
    }

    // @ts-ignore
    menuHeader.addEventListener('click', clickMenu);
    // @ts-ignore
    brandHeader.addEventListener('click', clickHandler);
  }
}
