import { View } from "../view.js";
import { ROOT, header } from "../../utils/config.js";
import { SelectCollection } from "../../components/SelectCollection/selectCollection.js";

/**
 * Класс формирования окна выбора подборки фильмов
 * @class SelectCollectionPage
 * @typedef {SelectCollectionPage}
 */
export class SelectCollectionPage extends View {
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
    const selectCollection = new SelectCollection();
    let main;

    if (
      document.querySelector("main") ||
      !document.querySelector(".selectCollection")
    ) {
      ROOT.removeChild(document.querySelector("main"));
      main = document.createElement("main");
      ROOT.appendChild(main);
      main.insertAdjacentHTML("beforeend", selectCollection.render());
      selectCollection.addEvent().then();
    }
    header.addToHeaderEvent(false);
  }
}
