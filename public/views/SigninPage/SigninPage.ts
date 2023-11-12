import { View } from '@views/view';
import { errorInputs, responseStatuses, signin } from '@utils/config';
import { store } from '@store/store';
import { actionCSRF, actionSignin } from '@store/action/actionTemplates';
import {
  addErrorsActive,
  insertInInput,
  insertText,
  removeErrors,
  removeErrorsActive
} from '@utils/addError';
import { validateLogin, validatePassword } from '@utils/validate';
import { router } from '@router/router';
import { inputButton } from '@components/inputButton/inputButton';
import { buttonSubmit } from '@components/ButtonSubmit/buttonSubmit';
import { image } from '@components/Image/image';


export interface SigninPage {
  state: {
    statusLogin: number;
    haveEvent: boolean;
    userInfo: {};
    wraps: {};
    inputsHTML: {};
    errorsHTML: {};
  };
}

/**
 * Класс регистрации пользователя
 * @class SigninPage
 * @typedef {SigninPage}
 */
export class SigninPage extends View {
  private popupEvent: (event) => void;
  /**
   * Конструктор класса
   * @param ROOT
   */
  constructor (ROOT) {
    super(ROOT);
    this.state = {
      statusLogin: 0,
      haveEvent: false,
      wraps: {},
      inputsHTML: {},
      errorsHTML: {},
      userInfo: {}
    };

    this.subscribeLoginStatus = this.subscribeLoginStatus.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.redirectToMain = this.redirectToMain.bind(this);

  }

  /**
   * Метод создания страницы
   */
  render () {
    store.subscribe('statusAuth', this.redirectToMain);

    if (store.getState('statusLogin') === 200 || store.getState('statusAuth') === 200) {
      router.go(
        {
          path: '/',
          props: ''
        },
        { pushState: true, refresh: false }
      );
    }

    if (document.querySelector('.popupSign') == null) {
      this.renderDefaultPage();
      const mainHTML = document.querySelector('main');
      const popup = document.createElement('div');
      popup.classList.add('popupSign');

      mainHTML!.innerHTML = '';
      mainHTML?.insertAdjacentHTML('afterbegin', image.render({ urlImage: 'loginImage.jpg' }));
      const containerHTML = document.querySelector('.image-container');
      containerHTML?.appendChild(popup);
    }

    if (!document.querySelector('.login-form')) {
      const result = document.querySelector('.popupSign');
      result!.innerHTML = <string>signin.render();

      const loginText = document.querySelector('.login-text');
      const passwordText = document.querySelector('.password-text');
      const button = document.querySelector('.container-login');

      loginText!.insertAdjacentHTML(
        'beforeend',
        inputButton.render({ wrap: 'login', module: 'signin' })
      );
      passwordText!.insertAdjacentHTML(
        'beforeend',
        inputButton.render({
          wrap: 'password',
          module: 'signin',
          type: 'password'
        })
      );
      button!.insertAdjacentHTML('afterbegin', buttonSubmit.render({ text: 'Войти' }));

      this.componentDidMount();
      this.init();
      this.setUserInfo();
      store.subscribe('statusLogin', this.subscribeLoginStatus);
    }
  }

  getForm () {
    const signin = document.querySelector('.signin');

    const login = this.state.userInfo['login'];
    const password = this.state.userInfo['password'];

    if (this.validateForm(login, password)) {
      store.dispatch(actionSignin({ login: login, password: password }));
    }
  }

  validateForm (login, password) {
    const elements = this.state.errorsHTML;
    const wraps = this.state.wraps;
    let result = true;

    if (!login) {
      insertText(elements['login'], errorInputs.NotAllElement);
      addErrorsActive(wraps['login']);
      result = false;
    }

    if (!password) {
      insertText(elements['password'], errorInputs.NotAllElement);
      addErrorsActive(wraps['password']);
      result = false;
    }

    const loginValidate = validateLogin(login);
    if (!loginValidate.result && login.length > 0) {
      insertText(elements['login'], loginValidate.error);
      addErrorsActive(wraps['login']);
      result = false;
    }

    const passwordValidate = validatePassword(password);
    if (!passwordValidate.result && password.length > 0) {
      insertText(elements['password'], passwordValidate.error);
      addErrorsActive(wraps['password']);
      result = false;
    }

    return result;
  }

  componentDidMount () {
    const popup = document.querySelector('.popupSign');

    const popupEvent = (event) => {
      this.getUserInfo();
      switch (true) {
        case event.target.closest('.redirect-to-signup') !== null:
          store.unsubscribe('statusLogin', this.subscribeLoginStatus);
          this.componentWillUnmount();
          router.go(
            {
              path: '/registration',
              props: ''
            },
            { pushState: true, refresh: false }
          );
          break;
        case event.target.closest('.sign-frame-img') !== null:
          store.unsubscribe('statusLogin', this.subscribeLoginStatus);
          this.componentWillUnmount();
          router.go(
            {
              path: '/',
              props: ''
            },
            { pushState: true, refresh: false }
          );
          break;
        case event.target.closest('.button-submit') !== null:
          event.preventDefault();
          removeErrors(this.state.errorsHTML);
          removeErrorsActive(this.state.wraps);
          this.getForm();
          break;
        default:
          break;
      }
    };

    this.popupEvent = popupEvent;
    popup?.addEventListener('click', popupEvent);
  }

  componentWillUnmount () {
    const popup = document.querySelector('.popupSign');
    this.state.statusLogin = 0;
    popup?.removeEventListener('click', this.popupEvent);
  }

  handlerStatus () {
    switch (this.state.statusLogin) {
      case responseStatuses.success:
        return true;
      case responseStatuses.notAuthorized:
        insertText(this.state.errorsHTML, errorInputs.LoginOrPasswordError);
        break;
      case responseStatuses.csrfError:
        store.dispatch(actionCSRF()).then((response) => {
          store.dispatch(
            actionSignin({
              login: this.state.userInfo['login'],
              password: this.state.userInfo['password']
            })
          );
        });
        break;
      default:
        insertText(
          document.querySelector('.error-login'),
          errorInputs.ServerError
        );
        break;
    }

    return false;
  }

  getUserInfo () {
    this.state.userInfo['login'] = this.state.inputsHTML['login'].value.trim();
    this.state.userInfo['password'] = this.state.inputsHTML['password'].value;
  }

  setUserInfo () {
    insertInInput(this.state.inputsHTML, this.state.userInfo);
  }

  subscribeLoginStatus () {
    this.state.statusLogin = store.getState('statusLogin');

    if (this.handlerStatus()) {
      store.unsubscribe('statusAuth', this.redirectToMain);

      store.unsubscribe('statusLogin', this.subscribeLoginStatus);
      const popup = document.querySelector('.popupSign');
      popup?.removeEventListener('click', this.popupEvent);
      localStorage.setItem('userName', this.state.userInfo['login']);

      this.state.statusLogin = 0;
      this.componentWillUnmount();

      this.state.userInfo['login'] = '';
      this.state.userInfo['password'] = '';

      router.go(
        {
          path: '/',
          props: ''
        },
        { pushState: true, refresh: false }
      );
    }
  }

  redirectToMain () {
    if (store.getState('statusAuth') === 200) {
      store.unsubscribe('statusAuth', this.redirectToMain);
      router.go(
        {
          path: '/',
          props: ''
        },
        { pushState: true, refresh: false }
      );
    }
  }

  init () {
    const errorLogin = document.querySelector('.error-login');
    const errorPassword = document.querySelector('.error-password');
    const login = document.querySelector('.login-input-signin');
    const password = document.querySelector('.password-input-signin');
    const wrapLogin = document.querySelector('.wrap.login');
    const wrapPassword = document.querySelector('.wrap.password');

    this.state.inputsHTML = { login: login, password: password };
    this.state.wraps = { login: wrapLogin, password: wrapPassword };
    this.state.errorsHTML = { login: errorLogin, password: errorPassword };
  }
}
