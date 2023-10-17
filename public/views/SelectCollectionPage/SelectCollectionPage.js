import { View } from '../view.js';
import { SelectCollection } from '../../components/SelectCollection/selectCollection.js';

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
    document.querySelector('.popupSelectCollection').classList.add('active');
    selectCollection.addEvent().then();
  }
}
