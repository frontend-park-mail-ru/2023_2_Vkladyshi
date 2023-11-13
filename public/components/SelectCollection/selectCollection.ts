import { collections } from '@utils/config';
import { Component } from '@components/component';
import * as templateSelectCollection from '@components/SelectCollection/selectCollection.hbs';

/**
 * Класс формирования окна выбора подборки фильмов
 * @class SelectCollection
 * @typedef {SelectCollection}
 */
export class SelectCollection extends Component {
  /**
   * Метод рендеринга элемента
   * @return {string} html авторизации
   */
  render () {
    return templateSelectCollection(collections);
  }
}
