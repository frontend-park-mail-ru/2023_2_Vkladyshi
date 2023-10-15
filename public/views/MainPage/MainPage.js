import { View } from '../view.js';
import { checkAuthorized } from '../../utils/checkAuthorized.js';
import { ROOT, header } from '../../utils/config.js';
import { ContentBlock } from '../../components/ContentBlock/contentBlock.js';
import { Footer } from '../../components/Footer/footer.js';
import { FilmSelection } from '../../components/FilmSelection/filmSelection.js';
import { SelectCollection } from '../../components/SelectCollection/selectCollection.js';

/**
 * Класс формирования главной страницы
 * @class MainPage
 * @typedef {MainPage}
 */
export class MainPage extends View {
  /**
   * Конструктор для формирования родительского элемента
   * @class
   */
  constructor() {
    super();
  }

  /**
   * Метод создания страницы
   */
  async render() {
    const contentBlock = new ContentBlock();
    const footer = new Footer();
    const filmSelection = new FilmSelection();
    const selectCollection = new SelectCollection();
    let main = document.querySelector('main');
    let popup = document.querySelector('.popupSign');

    if (!main) {
      main = document.createElement('main');
      ROOT.appendChild(main);
    }

    if (!document.querySelector('header')) {
      ROOT.insertAdjacentHTML('afterbegin', header.render(false));
      header.addToHeaderEvent(false);
    } else {
      main.innerHTML = '';
    }

    popup = document.createElement('div');
    popup.className = 'popupSign';
    main.appendChild(popup);

    if (!document.querySelector('.contentBlock')) {
      main.insertAdjacentHTML('beforeend', selectCollection.render());
      main.insertAdjacentHTML('beforeend', contentBlock.render());
      await filmSelection.render().then((response) => {
        document
          .querySelector('.contentBlock')
          .insertAdjacentHTML('beforeend', response);
      });
    }

    if (!document.querySelector('.footer')) {
      main.insertAdjacentHTML('beforeend', footer.render());
    }

    checkAuthorized().then((result) => {
      if (result) {
        document.querySelector('header').innerHTML = header.render(true);
        header.addToHeaderEvent(true);
      }
    });
  }
}
