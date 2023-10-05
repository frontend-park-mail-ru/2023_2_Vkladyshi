/**
 * Класс создания нижней панели
 * @class Footer
 * @typedef {Footer}
 */
export class Footer {
  /**
   * Родительский элемент в который добаляеться шаблон
   * @type {object}
   */
  #header;

  /**
   * Конструктор для формирония родительского элемента
   * @class
   * @param {object} parent - указатель на родитя в DOM дереве
   */
  constructor(parent) {
    this.#header = parent;

    this.state = {
      activeHeader: null,
      headerElements: {},
    };
  }

  /**
   * Метод переформирования родительского элемента
   * @param {object} header - указатель на родителя в DOM дереве
   */
  setHeader(header) {
    this.#header = header;
  }

  /**
   * Метод для рендера HTML кода
   */
  render() {
    const root = document.querySelector('#root');
    const footer = document.createElement('footer');

    footer.className = 'footer';
    root.appendChild(footer);

    footer.innerHTML = Handlebars.templates['footer.hbs']();
  }
}
