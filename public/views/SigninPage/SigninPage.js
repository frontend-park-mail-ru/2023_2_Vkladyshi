import { View } from '../view.js';
import { Signin } from '../../components/Signin/signin.js';
import {
  header,
  urls,
  responseStatuses,
  errorInputs,
} from '../../utils/config.js';
import {goToPageByClassName, goToPageByEvent} from '../../utils/goToPage.js';
import { returnError } from '../../utils/addError.js';
import { post } from '../../utils/ajax.js';
import { validateLogin, validatePassword } from '../../utils/validate.js';

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
  constructor() {
    super();
  }

  /**
   * Метод создания страницы
   */
  render() {
    const signin = new Signin();

    document.querySelector('.popupSign').innerHTML = signin.render();

    this.addActiveSignin();
    this.addEvents();
  }

   addEvents() {
    const redirectToSignup = document.querySelector('.redirectToSignup');
    const close = document.querySelector('.signin-frame-img');
    const errorString = document.querySelector('.errorStringSignin');
    const signin = document.querySelector('.signin');

    const clickExit = (event) => {
      close.onclick = null;
      redirectToSignup.onclick = null;
      errorString.classList.remove('active')
      document.body.classList.remove('none-active')
      this.removeActiveSignin();
    };

    const redirect = (event) => {
      close.onclick = null;
      redirectToSignup.onclick = null;
      errorString.classList.remove('active')
      this.removeActiveSignin();
      goToPageByEvent(event);
    };

    close.onclick = clickExit;
    redirectToSignup.onclick = redirect;
    document.body.classList.add('none-active')

     signin.addEventListener('submit', (event) => {
       event.preventDefault();
       const login = document.querySelector('.loginInput').value.trim();
       const password = document.querySelector('.passwordInput').value;

       if (!login || !password) {
         returnError(errorInputs.NotAllElements, "errorStringSignin");
         return;
       }

       const loginValidate = validateLogin(login);
       if (!loginValidate.result) {
         returnError(loginValidate.error, "errorStringSignin");
         return;
       }

       const passwordValidate = validatePassword(password);
       if (!passwordValidate.result) {
         returnError(passwordValidate.error, "errorStringSignin");
         return;
       }

       post({
         url: urls.signin,
         body: { login, password },
       }).then((response) => {
         switch (response.data.status) {
           case responseStatuses.success:
             this.removeActiveSignin();
             document.body.classList.remove('none-active')
             goToPageByClassName('main');
             header.render(true);
             break;
           case responseStatuses.notAuthorized:
             returnError(errorInputs.LoginOrPasswordError, "errorStringSignin");
             break;
           default:
             returnError(response.data.status);
         }
       });
     });

  }
  addActiveSignin() {
    document.querySelector('.popupSign').classList.add('active');
    document.querySelector('.signin').classList.add('active');
  }

  removeActiveSignin() {
    document.querySelector('.popupSign').classList.remove('active');
    document.querySelector('.signin').classList.remove('active');
  }

}
