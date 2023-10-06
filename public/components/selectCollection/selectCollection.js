import { get } from '../../modules/ajax.js';
import { collections, responseStatuses, urls } from '../../modules/config.js';
import { Footer } from '../footer/footer.js';

/**
 * Класс формирования окна выбора подборки фильмов
 * @class SelectCollection
 * @typedef {SelectCollection}
 */
export class SelectCollection {
  /**
   * Родительский элемент в который добаляеться шаблон
   * @type {object}
   */
  #header;

  /**
   * Создает экземпляр SelectCollection.
   * @param {object} [header] - указатель на родителя в DOM дереве
   */
  constructor(header = null) {
    this.#header = header;

    this.state = {
      activeMenu: null,
      menuElements: {},
    };
  }

  /**
   * Метод рендера элемента
   */
  render() {
    const selection = document.querySelector('.selectCollection');
    if (selection) {
      return;
    }

    const root = document.querySelector('#root');
    const contentBlock = document.createElement('div');
    contentBlock.className = 'contentBlock';
    this.#header.state.activeHeader = contentBlock;

    const footer = document.querySelector('footer');
    if (!footer) {
      root.appendChild(contentBlock);
    } else {
      root.removeChild(footer);
      root.appendChild(contentBlock);
    }

    contentBlock.innerHTML = Handlebars.templates['contentBlock.hbs']();

    const template = Handlebars.templates['selectCollection.hbs'];
    this.#header.state.activeHeader.innerHTML = template(collections);
    this.addToSelectEvent();
  }

  /**
   * Метод обработки нажатий на выбранную коллекцию
   */
  addToSelectEvent() {
    const current = this;
    const redirect = document.querySelector('.selectCollection-frame-img');
    if (redirect) {
      redirect.addEventListener('click', (event) => {
        event.composedPath().forEach(function (element) {
          const classNames = element.className;
          if (classNames === 'selectCollection-frame-img') {
            current.#header.removeChild(
              document.querySelector('.selectCollection')
            );
          }
        });
      });
    }

    const buttons = document.getElementsByClassName(
      'selectCollection-frame-list-item'
    );

    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function () {
        const dataSection = getAttribute('data-section');

        const root = document.querySelector('#root');
        const contentBlock = document.createElement('div');
        contentBlock.className = 'contentBlock';

        root.removeChild(current.#header.state.activeHeader);
        root.appendChild(contentBlock);
        current.#header.state.activeHeader = contentBlock;

        const footer = document.querySelector('footer');
        if (!footer) {
          const footer = new Footer(current.#header);
          root.appendChild(contentBlock);
          footer.render();
        } else {
          root.removeChild(footer);
        }

        get({
          url: urls.basket,
          query: { collection_id: dataSection },
        }).then((response) => {
          if (response.status === responseStatuses.success) {
            const template = Handlebars.templates['filmSelection.hbs'];
            current.#header.state.activeHeader.innerHTML = template(
              response.data.body
            );
          } else {
            console.log(response.status);
          }
        });
      });
    }
  }
}
