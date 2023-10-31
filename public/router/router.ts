import { DOMAIN, routes } from '@utils/config'

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
  prevUrl: string;
}
class Router {
  constructor (ROOT) {
    this.root = ROOT
    this.mapViews = new Map()
    this.privateMapViews = new Map()
    this.prevUrl = ''
  }

  register ({ path, view }, privatePAth = false) {
    this.privateMapViews.set(path, view)
    this.mapViews.set(path, view)
  }

  refresh (redirect = false) {
    const matchedHref = window.location.href.match('/')!.toString()
    if (
      this.mapViews.get(matchedHref) != null ||
      this.privateMapViews.get(matchedHref) != null
    ) {
      this.go(
        {
          path: matchedHref,
          props: matchedHref
        },
        { pushState: !redirect, refresh: !redirect }
      )
    }
  }

  start () {
    for (const rout of routes) {
      this.register(rout)
    }

    window.addEventListener('popstate', () => {
      const href = new URL(window.location.href).pathname
      // const prevView = this.mapViews.get(this.prevUrl);

      this.go({ path: href, props: href }, { pushState: true, refresh: false })
      this.prevUrl = href
    })
    this.refresh()
  }

  go (
    stateObject: stateObject,
    { pushState, refresh }: { pushState: boolean; refresh: boolean }
  ) {
    const view = this.mapViews.get(stateObject.path)

    view?.render(stateObject.props)
    this.navigate(stateObject, pushState)
  }

  navigate ({ path, props }: stateObject, pushState = false) {
    // const location = window.location.href.replace(/\/$/, '')
    const location = DOMAIN

    // const new1 = window.location.href.replace(DOMAIN,'');
    // const location = new URL(window.location.href).pathname;

    if (pushState) {
      if (props) {
        window.history.pushState('', '', location + path)
      } else {
        window.history.pushState('', '', location + path)
      }
      this.prevUrl = path
    } else {
      if (props) {
        window.history.replaceState('', '', `${location + path}`)
      } else {
        window.history.replaceState('', '', location + path)
      }
      this.prevUrl = path
    }
  }
}

export const router = new Router(document.querySelector('#root'))
