import {get} from "./ajax.js";
import {urls} from "./config.js";

export function logout(header) {
    get({url: urls.logout}).then(r => {});

    document.cookie.split(";").forEach(function(cookie) {
        document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/");
    });

    header.render(false);
}