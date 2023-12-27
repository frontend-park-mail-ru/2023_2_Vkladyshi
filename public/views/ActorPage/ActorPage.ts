import { View } from '@views/view';
import { store } from '@store/store';
import {
  actionActor,
  actionAddFavoriteActor,
  actionFavoriteActors,
  actionRemoveFavoriteActor,
} from '@store/action/actionTemplates';
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
  private popupEvent: (event) => void;
  /**
   * Конструктор класса
   * @param ROOT
   */
  constructor(ROOT) {
    super(ROOT);
    this.state = {
      actorInfo: null,
    };
  }

  /**
   * Метод создания страницы
   * @param props
   */
  render(props = null) {
    this.renderDefaultPage({});
    store.unsubscribe('removeView', this.subscribeActorStatus.bind(this));
    store.subscribe('removeView', this.componentWillUnmount.bind(this));
    store.subscribe('actorInfo', this.subscribeActorStatus.bind(this));

    if (props !== null) {
      store.dispatch(
        // @ts-ignore
        actionActor({ actorName: parseInt(props.replace('/', '')) })
      );
    }
  }

  componentDidMount() {
    let result = {};
    const res = this.state.actorInfo;

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
        country: res['country'] ? res['country'] : 'Неизвестно',
        career: res['career'],
      };
    }

    if (document.querySelector('.content-block') != null) {
      const mainHTML = document.querySelector('main');
      mainHTML!.innerHTML = '';

      mainHTML?.insertAdjacentHTML('afterbegin', image.render({}));

      const icon = document.querySelector('.image-container') as HTMLElement;
      const iconsShadow = document.querySelector(
        '.header__container__shadow'
      ) as HTMLElement;
      icon!.style.backgroundImage = 'url("' + result['poster'] + '")';

      icon!.style.backgroundAttachment = 'fixed';
      iconsShadow!.style.backgroundAttachment = 'fixed';

      const containerHTML = document.querySelector('.image-container');
      containerHTML?.insertAdjacentHTML('beforeend', actorInfo.render(result));
    }

    this.addEvents();
  }

  addEvents() {
    const popup = document.querySelector('.video-content');
    // @ts-ignore
    const id = parseInt(location?.pathname?.match(/\d+/)[0]);
    const popupEvent = (event) => {
      event.preventDefault();
      this.popupEvent = popupEvent;
      switch (true) {
        case event.target.closest('.image-watchlist') !== null:
          const element = document.querySelector(`.video-content`);
          let active = true;

          const orange = element?.querySelector(
            '.red-watchlist'
          ) as HTMLElement;
          const red = element?.querySelector(
            '.orange-watchlist'
          ) as HTMLElement;
          if (element?.querySelector('.orange-watchlist.active')) {
            active = true;
            red.classList.remove('active');
            red.classList.add('noactive');
            orange.classList.remove('noactive');
            orange.classList.add('active');
          } else {
            active = false;
            red.classList.remove('noactive');
            red.classList.add('active');
            orange.classList.remove('active');
            orange.classList.add('noactive');
          }

          if (active) {
            store.dispatch(actionAddFavoriteActor({ actor_id: id }));
          } else {
            store.dispatch(actionRemoveFavoriteActor({ actor_id: id }));
          }
          break;
        default:
          break;
      }
    };

    // popup?.removeEventListener('click', this.popupEvent);
    // popup?.removeEventListener('click', popupEvent);
    popup?.addEventListener('click', popupEvent);
  }

  componentWillUnmount() {
    store.unsubscribe('removeView', this.subscribeActorStatus.bind(this));
    store.unsubscribe('favoriteActors', this.getFavoriteActorsList.bind(this));
    store.unsubscribe('actorInfo', this.subscribeActorStatus.bind(this));
    const popup = document.querySelector('.video-content');
    popup?.removeEventListener('click', this.popupEvent);
  }

  getFavoriteActorsList() {
    const favoriteActors = store.getState('favoriteActors');
    store.unsubscribe('favoriteActors', this.getFavoriteActorsList.bind(this));

    if (favoriteActors?.status !== 200) {
      return;
    }
    const array = favoriteActors?.body?.actors;
    array?.forEach((key) => {
      const actor = document.querySelector('.image-watchlist');
      if (actor) {
        const orange = document?.querySelector('.red-watchlist') as HTMLElement;
        const red = document?.querySelector('.orange-watchlist') as HTMLElement;
        red.classList.remove('active');
        red.classList.add('noactive');
        orange.classList.remove('noactive');
        orange.classList.add('active');
      }
    });
  }

  subscribeActorStatus() {
    this.state.actorInfo = store.getState('actorInfo');
    store.subscribe('favoriteActors', this.getFavoriteActorsList.bind(this));
    store.dispatch(actionFavoriteActors({ page: 1, per_page: 20 }));
    this.componentDidMount();
  }
}
