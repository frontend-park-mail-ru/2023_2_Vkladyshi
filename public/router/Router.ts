import {DOMAIN, routes} from '@utils/config';

interface Class {
    render :Function;
    componentWillUnmount :Function;
}

interface stateObject {
    path :string;
    props ?:string;
}
interface Router {
    root: Element;
    mapViews: Map<string, Class>;
    privateMapViews: Map<string, Class>;
    pathBeforModal: string;
    prevUrl: string;
    isDispatchedAuth: boolean;
    isSubscribedLogout: boolean;
}
class Router {
    constructor() {
        // @ts-ignore
        this.root = document.querySelector('#root');
        this.mapViews = new Map();
        this.privateMapViews = new Map();
        this.isDispatchedAuth = false;
        this.isSubscribedLogout = false;
    }
    matchHref(value){}

    register({path, view}, privatePAth = false) {
        this.privateMapViews.set(path, view);
        this.mapViews.set(path, view);
    }

    refresh(redirect = false) {

        // @ts-ignore
        const matchedHref = window.location.href.match('/').toString();
        if (this.mapViews.get(matchedHref) || this.privateMapViews.get(matchedHref)) {
            this.go({
                path: matchedHref,
                props: matchedHref,
            }, { pushState: redirect? false: true, refresh: redirect? false: true });
        }
    }

    start() {
        for (const rout of routes) {
            this.register(rout);
        }

        this.refresh();

        window.addEventListener('popstate', () => {
            const href = new URL(window.location.href).pathname;

            //const prevView = this.mapViews.get(this.prevUrl);

            this.go({path: href, props: href }, {pushState:false, refresh:false})
            this.prevUrl = href;
        });
    }

    go(stateObject :stateObject, { pushState, refresh } :{ pushState :boolean, refresh: boolean}) {
        const view = this.mapViews.get(stateObject.path);

        view?.render(stateObject.props);
        this.navigate(stateObject, pushState);
    }

    navigate({ path, props } :stateObject, pushState = false) {
        //const location = window.location.href.replace(/\/$/, '')
        const location = DOMAIN;

        //const new1 = window.location.href.replace(DOMAIN,'');
        //const location = new URL(window.location.href).pathname;

        if (pushState) {
            if (props) {
                window.history.pushState('','', `${location + path}`);
            } else {
                window.history.pushState('', '', location + path);
            }
            this.prevUrl = path;
        } else {
            if (props) {
                window.history.replaceState( '', '', `${location + path}`);
            } else {
                window.history.replaceState( '','', location + path);
            }
            this.prevUrl = path;
        }
    }


};

export const router = new Router();
