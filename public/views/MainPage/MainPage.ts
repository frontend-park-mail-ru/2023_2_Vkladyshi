import { View } from '@views/view';
import { ROOT } from '@utils/config';
import { router } from '@router/router';
import { calendar } from '@components/Calendar/calendar';
import { Slider } from '@components/Slider/slider';
import { store } from '@store/store';
import { actionAddFavoriteFilm } from '@store/action/actionTemplates';
import { FilmSelectionPage } from '@views/FilmSelectionPage/FilmSelectionPage';

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
    this.renderDefaultPage({});

    store.subscribe('collectionMain', this.addCalendar.bind(this));
    const contentBlockHTML = document.querySelector('.content-block');
    const mainHTML = document.querySelector('main');

    mainHTML?.insertAdjacentHTML(
      'afterbegin',
      '        <div class="video-container1">\n' +
        '            <video class="video-container" autoplay muted loop>\n' +
        '                <source class="video-main" src="/icons/video-main.mp4" type="video/mp4">\n' +
        '            </video>\n' +
        '            <div class="overlay"></div>\n' +
        "            <div class='header__container__text'>\n" +
        "                <div class='first-text'>Подпишитесь на рассылку новинок!</div>\n" +
        '                <form class="main-email">\n' +
        '                    <input class="input-main-email" placeholder="Введите вашу почту!" type="email">\n' +
        '                    <button class="send-email-main" type="submit">Подписаться</button>\n' +
        '                </form>\n' +
        '            </div>\n' +
        '        </div>'
    );

    const slider = new Slider();
    contentBlockHTML?.insertAdjacentHTML('beforeend', slider.render());
    slider.addEvents();

    // const sliderNew = new Slider();
    // sliderNew.addEventsLine();
    if (contentBlockHTML) {
      const filmSelection = new FilmSelectionPage(ROOT);
      filmSelection.render(true).then((response) => {
        const divName = document.querySelector('.film-selection_name') as HTMLElement;
        if (divName) {
          divName!.textContent = 'Новинки';
          // divName.style.marginTop = '0px';
        }

        this.componentDidMount();
      });
    }
  }

  componentDidMount () {
    const sendEmail = document.querySelector('.send-email-main');
    sendEmail?.addEventListener('click', (event) => {
      const email = document.querySelector('.input-main-email') as HTMLInputElement;
      const text = document.querySelector('.header__container__text');
      // event.preventDefault();
      if (/.@./.test(email.value)) {
        event.preventDefault();
        text!.innerHTML = '<h2>Спасибо за подписку!</h2>';
      } else if (email.value === '') {
        event.preventDefault();
      }
      // event.preventDefault();
    });

    // popup?.addEventListener('click', popupEvent);
  }
  addCalendar () {
    store.unsubscribe('collectionMain', this.addCalendar.bind(this));
    calendar.render().then((response) => {
      const contentBlockHTML = document.querySelector('.content-block');
      contentBlockHTML?.insertAdjacentHTML('beforeend', <string>response);
      const currentDate = new Date();
      const searchDay = String(currentDate.getDate());
      const currentDaysHTML = contentBlockHTML?.querySelector(
        '.day__' + searchDay
      );
      currentDaysHTML?.classList.add('calendar__days__day_today');
    });
  }

  componentWillUnmount () {
    const popup = document.querySelector('.film-selection');
    popup?.removeEventListener('click', this.popupEvent);
  }
}
