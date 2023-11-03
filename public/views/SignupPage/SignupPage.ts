import { View } from '@views/view';
import { errorInputs, responseStatuses, signup } from '@utils/config';
import { router } from '@router/router';
import { store } from '@store/store';
import { actionAuth, actionSignin, actionSignup } from '@store/action/actionTemplates';
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
    haveEvent: boolean;
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
      password: ''
    };

    this.subscribeSignupStatus = this.subscribeSignupStatus.bind(this);
    this.subscribeSignup = this.subscribeSignup.bind(this);
  }

  /**
   * Метод создания страницы
   */
  render () {
    this.renderDefaultPage();

    if (document.querySelector('.popupSign') == null) {
      const mainHTML = document.querySelector('main');
      const popup = document.createElement('div');
      popup.className = 'popupSign';

      mainHTML!.innerHTML = '';
      mainHTML?.appendChild(popup);
    }

    if (this.handlerStatus()) {
      const popup = document.querySelector('.popupSign');
      popup?.removeEventListener('click', this.popupEvent);

      this.state.statusSignup = 0;
      this.componentWillUnmount();
      router.go(
        {
          path: '/',
          props: ''
        },
        { pushState: true, refresh: false });
      return;
    }

    if (!this.state.isUserSubscriber) {
      store.subscribe('user', this.subscribeSignupStatus);
      this.state.isUserSubscriber = true;
    }

    if (!document.querySelector('.signupForm')) {
      const result = document.querySelector('.popupSign');
      result!.innerHTML = <string>signup.render();
      this.componentDidMount();
    }
  }

  componentDidMount () {
    const errorString = document.querySelector('.errorStringSignup');
    const popup = document.querySelector('.popupSign');

    const popupEvent = (event) => {
      switch (true) {
        case event.target.closest('.redirectToSignin') !== null:
          errorString?.classList.remove('active');
          popup?.removeEventListener('click', popupEvent);
          this.componentWillUnmount();
          router.go(
            {
              path: '/signin',
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
        case event.target.closest('.signupButton') !== null:
          errorString?.classList.remove('active');
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
    const errorElement = document.querySelector(`.errorStringSignup`);
    errorElement?.classList.remove('active');

    if (this.state.isSubscribed) {
      store.unsubscribe('statusSignup', this.subscribeSignupStatus);
      this.state.statusSignup = 0;
      this.state.isSubscribed = false;
    }
    if (this.state.isUserSubscriber) {
      store.unsubscribe('user', this.subscribeSignup);
      this.state.isUserSubscriber = false;
    }

    popup?.removeEventListener('click', this.popupEvent);
  }

  getForm () {
    const signupForm = document.querySelector('.signupForm');
    const loginInoutHTML = document.querySelector(
      '.loginInputSignup'
    ) as HTMLInputElement;
    const emailInputHTML = document.querySelector(
      '.emailInput'
    ) as HTMLInputElement;
    const passwordInputFirstHTML = document.querySelector(
      '.passwordInputFirst'
    ) as HTMLInputElement;
    const passwordInputSecondHTML = document.querySelector(
      '.passwordInputSecond'
    ) as HTMLInputElement;

    const handleSubmit = (event) => {
      event.preventDefault();

      const login = loginInoutHTML.value.trim();
      const email = emailInputHTML.value.trim();
      const password = passwordInputFirstHTML.value;
      const passwordSecond = passwordInputSecondHTML.value;

      signupForm?.removeEventListener('submit', handleSubmit);

      if (this.validateForm(login, password, passwordSecond, email)) {
        store.dispatch(
          actionSignup({ login: login, password: password, email: email })
        );

        this.state.login = login;
        this.state.password = password;
      }
    };

    signupForm?.addEventListener('submit', handleSubmit);
  }

  validateForm (login, password, passwordSecond, email) {
    const errorClassName = 'errorStringSignup';

    if (!login || !email || !password || !passwordSecond) {
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
    this.render();
  }

  subscribeSignup () {
    this.render();
  }

  handlerStatus () {
    const errorClassName = 'errorStringSignup';
    switch (this.state.statusSignup) {
      case responseStatuses.success:
        store.dispatch(
          actionSignin({
            login: this.state.login,
            password: this.state.password
          })
        );
        store.dispatch(actionAuth(true));

        return true;
      case responseStatuses.notAuthorized:
        returnError(errorInputs.LoginOrPasswordError, errorClassName);
        break;
      case responseStatuses.alreadyExists:
        returnError(errorInputs.LoginOrPasswordError, errorClassName);
        break;
      default:
        returnError(errorInputs.LoginOrPasswordError, errorClassName);
    }
    return false;
  }
}
