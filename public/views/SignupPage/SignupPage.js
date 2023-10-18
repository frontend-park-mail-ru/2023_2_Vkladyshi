import { View } from '../view.js';
import {
  errorInputs,
  header,
  responseStatuses,
  urls,
} from '../../utils/config.js';
import { Signup } from '../../components/Signup/signup.js';
import { returnError } from '../../utils/addError.js';
import {
  validateEmail,
  validateLogin,
  validatePassword,
} from '../../utils/validate.js';
import { post } from '../../utils/ajax.js';
import { goToPageByClassName, goToPageByEvent } from '../../utils/goToPage.js';

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
  constructor() {
    super();
  }

  /**
   * Метод создания страницы
   */
  render() {
    const signup = new Signup();
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

    popup.onclick = (event) => {
      if (event.target.closest('.redirectToSignin')) {
        errorString.classList.remove('active');
        this.removeActiveSignup();
        goToPageByEvent(event);
      } else if (
        event.target.closest('.signup-frame-img') ||
        !event.target.closest('.signup')
      ) {
        document.body.style.paddingRight = '0px';
        errorString.classList.remove('active');
        document.body.classList.remove('none-active');
        this.removeActiveSignup();
      } else if (event.target.closest('.signupButton')) {
        this.registration();
      }
    };
    document.body.classList.add('none-active');
  }

  /**
   * Происходит процесс регистрации юзера
   */
  registration() {
    const signupForm = document.querySelector('.signupForm');

    signupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const login = document.querySelector('.loginInputSignup').value.trim();
      const email = document.querySelector('.emailInput').value.trim();

      const password = document.querySelector('.passwordInputFirst').value;
      const passwordSecond = document.querySelector(
        '.passwordInputSecond'
      ).value;
      const errorClassName = 'errorStringSignup';

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
        console.log('');
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
    });
  }

  /**
   * Запрос на регистрацию
   * @param {string} login логин пользователя
   * @param {string} password пароль пользователя
   * @param {string} email почта юзера
   * @param {string} errorClassName название класса, куда вписывать ошибку
   */
  signupRequest(login, email, password, errorClassName) {
    post({
      url: urls.signup,
      body: { login, email, password },
    }).then((response) => {
      switch (response.data.status) {
        case responseStatuses.success:
          this.signinRequest(login, password);
          this.removeActiveSignup();
          document.body.style.paddingRight = '0px';
          document.body.classList.remove('none-active');
          goToPageByClassName('main');
          break;
        case responseStatuses.alreadyExists:
          returnError(errorInputs.LoginExists, errorClassName);
          break;
        default:
          throw new Error(`Error ${response.data.status}`);
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
      header.addToHeaderEvent(true);
    });
  }

  /**
   * Делаем страницу регистрации активной
   */
  addActiveSignin() {
    document.querySelector('.popupSign').classList.add('active');
    document.querySelector('.signup').classList.add('active');
  }

  /**
   * Деактивируем страницу регистрации
   */
  removeActiveSignup() {
    document.querySelector('.popupSign').classList.remove('active');
    document.querySelector('.signup').classList.remove('active');
  }
}
