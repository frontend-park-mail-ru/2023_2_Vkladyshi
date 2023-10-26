import { View } from '../view';
import {
  errorInputs,
  header,
  responseStatuses,
  urls,ROOT
} from '@utils/config';
import { Signup } from '@components/Signup/signup';
import { returnError } from '@utils/addError';
import {
  validateEmail,
  validateLogin,
  validatePassword,
} from '@utils/validate';
import { post } from '@utils/ajax';
import {router} from "@router/Router";

/**
 * Класс регистрации пользователя
 * @class SignupPage
 * @typedef {SignupPage}
 */
export class SignupPage extends View {
  /**
   * Конструктор для формирования родительского элемента
   * @class
   */
  constructor(ROOT) {
    super(ROOT);
  }

  /**
   * Метод создания страницы
   */
  render() {
    const signup = new Signup({ROOT});

    if (!document.querySelector('.popupSign')) {
      const popup = document.createElement('div');
      popup.className = 'popupSign';
      // @ts-ignore
      document.querySelector('main').innerHTML = '';
      document?.querySelector('main')?.appendChild(popup);
    }

    // @ts-ignore
    document.querySelector('.popupSign').innerHTML = signup.render();
    this.addActiveSignin();
    this.addEvents();
  }

  /**
   * Добавляет ивенты на странице
   */
  addEvents() {
    const errorString = document.querySelector('.errorStringSignup');
    const popup = document.querySelector('.popupSign');

    const popupEvent = (event) => {
      if (event.target.closest('.redirectToSignin')) {

        errorString?.classList.remove('active');
        this.removeActiveSignup();
        router.go({
          path: '/signin',
          props: '/signin',
        }, { pushState: false, refresh: false });
      } else if (
        event.target.closest('.sign-frame-img')
      ) {
        errorString?.classList.remove('active');
        this.removeActiveSignup();
        router.go({
          path: '/',
          props: '/',
        }, { pushState: false, refresh: false });
      } else if (event.target.closest('.signupButton')) {
        this.registration();
      }
    };

    popup?.addEventListener('click', popupEvent);
  }

  /**
   * Происходит процесс регистрации юзера
   */
  registration() {
    const signupForm = document.querySelector('.signupForm');

    const handleSubmit = (event) => {
      event.preventDefault();
      // @ts-ignore
      const login = document.querySelector('.loginInputSignup').value.trim();
      // @ts-ignore
      const email = document.querySelector('.emailInput').value.trim();
      // @ts-ignore
      const password = document.querySelector('.passwordInputFirst').value;
      // @ts-ignore
      const passwordSecond = document.querySelector('.passwordInputSecond').value;
      const errorClassName = 'errorStringSignup';
      signupForm?.removeEventListener('submit', handleSubmit);

      if (!login || !email || !password || !passwordSecond) {
        returnError(errorInputs.NotAllElements, errorClassName);
        return;
      }

      if (password !== passwordSecond) {
        returnError(errorInputs.PasswordsNoEqual, errorClassName);
        return;
      }

      const isValidate = validatePassword(password);
      if (!isValidate.result) {
        returnError(isValidate.error, errorClassName);
        return;
      }

      if (!validateEmail(email)) {
        returnError(errorInputs.EmailNoValid, errorClassName);
        return;
      }

      const loginValidate = validateLogin(login);
      if (!loginValidate.result) {
        returnError(loginValidate.error, errorClassName);
        return;
      }

      this.signupRequest(login, email, password, errorClassName);
    };

    signupForm?.addEventListener('submit', handleSubmit);
  }

  /**
   * Запрос на регистрацию
   * @param {string} login логин пользователя
   * @param {string} password пароль пользователя
   * @param {string} email почта пользователя
   * @param {string} errorClassName название класса, куда вписывать ошибку
   */
  signupRequest(login, email, password, errorClassName) {
    post({
      url: urls.signup,
      body: { login, email, password },
    }).then((response) => {
      switch (response["status"]) {
        case responseStatuses.success:
          this.signinRequest(login, password);
          this.removeActiveSignup();
          router.go({
            path: '/',
            props: '/',
          }, { pushState: false, refresh: false });
          break;
        case responseStatuses.alreadyExists:
          returnError(errorInputs.LoginExists, errorClassName);
          break;
        default:
          throw new Error(`Error ${response["status"]}`);
      }
    });
  }

  /**
   * Запрос на авторизацию
   * @param {string} login логин пользователя
   * @param {string} password пароль пользователя
   */
  signinRequest(login, password) {
    post({
      url: urls.signin,
      body: { login, password },
    }).then((response) => {
      // @ts-ignore
      document.querySelector('header').innerHTML = header.render(true);
      header.addToHeaderEvent(true);
    });
  }

  /**
   * Делаем страницу регистрации активной
   */
  addActiveSignin() {
    document?.querySelector('.popupSign')?.classList.add('active');
    document?.querySelector('.signup')?.classList.add('active');
  }

  /**
   * Деактивируем страницу регистрации
   */
  removeActiveSignup() {
    document?.querySelector('.popupSign')?.classList.remove('active');
    document?.querySelector('.signup')?.classList.remove('active');
  }
}
