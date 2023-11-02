import { View } from '@views/view';
import { store } from '@store/store';
import { filmSelection } from '@utils/config';
import { actionCollectionMain } from '@store/action/actionTemplates';
import { getCollection } from '@utils/getCollection';

/**
 * Класс формирования подборки фильмов
 * @class FilmSelectionPage
 * @typedef {FilmSelectionPage}
 */

export class FilmSelectionPage extends View {
  /**
   * Конструктор класса
   * @param ROOT
   */
  constructor (ROOT) {
    super(ROOT);

    this.subscribeCollectionMenu = this.subscribeCollectionMenu.bind(this);
    store.subscribe('collectionMenu', this.subscribeCollectionMenu);
  }

  /**
   * Метод рендеринга элемента
   * @return {string} html авторизации
   * @param isNotMain
   */
  async render (isNotMain) {
    if (isNotMain) {
      this.renderDefaultPage();
      const contentBlockHTML = document.querySelector('.contentBlock');
      const url = new URL(window.location.href);

      const result = store.getState('collectionMenu');

      if (result === null) {
        contentBlockHTML?.insertAdjacentHTML('beforeend', await this.returnTemplate(url.search));
        return;
      }

      contentBlockHTML?.insertAdjacentHTML('beforeend', filmSelection.render(getCollection(result)));
    }

    return this.returnTemplate('new');
  }

  returnTemplate (collectionId) {
    return store.dispatch(actionCollectionMain({ collection_id: collectionId })).then(response => {
      return filmSelection.render(getCollection(store.getState('collectionMain')));
    });
  }

  subscribeCollectionMenu () {

  }
}
