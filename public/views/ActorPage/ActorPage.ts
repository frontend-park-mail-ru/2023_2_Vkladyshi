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

    store.subscribe('actorInfo', this.subscribeActorStatus);
  }

  /**
   * Метод создания страницы
   */
  render () {
    this.renderDefaultPage();

    store.dispatch(actionActor({ actorName: 'NameActor' }));

    const mainHTML = document.querySelector('main');
    const contentBlockHTML = document.querySelector('.contentBlock');
    if (document!.querySelector('.contentBlock') != null) {
      document!.querySelector('.contentBlock')!.innerHTML = '';
    }

    const result = {
      body: this.state.actorInfo,
      title: 'Основная информация',
      headersItems: ['Биография']
    };

    if (document.querySelector('.contentBlock') != null) {
      document
        ?.querySelector('.contentBlock')
        ?.insertAdjacentHTML('beforeend', desc.render(result));

      document
        ?.querySelector('.contentBlock')
        ?.insertAdjacentHTML('beforeend', LkStar.render(result));

      document
        ?.querySelector('.contentBlock')
        ?.insertAdjacentHTML('beforeend', info.render(result));
    }

    if (document.querySelector('.footer') == null) {
      mainHTML?.insertAdjacentHTML('beforeend', footer.render());
    }
  }

  subscribeActorStatus () {
    this.state.actorInfo = store.getState('actorInfo');
    store.unsubscribe('actorInfo', this.subscribeActorStatus);
    this.render();
  }
}
