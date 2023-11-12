import * as templateImage from '@components/Image/image.hbs';

/**
 * Класс рендеринга авторизации
 * @class Image
 * @typedef {Image}
 */
export class Image {
  private popupEvent: (event) => void;
  /**
   * Метод рендеринга элемента
   * @return {string} html авторизации
   * @param urlImage
   */
  render (urlImage) {
    return templateImage(urlImage);
  }
}
export const image = new Image();
