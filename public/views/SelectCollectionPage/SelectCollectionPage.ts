import { View } from '../view';
import { SelectCollection } from '@components/SelectCollection/selectCollection';
import { ROOT } from '@utils/config';

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
  constructor(ROOT) {
    super(ROOT);
  }

  /**
   * Метод создания страницы
   */
   render() {
    const selectCollection = new SelectCollection(ROOT);
    // @ts-ignore
    ROOT.querySelector('main').innerHTML = selectCollection.render();
    selectCollection.addEvent();
  }
}
