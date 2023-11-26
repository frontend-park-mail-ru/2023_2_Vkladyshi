/* eslint-disable require-jsdoc */
import { View } from '@views/view';
import { filmSelectionPage } from '@utils/config';
import { router } from '@router/router';
import { image } from '@components/Image/image';
import { calendar } from '@components/Calendar/calendar';
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
    const contentBlockHTML = document.querySelector('.content-block');
    const mainHTML = document.querySelector('main');

    mainHTML?.insertAdjacentHTML(
      'afterbegin',
      image.render({ mainPage: true })
    );
    const icon = document.querySelector('.image-container') as HTMLElement;
    icon!.style.backgroundImage = 'url("/icons/mainImagjpg")';

    if (contentBlockHTML) {
      filmSelectionPage.render(false).then((response) => {
        contentBlockHTML.insertAdjacentHTML('beforeend', <string>response);
        this.componentDidMount(); // @ts-ignore
        calendar.render().then((response) => {
          contentBlockHTML.insertAdjacentHTML('beforeend', <string>response);
          const currentDate = new Date();
          const searchDay = String(currentDate.getDate());
          const currentDaysHTML = contentBlockHTML.querySelector(
            '.day__' + searchDay
          );
          currentDaysHTML?.classList.add('calendar__days__day_today');
        });
      });
    }
  }

  componentDidMount () {
    const popup = document.querySelector('.film-selection');
    const popupEvent = (event) => {
      this.popupEvent = popupEvent;
      switch (true) {
        case event.target.closest('.film-selection_film') !== null:
          const filmId = event.target
            .closest('.film-selection_film')
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
    const popup = document.querySelector('.film-selection');
    popup?.removeEventListener('click', this.popupEvent);
  }
}
