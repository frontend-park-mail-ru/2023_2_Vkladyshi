import { DOMAIN, routes } from '@utils/config';
import { store } from '@store/store';
import { actionCSRF } from '@store/action/actionTemplates';

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
  }

  register ({ path, view }, privatePAth = false) {
    this.privateMapViews.set(path, view);
    this.mapViews.set(path, view);
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
    } else if (this.mapViews.get(`/${names[1]}`)) {
      this.go(
        {
          path: `/${names[1]}`,
          props: `/${names[2]}`
        },
        { pushState: !redirect, refresh: !redirect }
      );
    }
  }

  start () {
    store.dispatch(actionCSRF());
    for (const rout of routes) {
      this.register(rout);
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
    const view = this.mapViews.get(stateObject.path);

    view?.render(stateObject.props);
    this.navigate(stateObject, pushState);
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
}

export const router = new Router(document.querySelector('#root'));
