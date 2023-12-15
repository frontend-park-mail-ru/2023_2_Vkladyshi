/* eslint-disable no-return-assign */
/* eslint-disable no-new */
/* eslint-disable require-jsdoc */
import { API, urls } from '@utils/config';
import { showNotification } from '@components/Notification/notification';
import { store } from '@store/store';
import { decoreDate } from '@utils/dateConverter';

interface wsMessage {
  action: string;
  payload: anyObject;
}

interface Callback {
  (payload: anyObject): void;
}

class WebSocketService {
  private _ws: WebSocket | null;
  private _wsUrl: string;
  private mapActionHandlers: Map<string, Callback>;
  private mapNotification: Map<number, boolean>;
  private openHandler: EventListener;
  private messageHadnler: EventListener;
  private errorHandler: EventListener;
  private closeHandler: EventListener;
  private storeHandler: Function;
  private logoutHandler: Function;
  private addDeleteHandler: Function;
  private state: {
    user: string | null;
    permission: string | null;
    isActive: boolean | null;
    logoutStatus: number | null;
  };

  constructor (url: string = urls.ws) {
    console.log('ws_constructor');
    this._wsUrl = url;
    this._ws = null;
    this.mapActionHandlers = new Map();
    this.mapNotification = new Map();

    this.state = {
      user: null,
      permission: null,
      isActive: true,
      logoutStatus: null
    };

    this.subscribe('ANONS_FILM', (payload: filmNotifPayload) => {
      // showNotification('ANONS_FILM', payload);

      if (!this.state.isActive && this.state.permission === 'granted' && this.mapNotification.has(payload.id)) {
        const date = decoreDate(payload.prod_date).split(' ');
        new Notification('Премьера фильма!', {
          body: `${payload.name} в Кино с ${date[0]} ${date[1]}`
        });
      }
    });

    this.storeHandler = () => {
      console.log('ws__storeHandler1');
      this.state.user = store.getState('auth');

      if (this.state.user) {
        this._ws = new WebSocket(this._wsUrl);
        console.log('ws__storeHandler2');
        this.initialize();

        Notification.requestPermission().then((permission) => {
          console.log('ws__Notification_Permission:', permission);
          this.state.permission = permission;
        });
      }
    };

    store.subscribe('auth', this.storeHandler);

    this.logoutHandler = () => {
      this.state.logoutStatus = store.getState('auth').status;
      if (this.state.logoutStatus === 200) {
        this.cancel();
      }
    };
    store.subscribe('logoutStatus', this.logoutHandler);

    this.addDeleteHandler = () => {
      console.log(store.getState('subscribeCalendar_res'));
      const newNotification = store.getState('subscribeCalendar_res')['body'];
      if (this.mapNotification.has(newNotification['notificationID']) === false && newNotification['subscribe'] === true) {
        this.mapNotification.set(newNotification['notificationID'], true);
      };
      if (this.mapNotification.has(newNotification['notificationID']) && newNotification['subscribe'] === false) {
        this.mapNotification.delete(newNotification['notificationID']);
      };
    };
    store.subscribe('subscribeCalendar_res', this.addDeleteHandler);

    window.onfocus = () => (this.state.isActive = true);
    window.onblur = () => (this.state.isActive = false);
  }

  initialize () {
    console.log('ws_initialize --- ', this._ws);
    if (!this._ws) {
      return;
    }

    this.openHandler = () => {
      console.log('open websocket');
    };
    this._ws.addEventListener('open', this.openHandler);

    this.messageHadnler = (event: MessageEvent<any>) => {
      const data: wsMessage = JSON.parse(event.data);
      this.emit([data.action], data.payload);
    };
    this._ws.addEventListener('message', this.messageHadnler);

    this.errorHandler = (err: ErrorEvent) => {
      console.log(`get error. Reason: ${err.message}`);
    };
    this._ws.addEventListener('error', this.errorHandler);

    this.closeHandler = (event: CloseEvent) => {
      console.log(`websocket success close! code: ${event.code}`);
    };
    this._ws.addEventListener('close', this.closeHandler);
  }

  send (action: string, payload: anyObject) {
    console.log('ws_send');
    if (this._ws != null) {
      this._ws.send(
        JSON.stringify({
          action,
          payload
        })
      );
    }
  }

  emit (actions: string[], payload: anyObject) {
    console.log('ws_emit');
    if (this.mapActionHandlers !== undefined) {
      // @ts-ignore
      actions.forEach((action) => this.mapActionHandlers.get(action)(payload));
    }
  }

  subscribe (action: string, callback: Callback) {
    console.log('ws_subscribe');
    if (this.mapActionHandlers.has(action)) {
      return;
    }
    this.mapActionHandlers.set(action, callback);
  }

  unsubscribe (action: string) {
    console.log('ws_unsubscribe');
    if (this.mapActionHandlers.has(action)) {
      this.mapActionHandlers.delete(action);
    }
  }

  cancel () {
    if (this._ws) {
      this._ws.removeEventListener('open', this.openHandler);
      this._ws.removeEventListener('message', this.messageHadnler);
      this._ws.removeEventListener('error', this.errorHandler);
      this._ws.removeEventListener('close', this.closeHandler);
      this._ws = null;
    }

    // store.unsubscribe('user', this.storeHandler);
  }
}

export const webSocket = new WebSocketService(urls.ws);
