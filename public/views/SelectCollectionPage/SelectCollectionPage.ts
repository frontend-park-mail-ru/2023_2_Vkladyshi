import { View } from '@views/view';
import {collections, ROOT, selectCollection} from '@utils/config';
import { router } from '@router/router';
import { store } from '@store/store';

import { image } from '@components/Image/image';
import {inputButton} from '@components/inputButton/inputButton';

export interface SelectCollectionPage {
  state: {
    haveActorsSelect: string,
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
      haveActorsSelect: '',
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
  componentDidMount (searchFilm = true) {
      if (searchFilm) {
        this.eventsSearchFilm();
      } else {
        this.eventsSearchActor();
      }
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

  eventsSearchFilm(firstEvent = true) {
    const search = document.querySelector('.search-inputs-film');

    if (search?.closest('.search-inputs-film.noactive')) {
      search?.classList.remove('noactive');
    }

    const title = document.querySelector('.section-title');
    const popup = document.querySelector('.search-container');
    const titleFilm = document.querySelector('.section-title') as HTMLElement;
    titleFilm?.insertAdjacentHTML('beforeend', inputButton.render({ wrap: 'select', module: 'select' }));

    const genre = document.querySelector('.section-title-type');
    const collectionGenreItems = collections.collection_items;
    for (let i = 0; i < collectionGenreItems.length; i++) {
      const item = collectionGenreItems[i];
      genre?.insertAdjacentHTML('beforeend', `<div class="title-type" data-section="${item.value}">${item.key}</div>`);
    }

    const rating = document.querySelector('.section-rating');
    const ratingLeft = document.querySelector('.section-rating__left');
    const ratingRight = document.querySelector('.section-rating__right');
    ratingLeft?.insertAdjacentHTML('beforeend', inputButton.render({ wrap: 'rating-left', module: 'select', type: 'number' }));
    ratingRight?.insertAdjacentHTML('beforeend', inputButton.render({ wrap: 'rating-right', module: 'select', type: 'number' }));

    const inputLeft = document.querySelector('.rating-left-input-select') as HTMLElement;
    const inputRight = document.querySelector('.rating-right-input-select') as HTMLElement;
    inputLeft.style.height = '20px';
    inputRight.style.height = '20px';

    const years = document.querySelector('.section-years');
    const yearsLeft = document.querySelector('.years-select__left');
    const yearsRight = document.querySelector('.years-select__right');
    yearsLeft?.insertAdjacentHTML('beforeend', inputButton.render({ wrap: 'years-left', module: 'select', type: 'date' }));
    yearsRight?.insertAdjacentHTML('beforeend', inputButton.render({ wrap: 'years-right', module: 'select', type: 'date' }));

    const inputYearLeft = document.querySelector('.years-left-input-select') as HTMLElement;
    const inputYearRight = document.querySelector('.years-right-input-select') as HTMLElement;
    inputYearLeft.style.height = '20px';
    inputYearRight.style.height = '20px';

    const sectionActors = document.querySelector('.section-actors');
    sectionActors?.insertAdjacentHTML('beforeend', inputButton.render({ wrap: 'actors', module: 'select' }));
    const input = document.querySelector('.actors-input-select') as HTMLElement;
    input.style.height = '20px';

    const mpaa = document.querySelector('.mpaa-container');

    const elements = {
      '.title-select': title,
      '.genre-select': genre,
      '.rating-select': rating,
      '.mpaa-select': mpaa,
      '.years-select': years,
      '.actors-select': sectionActors,
    };

    this.popupEvent = (event) => {
      const selector = Object.keys(elements).find(key =>
          event.target.closest(key)
      );

      if (selector) {
        const element = elements[selector];
        this.toggleActive(element);
      }

      switch (true) {
        case event.target.closest('.search-container__select__films') !== null:
          // this.componentDidMount(true);
          this.eventsSearchFilm(false);
          break;
        case event.target.closest('.search-container__select__actors') !== null:
          // this.componentDidMount(false);
          this.eventsSearchActor();
          break;
        case event.target.closest('.result-button') !== null:
          // store.dispatch(actionSearchFilm);
          break;
        case event.target.closest('.title-type') !== null:
          if (!event.target.closest('.title-type.active')) {
            event.target.classList.add('active');
          } else {
            event.target.classList.remove('active');
          }
          break;
        default:
          break;
      }
    }

    popup?.removeEventListener('click', this.popupEvent);
    popup?.addEventListener('click', this.popupEvent);
  }

  eventsSearchActor() {
    const search = document.querySelector('.search-inputs-film');
    search?.classList.add('noactive');
  }

  removeActive(html) {
    html?.classList.remove('active');
    html?.classList.add('noactive');
  }
  addActive(html) {
    html?.classList.add('active');
    html?.classList.remove('noactive');
  }

  toggleActive(element) {
    if(!element.closest('.active')) {
      this.addActive(element);
    } else {
      this.removeActive(element);
    }
  }
}
