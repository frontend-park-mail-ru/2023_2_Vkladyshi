import {get} from "./ajax.js";
import {urls} from "./config.js";

export function logout(header) {
    get({url: urls.logout}).then(r => {});
    document.cookie = "session_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    header.render(false);
}
