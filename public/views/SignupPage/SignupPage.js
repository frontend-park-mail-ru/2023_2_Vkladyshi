import { View } from '../view.js';
import {
  errorInputs,
  header,
  responseStatuses,
  ROOT,
  urls,
} from '../../utils/config.js';
import { Signup } from '../../components/Signup/signup.js';
import { returnError } from '../../utils/addError.js';
import {
  validateEmail,
  validatePassword,
  validateLogin,
} from '../../utils/validate.js';
import { post } from '../../utils/ajax.js';
import { goToPageByClassName } from '../../utils/goToPage.js';

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
    let main;

    if (!document.querySelector('main') || !document.querySelector('.signup')) {
      ROOT.removeChild(document.querySelector('main'));
      main = document.createElement('main');
      ROOT.appendChild(main);
      main.innerHTML = signup.render();
    }

    header.addToHeaderEvent(false);

    const signupForm = document.querySelector('.signupForm');
    signupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const login = document.querySelector('.loginInputSignup').value.trim();
      const email = document.querySelector('.emailInput').value.trim();

      const password = document.querySelector('.passwordInputFirst').value;
      const passwordSecond = document.querySelector(
        '.passwordInputSecond'
      ).value;

      if (!login || !email || !password || !passwordSecond) {
        returnError(errorInputs.NotAllElements);
        return;
      }

      if (password !== passwordSecond) {
        returnError(errorInputs.PasswordsNoEqual);
        return;
      }

      const isValidate = validatePassword(password);
      if (!isValidate.result) {
        returnError(isValidate.error);
        return;
      }

      if (!validateEmail(email)) {
        returnError(errorInputs.EmailNoValid);
        return;
      }

      const loginValidate = validateLogin(login);
      if (!loginValidate.result) {
        returnError(loginValidate.error);
        return;
      }

      post({
        url: urls.signup,
        body: { login, password },
      }).then((response) => {
        switch (response.status) {
          case responseStatuses.success:
            goToPageByClassName('main');
            break;
          case responseStatuses.alreadyExists:
            returnError(errorInputs.LoginExists);
            break;
          default:
            throw new Error(`Error ${response.status}`);
        }
      });
    });
  }
}
