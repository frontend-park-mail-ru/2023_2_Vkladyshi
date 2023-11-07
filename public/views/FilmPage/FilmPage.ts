import { View } from '@views/view';
import { desc, info, footer, countLikeFilm } from '@utils/config';
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

    let actors: string | null = null;
    let mark: number | null = null;
    let count: number | null = null;
    let genre: string | null = null;
    let poster: string | null = null;
    let title: string | null = null;
    let country: string | null = null;
    let date: string | null = null;
    let infoText: string | null = null;

    if (this.state.filmInfo) {
      const filmInfo = this.state.filmInfo;
      actors = filmInfo['actors'];
      mark = filmInfo['rating'];
      count = filmInfo['number'];
      genre = filmInfo['genre'];
      poster = filmInfo['film']['poster'];
      title = filmInfo['film']['title'];
      country = filmInfo['film']['country'];

      const fullDate = new Date(filmInfo['film']['release_date']);
      date = fullDate.getFullYear().toString();
      infoText = filmInfo['film']['info_text'];
    }

    const result = {
      film: true,
      body: this.state.filmInfo,
      genre,
      actors,
      poster,
      country,
      date,
      title,
      infoText,
      header: 'О фильме',
      headerAbout: 'Описание',
      headerComment: 'Отзывы',
      isHeader: true,
      stars_burning: [true, true, true, false, false],
      mark,
      mark_number: count
    };

    if (contentBlockHTML != null) {
      contentBlockHTML?.insertAdjacentHTML('beforeend', desc.render(result));
      contentBlockHTML?.insertAdjacentHTML(
        'beforeend', countLikeFilm.render(result)
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
        case event.target.closest('.about-film') !== null:
          this.renderComments();
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

  renderComments () {

  }
}
