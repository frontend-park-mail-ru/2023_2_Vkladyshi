import { get } from '@utils/ajax';
import { header, urls } from '@utils/config';

/**
 * выход из аккаунта
 */
export function logout() {
  const headerHTML = document.querySelector('header');

  get({ url: urls.logout }).then((response) => {
    if (response["status"]) {
      // @ts-ignore
      headerHTML.innerHTML = header.render(false);
      header.addToHeaderEvent(true);
    }
  });
}
