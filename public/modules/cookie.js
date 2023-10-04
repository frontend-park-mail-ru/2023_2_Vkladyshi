import {get} from "./ajax.js";
import {urls} from "./config.js";

export function cookie(header) {
    get({url: urls.logout}).then(r => {});
    document.cookie = "session_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    header.render(false);
}

export function checkCookie(cookieName) {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();

        if (cookie.startsWith(cookieName + "=")) {
            return true;
        }
    }

    return false;
}
