import { View } from '@views/view';
import { errorInputs, responseStatuses, signup } from '@utils/config';
import { router } from '@router/router';
import { store } from '@store/store';
import {
  actionCSRF,
  actionSignin,
  actionSignup
} from '@store/action/actionTemplates';

import {
  addErrorsActive,
  insertInInput,
  insertText,
  removeErrors,
  removeErrorsActive
} from '@utils/addError';
import {
  validateBirthday,
  validateEmail,
  validateLogin,
  validatePassword
} from '@utils/validate';
import { inputButton } from '@components/inputButton/inputButton';
import { buttonSubmit } from '@components/ButtonSubmit/buttonSubmit';
import { image } from '@components/Image/image';

export interface SignupPage {
  state: {
    statusSignup: number;
    userInfo: {
      email: string;
      password: string;
      passwordSecond: string;
      birthday: string;
      login: string;

    };
    wraps: {};
    inputsHTML: {};
    errorsHTML: {};
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
      haveEvent: false,
      wraps: {},
      inputsHTML: {},
      errorsHTML: {},
      userInfo: {
        login: '',
        password: '',
        passwordSecond: '',
        email: '',
        birthday: ''
      }
    };

    store.subscribe('statusSignup', this.subscribeSignupStatus.bind(this));
  }

  /**
   * Метод создания страницы
   */
  render () {
    if (document.querySelector('.popupSign') == null) {
      this.renderDefaultPage();
      const mainHTML = document.querySelector('main');
      const popup = document.createElement('div');
      popup.classList.add('popupSign');

      mainHTML!.innerHTML = '';
      mainHTML?.insertAdjacentHTML('afterbegin', image.render({}));
      const icon = document.querySelector('.image-container') as HTMLElement;
      icon!.style.backgroundImage = 'url("/icons/loginImage.jpg")';

      const containerHTML = document.querySelector('.image-container');
      containerHTML?.appendChild(popup);
    }

    if (!document.querySelector('.signup-form')) {
      const result = document.querySelector('.popupSign');
      result!.innerHTML = <string>signup.render();
      insertInInput(this.state.inputsHTML, this.state.userInfo);

      const loginText = document.querySelector('.login-text');
      const passwordFirstText = document.querySelector('.login-first-text');
      const passwordSecondText = document.querySelector('.login-second-text');
      const dateText = document.querySelector('.date-text');
      const emailText = document.querySelector('.email-text');
      const button = document.querySelector('.container-login');

      loginText!.insertAdjacentHTML(
        'beforeend',
        inputButton.render({ wrap: 'login', module: 'signup' })
      );
      passwordFirstText!.insertAdjacentHTML(
        'beforeend',
        inputButton.render({
          wrap: 'password-first',
          module: 'signup',
          type: 'password'
        })
      );
      passwordSecondText!.insertAdjacentHTML(
        'beforeend',
        inputButton.render({
          wrap: 'password-second',
          module: 'signup',
          type: 'password'
        })
      );
      dateText!.insertAdjacentHTML(
        'beforeend',
        inputButton.render({ wrap: 'birthday', module: 'signup', type: 'date' })
      );
      emailText!.insertAdjacentHTML(
        'beforeend',
        inputButton.render({ wrap: 'email', module: 'signup' })
      );
      button!.insertAdjacentHTML(
        'afterbegin',
        buttonSubmit.render({ text: 'Войти' })
      );

      this.componentDidMount();
      this.init();
      this.setUserInfo();
    }
  }

  componentDidMount () {
    const popup = document.querySelector('.popupSign');

    const popupEvent = (event) => {
      this.getUserInfo();
      switch (true) {
        case event.target.closest('.redirect-to-signin') !== null:
          this.componentWillUnmount();
          router.go(
            {
              path: '/login',
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
    store.unsubscribe('login', this.redirectToMain.bind(this));
    store.unsubscribe('auth', this.redirectToMain.bind(this));

    const popup = document.querySelector('.popupSign');
    popup?.removeEventListener('click', this.popupEvent);

    const info = this.state.userInfo;
    info.login = '';
    info.password = '';
    info.passwordSecond = '';
    info.email = '';
    info.birthday = '';
  }

  getForm () {
    const elements = this.state.inputsHTML;

    const login = elements['login'].value.trim();
    const email = elements['email'].value.trim();
    const birthday = elements['birthday'].value.trim();
    const password = elements['passwordFirst'].value;
    const passwordSecond = elements['passwordSecond'].value;

    if (this.validateForm(login, password, passwordSecond, email, birthday)) {
      this.state.userInfo['login'] = login;
      this.state.userInfo['passwordFirst'] = password;
      this.state.userInfo['passwordSecond'] = passwordSecond;
      this.state.userInfo['email'] = email;
      this.state.userInfo['birthday'] = birthday;

      store.dispatch(
        actionSignup({
          login: login,
          password: password,
          email: email,
          birthday: birthday
        })
      );
    }
  }

  getUserInfo () {
    this.state.userInfo['login'] = this.state.inputsHTML['login'].value.trim();
    this.state.userInfo['passwordFirst'] =
      this.state.inputsHTML['passwordFirst'].value;
    this.state.userInfo['passwordSecond'] =
      this.state.inputsHTML['passwordSecond'].value;
    this.state.userInfo['birthday'] = this.state.inputsHTML['birthday'].value;
    this.state.userInfo['email'] = this.state.inputsHTML['email'].value;
  }

  validateForm (login, password, passwordSecond, email, birthday) {
    const elements = this.state.errorsHTML;
    const wraps = this.state.wraps;
    let result = true;

    if (!login) {
      insertText(elements['login'], errorInputs.NotAllElement);
      addErrorsActive(wraps['login']);
      result = false;
    } else {
      const loginValidate = validateLogin(login);
      if (!loginValidate.result) {
        insertText(elements['login'], loginValidate.error);
        addErrorsActive(wraps['login']);
        result = false;
      }
    }

    if (!email) {
      insertText(elements['email'], errorInputs.NotAllElement);
      addErrorsActive(wraps['email']);
      result = false;
    } else if (!validateEmail(email)) {
      insertText(elements['email'], errorInputs.EmailNoValid);
      addErrorsActive(wraps['email']);
      result = false;
    }

    if (!password) {
      insertText(elements['passwordFirst'], errorInputs.NotAllElement);
      addErrorsActive(wraps['passwordFirst']);
      result = false;
    }

    if (!passwordSecond) {
      insertText(elements['passwordSecond'], errorInputs.NotAllElement);
      addErrorsActive(wraps['passwordSecond']);
      result = false;
    }

    if (!birthday) {
      insertText(elements['birthday'], errorInputs.NotAllElement);
      addErrorsActive(wraps['birthday']);
      result = false;
    } else {
      const validateResult = validateBirthday(birthday);
      if (!validateResult.result) {
        insertText(elements['birthday'], validateResult.error);
        addErrorsActive(wraps['birthday']);
        result = false;
      }
    }

    const isValidate = validatePassword(password);
    if (!isValidate.result && password.length > 0) {
      insertText(elements['passwordFirst'], isValidate.error);
      result = false;
    }

    if (
      password !== passwordSecond &&
      password.length > 0 &&
      passwordSecond.length > 0
    ) {
      insertText(
        [elements['passwordFirst'], elements['passwordSecond']],
        <string>errorInputs.PasswordsNoEqual
      );
      addErrorsActive([wraps['passwordFirst'], wraps['passwordSecond']]);
      result = false;
    }

    return result;
  }

  subscribeSignupStatus () {
    this.state.statusSignup = store.getState('statusSignup');

    if (this.handlerStatus()) {
      store.unsubscribe('auth', this.redirectToMain.bind(this));
      store.subscribe('login', this.subscribeSigninStatus.bind(this));
      store.dispatch(actionSignin({ login: this.state.userInfo['login'], password: this.state.userInfo['passwordFirst'] }));
    }
  }

  subscribeSigninStatus () {
    if (store.getState('login')) {
      store.unsubscribe('login', this.subscribeSigninStatus.bind(this));
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
    switch (this.state.statusSignup) {
      case responseStatuses.success:
        return true;
      case responseStatuses.notAuthorized:
        insertText(
          this.state.errorsHTML['login'],
          errorInputs.LoginOrPasswordError
        );
        break;
      case responseStatuses.alreadyExists:
        insertText(this.state.errorsHTML['login'], errorInputs.LoginExists);
        break;
      case responseStatuses.invalidError:
        insertText(this.state.errorsHTML['email'], errorInputs.badRequest);
        break;
      case responseStatuses.csrfError:
        store.dispatch(actionCSRF()).then((response) => {
          store.dispatch(
            actionSignup({
              login: this.state.userInfo['login'],
              password: this.state.userInfo['password'],
              email: this.state.userInfo['email']
            })
          );
        });
        break;
      default:
        insertText(this.state.errorsHTML['login'], errorInputs.ServerError);
    }
    return false;
  }

  setUserInfo () {
    insertInInput(this.state.inputsHTML, this.state.userInfo);
  }

  init () {
    const loginHTML = document.querySelector('.login-input-signup');
    const emailHTML = document.querySelector('.email-input-signup');
    const passwordFirstHTML = document.querySelector(
      '.password-first-input-signup'
    );
    const passwordSecondHTML = document.querySelector(
      '.password-second-input-signup'
    );
    const birthdayHTML = document.querySelector('.birthday-input-signup');

    const wrapLogin = document.querySelector('.wrap.login');
    const wrapEmailHTML = document.querySelector('.wrap.email');
    const wrapPassword = document.querySelector('.wrap.password-first');
    const wrapSecondPassword = document.querySelector('.wrap.password-second');
    const wrapBirthdayHTML = document.querySelector('.wrap.birthday');

    const loginError = document.querySelector('.error-login');
    const passwordFirstError = document.querySelector('.error-password-first');
    const passwordSecondError = document.querySelector(
      '.error-password-second'
    );
    const emailError = document.querySelector('.error-email');
    const dateError = document.querySelector('.error-birthday');

    this.state.inputsHTML = {
      login: loginHTML,
      email: emailHTML,
      passwordFirst: passwordFirstHTML,
      passwordSecond: passwordSecondHTML,
      birthday: birthdayHTML
    };
    this.state.wraps = {
      login: wrapLogin,
      email: wrapEmailHTML,
      passwordFirst: wrapPassword,
      passwordSecond: wrapSecondPassword,
      birthday: wrapBirthdayHTML
    };
    this.state.errorsHTML = {
      login: loginError,
      email: emailError,
      passwordFirst: passwordFirstError,
      passwordSecond: passwordSecondError,
      birthday: dateError
    };
  }

  redirectToMain () {
    if (store.getState('login').status === 200) {
      store.unsubscribe('login', this.redirectToMain.bind(this));
      router.go(
        {
          path: '/',
          props: ''
        },
        { pushState: true, refresh: false }
      );
    }
  }
}
