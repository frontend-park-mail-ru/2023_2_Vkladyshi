import { View } from '@views/view';
import { filmSelectionPage } from '@utils/config';
import { router } from '@router/router';
<<<<<<< HEAD
import { image } from '@components/Image/image';
=======
import { inputButton } from '@components/inputButton/inputButton';
>>>>>>> 16cbd31 (add change rating color and fix stars)

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

    mainHTML?.insertAdjacentHTML('afterbegin', image.render({ urlImage: 'mainImagjpg', mainPage: true }));

    if (contentBlockHTML) {
      filmSelectionPage.render(false).then((response) => {
        contentBlockHTML.insertAdjacentHTML('beforeend', <string>response);
        this.componentDidMount();
      });
    }
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
