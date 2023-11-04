import { View } from '@views/view';
import { ROOT, selectCollection } from '@utils/config';

import { router } from '@router/router';
import { store } from '@store/store';
import { actionCollectionMenu } from '@store/action/actionTemplates';

export interface SelectCollectionPage {
  state: {
    dataSection: string;
  };
}

/**
 * Класс формирования окна выбора подборки фильмов
 * @class SelectCollectionPage
 * @typedef {SelectCollectionPage}
 */
export class SelectCollectionPage extends View {
  private popupEvent: (event) => void;
  /**
   * Конструктор класса
   * @param ROOT
   */
  constructor (ROOT) {
    super(ROOT);
    this.state = {
      dataSection: ''
    };

    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.subscribeCollectionMenu = this.subscribeCollectionMenu.bind(this);
    store.subscribe('collectionMenu', this.subscribeCollectionMenu);
  }

  /**
   * Метод создания страницы
   */
  render () {
    this.renderDefaultPage();

    if (!document.querySelector('.selectCollection-frame')) {
      const result = ROOT?.querySelector('main');

      result!.innerHTML = selectCollection.render();
      this.componentDidMount();
      store.subscribe('collectionMenu', this.componentWillUnmount);
    }
  }

  /**
   * Метод обработки нажатий на выбранную коллекцию
   * @returns {Promise} Promise ответа
   */
  componentDidMount () {
    const popup = document.querySelector('.popupSelectCollection');

    this.popupEvent = (event) => {
      switch (true) {
        case event.target.closest('.selectCollection-frame-img') !== null:
          router.go(
            {
              path: '/',
              props: ''
            },
            { pushState: true, refresh: false }
          );
          break;
        case event.target.closest('.selectCollection-frame-list-item') !== null:
          const dataSection = event.target.getAttribute('data-section');
          this.state.dataSection = dataSection;
          store.dispatch(actionCollectionMenu({ collection_id: dataSection }));
          break;
        default:
          break;
      }
    };

    popup?.addEventListener('click', this.popupEvent);
  }

  componentWillUnmount () {
    const popup = document.querySelector('.popupSign');

    popup?.removeEventListener('click', this.popupEvent);
    store.unsubscribe('collectionMenu', this.componentWillUnmount);
  }

  subscribeCollectionMenu () {
    router.go(
      {
        path: `/films`,
        props: `?collection_id=${this.state.dataSection}`
      },
      { pushState: true, refresh: false }
    );
  }
}
