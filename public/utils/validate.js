/**
 * валидация почты
 * @param email почта
 * @return {boolean} результат проверки на валидацию
 */
export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * валидация пароля
 * @param password
 * @return {{}} результат проверки на валидацию
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
        "Пароль должен содержать не менее 8 символов, иметь хотя бы одну заглавную букву, строчную букву и цифру",
    };
  }
  return { result: true };
}
