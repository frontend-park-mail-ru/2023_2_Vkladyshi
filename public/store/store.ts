import { handlers } from '@utils/handlers';

interface Store {
  state: { [key: string]: any };
  mapActionHandlers: Map<string, Function>;
  mapSubscribers: Map<string, Array<Function>>;
  csrfToken: string;
}

class Store {
  constructor () {
    this.state = {};
    this.mapActionHandlers = new Map();
    this.mapSubscribers = new Map();
    this.csrfToken = '';

    for (const handler of handlers) {
      this.register(handler);
    }
  }

  register ({ type, method }) {
    this.mapActionHandlers.set(type, method);
  }

  subscribe (type, callback) {
    const arraySubs = this.mapSubscribers.get(type);

    if (arraySubs) {
      arraySubs.push(callback);
    } else {
      this.mapSubscribers.set(type, [callback]);
    }
  }

  unsubscribe (type, activeFunc) {
    const arraySubs = this.mapSubscribers.get(type);
    if (arraySubs) {
      this.mapSubscribers.set(type, arraySubs.filter((item) => item.name !== activeFunc.name));
    }
  }

  setState (newState: { [key: string]: any }) {
    let subs;
    Object.keys(newState).forEach((key) => {
      this.state[key] = newState[key];
      subs = this.mapSubscribers.get(key);
      if (subs && subs.length) {
        subs.forEach((subscriber) => {
          subscriber();
        });
      }
    });
  }

  async dispatch (action) {
    const storeReducer = this.mapActionHandlers.get(action.type);
    if (!storeReducer) {
      return;
    }

    let newState = {};
    if (Object.hasOwnProperty.call(action, 'value')) {
      newState = await storeReducer(action.value);
    } else {
      newState = await storeReducer();
    }

    if (newState) {
      this.setState(newState);
    }
    return newState;
  }

  getState (nameObject) {
    if (Object.hasOwnProperty.call(this.state, nameObject)) {
      return this.state[nameObject];
    }
    return null;
  }
}

export const store = new Store();
