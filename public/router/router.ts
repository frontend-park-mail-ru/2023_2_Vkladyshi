import { DOMAIN, privateRoutes, ROOT, routes } from '@utils/config';
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
  lastView: { path; props };
}
class Router {
  constructor (ROOT) {
    this.root = ROOT;
    this.lastView = { path: '/', props: '' };
    this.mapViews = new Map();
    this.privateMapViews = new Map();

    // store.subscribe('auth', this.subscribeRouterAuthStatus.bind(this));
    store.subscribe('login', this.subscribeRouterSigninStatus.bind(this));
    store.subscribe('logoutStatus', this.subscribeRouterLogout.bind(this));
  }

  register ({ path, view }, privatePath = false) {
    privatePath
      ? this.privateMapViews.set(path, view)
      : this.mapViews.set(path, view);
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
    } else if (
      this.mapViews.get(`/${names[1]}`) ||
      this.privateMapViews.get(`/${names[1]}`)
    ) {
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
    setTimeout(() => {
      ROOT?.insertAdjacentHTML(
        'beforeend',
        '<iframe class="csat-container" src="https://www.movie-hub.ru"></iframe>'
      );
    }, 6000);
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

      const hasNumber = /\d/.test(url.pathname);

      let path = '';
      let props: string | undefined = '';

      if (hasNumber) {
        path = url.pathname.replace(/\/\d+$/, '');
        props = '/' + url.pathname.match(/\d+$/)?.[0];
      } else {
        path = url.pathname;
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
    console.log('main_go');
    if (view) {
      this.navigate(stateObject, pushState);
      // @ts-ignore
      // eslint-disable-next-line new-cap
      const viewResult = new view(ROOT);
      viewResult.render(stateObject.props);
      window.scrollTo(0, 0);
      return;
    }

    view = this.privateMapViews.get(stateObject.path);
    if (view) {
      this.lastView = { path: stateObject.path, props: stateObject.props };
      console.log(store.state, store.getState('auth'));
      if (store.getState('auth')?.status !== 200) {
        view = this.mapViews.get('/login');
        stateObject = { props: '', path: '/login' };
      }

      this.navigate(stateObject, pushState);
      window.scrollTo(0, 0);

      // @ts-ignore
      // eslint-disable-next-line new-cap
      const viewResult = new view(ROOT);
      viewResult.render(stateObject.props);
    }
  }

  navigate ({ path, props }: stateObject, pushState = false) {
    const location = DOMAIN;

    if ((path === '/films' || path === '/actors') && props === '/') {
      return;
    }

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

  subscribeRouterAuthStatus () {
    const status = store.getState('auth').status;

    if (status === 200) {
      router.go(
        {
          path: this.lastView.path,
          props: this.lastView.props
        },
        { pushState: true, refresh: false }
      );
      this.lastView = { path: '/', props: '' };
    }
  }

  subscribeRouterLogout () {
    const logout = store.getState('logoutStatus');

    if (logout === 200) {
      store.setState({ auth: { status: 400 } });
      this.go(
        {
          path: '/',
          props: ''
        },
        { pushState: true, refresh: false }
      );
    }
  }

  subscribeRouterSigninStatus () {
    const status = store.getState('login').status;
    store.setState({ auth: { status: status } });

    if (status === 200) {
      router.go(
        {
          path: this.lastView.path,
          props: this.lastView.props
        },
        { pushState: true, refresh: false }
      );

      this.lastView = { path: '/', props: '' };
    }
  }
}

export const router = new Router(ROOT);

// } else if (this.mapViews.get(`/${names[1]}`) && url.search) {
//   this.go(
//       {
//         path: `/${names[1]}`,
//         props: `/${url.search}`
//       },
//       { pushState: !redirect, refresh: !redirect }
//   );
