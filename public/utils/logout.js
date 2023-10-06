import {get} from "./ajax.js";
import {header, urls} from './config.js';


export function logout() {
    get({url: urls.logout});

    document.querySelector("header").innerHTML = header.render(false);
    header.addToHeaderEvent(true)
}
