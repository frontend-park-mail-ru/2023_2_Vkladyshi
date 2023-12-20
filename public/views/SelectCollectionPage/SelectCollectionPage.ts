import { View } from '@views/view';
import { collections, ROOT } from '@utils/config';
import { router } from '@router/router';
import { store } from '@store/store';
import { image } from '@components/Image/image';
import { inputButton } from '@components/inputButton/inputButton';
import { addActive, removeActive } from '@utils/std';
import {
  actionSearchActor,
  actionSearchFilm
} from '@store/action/actionTemplates';
import { SelectCollection } from '@components/SelectCollection/selectCollection';

export interface SelectCollectionPage {
  state: {
    firstSearchActor: boolean;
    firstSearchFilm: boolean;
    dataSection: string;
    renderedSearchFilm: boolean;
  };
}

/**
 * Класс формирования окна выбора подборки фильмов и актёров
 * @class SelectCollectionPage
 * @typedef {SelectCollectionPage}
 */
export class SelectCollectionPage extends View {
  private popupEvent: (event) => void;
  private panelEvent: (event) => void;

  /**
   * Конструктор класса
   * @param ROOT
   */
  constructor (ROOT) {
    super(ROOT);
    this.state = {
      dataSection: '',
      firstSearchActor: true,
      firstSearchFilm: true,
      renderedSearchFilm: true
    };

    // store.subscribe('resultSearchFilm', this.subscribeSearchFilms.bind(this));
    // store.subscribe('resultSearchActor', this.subscribeSearchActors.bind(this));
  }

  /**
   * Метод создания страницы
   */
  render () {
    this.renderDefaultPage({});

    if (!document.querySelector('.select-collection-frame')) {
      const main = ROOT?.querySelector('main');
      main!.innerHTML = '';

      const popup = document.querySelector('.popup-select-collection');
      main?.insertAdjacentHTML('afterbegin', image.render({}));

      const icon = document.querySelector('.image-container') as HTMLElement;
      const iconsShadow = document.querySelector(
        '.header__container__shadow'
      ) as HTMLElement;

      icon!.style.backgroundImage = 'url("/icons/ocean.jpg")';
      icon!.style.backgroundAttachment = 'fixed';
      iconsShadow!.style.backgroundAttachment = 'fixed';

      const containerHTML = document.querySelector('.image-container');
      const selectCollection = new SelectCollection(ROOT);
      containerHTML?.insertAdjacentHTML('beforeend', selectCollection.render());

      this.componentDidMount();
    }
  }

  /**
   * Метод обработки нажатий на выбранную коллекцию
   * @param searchFilm
   * @return {Promise} Promise ответа
   */
  componentDidMount (searchFilm = true) {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      // Отключение hover у дива
      const divElement = document.querySelectorAll('.title-type');
      divElement.forEach((elem) => {
        // @ts-ignore
        elem?.style.isHovered = 'none';
      });
    }

    if (searchFilm) {
      this.eventsSearchFilm();
    } else {
      this.eventsSearchActor();
    }

    const containerHTML = document.querySelector('.search-container');
    this.panelEvent = (event) => {
      switch (true) {
        case event.target.closest('.search-container__select__films') !== null:
          const actorButtom1 = document.querySelector(
            '.film-selection__header__yellow-selection-actor'
          );
          const filmButtom1 = document.querySelector(
            '.film-selection__header__yellow-selection-film'
          );
          filmButtom1?.classList.remove('noactive-opacity');
          actorButtom1?.classList.add('noactive-opacity');
          actorButtom1?.classList.remove('active-opacity');
          store.subscribe(
            'resultSearchFilm',
            this.subscribeSearchFilms.bind(this)
          );
          this.eventsSearchFilm();
          break;
        case event.target.closest('.search-container__select__actors') !== null:
          const actorButtom = document.querySelector(
            '.film-selection__header__yellow-selection-actor'
          );
          const filmButtom = document.querySelector(
            '.film-selection__header__yellow-selection-film'
          );
          actorButtom?.classList.add('active-opacity');
          actorButtom?.classList.remove('noactive-opacity');
          filmButtom?.classList.remove('active-opacity');
          filmButtom?.classList.add('noactive-opacity');
          store.subscribe(
            'resultSearchActor',
            this.subscribeSearchActors.bind(this)
          );
          this.eventsSearchActor();
          break;
        case event.target.closest('.result-button') !== null:
          event.preventDefault();
          if (this.state.renderedSearchFilm) {
            this.dispatchFilm();
          } else {
            this.dispatchActor();
          }
          break;
        default:
          break;
      }
    };

    // containerHTML?.addEventListener('submit', this.panelEvent);
    containerHTML?.addEventListener('click', this.panelEvent);
  }

  /**
   * Метод отписок
   */
  componentWillUnmount () {
    const search = document.querySelector('.search-container');

    search?.removeEventListener('click', this.popupEvent);
    store.unsubscribe('collectionMenu', this.componentWillUnmount.bind(this));
  }

  /**
   * Метод для обработки ответа с фильмами
   */
  subscribeSearchFilms () {
    store.unsubscribe('resultSearchFilm', this.subscribeSearchFilms.bind(this));
    router.go(
      {
        path: `/films`,
        props: `/${this.state.dataSection}`
      },
      { pushState: true, refresh: false }
    );
  }

  /**
   * Метод для обработки ответа с актерами
   */
  subscribeSearchActors () {
    store.unsubscribe(
      'resultSearchActor',
      this.subscribeSearchActors.bind(this)
    );
    router.go(
      {
        path: `/actors`,
        props: `/${this.state.dataSection}`
      },
      { pushState: true, refresh: false }
    );
  }

  /**
   * Метод для рендаринга поиска по фильмам
   */
  eventsSearchFilm () {
    let popup, titleFilm, rating, years, mpaa, sectionActors, genre;

    const searchActor = document.querySelector('.search-inputs-actor');
    const searchFilm = document.querySelector('.search-inputs-film');

    if (searchFilm?.closest('.noactive')) {
      searchActor?.classList.add('noactive');
      searchFilm?.classList.remove('noactive');
    }

    this.state.renderedSearchFilm = true;
    if (this.state.firstSearchFilm) {
      this.state.firstSearchFilm = false;

      popup = document.querySelector('.search-inputs-film');
      titleFilm = document.querySelector('.section-title') as HTMLElement;
      titleFilm?.insertAdjacentHTML(
        'beforeend',
        inputButton.render({ wrap: 'select', module: 'select' })
      );

      genre = document.querySelector('.section-title-type');
      const collectionGenreItems = collections.collection_items;
      for (let i = 0; i < collectionGenreItems.length; i++) {
        const item = collectionGenreItems[i];
        genre?.insertAdjacentHTML(
          'beforeend',
          `<div class="title-type" data-section="${item.value}">${item.key}</div>`
        );
      }

      rating = document.querySelector('.section-rating');
      const ratingLeft = document.querySelector('.section-rating__left');
      const ratingRight = document.querySelector('.section-rating__right');
      ratingLeft?.insertAdjacentHTML(
        'beforeend',
        inputButton.render({
          wrap: 'rating-left',
          module: 'select',
          type: 'number'
        })
      );
      ratingRight?.insertAdjacentHTML(
        'beforeend',
        inputButton.render({
          wrap: 'rating-right',
          module: 'select',
          type: 'number'
        })
      );

      years = document.querySelector('.section-years');
      const yearsLeft = document.querySelector('.years-select__left');
      const yearsRight = document.querySelector('.years-select__right');
      yearsLeft?.insertAdjacentHTML(
        'beforeend',
        inputButton.render({
          wrap: 'years-left',
          module: 'select',
          type: 'date'
        })
      );
      yearsRight?.insertAdjacentHTML(
        'beforeend',
        inputButton.render({
          wrap: 'years-right',
          module: 'select',
          type: 'date'
        })
      );

      sectionActors = document.querySelector('.section-actors');
      sectionActors?.insertAdjacentHTML(
        'beforeend',
        inputButton.render({ wrap: 'actors', module: 'select' })
      );

      mpaa = document.querySelector('.mpaa-container');
    }

    const elements = {
      '.title-select': titleFilm,
      '.genre-select': genre,
      '.rating-select': rating,
      '.mpaa-select': mpaa,
      '.years-select': years,
      '.actors-select': sectionActors
    };

    this.popupEvent = (event) => {
      const selector = Object.keys(elements).find((key) =>
        event.target.closest(key)
      );

      if (selector) {
        const element = elements[selector];
        this.toggleActive(element);
      }

      switch (true) {
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
    };

    popup?.removeEventListener('click', this.popupEvent);
    popup?.addEventListener('click', this.popupEvent);
  }

  /**
   * Метод для рендаринга поиска по актерам
   */
  eventsSearchActor () {
    let popup, name, amplua, birthday, country, filmsSelect;
    const searchActor = document.querySelector('.search-inputs-actor');
    const searchFilm = document.querySelector('.search-inputs-film');

    if (searchActor?.closest('.noactive')) {
      searchActor.classList.remove('noactive');
      searchFilm?.classList.add('noactive');
    }

    this.state.renderedSearchFilm = false;
    if (this.state.firstSearchActor) {
      this.state.firstSearchActor = false;

      popup = document.querySelector('.search-inputs-actor');
      name = document.querySelector('.section-name') as HTMLElement;
      name?.insertAdjacentHTML(
        'beforeend',
        inputButton.render({ wrap: 'name', module: 'select' })
      );

      birthday = document.querySelector('.section-birthday');
      birthday?.insertAdjacentHTML(
        'beforeend',
        inputButton.render({ wrap: 'birthday', module: 'select', type: 'date' })
      );

      amplua = document.querySelector('.section-amp-lua');
      amplua?.insertAdjacentHTML(
        'beforeend',
        inputButton.render({ wrap: 'amp-lua', module: 'select', type: 'text' })
      );

      country = document.querySelector('.section-country');
      country?.insertAdjacentHTML(
        'beforeend',
        inputButton.render({ wrap: 'country', module: 'select' })
      );

      filmsSelect = document.querySelector('.section-films');
      filmsSelect?.insertAdjacentHTML(
        'beforeend',
        inputButton.render({ wrap: 'films-selection', module: 'select' })
      );

      const elements = {
        '.name-select': name,
        '.amp-lua-select': amplua,
        '.country-select': country,
        '.birthday-select': birthday,
        '.films-select': filmsSelect
      };

      this.panelEvent = (event) => {
        const selector = Object.keys(elements).find((key) =>
          event.target.closest(key)
        );

        if (selector) {
          const element = elements[selector];
          this.toggleActive(element);
        }
      };

      popup?.removeEventListener('click', this.panelEvent);
      popup?.addEventListener('click', this.panelEvent);
    }
  }

  /**
   * Метод для отправки данных для поиска фильма
   */
  dispatchFilm () {
    const title = (
      document.querySelector('.select-input-select') as HTMLInputElement
    )?.value?.trim();
    const ratingFrom = (
      document.querySelector('.rating-left-input-select') as HTMLInputElement
    )?.value;
    const ratingTo = (
      document.querySelector('.rating-right-input-select') as HTMLInputElement
    )?.value;
    const mpaa = (
      document.querySelector('.mpaa-container__input') as HTMLInputElement
    )?.checked;
    const dateFrom = (
      document.querySelector('.years-left-input-select') as HTMLInputElement
    )?.value;
    const dateTo = (
      document.querySelector('.years-right-input-select') as HTMLInputElement
    )?.value;
    const actors = (
      document.querySelector('.actors-input-select') as HTMLInputElement
    )?.value.split(',');
    let mpaaResult;
    if (mpaa) {
      mpaaResult = 'R';
    } else {
      mpaaResult = '';
    }

    const genres = document.querySelectorAll('.title-type.active');
    const sectionDataArray = Array.from(genres).map((div) =>
      parseInt(<string>div.getAttribute('data-section'))
    );

    this.state.dataSection = `?title=${title}&date_from=${dateFrom}&date_to=${dateTo}&rating_from=${ratingFrom}&rating_to=${ratingTo}&mpaa=${mpaaResult}&genre=${sectionDataArray}&actors=${actors}`;
    this.subscribeSearchFilms();
  }

  /**
   * Метод для отправки данных для поиска актера
   */
  dispatchActor () {
    const name = (
      document.querySelector('.name-input-select') as HTMLInputElement
    )?.value?.trim();

    const amplua = (
      document.querySelector('.actors-input-select') as HTMLInputElement
    )?.value.split(' ');

    const country = (
      document.querySelector('.country-input-select') as HTMLInputElement
    )?.value;
    const birthday = (
      document.querySelector('.birthday-input-select') as HTMLInputElement
    )?.value;
    const films = (
      document.querySelector(
        '.films-selection-input-select'
      ) as HTMLInputElement
    )?.value.split(' ');
    this.state.dataSection = `?name=${name}&amplua=${amplua}&country=${country}&birthday=${birthday}&films=${films}`;
    this.subscribeSearchActors();
  }

  /**
   * Метод для удаления/добавления active у HTMLelement
   * @param element
   */
  toggleActive (element) {
    if (!element.closest('.active')) {
      addActive(element);
    } else {
      removeActive(element);
    }
  }
}
