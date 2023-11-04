import { View } from '@views/view';
import { desc, info, footer, filmRating } from '@utils/config';
import { store } from '@store/store';
import { actionFilm } from '@store/action/actionTemplates';

export interface FilmPage {
  state: {
    filmInfo: null;
  };
}

export class FilmPage extends View {
  /**
   * Конструктор для формирования родительского элемента
   * @param ROOT
   * @class
   */
  constructor(ROOT) {
    super(ROOT);
    this.state = {
      filmInfo: null,
    };

    this.subscribeFilmStatus = this.subscribeFilmStatus.bind(this);

    store.subscribe('filmInfo', this.subscribeFilmStatus);
  }
  /**
   * Метод создания страницы
   * @param props
   */
  render(props) {
    this.renderDefaultPage();

    if (props != null) {
      store.dispatch(actionFilm({ filmId: props.replace('/', '') }));
    }

    this.componentDidMount();
  }

  componentDidMount() {
    const mainHTML = document.querySelector('main');
    const contentBlockHTML = document.querySelector('.contentBlock');

    if (contentBlockHTML != null) {
      contentBlockHTML!.innerHTML = '';
    }

    // const kek = this.state.filmInfo;
    // const heh = kek!['actors'];

    //console.log(this.state.filmInfo, heh)

    const result = {
      body: this.state.filmInfo,
      actors: this.state.filmInfo!['actors'],
      header: 'О фильме',
      headersItems: ['Описание', 'Трейлер'],
      isHeader: true,
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
  }

  subscribeFilmStatus() {
    this.state.filmInfo = store.getState('filmInfo');
    store.unsubscribe('filmInfo', this.subscribeFilmStatus);
    this.componentDidMount();
  }
}
