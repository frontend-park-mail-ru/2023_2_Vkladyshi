import { errorInputs } from '@utils/config';

/**
 * валидация почты
 * @param {string} email почта
 * @return {boolean} результат проверки на валидацию
 */
export const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+$/;
  return re.test(email);
};

/**
 * валидация пароля
 * @param {string} password пароль
 * @return {{}} результат проверки на валидацию
 */
export const validatePassword = (password) => {
  if (!password) {
    return {
      result: false,
      error: errorInputs.NotAllElement
    };
  }
  if (
    password.length < 8 ||
    !/[A-Z]/.test(password) ||
    !/[a-z]/.test(password) ||
    !/[0-9]/.test(password)
  ) {
    return {
      result: false,
      error:
        'Пароль должен содержать не менее 8 символов, иметь хотя бы одну заглавную букву, строчную латинскую букву и цифру'
    };
  }
  return { result: true };
};

/**
 * валидация логина
 * @param {string} login логин
 * @return {{}} результат проверки на валидацию
 */
export const validateLogin = (login) => {
  const regex = /^[a-zA-Z0-9_-]+$/;
  if (!regex.test(login) || login.length < 4) {
    return {
      result: false,
      error: 'Логин должен быть длиннее 4 символов и состоять из латинских букв, цифр, - и _ '
    };
  }

  const dangerousChars = ['<', '>', '&', '"', "'", '/', '`'];
  for (let i = 0; i < dangerousChars.length; i++) {
    if (login.includes(dangerousChars[i])) {
      return {
        result: false,
        error: "В логине не должно спец-символов: < > & ' / `"
      };
    }
  }

  return { result: true };
};

export const validateReview = (str) => {
  if (str && /^[a-zA-Z0-9а-яА-Я\s()!.,?-]+$/.test(str)) {
    return {
      result: true
    };
  } else {
    return {
      result: false,
      error: 'В вашем сообщении не должно быть спец символов.'
    };
  }
};

export const validateBirthday = (date) => {
  const birthdayDate = new Date(date);
  const currentDate = new Date();

  if (birthdayDate.toString() === 'Invalid Date') {
    return {
      result: false,
      error: 'Укажите правильную дату'
    };
  }

  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 114);
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 6);

  if (birthdayDate < minDate || birthdayDate > maxDate) {
    return {
      result: false,
      error: 'Укажите правильную дату'
    };
  }

  return {
    result: true
  };
};
