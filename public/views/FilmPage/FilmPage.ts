import { View } from '@views/view';
import { desc, info, footer, filmRating } from '@utils/config';
import { store } from '@store/store';
import { actionFilm } from '@store/action/actionTemplates';
import { router } from '@router/router';

export interface FilmPage {
  state: {
    filmInfo: null;
  };
}


export class FilmPage extends View {
  private popupEvent: (event) => void;
  /**
   * Конструктор для формирования родительского элемента
   * @param ROOT
   * @class
   */
  constructor (ROOT) {
    super(ROOT);
    this.state = {
      filmInfo: null
    };

    this.subscribeActorStatus = this.subscribeActorStatus.bind(this);

    store.subscribe('filmInfo', this.subscribeActorStatus);
  }
  /**
   * Метод создания страницы
   * @param props
   */
  render (props) {
    this.renderDefaultPage();

    if (props != null) {
      store.dispatch(actionFilm({ filmId: props.replace('/', '') }));
    }
    this.componentDidMount();
  }

  componentDidMount () {
    const mainHTML = document.querySelector('main');
    const contentBlockHTML = document.querySelector('.contentBlock');

    if (contentBlockHTML != null) {
      contentBlockHTML!.innerHTML = '';
    }

    let actors = null;
    if (this.state.filmInfo) {
      actors = this.state.filmInfo!['actors'];
    }

    const result = {
      film: true,
      body: this.state.filmInfo,
      actors: actors,
      header: 'О фильме',
      headersItems: ['Описание', 'Отзывы'],
      isHeader: true
    };

    if (contentBlockHTML != null) {
      contentBlockHTML?.insertAdjacentHTML('beforeend', desc.render(result));
      contentBlockHTML?.insertAdjacentHTML(
        'beforeend',
        filmRating.render(result)
      );
      contentBlockHTML?.insertAdjacentHTML('beforeend', info.render(result));

    }

    if (document.querySelector('.footer') == null) {
      mainHTML?.insertAdjacentHTML('beforeend', footer.render());
    }

    const popup = document.querySelector('.description');
    const popupEvent = (event) => {
      this.popupEvent = popupEvent;
      switch (true) {
        case event.target.closest('.table__actor__text') !== null:
          const actorId = event.target.closest('.table__actor__text').getAttribute('data-section');
          this.componentWillUnmount();
          router.go(
            {
              path: '/actor',
              props: `/${actorId}`
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
    const popup = document.querySelector('.filmSelection');

    popup?.addEventListener('click', this.popupEvent);
  }

  subscribeActorStatus () {
    this.state.filmInfo = store.getState('filmInfo');
    store.unsubscribe('filmInfo', this.subscribeActorStatus);
    this.componentDidMount();
  }
}
