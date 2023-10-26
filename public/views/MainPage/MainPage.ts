import { View } from '../view';
import { checkAuthorized } from '@utils/checkAuthorized';
import { ROOT, header } from '@utils/config';
import { ContentBlock } from '@components/ContentBlock/contentBlock';
import { Footer } from '@components/Footer/footer';
import { FilmSelection } from '@components/FilmSelection/filmSelection';
import { SelectCollection } from '@components/SelectCollection/selectCollection';

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
  constructor(ROOT) {
    super(ROOT);
  }

  /**
   * Метод создания страницы
   */
  async render() {
    const contentBlock = new ContentBlock(ROOT);
    const footer = new Footer(ROOT);
    const filmSelection = new FilmSelection(ROOT);
    let main = document.querySelector('main');
    const headerHTML = document.querySelector('header');

    if (!main) {
      main = document.createElement('main');
      ROOT?.appendChild(main);
    }

    if (!document.querySelector('header')) {
      ROOT?.insertAdjacentHTML('afterbegin', header.render(false));
      header.addToHeaderEvent(false);
    } else {
      main.innerHTML = '';
    }

    if (!document.querySelector('.contentBlock')) {
      main.insertAdjacentHTML('beforeend', contentBlock.render());
       filmSelection.render().then((response) => {
       document.querySelector(".contentBlock")?.insertAdjacentHTML('beforeend', response);
      });
    }

    if (!document.querySelector('.footer')) {
      main.insertAdjacentHTML('beforeend', footer.render());
    }

    checkAuthorized().then((result) => {
      if (result && headerHTML) {
        headerHTML.innerHTML = header.render(true);
        header.addToHeaderEvent(true);
      }
    });
  }
}
