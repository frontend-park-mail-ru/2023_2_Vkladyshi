import { Component } from '@components/component';
import * as templateFilm from '@components/film/film.hbs';

/**
 * Класс рендеринга авторизации
 * @class Film
 * @typedef {Film}
 */
export class Film {
  private popupEvent: (event) => void;
  /**
   * Метод рендеринга элемента
   * @param result
   * @return {string} html авторизации
   */
  render (urlImage) {
    this.componentDidUnmount();
    return templateFilm(urlImage);
  }//background-image: url("/icons/mainImagjpg")

  componentDidMount () {
    const header = document.querySelector('header');
    // @ts-ignore
    header?.style.opacity = 0;
    // @ts-ignore
    header?.style.visibility = 'hidden';


    const popupEvent = (event) => {
      const header = document.querySelector('header');

      const scrollPosition = window.scrollY;

      if (scrollPosition > 0) {
        // @ts-ignore
        header?.style.opacity = 1;
        // @ts-ignore
        header?.style.visibility = 'visible';
        // header?.classList.add('visible');
      } else {
        // @ts-ignore
        header?.style.opacity = 0;
        // @ts-ignore
        header?.style.visibility = 'hidden';
      }
    }

    this.popupEvent = popupEvent;
    window.addEventListener('scroll', this.popupEvent);

    // window.addEventListener('scroll', function () {
    //   const header = document.querySelector('header');
    //
    //   const scrollPosition = window.scrollY;
    //
    //   if (scrollPosition > 0) {
    //     // @ts-ignore
    //     header?.style.opacity = 1;
    //     // @ts-ignore
    //     header?.style.visibility = 'visible';
    //     // header?.classList.add('visible');
    //   } else {
    //     // @ts-ignore
    //     header?.style.opacity = 0;
    //     // @ts-ignore
    //     header?.style.visibility = 'hidden';
    //   }
    // });
  }

  componentDidUnmount() {
    window.removeEventListener('scroll', this.popupEvent);
  }
}
export const film = new Film();
