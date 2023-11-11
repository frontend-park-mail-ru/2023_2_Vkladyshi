import { Component } from '@components/component';
import { contentBlock, footer, header, ROOT } from '@utils/config';
import { store } from '@store/store';
import { actionAuth } from '@store/action/actionTemplates';

/**
 * Родитель всех страниц
 * @class View
 * @typedef {View}
 */
export class View extends Component {
  renderDefaultPage = () => {
    let main = document.querySelector('main');

    if (main == null) {
      main = document.createElement('main');
      ROOT?.appendChild(main);
    }

    if (!document.querySelector('header')) {
      store.dispatch(actionAuth());
      ROOT?.insertAdjacentHTML('afterbegin', header.render());
      header.componentDidMount();
    } else {
      main.innerHTML = '';
    }

    if (document.querySelector('.contentBlock') == null) {
      main.insertAdjacentHTML('beforeend', contentBlock.render());
    }

    if (document.querySelector('.footer') == null) {
      main.insertAdjacentHTML('beforeend', footer.render());
    }
  };
}
