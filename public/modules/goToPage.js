import { config } from './config.js';

/**
 * Переходит на указанную страницу в зависимости от выбранного заголовка меню.
 * @function goToPage
 * @param {object} header - Объект, представляющий состояние заголовка.
 * @param {HTMLElement} menuLink - Ссылка меню, на которую нужно перейти.
 * @return {void}
 */
export function goToPage(header, menuLink) {
  if (header.state.activeHeader === menuLink) {
    return;
  }

  const lastPage = header.state.activeHeader;

  if (lastPage !== null) {
    const root = document.querySelector('#root');
    root.removeChild(document.querySelector(`.${lastPage.className}`));
  }

  header.state.activeHeader = menuLink;
  config.menu[menuLink.dataset.section].renderObject.render();
}
