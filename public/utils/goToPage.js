import {config} from "./config.js";
export function goToPage(event) {
    let result = false;
     event.composedPath().forEach(function(element) {
        if (element.dataset){
            // console.log(config.menu.hasOwnProperty(element.dataset.section));
            if (config.menu.hasOwnProperty(element.dataset.section)) {
                // console.log(this);
                config.menu[element.dataset.section].renderObject.render();
                result = true;
            }
        }
    });
    return result;
}
