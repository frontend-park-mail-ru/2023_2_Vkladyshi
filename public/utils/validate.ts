/**
 * валидация почты
 * @param {string} email почта
 * @return {boolean} результат проверки на валидацию
 */
export function validateEmail (email) {
  const re = /^.+@.+$/;
  return re.test(email);
}

/**
 * валидация пароля
 * @param {string} password пароль
 * @return {{}} результат проверки на валидацию
 */
export function validatePassword (password) {
  if (
    password.length < 8 ||
    !/[A-Z]/.test(password) ||
    !/[a-z]/.test(password) ||
    !/[0-9]/.test(password)
  ) {
    return {
      result: false,
      error:
        'Пароль должен содержать не менее 8 символов, иметь хотя бы одну заглавную букву, строчную букву и цифру'
    };
  }
  return { result: true };
}

/**
 * валидация логина
 * @param {string} login логин
 * @return {{}} результат проверки на валидацию
 */
export function validateLogin (login) {
  const regex = /^[a-zA-Z0-9_-]+$/;
  if (!regex.test(login)) {
    return {
      result: false,
      error: 'Логин должен состоять из букв, цифр, - и _'
    };
  }

  const dangerousChars = ['<', '>', '&', '"', "'", '/', '`'];
  for (let i = 0; i < dangerousChars.length; i++) {
    if (login.includes(dangerousChars[i])) {
      return {
        result: false,
        error: "В логине не должно символов: < > & ' / `"
      };
    }
  }

  return { result: true };
}
