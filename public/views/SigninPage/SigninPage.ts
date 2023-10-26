import { View } from '../view';
import { Signin } from '@components/Signin/signin';
import {
  errorInputs,
  header,
  responseStatuses,
  urls,
  ROOT
} from '@utils/config';
import { returnError } from '@utils/addError';
import { post } from '@utils/ajax';
import { validateLogin, validatePassword } from '@utils/validate';
import {router} from "@router/Router";

/**
 * Класс регистрации пользователя
 * @class SigninPage
 * @typedef {SigninPage}
 */
export class SigninPage extends View {
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
    const signin = new Signin({ROOT});


    if (!document.querySelector('.popupSign')) {
      const popup = document.createElement('div');
      popup.className = 'popupSign';
      // @ts-ignore
      document.querySelector('main').innerHTML = '';
      document?.querySelector('main')?.appendChild(popup);
    }

    // @ts-ignore
    document.querySelector('.popupSign').innerHTML = signin.render();

    this.addActiveSignin();
    this.addEvents();
  }

  /**
   * Добавляет ивенты на странице
   */
  addEvents() {
    const errorString = document.querySelector('.errorStringSignin');
    const popup = document.querySelector('.popupSign');

    const popupEvent = (event) => {
      if (event.target.closest('.redirectToSignup')) {
        errorString?.classList.remove('active');
        this.removeActiveSignin();
        popup?.removeEventListener('click', popupEvent);
        router.go({
          path: '/signup',
          props: '/signup',
        }, { pushState: false, refresh: false });
      } else if (
          event.target.closest('.sign-frame-img')
      ) {
        errorString?.classList.remove('active');

        router.go({
          path: '/',
          props: '/',
        }, { pushState: false, refresh: false });
      } else if (event.target.closest('.buttonLogin')) {
        this.authorization();
      }
    };
    popup?.addEventListener('click', popupEvent);

  }

  /**
   * Происходит процесс авторизации юзера
   */
  authorization() {
    const signin = document.querySelector('.signin');

    const handleSubmit = (event) => {
      event.preventDefault();
      // @ts-ignore
      const login = document.querySelector('.loginInput').value.trim();
      // @ts-ignore
      const password = document.querySelector('.passwordInput').value;
      const errorClassName = 'errorStringSignin';
      signin?.removeEventListener('submit', handleSubmit);

      if (!login || !password) {
        returnError(errorInputs.NotAllElements, errorClassName);
        return;
      }

      const loginValidate = validateLogin(login);
      if (!loginValidate.result) {
        returnError(loginValidate.error, errorClassName);
        return;
      }

      const passwordValidate = validatePassword(password);
      if (!passwordValidate.result) {
        returnError(passwordValidate.error, errorClassName);
        return;
      }
      this.signinRequest(login, password, errorClassName);
    };

    // @ts-ignore
    signin.addEventListener('submit', handleSubmit);
  }

  /**
   * Запрос на авторизацию
   * @param {string} login логин пользователя
   * @param {string} password пароль пользователя
   * @param {string} errorClassName название класса, куда вписывать ошибку
   */
  signinRequest(login, password, errorClassName) {
     post({
      url: urls.signin,
      body: { login, password },
    }).then(async (response) => {
      switch (response["status"]) {
        case responseStatuses.success:
          this.removeActiveSignin();
          router.go({
            path: '/',
            props: '/',
          }, { pushState: false, refresh: false });
          header.render(true);
          break;
        case responseStatuses.notAuthorized:
          returnError(errorInputs.LoginOrPasswordError, errorClassName);
          break;
        default:
          returnError(errorInputs.LoginOrPasswordError, errorClassName);
      }
    });
  }

  /**
   * Делаем страницу авторизации активной
   */
  addActiveSignin() {
    document?.querySelector('.popupSign')?.classList.add('active');
    document?.querySelector('.signin')?.classList.add('active');
  }

  /**
   * Деактивируем страницу авторизации
   */
  removeActiveSignin() {
    document?.querySelector('.popupSign')?.classList.remove('active');
    document?.querySelector('.signin')?.classList.remove('active');
  }
}
