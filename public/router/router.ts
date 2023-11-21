import { DOMAIN, privateRoutes, routes } from '@utils/config';
import { store } from '@store/store';
import { actionAuth, actionCSRF } from '@store/action/actionTemplates';
import { page404 } from '@router/Page404/page404';

interface Class {
  render: Function;
  componentWillUnmount: Function;
}

interface stateObject {
  path: string;
  props?: string;
}
interface Router {
  root: Element;
  mapViews: Map<string, Class>;
  privateMapViews: Map<string, Class>;
}
class Router {
  constructor (ROOT) {
    this.root = ROOT;
    this.mapViews = new Map();
    this.privateMapViews = new Map();

    this.subscribeRouterLogout = this.subscribeRouterLogout.bind(this);
    this.subscribeSigninStatus = this.subscribeSigninStatus.bind(this);

    store.subscribe('login', this.subscribeSigninStatus);
    store.subscribe('logoutStatus', this.subscribeRouterLogout);
  }

  register ({ path, view }, privatePath = false) {
    privatePath
      ?this.privateMapViews.set(path, view)
      :this.mapViews.set(path, view);
  }

  refresh (redirect = false) {
    const url = new URL(window.location.href);
    const names = url.pathname.split('/');

    if (
      this.mapViews.get(url.pathname) ||
      this.privateMapViews.get(url.pathname)
    ) {
      this.go(
        {
          path: url.pathname,
          props: url.search
        },
        { pushState: !redirect, refresh: !redirect }
      );
    } else if (this.mapViews.get(`/${names[1]}`) || this.privateMapViews.get(`/${names[1]}`)) {
      this.go(
        {
          path: `/${names[1]}`,
          props: `/${names[2]}`
        },
        { pushState: !redirect, refresh: !redirect }
      );
    } else {
      page404.render();
    }
  }

  start () {
    store.dispatch(actionCSRF());
    store.dispatch(actionAuth());

    for (const rout of routes) {
      this.register(rout);
    }

    for (const rout of privateRoutes) {
      this.register(rout, true);
    }

    window.addEventListener('popstate', () => {
      const url = new URL(window.location.href);
      const names = url.pathname.split('/');

      let path = '';
      let props = '';

      if (names[1] === '') {
        path = '/';
      } else {
        path = `/${names[1]}`;
      }

      if (names[2]) {
        props = `/${names[2]}`;
      }

      this.go({ path, props }, { pushState: false, refresh: false });
    });
    this.refresh();
  }

  go (
    stateObject: stateObject,
    { pushState, refresh }: { pushState: boolean; refresh: boolean }
  ) {
    let view = this.mapViews.get(stateObject.path);
    if (view) {
      view?.render(stateObject.props);
      this.navigate(stateObject, pushState);
      return;
    }

    console.log(store.state);

    view = this.privateMapViews.get(stateObject.path);
    if (view) {
      // store.dispatch(actionAuth());
      if (store.getState('auth')?.status !== 200) {
        view = this.mapViews.get('/login');
        stateObject = { props: '', path: '/login' };
        view?.render(stateObject.props);
        this.navigate(stateObject, pushState);
      }

      view?.render(stateObject.props);
      this.navigate(stateObject, pushState);
    }
  }

  navigate ({ path, props }: stateObject, pushState = false) {
    const location = DOMAIN;

    if (pushState) {
      if (props) {
        window.history.pushState('', '', location + path + props);
      } else {
        window.history.pushState('', '', location + path);
      }
    } else {
      if (props) {
        window.history.replaceState('', '', `${location + path + props}`);
      } else {
        window.history.replaceState('', '', location + path);
      }
    }
  }

  subscribeRouterLogout () {
    const logout = store.getState('logoutStatus');

    if (logout === 200) {
      store.setState({ auth: { status: 400 } });
      this.go(
        {
          path: '/',
          props: ``
        },
        { pushState: true, refresh: false }
      );
    }
  }

  subscribeSigninStatus () {
    const status = store.getState('login').status;
    store.setState({ auth: { status: status } });
    // store.dispatch(actionAuth(true));
  }
}

export const router = new Router(document.querySelector('#root'));
