import { View } from '../view.js';
import { ROOT } from '../../utils/config.js';
import { FilmSelection } from '../../components/FilmSelection/filmSelection.js';
import { ContentBlock } from '../../components/ContentBlock/contentBlock.js';
import { Footer } from '../../components/Footer/footer.js';

/**
 * Класс формирования подборки фильмов
 * @class FilmSelectionPage
 * @typedef {FilmSelectionPage}
 */
export class FilmSelectionPage extends View {
  /**
   * Конструктор для формирования родительского элемента
   * @class
   */
  constructor() {
    super();
  }

  /**
   * Метод создания страницы
   * @param content объект JSON
   */
  async render(content = null) {
    const filmSelection = new FilmSelection();
    const main = document.querySelector('main');
    const select = document.querySelector('.filmSelection');
    const contentBlock = document.querySelector('.contentBlock');
    const popupSelectCollection = document.querySelector('.popupSelectCollection');

    if (main || !select) {
      popupSelectCollection.classList.remove('active');
      if (content !== null) {
        contentBlock.innerHTML = filmSelection.renderTemplate(content);
      } else {
        filmSelection.render().then((value) => {
          contentBlock.insertAdjacentHTML('beforeend', value);
        });
      }
    }
  }
}
