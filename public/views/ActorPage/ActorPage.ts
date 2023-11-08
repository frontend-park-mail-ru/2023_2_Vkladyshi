import { View } from '@views/view';
import { footer, desc, info, LkStar } from '@utils/config';
import { store } from '@store/store';
import { actionActor } from '@store/action/actionTemplates';

export interface ActorDescritionPage {
  state: {
    actorInfo: null;
  };
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
    this.componentWillUnmount = this.componentWillUnmount.bind(this);

    store.subscribe('actorInfo', this.subscribeActorStatus);
  }

  /**
   * Метод создания страницы
   * @param props
   */
  render (props = null) {
    this.renderDefaultPage();
    store.subscribe('removeView', this.componentWillUnmount);

    if (props !== null) {
      console.log(111);
      // @ts-ignore
      // @ts-ignore
      store.dispatch(actionActor({ actorName: parseInt(props.replace('/', '')) })
      );
    }

    const mainHTML = document.querySelector('main');
    const contentBlockHTML = document.querySelector('.contentBlock');
    if (document!.querySelector('.contentBlock') != null) {
      document!.querySelector('.contentBlock')!.innerHTML = '';
    }
    let result = {};

    const res = this.state.actorInfo;
    if (res) {
      const dateTime = new Date(res['birthday']);
      const year = dateTime.getFullYear();
      const month = ('0' + (dateTime.getMonth() + 1)).slice(-2);
      const day = ('0' + dateTime.getDate()).slice(-2);
      const formattedDate = `${year}-${month}-${day}`;

      console.log(formattedDate, this.state.actorInfo, 121212);

      result = {
        actor: true,
        body: this.state.actorInfo,
        isHeader: true,
        header: res['name'],
        title: 'Основная информация',
        headerAbout: 'Биография',
        date: formattedDate,
        poster: res['poster_href'],
        infoText: res['info_text'],
        country: res['country'],
        career: res['career']
      };
    }

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

  componentWillUnmount () {
    store.unsubscribe('actorInfo', this.subscribeActorStatus);
    store.unsubscribe('removeView', this.subscribeActorStatus);
  }

  subscribeActorStatus () {
    this.state.actorInfo = store.getState('actorInfo');
    store.unsubscribe('actorInfo', this.subscribeActorStatus);
    this.render();
  }
}
