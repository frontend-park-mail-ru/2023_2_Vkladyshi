import { DOMAIN, routes } from '@utils/config';

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
    const parsedUrl = new URL(window.location.href);
    const matchedHref = parsedUrl.pathname;

    const url = new URL(window.location.href);

    if (
      this.mapViews.get(matchedHref) != null ||
      this.privateMapViews.get(matchedHref) != null
    ) {
      this.go(
        {
          path: url.pathname,
          props: url.search
        },
        { pushState: !redirect, refresh: !redirect }
      );
    }
  }

  start () {
    for (const rout of routes) {
      this.register(rout);
    }

    window.addEventListener('popstate', () => {
      const href = new URL(window.location.href).pathname;

      this.go({ path: href, props: '' }, { pushState: false, refresh: false });
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
