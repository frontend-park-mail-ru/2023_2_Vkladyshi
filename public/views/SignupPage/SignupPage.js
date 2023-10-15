import { View } from '../view.js';
import { errorInputs, responseStatuses, urls } from '../../utils/config.js';
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
  render() {
    const signup = new Signup();
    document.querySelector('.popupSign').innerHTML = signup.render();
    this.addActiveSignin();
    this.addEvents();
  }

  addEvents() {
    const errorString = document.querySelector('.errorStringSignup');
    const signupForm = document.querySelector('.signupForm');
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
      }
    };
    document.body.classList.add('none-active');

    signupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const login = document.querySelector('.loginInputSignup').value.trim();
      const email = document.querySelector('.emailInput').value.trim();

      const password = document.querySelector('.passwordInputFirst').value;
      const passwordSecond = document.querySelector(
        '.passwordInputSecond'
      ).value;

      if (!login || !email || !password || !passwordSecond) {
        returnError(errorInputs.NotAllElements, 'errorStringSignup');
        return;
      }

      if (password !== passwordSecond) {
        returnError(errorInputs.PasswordsNoEqual, 'errorStringSignup');
        return;
      }

      const isValidate = validatePassword(password);
      if (!isValidate.result) {
        returnError(isValidate.error, 'errorStringSignup');
        return;
      }

      if (!validateEmail(email)) {
        returnError(errorInputs.EmailNoValid, 'errorStringSignup');
        return;
      }

      const loginValidate = validateLogin(login);
      if (!loginValidate.result) {
        returnError(loginValidate.error, 'errorStringSignup');
        return;
      }

      post({
        url: urls.signup,
        body: { login, email, password },
      }).then((response) => {
        switch (response.data.status) {
          case responseStatuses.success:
            this.removeActiveSignup();
            document.body.style.paddingRight = '0px';
            document.body.classList.remove('none-active');
            goToPageByClassName('main');
            break;
          case responseStatuses.alreadyExists:
            returnError(errorInputs.LoginExists, 'errorStringSignup');
            break;
          default:
            throw new Error(`Error ${response.data.status}`);
        }
      });
    });
  }

  addActiveSignin() {
    document.querySelector('.popupSign').classList.add('active');
    document.querySelector('.signup').classList.add('active');
  }

  removeActiveSignup() {
    document.querySelector('.popupSign').classList.remove('active');
    document.querySelector('.signup').classList.remove('active');
  }
}
