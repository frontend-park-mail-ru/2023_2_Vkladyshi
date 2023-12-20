import { View } from '@views/view';
import { methods, ROOT, urls } from '@utils/config';
import { router } from '@router/router';
import { calendar } from '@components/Calendar/calendar';
import { Slider } from '@components/Slider/slider';
import { store } from '@store/store';
import { actionSubCalendar
} from '@store/action/actionTemplates';
import { FilmSelectionPage } from '@views/FilmSelectionPage/FilmSelectionPage';
import { notification } from '@/notification';

/**
 * Класс формирования главной страницы
 * @class MainPage
 * @typedef {MainPage}
 */
export class MainPage extends View {
  private popupEvent: (event) => void;
  private calendarEvent: (event) => void;
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
        "                <div class='first-text'>Добро пожаловать!</div>\n" +
        '            </div>\n' +
        '        </div>'
    );

    const slider = new Slider();
    contentBlockHTML?.insertAdjacentHTML('beforeend', slider.render());
    slider.addEvents();

    if (contentBlockHTML) {
      const filmSelection = new FilmSelectionPage(ROOT);
      filmSelection.render(true).then((response) => {
        const divName = document.querySelector(
          '.film-selection_name'
        ) as HTMLElement;
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
      const email = document.querySelector(
        '.input-main-email'
      ) as HTMLInputElement;
      const text = document.querySelector('.header__container__text');
      // event.preventDefault();
      if (/.@./.test(email.value)) {
        event.preventDefault();
        text!.innerHTML = '<h2>Спасибо за подписку!</h2>';
      } else if (email.value === '') {
        event.preventDefault();
      }
    });
  }
  addCalendar () {
    store.unsubscribe('collectionMain', this.addCalendar.bind(this));

    if (calendar) {
      calendar.render().then((response) => {
        const contentBlockHTML = document.querySelector('.content-block');
        contentBlockHTML?.insertAdjacentHTML('beforeend', <string>response);
        const currentDate = new Date();
        const searchDay = String(currentDate.getDate());
        const currentDaysHTML = contentBlockHTML?.querySelector(
          '.day__' + searchDay
        );
        currentDaysHTML?.classList.add('calendar__days__day_today');

        const subs = document.querySelectorAll('.calendar__days__subscribe');
        const calendarSelector = document.querySelector('.calendar');

        const calendarEvent = (event) => {
          this.calendarEvent = calendarEvent;
          const filmId = event?.target
            ?.closest('.calendar__days__day')
            ?.getAttribute('data-section');
          switch (true) {
            case event.target.className === 'calendar__days__subscribe':
              if (store.getState('auth').status === 200) {
                store
                  .dispatch(actionSubCalendar())
                  .then(async (response) => {
                    const result = store.getState('subscribeCalendar_res');
                    console.log(store.state);
                    if (result['status'] === 200) {
                      await notification.reqiestNotif();

                      if (result?.body?.subscribe === false) {
                        notification.renderUI({
                          title: 'Отписка от уведомлений о новинках',
                          body: 'Вы успешно отписались от новостей'
                        });

                        notification.cancelSending();
                      } else {
                        notification.renderUI({
                          title: 'Подписка на уведомления о новинках',
                          body: 'Благодарим Вас за подсписку!'
                        });

                        notification.startSending();
                      }
                    }
                  });
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
            case event.target.closest('.calendar__days') !== null:
              if (filmId !== '') {
                this.componentWillUnmount();
                router.go(
                  {
                    path: '/film',
                    props: `/${filmId}`
                  },
                  { pushState: true, refresh: false }
                );
              }
              break;
            default:
              break;
          }
        };

        calendarSelector?.addEventListener('click', calendarEvent);
      });
    }
  }

  componentWillUnmount () {
    // const popup = document.querySelector('.film-selection');
    // popup?.removeEventListener('click', this.popupEvent);

    const popup = document.querySelector('.film-selection');
    popup?.removeEventListener('click', this.popupEvent);

    const calendar = document.querySelector('.calendar');
    calendar?.removeEventListener('click', this.calendarEvent);
  }
}
