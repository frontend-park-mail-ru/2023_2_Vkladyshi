/* eslint-disable require-jsdoc */
import { View } from '@views/view';
import { methods, ROOT } from '@utils/config';
import { router } from '@router/router';
import { image } from '@components/Image/image';
import { calendar } from '@components/Calendar/calendar';
import { slider } from '@components/Slider/slider';
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
  render() {
    this.renderDefaultPage();
    const contentBlockHTML = document.querySelector('.content-block');
    const mainHTML = document.querySelector('main');

    // mainHTML?.insertAdjacentHTML(
    //   'afterbegin', '      <video class="video-container" autoplay muted loop>\n' +
    //     '          <div class=\'header__container__shadow box-shadow\'></div>\n' +
    //     '          <source class="video-main" src="/icons/video-main.mp4" type="video/mp4">\n' +
    //     '      </video>');

    mainHTML?.insertAdjacentHTML(
        'afterbegin', '        <div class="video-container1">\n' +
        '            <video class="video-container" autoplay muted loop>\n' +
        '                <source class="video-main" src="/icons/video-main.mp4" type="video/mp4">\n' +
        '            </video>\n' +
        '            <div class="overlay"></div>\n' +
        '            <div class=\'header__container__text\'>\n' +
        '                <div class=\'first-text\'>Подпишитесь на рассылку новинок!</div>\n' +
        '                <form class="main-email">\n' +
        '                    <input class="input-main-email" type="email">\n' +
        '                    <button class="send-email-main" type="submit">Отправить</button>\n' +
        '                </form>\n' +
        '            </div>\n' +
        '        </div>');

    // const m = document.querySelector('.video-container') as HTMLElement;
     // @ts-ignore
    // m.volume = 0.05;
    /*

    <div class="video-container1">
      <video class="video-container" autoplay muted loop>
        <source class="video-main" src="/icons/video-main.mp4" type="video/mp4">
      </video>
      <div class="overlay"></div>
        <div class='header__container__text'>
          <div class='first-text'>Добро пожаловать!</div>
        </div>
    </div>


     */


    //<div class='header__container__shadow box-shadow'></div>
    // const icon = document.querySelector('.image-container') as HTMLElement;
    // const iconsShadow = document.querySelector('.header__container__shadow') as HTMLElement;
    // // iconsShadow.style.background = 'rgb(0 0 0 / 40%) linear-gradient( to top, rgba(0, 0, 0, 0.95) 0, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0.8) 100% );';
    // iconsShadow.style.transform = 'scale(1.2);';
    // icon!.style.backgroundImage = 'url("/icons/mainImagjpg")';

    contentBlockHTML?.insertAdjacentHTML('beforeend', slider.render());
    slider.addEvents();

    if (contentBlockHTML) {
      const filmSelection = new FilmSelectionPage(ROOT);
      filmSelection.render(false).then((response) => {
        // const divName = document.querySelector('.film-selection_name');
        // if (divName) {
        //   divName!.textContent = 'Новинки';
        // }

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

  componentDidMount() {
    const popup = document.querySelector('.film-selection');
    const popupEvent = (event) => {
      this.popupEvent = popupEvent;
      switch (true) {
        case event.target.closest('.image-watchlist') !== null:
          if (store.getState('auth').status === 200) {
            const filmFavoriteId = event.target
              .closest('.film-selection_film')
              .getAttribute('data-section');
            store.dispatch(actionAddFavoriteFilm({ film_id: filmFavoriteId }));
          } else {
            router.go(
              {
                path: '/login',
                props: ``,
              },
              { pushState: true, refresh: false }
            );
          }
          break;
        case event.target.closest('.film-selection_film') !== null:
          const filmId = event.target
            .closest('.film-selection_film')
            .getAttribute('data-section');
          this.componentWillUnmount();
          router.go(
            {
              path: '/film',
              props: `/${filmId}`,
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

  componentWillUnmount() {
    const popup = document.querySelector('.film-selection');
    popup?.removeEventListener('click', this.popupEvent);
  }
}
