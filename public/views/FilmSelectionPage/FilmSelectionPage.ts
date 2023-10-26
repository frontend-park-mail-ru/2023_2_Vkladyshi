import { View } from '../view';
import {contentBlock, filmSelection} from "@utils/config";

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
  constructor(ROOT) {
    super(ROOT);
  }

  /**
   * Метод создания страницы
   * @param content объект JSON
   */
  render(content = null) {
    //const filmSelection = new FilmSelection(ROOT);
    const main = document.querySelector('main');
    const select = document.querySelector('.filmSelection');


    if (main || !select) {

      // @ts-ignore
      main.innerHTML = contentBlock.render();
      const contentBlockHTML = document.querySelector('.contentBlock');

      if (content !== null) {

        // @ts-ignore
        contentBlockHTML.innerHTML = filmSelection.renderTemplate(content);
      } else {
        filmSelection.render().then((value) => {

          contentBlockHTML?.insertAdjacentHTML('beforeend', value);
        });
      }
    }
  }
}
