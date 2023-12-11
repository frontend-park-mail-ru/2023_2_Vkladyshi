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
    this.renderDefaultPage();
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

    if (contentBlockHTML) {
      const filmSelection = new FilmSelectionPage(ROOT);
      filmSelection.render(true).then((response) => {
        const divName = document.querySelector('.film-selection_name') as HTMLElement;
        if (divName) {
          divName!.textContent = 'Новинки';
          // divName.style.marginTop = '0px';
        }

        const sliderFilms = new Slider();
        contentBlockHTML?.insertAdjacentHTML('beforeend', sliderFilms.render());

        this.componentDidMount();
        // sliderFilms.addEventsLine();
        //
        // const sliderContainer = document.querySelector('.slider-container');
        // const films = document.querySelector('.film-selection_films');
        // const slider = document.querySelector('.slider-name');
        // slider?.appendChild(<Element>divName);
        // sliderContainer?.appendChild(<Element>films);
        //
        // calendar.render().then((response) => {
        //   contentBlockHTML.insertAdjacentHTML('beforeend', <string>response);
        //   const currentDate = new Date();
        //   const searchDay = String(currentDate.getDate());
        //   const currentDaysHTML = contentBlockHTML.querySelector(
        //     '.day__' + searchDay
        //   );
        //   currentDaysHTML?.classList.add('calendar__days__day_today');
        // });
      });
    }
  }

  componentDidMount () {
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
                props: ``
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
              props: `/${filmId}`
            },
            { pushState: true, refresh: false }
          );
          break;
        default:
          break;
      }
    };

    console.log('pre_sub')
    const sendEmail = document.querySelector('.send-email-main');
    sendEmail?.addEventListener('click', (event)=>{
      const email = document.querySelector('.input-main-email') as HTMLInputElement;
      const text = document.querySelector('.header__container__text');
      // event.preventDefault();
      console.log('post__SUBMIT 123 MAIL', email.value);
      if (/.@./.test(email.value)) {
        event.preventDefault();
        text!.innerHTML = '<h2>Спасибо за подписку!</h2>';
      } else if (email.value === '') {
        event.preventDefault();
      }
      // event.preventDefault();
    });

    popup?.addEventListener('click', popupEvent);
  }

  componentWillUnmount () {
    const popup = document.querySelector('.film-selection');
    popup?.removeEventListener('click', this.popupEvent);
  }
}
