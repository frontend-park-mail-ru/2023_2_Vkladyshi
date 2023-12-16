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
  constructor (ROOT) {
    super(ROOT);
    this.state = {
      config: config.menu,
      isAuth: false,
      selectSearch: 'film',
      dataSection: ''
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
  get items () {
    return Object.entries(this.state.config).map(
      // @ts-expect-error
      // eslint-disable-next-line camelcase
      ([key, { href, png_name, name }]) => ({
        key,
        href,
        // eslint-disable-next-line camelcase
        png_name,
        name
      })
    );
  }

  /**
   * Рендер шапки для незарегистрированного пользователя
   * @return {string} - html шапки
   */
  render () {
    const isAuthorized = this.state.isAuth;

    const [brand, signin, basket, profile, selection] = [
      'main',
      'signin',
      'basket',
      'profile',
      'selection'
    ].map((key) => this.items.find((item) => item.key === key));

    return templateHeader({
      isAuthorized,
      signin,
      basket,
      profile,
      selection,
      brand
    });
  }

  /**
   * Рендер шапки для зарегистрированного пользователя
   */
  componentDidMount () {
    const headerContainer = document.querySelector('header');
    headerContainer?.removeEventListener('click', this.eventFunc);

    this.eventFunc = (event) => {
      const target = event.target;

      switch (true) {
        case target.closest('.header_login-header') !== null:
          router.go(
            {
              path: '/login',
              props: ''
            },
            { pushState: true, refresh: false }
          );
          break;
        case target.closest('.header_brand-header') !== null:
          router.go(
            {
              path: '/',
              props: ''
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
              props: ''
            },
            { pushState: true, refresh: false }
          );
          break;
        case target.closest('.header_basket-item') !== null:
          router.go(
            {
              path: '/watchlist/films',
              props: ''
            },
            { pushState: true, refresh: false }
          );
          break;
        case target.closest('.header_menu-header') !== null:
          router.go(
            {
              path: '/selection',
              props: ''
            },
            { pushState: true, refresh: false }
          );
          break;
        case target.closest('.header_search_item__lope') !== null:
          const lope = (document.querySelector('.header_search_item__input') as HTMLInputElement)?.value;
          if (this.state.selectSearch === 'film') {
            // this.state.dataSection = `?name=${lope}&amplua=&country=&birthday=&films=`;
            // this.redirectToSearch('actors',`?name=${lope}&amplua=&country=&birthday=&films=`);

            this.redirectToSearch('films', `?title=${lope}&date_from=&date_to=&rating_from=&rating_to=&mpaa=&genre=&actors=`);
          } else {
            // this.state.dataSection = `?title=${lope}&date_from=&date_to=&rating_from=&rating_to=&mpaa=&genre=&actors=`;
            // this.redirectToSearch('films',`?title=${lope}&date_from=&date_to=&rating_from=&rating_to=&mpaa=&genre=&actors=`);
            this.redirectToSearch('actors', `?name=${lope}&amplua=&country=&birthday=&films=`);
          }
          break;
        case target.closest('.header_search_item__select-search') !== null:
          const films = document.querySelector('.films-search-header');
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

          const select = document.querySelector('.header_search_item__select-search');
          if (!event.target.closest('.header_search_item__select-search.active')) {
            select?.classList.add('active');
            this.addSearchList();
          } else {
            select?.classList.remove('active');
            this.removeSearchList();
          }
          break;
        default:
          break;
      }
    };
    headerContainer?.addEventListener('click', this.eventFunc);
  }

  componentWillUnmount () {
    const headerContainer = document.querySelector('header');
    headerContainer?.removeEventListener('click', this.eventFunc);
  }

  subscribeAuthStatus () {
    this.state.isAuth = store.getState('auth')?.status === 200;
    this.changeHeader();
  }

  subscribeLoginHeaderStatus () {
    this.state.isAuth = store.getState('login')?.status === 200;
    this.changeHeader();
  }

  subscribeLogoutStatus () {
    this.state.isAuth = store.getState('logoutStatus') !== 200;
    this.changeHeader();
  }

  changeHeader () {
    const headerHTML = document.querySelector('header');
    if (headerHTML) {
      headerHTML!.innerHTML = this.render();
      this.componentDidMount();
    }
  }

  addSearchList () {
    const select = document.querySelector('.header_search__list-search');
    // select?.insertAdjacentHTML('beforeend', '<div class="header_search__list-search">Hhehhe</div>');
    // @ts-ignore
    select?.style?.display = 'block';
  }

  removeSearchList () {
    const select = document.querySelector('.header_search__list-search');
    // @ts-ignore
    select?.style?.display = 'none';
  }

  redirectToSearch (namePage, dataSection) {
    router.go(
      {
        path: `/${namePage}`,
        props: `/${dataSection}`
      },
      { pushState: true, refresh: false }
    );
  }
}
