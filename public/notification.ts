import { get } from '@utils/ajax';
import { urls } from '@utils/config';
import { store } from '@store/store';

export interface NotificationClass {
  state: {
    permission: boolean;
    intervalFunc: any;
  };
}
export class NotificationClass {
  constructor() {
    this.state = {
      permission: false,
      intervalFunc: null,
    };

    store.subscribe('logout', this.cancelSending.bind(this));
    store.subscribe('auth', this.startSending.bind(this));
  }

  renderUI = (data) => {
    const notif = {
      body: data.body,
      icon: 'https://movie-hub.ru/icons/brandTitle.svg',
      requireInteraction: true,
    };

    const notifUI = new Notification(data.title, notif);
  };

  reqiestNotif = async () => {
    const perm = await Notification.requestPermission();

    if (perm === 'granted') {
      this.state.permission = true;
    } else {
      this.state.permission = false;
    }
  };

  startSending() {
    if (this.state.permission && store.getState('auth')?.status === 200) {
      setTimeout(this.sendNotify, 1000);
      this.state.intervalFunc = setInterval(this.sendNotify, 60000);
    }
  }

  cancelSending() {
    this.state.permission = false;
    clearInterval(this.state.intervalFunc);
  }

  sendNotify = async () => {
    const perm = await Notification.requestPermission();
    console.log(perm, this.state.permission);
    if (perm !== 'granted') {
      this.cancelSending();
      return;
    }

    const response = await get({
      url: urls.calendar,
    });
    if (response?.status === 200 && response) {
      response?.body.days.forEach((elem) => {
        if (elem.dayNumber === response?.body.currentDay) {
          this.renderUI({
            title: 'Уведомление о релизах',
            body: `Сегодня вышел ${elem.dayNews}, не пропустите!`,
          });
        }
      });
    }
  };
}

export const notification = new NotificationClass();
