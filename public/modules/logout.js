import {get} from "./ajax.js";
import {urls} from "./config.js";

export function logout(header) {
    get({url: urls.logout}).then(r => {});
    header.render(false);
}
