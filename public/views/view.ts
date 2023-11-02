import { Component } from '../components/component';
import { contentBlock, footer, header, ROOT } from '@utils/config';

/**
 * Родитель всех страниц
 * @class View
 * @typedef {View}
 */
export class View extends Component {
     renderDefaultPage = (isAuth = false) => {
       let main = document.querySelector('main');

       if (main == null) {
         main = document.createElement('main');
         ROOT?.appendChild(main);
       }

       if (!document.querySelector('header')) {
         ROOT?.insertAdjacentHTML('afterbegin', header.render(isAuth));
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
