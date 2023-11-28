import { Component } from '@components/component';
import { header, ROOT } from '@utils/config';
import { Footer } from '@components/Footer/footer';
import { ContentBlock } from '@components/ContentBlock/contentBlock';

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
      ROOT?.insertAdjacentHTML('afterbegin', header.render());
      header.componentDidMount();
    } else {
      main.innerHTML = '';
    }

    if (!document.querySelector('.content-block')) {
      const contentBlock = new ContentBlock(ROOT);

      main.insertAdjacentHTML('beforeend', contentBlock.render());
    }

    if (!document.querySelector('.footer')) {
      const footer = new Footer(ROOT);

      main.insertAdjacentHTML('beforeend', footer.render());
    }
  };
}
