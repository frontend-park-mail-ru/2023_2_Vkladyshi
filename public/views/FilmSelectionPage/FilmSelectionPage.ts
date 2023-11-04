import { View } from '@views/view';
import { store } from '@store/store';
import { filmSelection } from '@utils/config';
import { actionCollectionMain } from '@store/action/actionTemplates';
import { getCollection } from '@utils/getCollection';
import { router } from '@router/router';

/**
 * Класс формирования подборки фильмов
 * @class FilmSelectionPage
 * @typedef {FilmSelectionPage}
 */

export class FilmSelectionPage extends View {
  private popupEvent: (event) => void;
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
        const url = new URL(window.location.href);
        const names = url.pathname.split('/');

        contentBlockHTML?.insertAdjacentHTML('beforeend', await this.returnTemplate(names[2]));
        this.componentDidMount();
        return;
      }

      console.log(result, 1111, getCollection(result));
      contentBlockHTML?.insertAdjacentHTML('beforeend', filmSelection.render(getCollection(result)));
      this.componentDidMount();
      return;
    }

    return this.returnTemplate('new');
  }

  returnTemplate (collectionId) {
    return store.dispatch(actionCollectionMain({ collection_id: collectionId })).then(response => {
      return filmSelection.render(getCollection(store.getState('collectionMain')));
    });
  }

  componentDidMount () {
    const popup = document.querySelector('.filmSelection_films');
    const popupEvent = (event) => {
      this.popupEvent = popupEvent;
      switch (true) {
        case event.target.closest('.filmSelection_film') !== null:
          const filmId = event.target.closest('.filmSelection_film').getAttribute('data-section');
          this.componentWillUnmount();
          router.go(
            {
              path: '/film',
              props: `/${filmId}`
            },
            { pushState: true, refresh: false }
          );
          break;
        default:
          break;
      }
    };
    popup?.addEventListener('click', popupEvent);
  }

  componentWillUnmount () {
    const popup = document.querySelector('.filmSelection_films');

    popup?.removeEventListener('click', this.popupEvent);
  }

  subscribeCollectionMenu () {

  }
}
