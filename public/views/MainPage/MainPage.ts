import { View } from '@views/view';
import { filmSelectionPage } from '@utils/config';
import { router } from '@router/router';
import { inputButton } from '@components/inputButton/inputButton';

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
