import { get } from './ajax.js';
import { header, urls } from './config.js';

/**
 * выход из аккаунта
 */
export function logout() {
  get({ url: urls.logout }).then((response) => {
    if (response.data.status) {
      document.querySelector('header').innerHTML = header.render(false);
      header.addToHeaderEvent(true);
    }
  });
}
