import {config} from "./config.js";
export function goToPageByEvent(event) {
    let result = false;
     event.composedPath().forEach(function(element) {
        if (element.dataset){
            if (config.menu.hasOwnProperty(element.dataset.section)) {
                config.menu[element.dataset.section].renderObject.render();
                result = event.target.className;
            }
        }
    });
    return result;
}

export function goToPageByClassName(classname) {
  config.menu[classname].renderObject.render();
}
