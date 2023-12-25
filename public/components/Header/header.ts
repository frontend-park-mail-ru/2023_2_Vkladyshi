import { Component } from '@components/component';
import { router } from '@router/router';
import * as templateHeader from '@components/Header/header.hbs';
import { config } from '@utils/config';
import { store } from '@store/store';
import { actionLogout } from '@store/action/actionTemplates';

export interface Header {
  state: {
    config: any;
    isAuth: boolean;
    selectSearch: string;
    dataSection: string;
  };
}

/**
 * Класс создания верхней шапки
 * @class Header
 * @typedef {Header}
 */
export class Header extends Component {
  private readonly config = {};
  private eventFunc: (event) => void;
  private eventSearch: (event) => void;
  /**
   * Конструктор для формирования родительского элемента
   * @class
   * @param ROOT
   */
  constructor(ROOT) {
    super(ROOT);
    this.state = {
      config: config.menu,
      isAuth: false,
      selectSearch: 'film',
      dataSection: '',
    };
    this.eventFunc = () => {};

    this.subscribeLogoutStatus = this.subscribeLogoutStatus.bind(this);
    this.subscribeLoginHeaderStatus =
      this.subscribeLoginHeaderStatus.bind(this);
    this.subscribeAuthStatus = this.subscribeAuthStatus.bind(this);

    store.subscribe('auth', this.subscribeAuthStatus);
    store.subscribe('login', this.subscribeLoginHeaderStatus);
    store.subscribe('logoutStatus', this.subscribeLogoutStatus);
  }

  /**
   * Разбивает конфиг на определенные элементы, которые подставляются в шаблон
   * @readonly
   * @type {Array}
   */
  get items() {
    return Object.entries(this.state.config).map(
      // @ts-expect-error
      // eslint-disable-next-line camelcase
      ([key, { href, png_name, name }]) => ({
        key,
        href,
        // eslint-disable-next-line camelcase
        png_name,
        name,
      })
    );
  }

  /**
   * Рендер шапки для незарегистрированного пользователя
   * @return {string} - html шапки
   */
  render() {
    const isAuthorized = this.state.isAuth;

    const [brand, signin, basket, profile, selection] = [
      'main',
      'signin',
      'basket',
      'profile',
      'selection',
    ].map((key) => this.items.find((item) => item.key === key));

    return templateHeader({
      isAuthorized,
      signin,
      basket,
      profile,
      selection,
      brand,
    });
  }

  /**
   * Рендер шапки для зарегистрированного пользователя
   */
  componentDidMount() {
    const headerContainer = document.querySelector('header');
    headerContainer?.removeEventListener('click', this.eventFunc);

    this.eventFunc = (event) => {
      const target = event.target;

      switch (true) {
        case target.closest('.header_login-header') !== null:
          router.go(
            {
              path: '/login',
              props: '',
            },
            { pushState: true, refresh: false }
          );
          break;
        case target.closest('.header_brand-header') !== null:
          router.go(
            {
              path: '/',
              props: '',
            },
            { pushState: true, refresh: false }
          );
          break;
        case target.closest('.header_logout-header') !== null:
          store.dispatch(actionLogout({ redirect: true }));
          break;
        case target.closest('.header_settings-header') !== null:
          router.go(
            {
              path: '/settings',
              props: '',
            },
            { pushState: true, refresh: false }
          );
          break;
        case target.closest('.header_basket-item') !== null:
          router.go(
            {
              path: '/watchlist/films',
              props: '',
            },
            { pushState: true, refresh: false }
          );
          break;
        // case target.closest('.header_menu-header') !== null:
        //   router.go(
        //     {
        //       path: '/selection',
        //       props: ''
        //     },
        //     { pushState: true, refresh: false }
        //   );
        //   break;
        case target.closest('.header__search-mobile__input__cancel') !== null:
          const inputMobile = document.querySelector('.header__search-mobile');
          const selectNew = document.querySelector(
            '.header__search-mobile__select'
          );
          const imageStrelkaNew = document.querySelector(
            '.header_search_item__select-search__arrow'
          ) as HTMLImageElement;
          // @ts-ignore
          imageStrelkaNew?.style.transform = 'rotateX(0deg)';
          this.removeSearchList(
            document.querySelector('.header__search-mobile__select__list')
          );
          selectNew?.classList.remove('active');
          inputMobile?.classList.add('reverse');
          break;
        case target.closest('.header_search_item__mobile-lope') !== null:
          if (document?.querySelector('header')!.offsetWidth < 800) {
            const inputMobile = document.querySelector(
              '.header__search-mobile'
            ); // @ts-ignore
            inputMobile.classList.remove('reverse');
            // @ts-ignore
            inputMobile.style.display = 'flex';
          }
          break;
        case target.closest('.header_user-statistic-header') !== null:
          router.go(
            {
              path: '/userStatistic',
              props: '',
            },
            { pushState: true, refresh: false }
          );
          break;
        case target.closest('.header_search_item__all-search-container') !==
          null ||
          target.closest('.header__search-mobile__input__all-search') !== null:
          router.go(
            {
              path: '/selection',
              props: '',
            },
            { pushState: true, refresh: false }
          );
          break;
        case target.closest('.header_search_item__lope') !== null ||
          target.closest('.header_search_item__mobile-lope-search') !== null:
          let lope;
          if (document?.querySelector('header')!.offsetWidth < 800) {
            lope = (
              document.querySelector(
                '.header__search-mobile__input'
              ) as HTMLInputElement
            )?.value;
          } else {
            lope = (
              document.querySelector(
                '.header_search_item__input'
              ) as HTMLInputElement
            )?.value;
          }

          if (this.state.selectSearch === 'film') {
            this.redirectToSearch(
              'films',
              `?title=${lope}&date_from=&date_to=&rating_from=&rating_to=&mpaa=&genre=&actors=`
            );
          } else {
            this.redirectToSearch(
              'actors',
              `?name=${lope}&amplua=&country=&birthday=&films=`
            );
          }
          break;
        case target.closest('.header_search_item__select-search') !== null:
          const films = document.querySelector('.films-search-header');
          const imageStrelka = document.querySelector(
            '.header_search_item__select-search__arrow-header'
          ) as HTMLImageElement;
          const actors = document.querySelector('.actors-search-header');

          if (target.closest('.header_search__list-search__films')) {
            this.state.selectSearch = 'film';
            // @ts-ignore
            films?.style?.display = 'block';
            // @ts-ignore
            actors?.style?.display = 'none';
          } else if (target.closest('.header_search__list-search__actors')) {
            this.state.selectSearch = 'actor';
            // @ts-ignore
            films?.style?.display = 'none';
            // @ts-ignore
            actors?.style?.display = 'block';
          }

          const select = document.querySelector(
            '.header_search_item__select-search'
          );
          if (
            !event.target.closest('.header_search_item__select-search.active')
          ) {
            select?.classList.add('active'); // @ts-ignore
            imageStrelka?.style.transform = 'rotateX(180deg)';
            this.addSearchList(
              document.querySelector('.header_search__list-search')
            );
          } else {
            select?.classList.remove('active'); // @ts-ignore
            imageStrelka?.style.transform = 'rotateX(0deg)';
            this.removeSearchList(
              document.querySelector('.header_search__list-search')
            );
          }
          break;
        case target.closest('.header__search-mobile__select') !== null:
          const selectMobile = document.querySelector(
            '.header__search-mobile__select'
          );
          const inputButtonMobile = document.querySelector(
            '.header__search-mobile__input'
          );
          const listMobile = document.querySelector(
            '.header__search-mobile__select__list'
          );
          const imageStrelkaMobile = document.querySelector(
            '.header_search_item__select-search__arrow'
          ) as HTMLImageElement;

          if (target.closest('.header__search-mobile__select__films')) {
            this.state.selectSearch = 'film';
            // @ts-ignore
            inputButtonMobile?.placeholder = 'Фильмы';
          } else if (target.closest('.header__search-mobile__select__actors')) {
            this.state.selectSearch = 'actor';
            // @ts-ignore
            inputButtonMobile?.placeholder = 'Актёры';
          }

          if (!event.target.closest('.header__search-mobile__select.active')) {
            selectMobile?.classList.add('active'); // @ts-ignore
            imageStrelkaMobile?.style.transform = 'rotateX(180deg)';
            this.addSearchList(
              document.querySelector('.header__search-mobile__select__list')
            );
          } else {
            selectMobile?.classList.remove('active'); // @ts-ignore
            imageStrelkaMobile?.style.transform = 'rotateX(0deg)';
            this.removeSearchList(
              document.querySelector('.header__search-mobile__select__list')
            );
          }
          break;
        default:
          break;
      }
    };
    headerContainer?.addEventListener('click', this.eventFunc);

    const windowEvent = () => {
      const slider = document.querySelector('.slider-container') as HTMLElement;
      const prev = document.querySelector('.line-prev') as HTMLElement;
      const next = document.querySelector('.line-next') as HTMLElement;

      const width = document.body.clientWidth;
      if (width > 800) {
        const mobile = document.querySelector(
          '.header__search-mobile'
        ) as HTMLElement;
        // @ts-ignore
        mobile?.style.display = 'none';
      }
    };

    // window.addEventListener('load', windowEvent);
    windowEvent();
    window.addEventListener('resize', windowEvent);

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      document
        .querySelector('.header__search-mobile')
        ?.addEventListener('touchmove', function (e) {
          e.preventDefault(); // Предотвращаем стандартное поведение при касании
          // eslint-disable-next-line no-invalid-this
          this.style.display = 'none';
        });
    }
  }

  componentWillUnmount() {
    const headerContainer = document.querySelector('header');
    headerContainer?.removeEventListener('click', this.eventFunc);
  }

  subscribeAuthStatus() {
    this.state.isAuth = store.getState('auth')?.status === 200;
    this.changeHeader();
  }

  subscribeLoginHeaderStatus() {
    this.state.isAuth = store.getState('login')?.status === 200;
    this.changeHeader();
  }

  subscribeLogoutStatus() {
    this.state.isAuth = store.getState('logoutStatus') !== 200;
    this.changeHeader();
  }

  changeHeader() {
    const headerHTML = document.querySelector('header');
    if (headerHTML) {
      headerHTML!.innerHTML = this.render();
      this.componentDidMount();
    }
  }

  addSearchList(elementHTML) {
    // @ts-ignore
    elementHTML?.style?.display = 'block';
  }

  removeSearchList(elementHTML) {
    // @ts-ignore
    elementHTML?.style?.display = 'none';
  }

  redirectToSearch(namePage, dataSection) {
    router.go(
      {
        path: `/${namePage}`,
        props: `/${dataSection}`,
      },
      { pushState: true, refresh: false }
    );
  }
}
