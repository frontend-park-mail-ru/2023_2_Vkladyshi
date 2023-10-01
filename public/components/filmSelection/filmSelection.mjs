export class FilmSelection {
  #parent;

  constructor(parent) {
    this.#parent = parent;

    // Инициализация состояния компонента
    this.state = {
      activeMenu: null,
      menuElements: {},
    };
  }

  render() {
    // Чтобы это работало, нужно импортировать handlebars.runtime.js
    console.log(this.#parent);
    const template = Handlebars.templates["filmSelection.hbs"];
    console.log(template);
    this.#parent.innerHTML = template();
  }
}
