import { View } from '@views/view';
import { footer, desc, info, changeUserData } from '@utils/config';
// import { store } from '@store/store';
// import { actionActor } from '@store/action/actionTemplates';
// fix it

export interface UserPage {
  state: {
    userInfo: null;
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
  constructor (ROOT) {
    super(ROOT);
    this.state = {
      // filmInfo: null,
      userInfo: null
    };

    // this.subscribeActorStatus = this.subscribeActorStatus.bind(this);
    // fix it
  }

  /**
   * Метод создания страницы
   */
  render () {
    this.renderDefaultPage();


    if (document.querySelector('.contentBlock') != null) {
      document
        ?.querySelector('.contentBlock')
        ?.insertAdjacentHTML('beforeend', desc.render(this.state.userInfo));
    }

    if (document.querySelector('.contentBlock') != null) {
      document
        ?.querySelector('.contentBlock')
        ?.insertAdjacentHTML(
          'beforeend',
          changeUserData.render(this.state.userInfo)
        );
    }

    if (document.querySelector('.contentBlock') != null) {
      document
        ?.querySelector('.contentBlock')
        ?.insertAdjacentHTML('beforeend', info.render(this.state.userInfo));
    }

  }

  // subscribeActorStatus() {
  //   this.state.filmInfo = store.getState('filmInfo');
  //   store.unsubscribe('film', this.subscribeActorStatus);
  //   this.render();
  // }
  // fix it
}
