import { View } from '@views/view';
import {
  desc,
  info,
  changeUserData,
  errorInputs,
  responseStatuses
} from '@utils/config';
import { store } from '@store/store';
import {
  actionCSRF,
  actionGetSettings,
  actionPutSettings,
  actionSignup
} from '@store/action/actionTemplates';
import { returnError } from '@utils/addError';
import {
  validateEmail,
  validateLogin,
  validatePassword
} from '@utils/validate';
import { router } from '@router/router';

export interface UserPage {
  state: {
    userInfo: Number;
    fileData: FormData;
  };
}

/**
 * Класс формирование страницы фильма
 * @class UserPage
 * @typedef {UserPage}
 */
export class UserPage extends View {
  private popupEvent: (event) => void;

  /**
   * Конструктор класса
   * @param ROOT
   */
  constructor (ROOT) {
    super(ROOT);
    this.state = {
      userInfo: 0,
      fileData: new FormData()
    };

    this.subscribeActorStatus = this.subscribeActorStatus.bind(this);

    store.subscribe('getSettingsStatus', this.subscribeActorStatus);
    // store.subscribe('postSettingsStatus', this.subscribeActorStatus);
  }

  /**
   * Метод создания страницы
   */
  render () {
    this.renderDefaultPage();
    store.dispatch(actionGetSettings());
  }

  componentDidMount () {
    const contentBlockHTML = document.querySelector('.contentBlock');

    const popupEvent = (event) => {
      this.popupEvent = popupEvent;
      switch (true) {
        case event.target.closest('.check__all_comments') !== null:
          this.componentWillUnmount();
          router.go(
            {
              path: '/comments',
              props: '/user'
            },
            { pushState: true, refresh: false }
          );
          break;
        case event.target.closest('.ChangeUserData__form__apply') !== null:
          this.getForm();
          break;

        default:
          break;
      }
    };
    contentBlockHTML?.addEventListener('click', popupEvent);
  }

  getForm () {
    const loginInputHTML = document.querySelector(
      '.login__input__signup'
    ) as HTMLInputElement;
    const emailInputHTML = document.querySelector(
      '.email__input__signup'
    ) as HTMLInputElement;
    const passwordInputFirstHTML = document.querySelector(
      '.password__input__signup'
    ) as HTMLInputElement;
    const passwordInputSecondHTML = document.querySelector(
      '.second_password__input__signup'
    ) as HTMLInputElement;
    const popup = document.querySelector('.ChangeUserData');

    const handleSubmit = (event) => {
      event.preventDefault();

      const login = loginInputHTML.value.trim();
      const email = emailInputHTML.value.trim();
      const password = passwordInputFirstHTML.value;
      const passwordSecond = passwordInputSecondHTML.value;

      popup?.removeEventListener('submit', handleSubmit);

      const fileInput = document.querySelector(
        '.settings_file'
      ) as HTMLInputElement;
      const file = fileInput.files![0];
      const data = this.state.fileData;

      data.append('login', login);
      data.append('email', email);
      data.append('password', password);
      data.append('file', file);

      if (this.validateForm(login, email, password, passwordSecond)) {
        store.dispatch(actionPutSettings({ file: data }));
      }
    };

    this.popupEvent = handleSubmit;
    popup?.addEventListener('submit', handleSubmit);
  }

  validateForm (login, email, password, passwordSecond) {
    const errorClassName = 'error_string_settings';

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

    const passwordValidate = validatePassword(password);
    if (!passwordValidate.result) {
      returnError(passwordValidate.error, errorClassName);
      return false;
    }

    return true;
  }

  componentWillUnmount () {
    const popup = document.querySelector('.contentBlock');

    popup?.removeEventListener('submit', this.popupEvent);
  }

  handlerStatus () {
    const errorClassName = 'error_string_settings';
    switch (this.state.userInfo) {
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
          store.dispatch(actionPutSettings({ file: this.state.fileData }));
        });
        break;
      default:
        returnError(errorInputs.LoginOrPasswordError, errorClassName);
    }
    return false;
  }

  subscribeActorStatus () {
    const status = store.getState('getSettingsStatus');
    this.state.userInfo = status.status;

    if (!this.handlerStatus()) {
      return;
    }

    let result;

    const res = status.body;
    if (res) {
      result = {
        userSettings: true,
        header: res['name'],
        email: res['email'],
        login: res['login'],
        poster: res['photo'],
        infoText: res['info_text'],
        country: res['country'],
        career: res['career']
      };
    }
    const contentBlockHTML = document.querySelector('.contentBlock');
    if (contentBlockHTML != null) {
      contentBlockHTML.insertAdjacentHTML('beforeend', desc.render(result));

      contentBlockHTML.insertAdjacentHTML(
        'beforeend',
        changeUserData.render(result)
      );
      contentBlockHTML.insertAdjacentHTML('beforeend', info.render(result));
    }

    this.componentDidMount();
  }
}
