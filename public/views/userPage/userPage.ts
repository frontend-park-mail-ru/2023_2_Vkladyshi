import { View } from '@views/view';
import { errorInputs, responseStatuses } from '@utils/config';
import { store } from '@store/store';
import {
  actionCSRF,
  actionGetSettings,
  actionLogout,
  actionPutSettings
} from '@store/action/actionTemplates';
import {
  addErrorsActive,
  insertInInput,
  insertText,
  removeErrors,
  removeErrorsActive,
  returnError
} from '@utils/addError';
import {
  validateBirthday,
  validateEmail,
  validateLogin,
  validatePassword
} from '@utils/validate';
import { dateConverter } from '@utils/dateConverter';
import { router } from '@router/router';
import { inputButton } from '@components/inputButton/inputButton';
import { buttonSubmit } from '@components/ButtonSubmit/buttonSubmit';
import { image } from '@components/Image/image';
import { settings } from '@components/Settings/settings';

export interface UserPage {
  state: {
    userStatus: Number;
    result: {};
    userInfo: {};
    inputsHTML: {};
    errorsHTML: {};
    wraps: {};
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
      errorsHTML: {},
      inputsHTML: {},
      wraps: {},
      userInfo: {},
      userStatus: 0,
      result: {
        fileData: new FormData(),
        email: '',
        birthday: '',
        login: '',
        poster: '',
        password: ''
      }
    };

    this.subscribeActorStatus = this.subscribeActorStatus.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);

    store.subscribe('getSettingsStatus', this.subscribeActorStatus);
  }

  /**
   * Метод создания страницы
   */
  render () {
    store.subscribe('unmount', this.componentWillUnmount);
    this.renderDefaultPage();
    store.dispatch(actionGetSettings());

    const mainHTML = document.querySelector('main');
    mainHTML!.innerHTML = '';

    mainHTML?.insertAdjacentHTML(
      'beforeend',
      settings.render(this.state.userInfo)
    );

    const descHTML = document.querySelector('.settings');
    mainHTML?.insertAdjacentHTML('afterbegin', image.render({}));

    const icon = document.querySelector('.image-container') as HTMLElement;
    icon!.style.backgroundImage = 'url("/icons/loginImage.jpg")';

    const containerHTML = document.querySelector('.image-container');
    containerHTML?.appendChild(descHTML!);

    const loginText = document.querySelector('.login-text');
    const passwordFirstText = document.querySelector('.login-first-text');
    const passwordSecondText = document.querySelector('.login-second-text');
    const dateText = document.querySelector('.date-text');
    const emailText = document.querySelector('.email-text');
    const buttons = document.querySelector('.user-data-buttons');

    loginText!.insertAdjacentHTML(
      'beforeend',
      inputButton.render({ wrap: 'login', module: 'user-data' })
    );

    passwordFirstText!.insertAdjacentHTML(
      'beforeend',
      inputButton.render({
        wrap: 'password-first',
        module: 'user-data',
        type: 'password'
      })
    );
    passwordSecondText!.insertAdjacentHTML(
      'beforeend',
      inputButton.render({
        wrap: 'password-second',
        module: 'user-data',
        type: 'password'
      })
    );
    dateText?.insertAdjacentHTML(
      'beforeend',
      inputButton.render({
        wrap: 'birthday',
        module: 'user-data',
        type: 'date'
      })
    );
    emailText?.insertAdjacentHTML(
      'beforeend',
      inputButton.render({ wrap: 'email', module: 'user-data' })
    );

    buttons?.insertAdjacentHTML(
      'beforeend',
      buttonSubmit.render({ text: 'Сохранить' })
    );

    this.componentDidMount();
  }

  componentDidMount () {
    const blockHTML = document.querySelector('.settings');
    const popupEvent = (event) => {
      switch (true) {
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
    blockHTML?.addEventListener('click', popupEvent);
  }

  getForm () {
    const elements = this.state.inputsHTML;

    const login = elements['login'].value.trim();
    const email = elements['email'].value;
    const birthday = elements['birthday'].value;
    const password = elements['passwordFirst'].value;
    const passwordSecond = elements['passwordSecond'].value;
    const file = elements['file']?.files[0];
    const data = new FormData();

    data.append('login', login);
    data.append('email', email);
    data.append('password', password);
    data.append('birthday', birthday);
    data.append('photo', file);

    if (
      this.validateForm(login, password, passwordSecond, email, file, birthday)
    ) {
      store.dispatch(actionPutSettings({ file: data })).then((response) => {
        if (response!['postStatusSettings'] === 200) {
          this.setUserInfo();
          if (login !== this.state.userInfo['login'] || password.length > 0) {
            store.dispatch(actionLogout({ redirect: true }));
          } else {
            router.refresh();
          }
        }
      });
    }
  }

  validateForm (login, password, passwordSecond, email, file, birthday) {
    const elements = this.state.errorsHTML;
    const object = this.state.userInfo;
    const wraps = this.state.wraps;
    const birthdayResult = dateConverter(birthday);
    let result = true;

    if (
      object['login'] === login &&
      object['email'] === email &&
      password === '' &&
      passwordSecond === '' &&
      file === undefined &&
      object['birthday'] === birthdayResult
    ) {
      insertText(elements, 'Ничего не изменено');
      addErrorsActive(wraps);
      return false;
    }

    if ((file && file?.type?.startsWith('image/')) || file === undefined) {
    } else {
      insertText(document.querySelector('.error-image'), 'Ошибка: Загруженный файл не является изображением');
      result = false;
    }

    const settingsFile = document.querySelector('.settings_file') as HTMLElement;
    // @ts-ignore
    settingsFile.value = null;

    if (!login) {
      insertText(elements['login'], errorInputs.NotAllElement);
      addErrorsActive(wraps['login']);
      result = false;
    }

    if (!email) {
      insertText(elements['email'], errorInputs.NotAllElement);
      addErrorsActive(wraps['email']);
      result = false;
    }

    if ((!password && passwordSecond) || (password && !passwordSecond)) {
      insertText(
        [elements['passwordFirst'], elements['passwordSecond']],
        errorInputs.NotAllElement
      );

      addErrorsActive([wraps['passwordFirst'], wraps['passwordSecond']]);
      result = false;
    } else {
      const passwordValidate = validatePassword(password);
      if (!passwordValidate.result && password.length > 0) {
        insertText(elements['passwordFirst'], passwordValidate.error);
        addErrorsActive(wraps['passwordFirst']);
        result = false;
      }
    }

    if (!birthdayResult) {
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

    if (!validateEmail(email) && email.length > 0) {
      insertText(elements['email'], errorInputs.EmailNoValid);
      result = false;
    }

    const loginValidate = validateLogin(login);
    if (!loginValidate.result && login.length > 0) {
      insertText(elements['login'], loginValidate.error);
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

  componentWillUnmount () {
    store.unsubscribe('unmount', this.componentWillUnmount);
    const popup = document.querySelector('.content-block');
    popup?.removeEventListener('submit', this.popupEvent);
  }

  handlerStatus () {
    const errorClassName = 'change-user-data__error';

    switch (this.state.userStatus) {
      case responseStatuses.success:
        return true;
      case responseStatuses.notAuthorized:
        router.go(
          {
            path: '/login',
            props: ``
          },
          { pushState: true, refresh: false }
        );
        break;
      case responseStatuses.alreadyExists:
        returnError(errorInputs.LoginExists, errorClassName);
        break;
      case responseStatuses.csrfError:
        store.dispatch(actionCSRF()).then((response) => {
          store.dispatch(
            actionPutSettings({ file: this.state.userInfo['fileData'] })
          );
        });

        break;
      default:
        returnError(errorInputs.LoginOrPasswordError, errorClassName);
    }
    return false;
  }

  subscribeActorStatus () {
    const result = store.getState('getSettingsStatus');
    this.state.userStatus = result.status;

    if (!this.handlerStatus()) {
      return;
    }

    const userInfo = result.body;
    if (userInfo) {
      this.state.userInfo = {
        userSettings: true,
        header: userInfo['name'],
        email: userInfo['email'],
        birthday: dateConverter(userInfo['birthday']),
        login: userInfo['login'],
        poster: userInfo['photo'],
        infoText: userInfo['info_text'],
        country: userInfo['country'],
        career: userInfo['career']
      };
    }

    this.init();
    this.setUserInfo();
  }

  setUserInfo () {
    const photo = document.querySelector('.settings__img') as HTMLElement;
    // @ts-ignore
    photo.src = this.state.userInfo['poster'];

    insertInInput(this.state.inputsHTML, this.state.userInfo);
  }

  init () {
    const loginHTML = document.querySelector('.login-input-user-data');
    const emailHTML = document.querySelector('.email-input-user-data');
    const passwordFirstHTML = document.querySelector(
      '.password-first-input-user-data'
    );
    const passwordSecondHTML = document.querySelector(
      '.password-second-input-user-data'
    );
    const birthdayHTML = document.querySelector('.birthday-input-user-data');

    const wrapLogin = document.querySelector('.wrap.login');
    const wrapEmailHTML = document.querySelector('.wrap.email');
    const wrapPassword = document.querySelector('.wrap.password-first');
    const wrapSecondPassword = document.querySelector('.wrap.password-second');
    const wrapBirthdayHTML = document.querySelector('.wrap.birthday');

    const fileInputHTML = document.querySelector('.settings_file');

    const loginError = document.querySelector('.error-login');
    const passwordFirstError = document.querySelector('.error-password-first');
    const passwordSecondError = document.querySelector(
      '.error-password-second'
    );
    const emailError = document.querySelector('.error-email');
    const dateError = document.querySelector('.error-birthday');
    const imageError = document.querySelector('.error-image');

    this.state.inputsHTML = {
      login: loginHTML,
      email: emailHTML,
      passwordFirst: passwordFirstHTML,
      passwordSecond: passwordSecondHTML,
      birthday: birthdayHTML,
      file: fileInputHTML
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
      birthday: dateError,
      image: imageError
    };
  }
}
