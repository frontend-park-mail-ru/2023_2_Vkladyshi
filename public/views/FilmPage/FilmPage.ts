import { View } from '@views/view';
import { footer, desc, info, countLikeFilm } from '@utils/config';
// import { store } from '@store/store';
// import { actionActor } from '@store/action/actionTemplates';
// TODO

export interface FilmPage {
  state: {
    filmInfo: null;
  };
}

/**
 * Класс формирование страницы фильма
 * @class FilmPage
 * @typedef {FilmPage}
 */
export class FilmPage extends View {
  /**
   * Конструктор класса
   * @param ROOT
   */
  constructor(ROOT) {
    super(ROOT);
    this.state = {
      // filmInfo: null,
      filmInfo: null,
    };

    // this.subscribeActorStatus = this.subscribeActorStatus.bind(this);
    // TODO
  }

  /**
   * Метод создания страницы
   */
  render() {
    // store.dispatch(actionActor('NameActor'));
    // TODO
    // store.subscribe('actor', this.subscribeActorStatus);

    const mainHTML = document.querySelector('main');
    // const contentBlockHTML = document.querySelector('.contentBlock');
    if (document!.querySelector('.contentBlock') != null) {
      document!.querySelector('.contentBlock')!.innerHTML = '';
    }

    if (document.querySelector('.contentBlock') != null) {
      document
        ?.querySelector('.contentBlock')
        ?.insertAdjacentHTML('beforeend', desc.render(this.state.filmInfo));
    }

    if (document.querySelector('.contentBlock') != null) {
      document
        ?.querySelector('.contentBlock')
        ?.insertAdjacentHTML(
          'beforeend',
          countLikeFilm.render(this.state.filmInfo)
        );
    }

    if (document.querySelector('.contentBlock') != null) {
      document
        ?.querySelector('.contentBlock')
        ?.insertAdjacentHTML('beforeend', info.render(this.state.filmInfo));
    }

    if (document.querySelector('.footer') == null) {
      mainHTML?.insertAdjacentHTML('beforeend', footer.render());
    }
  }

  // subscribeActorStatus() {
  //   this.state.filmInfo = store.getState('filmInfo');
  //   store.unsubscribe('film', this.subscribeActorStatus);
  //   this.render();
  // }
  // TODO
}
