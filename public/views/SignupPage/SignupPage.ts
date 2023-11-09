import { View } from '@views/view';
import { errorInputs, responseStatuses, signup } from '@utils/config';
import { router } from '@router/router';
import { store } from '@store/store';
import {
  actionCSRF,
  actionSignin,
  actionSignup
} from '@store/action/actionTemplates';

import { returnError } from '@utils/addError';
import {
  validateEmail,
  validateLogin,
  validatePassword
} from '@utils/validate';

export interface SignupPage {
  state: {
    statusSignup: number;
    isSubscribed: boolean;
    isUserSubscriber: boolean;
    login: string;
    password: string;
    email: string;
    haveEvent: boolean;
    birthday: string;
  };
}
/**
 * Класс регистрации пользователя
 * @class SignupPage
 * @typedef {SignupPage}
 */
export class SignupPage extends View {
  private popupEvent: (event) => void;
  /**
   * Конструктор для формирования родительского элемента
   * @param ROOT
   * @class
   */
  constructor (ROOT) {
    super(ROOT);
    this.state = {
      statusSignup: 0,
      isSubscribed: false,
      isUserSubscriber: false,
      haveEvent: false,
      login: '',
      password: '',
      email: '',
      birthday: ''
    };

    this.subscribeSignupStatus = this.subscribeSignupStatus.bind(this);
    this.subscribeSigninStatus = this.subscribeSigninStatus.bind(this);
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

    if (!document.querySelector('.signup__main__signup-form')) {
      const result = document.querySelector('.popupSign');
      result!.innerHTML = <string>signup.render();
      this.componentDidMount();
    }
  }

  componentDidMount () {
    const errorString = document.querySelector('.signup__main__error');
    const popup = document.querySelector('.popupSign');

    const popupEvent = (event) => {
      switch (true) {
        case event.target.closest('.redirect-to-signin') !== null:
          errorString?.classList.remove('active');
          popup?.removeEventListener('click', popupEvent);
          this.componentWillUnmount();
          router.go(
            {
              path: '/login',
              props: ''
            },
            { pushState: true, refresh: false }
          );
          break;
        case event.target.closest('.back-img') !== null:
          this.componentWillUnmount();
          router.go(
            {
              path: '/',
              props: ''
            },
            { pushState: true, refresh: false }
          );
          break;
        case event.target.closest('.signup-button') !== null:
          if (!this.state.isSubscribed) {
            store.subscribe('statusSignup', this.subscribeSignupStatus);
            this.state.isSubscribed = true;
          }
          this.popupEvent = popupEvent;
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
      store.unsubscribe('statusSignup', this.subscribeSignupStatus);
      this.state.statusSignup = 0;
      this.state.isSubscribed = false;
    }
    if (this.state.isUserSubscriber) {
      this.state.isUserSubscriber = false;
    }

    popup?.removeEventListener('click', this.popupEvent);
  }

  getForm () {
    const signupForm = document.querySelector('.signup__main__signup-form');
    const loginInputHTML = document.querySelector(
      '.login-inputSignup'
    ) as HTMLInputElement;
    const emailInputHTML = document.querySelector(
      '.emailInput'
    ) as HTMLInputElement;
    const passwordInputFirstHTML = document.querySelector(
      '.password-input-first'
    ) as HTMLInputElement;
    const passwordInputSecondHTML = document.querySelector(
      '.password-input-second'
    ) as HTMLInputElement;
    const birthdayInputHTML = document.querySelector(
      '.dateInput'
    ) as HTMLInputElement;

    const handleSubmit = (event) => {
      event.preventDefault();

      const login = loginInputHTML.value.trim();
      const email = emailInputHTML.value.trim();
      const birthday = birthdayInputHTML.value.trim();
      const password = passwordInputFirstHTML.value;
      const passwordSecond = passwordInputSecondHTML.value;

      signupForm?.removeEventListener('submit', handleSubmit);

      if (this.validateForm(login, password, passwordSecond, email, birthday)) {
        this.state.login = login;
        this.state.password = password;
        this.state.email = email;
        this.state.birthday = birthday;

        store.dispatch(
          actionSignup({
            login: login,
            password: password,
            email: email,
            birthday: birthday
          })
        );
      }
    };

    signupForm?.addEventListener('submit', handleSubmit);
  }

  validateForm (login, password, passwordSecond, email, birthday) {
    const errorClassName = 'signup__main__error';

    if (!login || !email || !password || !passwordSecond || !birthday) {
      returnError(errorInputs.NotAllElements, errorClassName);
      return false;
    }

    if (password !== passwordSecond) {
      returnError(errorInputs.PasswordsNoEqual, errorClassName);
      return false;
    }

    const isValidate = validatePassword(password);
    if (!isValidate.result) {
      returnError(isValidate.error, errorClassName);
      return false;
    }

    if (!validateEmail(email)) {
      returnError(errorInputs.EmailNoValid, errorClassName);
      return false;
    }

    const loginValidate = validateLogin(login);
    if (!loginValidate.result) {
      returnError(loginValidate.error, errorClassName);
      return false;
    }

    return true;
  }

  subscribeSignupStatus () {
    this.state.statusSignup = store.getState('statusSignup');

    if (this.handlerStatus()) {
      store.subscribe('statusLogin', this.subscribeSigninStatus);
      store.dispatch(
        actionSignin({
          login: this.state.login,
          password: this.state.password
        })
      );
    }
  }

  subscribeSigninStatus () {
    if (store.getState('statusLogin')) {
      store.unsubscribe('statusLogin', this.subscribeSigninStatus);
      const popup = document.querySelector('.popupSign');
      popup?.removeEventListener('click', this.popupEvent);

      this.state.statusSignup = 0;
      this.componentWillUnmount();
      router.go(
        {
          path: '/',
          props: ''
        },
        { pushState: true, refresh: false }
      );
      return;
    }

    this.render();
  }

  handlerStatus () {
    const errorClassName = 'signup__main__error';
    switch (this.state.statusSignup) {
      case responseStatuses.success:
        return true;
      case responseStatuses.notAuthorized:
        returnError(errorInputs.LoginOrPasswordError, errorClassName);
        break;
      case responseStatuses.alreadyExists:
        returnError(errorInputs.LoginExists, errorClassName);
        break;
      case responseStatuses.csrfError:
        store.dispatch(actionCSRF()).then((response) => {
          store.dispatch(
            actionSignup({
              login: this.state.login,
              password: this.state.password,
              email: this.state.email
            })
          );
        });
        break;
      default:
        returnError(errorInputs.LoginOrPasswordError, errorClassName);
    }
    return false;
  }
}
