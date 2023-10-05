import {config} from "./config.js";
export function goToPage(event) {
    let result = false;
     event.composedPath().forEach(function(element) {
        if (element.dataset){
            if (config.menu.hasOwnProperty(element.dataset.section)) {
                config.menu[element.dataset.section].renderObject.render();
                result = true;
            }
        }
    });
    return result;
}
