

import {Footer} from "../footer/footer.js";
import {FilmSelection} from "../filmSelection/filmSelection.js";

/**
 * Рендерит основную страницу.
 * В переданном блоке создает нужнюю панель и выборку фильмов.
 * @param {Object} header - Родительскй элемент внутри которого проходит рендер.
 */
export class ContentBlock {
  #header;

    /**
 * @constructor
 */
    constructor() {
        this.state = {
            activeHeader: null,
            headerElements: {},
        }
    }

    /**
 * Сетер header-а
 * @setHeader
 */
    setHeader(header) {
        this.#header = header;
    }


/**
 * Функция рендера
 */
    render() {
        const root = document.querySelector("#root");
        const contentBlock = document.createElement("div");
        contentBlock.className = "contentBlock"

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
