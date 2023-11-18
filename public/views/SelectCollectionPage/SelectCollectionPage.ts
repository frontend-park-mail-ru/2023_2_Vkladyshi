import { View } from '@views/view';
import { ROOT, selectCollection } from '@utils/config';
import { router } from '@router/router';
import { store } from '@store/store';
import {
  actionAuth,
  actionCollectionMenu
} from '@store/action/actionTemplates';
import { image } from '@components/Image/image';

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

    if (!document.querySelector('.select-collection-frame')) {
      const main = ROOT?.querySelector('main');
      main!.innerHTML = '';

      const popup = document.querySelector('.popup-select-collection');
      main?.insertAdjacentHTML('afterbegin', image.render({}));

      const icon = document.querySelector('.image-container') as HTMLElement;
      const iconsShadow = document.querySelector('.header__container__shadow') as HTMLElement;

      icon!.style.backgroundImage = 'url("/icons/ocean.jpg")';
      icon!.style.backgroundAttachment = 'fixed';
      iconsShadow!.style.backgroundAttachment = 'fixed';

      const containerHTML = document.querySelector('.image-container');
      containerHTML?.insertAdjacentHTML('beforeend', selectCollection.render());

      this.componentDidMount();
      store.subscribe('collectionMenu', this.componentWillUnmount);
    }
  }

  /**
   * Метод обработки нажатий на выбранную коллекцию
   * @returns {Promise} Promise ответа
   */
  componentDidMount () {
    const popup = document.querySelector('.popup-select-collection');

    this.popupEvent = (event) => {
      switch (true) {
        case event.target.closest('.select-collection-frame-img') !== null:
          router.go(
            {
              path: '/',
              props: ''
            },
            { pushState: true, refresh: false }
          );
          break;
        case event.target.closest('.select-collection-frame-list-item') !==
          null:
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
        props: `/${this.state.dataSection}`
      },
      { pushState: true, refresh: false }
    );
  }
}
