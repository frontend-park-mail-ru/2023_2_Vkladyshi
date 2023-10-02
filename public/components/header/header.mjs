export class Header {
    #parent
    #content
    #config

    constructor(parent, content, config) {
        this.#parent = parent;
        this.#content = content;
        this.#config = config;

        // Инициализация состояния компонента
        this.state = {
            activeElements: null,
            headerElements: {},
        }
    }

  get config() {
    return this.#config;
  }

  get items() {
    return Object.entries(this.config).map(
      ([key, { href, png_name, name }]) => ({
        key,
        href,
        png_name,
        name,
      })
    );
  }

  render(isAuthorized = false) {
    const template = Handlebars.templates["header.hbs"];

        let brand = this.items.find(item => item.key === "main");
        let login = this.items.find(item => item.key === "login");
        let basket = this.items.find(item => item.key === "basket");
        let profile = this.items.find(item => item.key === "profile");
        let selection = this.items.find(item => item.key === "selection");

        this.#parent.innerHTML = template({isAuthorized, login, basket, profile, selection, brand} );

        const elements = this.#parent.querySelectorAll('[data-section]');
        elements.forEach((element, index) => {
            this.state.headerElements[element.dataset.section] = element;
        })
    }
}
