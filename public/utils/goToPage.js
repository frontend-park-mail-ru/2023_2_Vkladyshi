import { config } from './config.js';

/**
 *  рендеринг по ивент
 * @param event
 * @return {string|bool} выводит название класса кнопки, на котором сработал ивент
 */
export function goToPageByEvent(event) {
  let result = false;
  event.composedPath().forEach(function (element) {
    if (element.dataset) {
      if (config.menu.hasOwnProperty(element.dataset.section)) {
        config.menu[element.dataset.section].renderObject.render();
        result = event.target.className;
      }
    }
  });
  return result;
}

/**
 * рендеринг по имени класса
 * @param classname имя класса
 */
export function goToPageByClassName(classname) {
  config.menu[classname].renderObject.render();
}
