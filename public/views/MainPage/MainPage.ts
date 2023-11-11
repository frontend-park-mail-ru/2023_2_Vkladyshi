import { View } from '@views/view';
import {filmSelectionPage, ROOT} from '@utils/config';
import { router } from '@router/router';
import { inputButton } from '@components/inputButton/inputButton';
import {film} from '@components/film/film';
import '@components/film/slider';
import {func} from '@components/film/slider';


/**
 * Класс формирования главной страницы
 * @class MainPage
 * @typedef {MainPage}
 */
export class MainPage extends View {
  private popupEvent: (event) => void;
  /**
   * Метод создания страницы
   */
  render () {
    this.renderDefaultPage();
    const contentBlockHTML = document.querySelector('.contentBlock');
    const mainHTML = document.querySelector('main');


    // const popup = document.createElement('div');
    // popup.classList.add('background-main');
    // mainHTML?.insertBefore(popup, mainHTML.firstChild);

    mainHTML?.insertAdjacentHTML('afterbegin', film.render({urlImage : 'mainImagjpg'}));
    film.componentDidMount();
    // func();


    if (contentBlockHTML) {
      filmSelectionPage.render(false).then((response) => {
        contentBlockHTML.insertAdjacentHTML('beforeend', <string>response);
        this.componentDidMount();
      });
    }

    // contentBlockHTML!.insertAdjacentHTML('beforeend', film.render());
  }

  componentDidMount () {
    const popup = document.querySelector('.filmSelection');
    const popupEvent = (event) => {
      this.popupEvent = popupEvent;
      switch (true) {
        case event.target.closest('.filmSelection_film') !== null:
          const filmId = event.target
            .closest('.filmSelection_film')
            .getAttribute('data-section');
          this.componentWillUnmount();
          router.go(
            {
              path: '/film',
              props: `/${filmId}`
            },
            { pushState: true, refresh: false }
          );
          break;
        default:
          break;
      }
    };
    popup?.addEventListener('click', popupEvent);
  }

  componentWillUnmount () {
    const popup = document.querySelector('.filmSelection');
    popup?.removeEventListener('click', this.popupEvent);
  }
}
