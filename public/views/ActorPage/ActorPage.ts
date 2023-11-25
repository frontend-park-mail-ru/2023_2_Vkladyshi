import { View } from '@views/view';
import { countLikeFilm, desc, info, LkStar } from '@utils/config';
import { store } from '@store/store';
import { actionActor } from '@store/action/actionTemplates';
import { image } from '@components/Image/image';
import { actorInfo } from '@components/ActorInfo/actorInfo';

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
      // @ts-ignore
      store.dispatch(actionActor({ actorName: parseInt(props.replace('/', '')) }));
    }
  }

  componentDidMount () {
    let result = {};

    const res = this.state.actorInfo;
    // const { actors, rating, number, genre, film } = this.state.actorInfo;

    if (res) {
      const dateTime = new Date(res['birthday']);
      const year = dateTime.getFullYear();
      const month = ('0' + (dateTime.getMonth() + 1)).slice(-2);
      const day = ('0' + dateTime.getDate()).slice(-2);
      const formattedDate = `${year}-${month}-${day}`;

      result = {
        actor: true,
        body: this.state.actorInfo,
        isHeader: true,
        header: res['name'],
        title: 'Основная информация',
        headerAbout: 'Биография',
        date: formattedDate,
        poster: res['poster_href'],
        infoText: res['info_text'] ? res['info_text'] : 'Неизвестно',
        country: res['country'] ? res['country'] : 'Страна неизвестна',
        career: res['career']
      };
    }

    if (document.querySelector('.content-block') != null) {
      const mainHTML = document.querySelector('main');
      mainHTML!.innerHTML = '';

      mainHTML?.insertAdjacentHTML('afterbegin', image.render({}));

      const icon = document.querySelector('.image-container') as HTMLElement;
      const iconsShadow = document.querySelector('.header__container__shadow') as HTMLElement;
      icon!.style.backgroundImage = 'url("' + result['poster'] + '")';

      icon!.style.backgroundAttachment = 'fixed';
      iconsShadow!.style.backgroundAttachment = 'fixed';

      const containerHTML = document.querySelector('.image-container');
      containerHTML?.insertAdjacentHTML('beforeend', actorInfo.render(result));
      // containerHTML?.insertAdjacentHTML('beforeend', info.render(result));
    }
  }

  componentWillUnmount () {
    store.unsubscribe('removeView', this.subscribeActorStatus);
  }

  subscribeActorStatus () {
    this.state.actorInfo = store.getState('actorInfo');
    this.componentDidMount();
  }
}
