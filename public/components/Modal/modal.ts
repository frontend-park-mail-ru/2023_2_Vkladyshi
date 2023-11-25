import { Component } from '@components/component';
import * as templateModal from '@components/Modal/modal.hbs';
import { ROOT } from '@utils/config';

/**
 * Класс создания modal
 * @class Modal
 * @typedef {Modal}
 */
export class Modal extends Component {
  /**
   * Метод для рендеринга HTML кода
   * @param info
   * @return {string} html нижней панели
   */
  render (info) {
    return templateModal(info);
  }
  displayActive () {
    const modalHTML = document.querySelector('.modal');
    modalHTML?.classList.remove('none-active-modal');
    modalHTML?.classList.add('active-modal');

    const contentBlockHTML = document.querySelector('.content-block') as HTMLElement;
    const headerHTML = document.querySelector('header') as HTMLElement;
    contentBlockHTML.style.opacity = '0.6';
    headerHTML.style.opacity = '0.6';
  }

  displayNone () {
    const modalHTML = document.querySelector('.modal');
    const contentBlockHTML = document.querySelector('.content-block') as HTMLElement;
    const headerHTML = document.querySelector('header') as HTMLElement;
    // const bodyHTML = document.querySelector('.modal__window__body');
    // const butHTML = document.querySelector('.modal__window__body');

    headerHTML.style.opacity = '1';
    modalHTML?.classList.add('none-active-modal');
    modalHTML?.classList.remove('active-modal');
    contentBlockHTML.style.opacity = '1';
  }
}

export const modal = new Modal(ROOT);
