import { View } from '@views/view';
import { footer, desc, info, changeUserData } from '@utils/config';
// import { store } from '@store/store';
// import { actionActor } from '@store/action/actionTemplates';
// fix it

export interface UserPage {
  state: {
    filmInfo: null;
  };
}

/**
 * Класс формирование страницы фильма
 * @class UserPage
 * @typedef {UserPage}
 */
export class UserPage extends View {
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
    // fix it
  }

  /**
   * Метод создания страницы
   */
  render() {
    // store.dispatch(actionActor('NameActor'));
    // fix it
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
          changeUserData.render(this.state.filmInfo)
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
  // fix it
}
