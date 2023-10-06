import { Footer } from '../footer/footer.js';
import { FilmSelection } from '../filmSelection/filmSelection.js';

/**
 * Класс формирования основной части страницы
 * @class ContentBlock
 * @typedef {ContentBlock}
 */
export class ContentBlock {
  /**
   * Родительский элемент в который добаляеться шаблон
   * @type {object}
   */
  #header;

  /**
   * Конструктор класса
   */
  constructor() {
    this.state = {
      activeHeader: null,
      headerElements: {},
    };
  }

  /**
   * Сетер header
   * @param {object} header - указатель на родитя в DOM дереве
   * @default
   */
  setHeader(header) {
    this.#header = header;
  }

  /**
   * Метод рендера элемента
   */
  render() {
    const root = document.querySelector('#root');
    const contentBlock = document.createElement('div');
    contentBlock.className = 'contentBlock';

    this.#header.state.activeHeader = contentBlock;

    const footer = document.querySelector('footer');
    if (!footer) {
      const footer = new Footer(this.#header);
      root.appendChild(contentBlock);
      footer.render();
    } else {
      footer.before(contentBlock);
    }

    contentBlock.innerHTML = Handlebars.templates['contentBlock.hbs']();
    const film = new FilmSelection(contentBlock);
    film.render();
  }
}
