/**
 * Проверяет валидность электронной почты.
 * @function validateEmail
 * @param {string} email - Электронная почта для проверки.
 * @returns {boolean} Результат проверки. `true`, если электронная почта валидна, иначе `false`.
 */
export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Проверяет валидность пароля.
 * @function validatePassword
 * @param {string} password - Пароль для проверки.
 * @return {object} Объект с результатом проверки и, в случае ошибки, сообщением об ошибке.
 * @property {boolean} result - Результат проверки пароля. `true`, если пароль валиден, иначе `false`.
 * @property {string} [error] - Сообщение об ошибке, в случае если пароль не валиден.
 */
export function validatePassword(password) {
  if (
    password.length < 8 ||
    !/[A-Z]/.test(password) ||
    !/[a-z]/.test(password) ||
    !/[0-9]/.test(password)
  ) {
    return {
      result: false,
      error:
        'Пароль должен содержать не менее 8 символов, иметь хотя бы одну заглавную букву, строчную букву и цифру',
    };
  }
  return { result: true };
}
