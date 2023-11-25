import { View } from '@views/view';
import { filmSelectionPage } from '@utils/config';
import { router } from '@router/router';
import { image } from '@components/Image/image';
import { slider } from '@components/Slider/slider';
import { store } from '@store/store';
import { actionAddFavoriteFilm } from '@store/action/actionTemplates';

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

    // mainHTML!.innerHTML = image.render({ mainPage: true });

    const icon = document.querySelector('.image-container') as HTMLElement;
    // const iconsShadow = document.querySelector('.header__container__shadow') as HTMLElement;
    // // iconsShadow.style.background = 'rgb(0 0 0 / 40%) linear-gradient( to top, rgba(0, 0, 0, 0.95) 0, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0.8) 100% );';
    // iconsShadow.style.transform = 'scale(1.2);';
    icon!.style.backgroundImage = 'url("/icons/mainImagjpg")';

    // commentsPage.render();

    contentBlockHTML?.insertAdjacentHTML('beforeend', slider.render());
    slider.addEvents();

    if (contentBlockHTML) {
      filmSelectionPage.render(false).then((response) => {
        contentBlockHTML.insertAdjacentHTML('beforeend', <string>response);
        this.componentDidMount();
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
            const filmFavoriteId = event.target.closest('.film-selection_film').getAttribute('data-section');
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
    popup?.addEventListener('click', popupEvent);
  }

  componentWillUnmount () {
    const popup = document.querySelector('.film-selection');
    popup?.removeEventListener('click', this.popupEvent);
  }
}
