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
      // @ts-ignore
      // document.querySelector('header')?.style.opacity = 1;
      // @ts-ignore
      // header?.style.visibility = 'visible';
      // document.querySelector('header')?.style.visibility = 'visible';
    } else {
      main.innerHTML = '';
    }

    if (document.querySelector('.content-block') == null) {
      main.insertAdjacentHTML('beforeend', contentBlock.render());
    }

    if (document.querySelector('.footer') == null) {
      main.insertAdjacentHTML('beforeend', footer.render());
    }

    // @ts-ignore
    document.querySelector('header')?.style.opacity = 1;
    // @ts-ignore
    document.querySelector('header')?.style.visibility = 'visible';
  };
}
