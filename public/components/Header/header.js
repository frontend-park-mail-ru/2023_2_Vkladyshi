import { Component } from "../component.js";
import { goToPageByEvent } from "../../utils/goToPage.js";
import { logout } from "../../utils/logout.js";

/**
 * Класс создания верхней шапки
 * @class Header
 * @typedef {Header}
 */
export class Header extends Component {
  /**
   * Конструктор для формирования родительского элемента
   * @class
   * @param {JSON} config - параметры для наполнения шаблона
   */
  constructor(config) {
    super();
    this.config = config;
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
      ([key, { href, png_name, name }]) => ({
        key,
        href,
        // eslint-disable-next-line camelcase
        png_name,
        name,
      }),
    );
  }

  /**
   * Рендер шапки для незарегистрированного пользователя
   * @param {boolean} [isAuthorized] - пользователь не авторизован
   * @return {string} - html шапки
   */
  render(isAuthorized = false) {
    const brand = this.items.find((item) => item.key === "main");
    const signin = this.items.find((item) => item.key === "signin");
    const basket = this.items.find((item) => item.key === "basket");
    const profile = this.items.find((item) => item.key === "profile");
    const selection = this.items.find((item) => item.key === "selection");

    return Handlebars.templates["header.hbs"]({
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
    const current = this;

    const loginHeader = document.querySelector(".loginHeader");
    const brandHeader = document.querySelector(".brandHeader");
    const logoutHeader = document.querySelector(".logoutHeader");
    const menuHeader = document.querySelector(".menuHeader");
    const redirectToSignin = document.querySelector(".redirectToSignin");
    const redirectToSignup = document.querySelector(".redirectToSignup");

    const clickLogin = (event) => {
      event.composedPath().forEach(function (element) {
        const classNames = element.className;
        if (classNames === "loginHeader") {
          Header.removeEvents(
            clickLogin,
            clickHandler,
            clickLogout,
            clickMenu,
            clickRedirectToSignin,
            clickRedirectToSignup,
          );
          goToPageByEvent(event);
        }
      });
    };

    const clickHandler = (event) => {
      event.composedPath().forEach(function (element) {
        const classNames = element.className;
        if (classNames === "brandHeader") {
          brandHeader.removeEventListener("click", clickHandler);
          current.rootNode.removeChild(document.querySelector("main"));
          Header.removeEvents(
            clickLogin,
            clickHandler,
            clickLogout,
            clickMenu,
            clickRedirectToSignin,
            clickRedirectToSignup,
          );
          goToPageByEvent(event);
        }
      });
    };

    const clickLogout = (event) => {
      event.composedPath().forEach(function (element) {
        const classNames = element.className;
        if (classNames === "logoutHeader") {
          Header.removeEvents(
            clickLogin,
            clickHandler,
            clickLogout,
            clickMenu,
            clickRedirectToSignin,
            clickRedirectToSignup,
          );
          logout();
        }
      });
    };

    const clickMenu = (event) => {
      event.composedPath().forEach(function (element) {
        const classNames = element.className;
        if (classNames === "menuHeader") {
          Header.removeEvents(
            clickLogin,
            clickHandler,
            clickLogout,
            clickMenu,
            clickRedirectToSignin,
            clickRedirectToSignup,
          );
          goToPageByEvent(event);
        }
      });
    };

    const clickRedirectToSignin = (event) => {
      event.composedPath().forEach(function (element) {
        const classNames = element.className;
        if (classNames === "redirectToSignin") {
          Header.removeEvents(
            clickLogin,
            clickHandler,
            clickLogout,
            clickMenu,
            clickRedirectToSignin,
            clickRedirectToSignup,
          );
          goToPageByEvent(event);
        }
      });
    };

    const clickRedirectToSignup = (event) => {
      event.composedPath().forEach(function (element) {
        const classNames = element.className;
        if (classNames === "redirectToSignup") {
          Header.removeEvents(
            clickLogin,
            clickHandler,
            clickLogout,
            clickMenu,
            clickRedirectToSignin,
            clickRedirectToSignup,
          );
          goToPageByEvent(event);
        }
      });
    };

    if (redirectToSignin) {
      Header.removeEvents(
        clickLogin,
        clickHandler,
        clickLogout,
        clickMenu,
        clickRedirectToSignin,
      );
      redirectToSignin.addEventListener("click", clickRedirectToSignin);
    }
    if (redirectToSignup) {
      Header.removeEvents(
        clickLogin,
        clickHandler,
        clickLogout,
        clickMenu,
        clickRedirectToSignin,
      );
      redirectToSignup.addEventListener("click", clickRedirectToSignup);
    }
    if (loginHeader) {
      loginHeader.addEventListener("click", clickLogin);
    }
    if (logoutHeader) {
      logoutHeader.addEventListener("click", clickLogout);
    }

    menuHeader.addEventListener("click", clickMenu);
    brandHeader.addEventListener("click", clickHandler);
  }
  /**
   * Удаление Эвентов шапки
   * @param {Function} clickLogin - кнопка на авторизацию
   * @param {Function} clickBrand - пользователь не авторизован
   * @param {Function} clickLogout - пользователь не авторизован
   * @param {Function} clickMenu - пользователь не авторизован
   * @param {Function} redirectToSignin - редирект на регистрацию
   * @param {Function} redirectToSignup -редирект на авторизацию
   */
  static removeEvents(
    clickLogin,
    clickBrand,
    clickLogout,
    clickMenu,
    redirectToSignin,
    redirectToSignup,
  ) {
    const menu = document.querySelector(".menuHeader");
    const brand = document.querySelector(".brandHeader");
    const login = document.querySelector(".loginHeader");
    const signup = document.querySelector(".redirectToSignup");

    menu.removeEventListener("click", clickMenu);
    brand.removeEventListener("click", clickBrand);

    if (login) {
      login.removeEventListener("click", clickLogin);
    }
    if (signup) {
      signup.removeEventListener("click", redirectToSignin);
    }
    if (signup) {
      signup.removeEventListener("click", redirectToSignup);
    }
  }
}
