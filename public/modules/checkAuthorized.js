import { methods, responseStatuses, urls } from './config.js';

/**
 * Проверяет, авторизован ли пользователь.
 * @returns {Promise<boolean>} Промис, который разрешается значением типа boolean, указывающим, авторизован ли пользователь или нет
 */
export async function checkAuthorized() {
  const response = await fetch(urls.authorized, {
    method: methods.get,
    credentials: 'include',
  });
  return response.status === responseStatuses.success;
}
