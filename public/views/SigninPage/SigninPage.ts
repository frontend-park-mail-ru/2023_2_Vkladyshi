import { View } from '@views/view';
import { errorInputs, responseStatuses, signin } from '@utils/config';

import { store } from '@store/store';
import { actionCSRF, actionSignin } from '@store/action/actionTemplates';
import { returnError } from '@utils/addError';
import { validateLogin, validatePassword } from '@utils/validate';
import { router } from '@router/router';
import { response } from 'express';

export interface SigninPage {
  state: {
    statusLogin: number;
    isSubscribed: boolean;
    isUserSubscriber: boolean;
    haveEvent: boolean;
    login: string;
    password: string;
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
      isSubscribed: false,
      isUserSubscriber: false,
      haveEvent: false,
      login: '',
      password: ''
    };

    this.subscribeLoginStatus = this.subscribeLoginStatus.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);

    store.subscribe('statusLogin', this.subscribeLoginStatus);
  }

  /**
   * Метод создания страницы
   */
  render () {
    if (document.querySelector('.popupSign') == null) {
      this.renderDefaultPage();
      const mainHTML = document.querySelector('main');
      const popup = document.createElement('div');
      popup.className = 'popupSign';

      mainHTML!.innerHTML = '';
      mainHTML?.appendChild(popup);
    }

    if (!this.state.isUserSubscriber) {
      this.state.isUserSubscriber = true;
    }

    if (!document.querySelector('.loginForm')) {
      const result = document.querySelector('.popupSign');
      result!.innerHTML = <string>signin.render();

      this.componentDidMount();
    }
  }

  getForm () {
    const signin = document.querySelector('.signin');
    const loginHTML = document.querySelector('.loginInput') as HTMLInputElement;
    const passwordHTML = document.querySelector(
      '.passwordInput'
    ) as HTMLInputElement;

    const handleSubmit = (event) => {
      event.preventDefault();

      const login = loginHTML.value.trim();
      const password = passwordHTML.value;
      signin?.removeEventListener('submit', handleSubmit);

      if (this.validateForm(login, password)) {
        this.state.login = login;
        this.state.password = password;
        store.dispatch(actionSignin({ login: login, password: password }));
      }
    };

    signin?.addEventListener('submit', handleSubmit);
  }

  validateForm (login, password) {
    const errorClassName = 'errorStringSignin';

    if (!login || !password) {
      returnError(errorInputs.NotAllElements, errorClassName);
      return false;
    }

    const loginValidate = validateLogin(login);
    if (!loginValidate.result) {
      returnError(loginValidate.error, errorClassName);
      return false;
    }

    const passwordValidate = validatePassword(password);
    if (!passwordValidate.result) {
      returnError(passwordValidate.error, errorClassName);
      return false;
    }

    return true;
  }

  componentDidMount () {
    const errorString = document.querySelector('.errorStringSignin');
    const popup = document.querySelector('.popupSign');

    const popupEvent = (event) => {
      this.popupEvent = popupEvent;
      switch (true) {
        case event.target.closest('.redirectToSignup') !== null:
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
          this.componentWillUnmount();
          router.go(
            {
              path: '/',
              props: ''
            },
            { pushState: true, refresh: false }
          );
          break;
        case event.target.closest('.buttonLogin') !== null:
          if (!this.state.isSubscribed) {
            this.state.isSubscribed = true;
          }
          this.getForm();
          break;

        default:
          break;
      }
    };
    popup?.addEventListener('click', popupEvent);
  }

  componentWillUnmount () {
    const popup = document.querySelector('.popupSign');

    if (this.state.isSubscribed) {
      store.unsubscribe('statusLogin', this.subscribeLoginStatus);
      this.state.statusLogin = 0;
      this.state.isSubscribed = false;
    }
    if (this.state.isUserSubscriber) {
      this.state.isUserSubscriber = false;
    }

    popup?.removeEventListener('click', this.popupEvent);
  }

  handlerStatus () {
    const errorClassName = 'errorStringSignin';

    switch (this.state.statusLogin) {
      case responseStatuses.success:
        return true;
      case responseStatuses.notAuthorized:
        returnError(errorInputs.LoginOrPasswordError, errorClassName);
        break;
      case responseStatuses.csrfError:
        store.dispatch(actionCSRF()).then(response => {
          store.dispatch(actionSignin({ login: this.state.login, password: this.state.password }));
        });
        break;
      default:
        returnError(errorInputs.LoginOrPasswordError, errorClassName);
    }
    return false;
  }

  subscribeLoginStatus () {
    this.state.statusLogin = store.getState('statusLogin');

    if (this.handlerStatus()) {
      const popup = document.querySelector('.popupSign');
      popup?.removeEventListener('click', this.popupEvent);

      this.state.statusLogin = 0;
      this.componentWillUnmount();
      router.go(
        {
          path: '/',
          props: ''
        },
        { pushState: true, refresh: false });
    }
  }
}
