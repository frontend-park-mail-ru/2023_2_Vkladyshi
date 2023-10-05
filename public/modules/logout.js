import { get } from './ajax.js';
import { urls } from './config.js';

/**
 * Выполняет выход из системы и обновляет состояние заголовка.
 * @function logout
 * @param {object} header - Объект, представляющий заголовок.
 * @return {void}
 */
export function logout(header) {
  get({ url: urls.logout }).then((r) => {});
  header.render(false);
}
