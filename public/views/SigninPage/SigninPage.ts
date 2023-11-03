import { View } from '@views/view';
import { errorInputs, responseStatuses, signin } from '@utils/config';
import { store } from '@store/store';
import { actionAuth, actionSignin } from '@store/action/actionTemplates';
import { returnError } from '@utils/addError';
import { validateLogin, validatePassword } from '@utils/validate';
import { router } from '@router/router';

export interface SigninPage {
  state: {
    statusLogin: number;
    isSubscribed: boolean;
    isUserSubscriber: boolean;
    haveEvent: boolean;
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
      haveEvent: false
    };

    this.subscribeLoginStatus = this.subscribeLoginStatus.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.subscribeLogin = this.subscribeLogin.bind(this);
  }

  /**
   * Метод создания страницы
   */
  render () {
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

      this.state.statusLogin = 0;
      this.componentWillUnmount();
      router.go(
        {
          path: '/',
          props: '/'
        },
        { pushState: false, refresh: false }
      );
      return;
    }

    if (!this.state.isUserSubscriber) {
      store.subscribe('user', this.subscribeLoginStatus);
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
              path: '/signup',
              props: '/signup'
            },
            { pushState: true, refresh: false }
          );
          break;

        case event.target.closest('.sign-frame-img') !== null:
          this.componentWillUnmount();
          router.go(
            {
              path: '/',
              props: '/'
            },
            { pushState: true, refresh: false }
          );
          break;

        case event.target.closest('.buttonLogin') !== null:
          if (!this.state.isSubscribed) {
            store.subscribe('statusLogin', this.subscribeLoginStatus);
            this.state.isSubscribed = true;
          }
          errorString?.classList.remove('active');
          this.getForm();
          break;

        default:
          break;
      }
    };
    popup?.addEventListener('click', popupEvent);
  }

  componentWillUnmount () {
    const errorElement = document.querySelector(`.errorStringSignin`);
    const popup = document.querySelector('.popupSign');
    errorElement?.classList.remove('active');

    if (this.state.isSubscribed) {
      store.unsubscribe('statusLogin', this.subscribeLoginStatus);
      this.state.statusLogin = 0;
      this.state.isSubscribed = false;
    }
    if (this.state.isUserSubscriber) {
      store.unsubscribe('user', this.subscribeLogin);
      this.state.isUserSubscriber = false;
    }

    popup?.removeEventListener('click', this.popupEvent);
  }

  handlerStatus () {
    const errorClassName = 'errorStringSignin';

    switch (this.state.statusLogin) {
      case responseStatuses.success:
        store.dispatch(actionAuth(true));
        store.unsubscribe('statusLogin', this.subscribeLoginStatus);
        return true;
      case responseStatuses.notAuthorized:
        returnError(errorInputs.LoginOrPasswordError, errorClassName);
        break;
      default:
        returnError(errorInputs.LoginOrPasswordError, errorClassName);
    }
    return false;
  }

  subscribeLoginStatus () {
    this.state.statusLogin = store.getState('statusLogin');
    this.render();
  }

  subscribeLogin () {
    this.render();
  }
}
