import { View } from '@views/view';
import {
  footer,
  desc,
  info,
  LkStar
} from '@utils/config';
import { store } from '@store/store';
import { actionActor } from '@store/action/actionTemplates';

export interface ActorDescritionPage {
  state: {
    actorInfo: null
  }
}

/**
 * Класс формирования главной страницы
 * @class ActorDescritionPage
 * @typedef {ActorDescritionPage}
 */
export class ActorDescritionPage extends View {
  /**
   * Конструктор класса
   * @param ROOT
   */
  constructor (ROOT) {
    super(ROOT);
    this.state = {
      actorInfo: null
    };

    this.subscribeActorStatus = this.subscribeActorStatus.bind(this);
  }

  /**
   * Метод создания страницы
   */
  render () {
    store.dispatch(actionActor('NameActor'));
    //store.subscribe('actor', this.subscribeActorStatus);

    const mainHTML = document.querySelector('main');
    const contentBlockHTML = document.querySelector('.contentBlock');
    if (document!.querySelector('.contentBlock') != null) {
      document!.querySelector('.contentBlock')!.innerHTML = '';
    }

    if (document.querySelector('.contentBlock') != null) {
      document
        ?.querySelector('.contentBlock')
        ?.insertAdjacentHTML('beforeend', desc.render(this.state.actorInfo));
    }

    if (document.querySelector('.contentBlock') != null) {
      document
        ?.querySelector('.contentBlock')
        ?.insertAdjacentHTML('beforeend', LkStar.render(this.state.actorInfo));
    }

    if (document.querySelector('.contentBlock') != null) {
      document
        ?.querySelector('.contentBlock')
        ?.insertAdjacentHTML('beforeend', info.render(this.state.actorInfo));
    }

    if (document.querySelector('.footer') == null) {
      mainHTML?.insertAdjacentHTML('beforeend', footer.render());
    }
  }

  subscribeActorStatus () {
    this.state.actorInfo = store.getState('actorInfo');
    console.log(this.state.actorInfo, 1111);
    store.unsubscribe('actor', this.subscribeActorStatus);
    this.render();
  }
}
