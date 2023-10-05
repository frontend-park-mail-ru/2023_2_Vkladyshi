import { goToPage } from '../../modules/goToPage.js';
import { logout } from '../../modules/logout.js';

/**
 * Класс создания верхней шапки
 * @class Header
 * @typedef {Header}
 */
export class Header {
  /**
   * Родительский элемент в который добаляеться шаблон
   * @type {object}
   */
  #parent;
  /**
   * Данные для подстановки в шаблон
   * @type {JSON}
   */
  #config;

  /**
   * Конструктор для формирония родительского элемента
   * @class
   * @param {object} parent - указатель на родитя в DOM дереве
   * @param {JSON} config - парамтры для наполнения шаблона
   */
  constructor(parent, config) {
    this.#parent = parent;
    this.#config = config;

    this.state = {
      activeElements: null,
      headerElements: {},
    };
  }

  /**
   * Геттер конфига
   * @readonly
   * @type {JSON}
   */
  get config() {
    return this.#config;
  }

  /**
   * Разбивает конфиг на определенные элементы, которын подставляються в шаблон
   * @readonly
   * @type {Array}
   */
  get items() {
    return Object.entries(this.config).map(
      ([key, { href, png_name: pngName, name }]) => ({
        key,
        href,
        png_name: pngName,
        name,
      })
    );
  }

  /**
   * Рендер шапки для незарегистрированного пользователя
   * @param {boolean} [isAuthorized] - пользватель не авторизован
   */
  render(isAuthorized = false) {
    const template = Handlebars.templates['header.hbs'];

    const brand = this.items.find((item) => item.key === 'main');
    const signin = this.items.find((item) => item.key === 'signin');
    const basket = this.items.find((item) => item.key === 'basket');
    const profile = this.items.find((item) => item.key === 'profile');
    const selection = this.items.find((item) => item.key === 'selection');

    this.#parent.innerHTML = template({
      isAuthorized,
      signin,
      basket,
      profile,
      selection,
      brand,
    });

    const elements = this.#parent.querySelectorAll('[data-section]');
    elements.forEach((element, index) => {
      this.state.headerElements[element.dataset.section] = element;
    });

    this.addToHeaderEvent(isAuthorized);
  }
  /**
   * Рендер шапки для зарегистрированного пользователя
   * @param {boolean} isAuth - пользватель не авторизован
   */
  addToHeaderEvent(isAuth) {
    const current = this;

    const loginHeader = document.querySelector('.loginHeader');
    if (loginHeader && !isAuth) {
      loginHeader.addEventListener('click', (event) => {
        event.composedPath().forEach(function (element) {
          const classNames = element.className;
          if (classNames === 'loginHeader') {
            goToPage(current, element);
            return;
          }
        });
      });
    }

    const brandHeader = document.querySelector('.brandHeader');
    brandHeader.addEventListener('click', (event) => {
      event.composedPath().forEach(function (element) {
        const classNames = element.className;
        if (classNames === 'brandHeader') {
          goToPage(current, element);
        }
      });
    });

    const logoutHeader = document.querySelector('.logoutHeader');
    if (logoutHeader && isAuth) {
      logoutHeader.addEventListener('click', (event) => {
        event.composedPath().forEach(function (element) {
          const classNames = element.className;
          if (classNames === 'logoutHeader') {
            logout(current);
          }
        });
      });
    }

    const menuHeader = document.querySelector('.menuHeader');
    if (menuHeader) {
      menuHeader.addEventListener('click', (event) => {
        event.composedPath().forEach(function (element) {
          const classNames = element.className;
          if (classNames === 'menuHeader') {
            goToPage(current, element);
          }
        });
      });
    }
  }
}
