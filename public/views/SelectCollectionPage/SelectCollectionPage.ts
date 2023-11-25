import { View } from '@views/view';
import {collections, ROOT, selectCollection} from '@utils/config';
import { router } from '@router/router';
import { store } from '@store/store';

import { image } from '@components/Image/image';
import {inputButton} from '@components/inputButton/inputButton';

export interface SelectCollectionPage {
  state: {
    dataSection: string;
    haveTitle: boolean;
    haveGenre: boolean;
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
      dataSection: '',
      haveTitle: false,
      haveGenre: false,
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
    const popup = document.querySelector('.search-container');

    this.popupEvent = (event) => {
      switch (true) {
        case event.target.closest('.search-container__select__films') !== null:
          console.log('films');
          break;
        case event.target.closest('.search-container__select__actors') !== null:
          console.log('actors');
          break;
        case event.target.closest('.result-button') !== null:
          console.log('result-button');
          break;
        case event.target.closest('.title-select') !== null:
          if (!this.state.haveTitle) {
            const select = document.querySelector('.title-select');
            select?.insertAdjacentHTML('afterend', inputButton.render({ wrap: 'select', module: 'select' }));
            const input = document.querySelector('.select-input-select') as HTMLElement;
            input.style.height = '20px';
            this.state.haveTitle = true;
          } else {
            const input = document.querySelector('.select-input-select') as HTMLElement;
            const parentElement = input?.parentNode;
            parentElement?.parentNode?.removeChild(parentElement);
            this.state.haveTitle = false;
          }
          break;
        case event.target.closest('.genre-select') !== null:
          const select = document.querySelector('.section-title-type');
          const collectionItems = collections.collection_items;

          if (!this.state.haveGenre) {
            this.state.haveGenre = true;
            for (let i = 0; i < collectionItems.length; i++) {
              const item = collectionItems[i];
              select?.insertAdjacentHTML('beforeend', `<div class="title-type" data-section="${item.value}">${item.key}</div>`);
            }
          } else {
            this.state.haveGenre = false;
            const input = document.querySelector('.section-title-type') as HTMLElement;
            input!.innerHTML = '';
          }
          break;
        case event.target.closest('.title-type') !== null:
          if (!event.target.closest('.active')) {
            event.target.classList.add('active');
            event.target.style.background = '#F5C518';
            event.target.style.color = 'black';
            event.target.style.border = '2px solid #F5C518';
          } else {
            event.target.classList.remove('active');
            event.target.style.background = 'none';
            event.target.style.color = 'white';
            event.target.style.border = '2px solid white';
          }
          break;
        case event.target.closest('.rating-select') !== null:
          const rating = document.querySelector('.section-rating');
          const ratingLeft = document.querySelector('.section-rating__left');
          const ratingRight = document.querySelector('.section-rating__right');

          if (!rating?.closest('.active')) {
            rating?.classList.remove('noactive');
            rating?.classList.add('active');
            ratingLeft?.insertAdjacentHTML('beforeend', inputButton.render({ wrap: 'rating-left', module: 'select', type: 'date' }));
            ratingRight?.insertAdjacentHTML('beforeend', inputButton.render({ wrap: 'rating-right', module: 'select', type: 'date' }));
            const inputLeft = document.querySelector('.rating-left-input-select') as HTMLElement;
            const inputRight = document.querySelector('.rating-right-input-select') as HTMLElement;
            inputLeft.style.height = '20px';
            inputRight.style.height = '20px';
          } else {
            rating?.classList.remove('active');
            rating?.classList.add('noactive');
            ratingLeft!.innerHTML = '';
            ratingRight!.innerHTML = '';

          }

          // input.style.height = '20px';
          // input.style.
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
