
export class Header {
    #parent
    #config

    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;

        // Инициализация состояния компонента
        this.state = {
            activeHeader: null,
            headerElements: {},
        }
    }

    get config() {
        return this.#config;
    }

    get items() {
        return Object.entries(this.config).map(([key, { href, png_name, name }]) => ({
            key,
            href,
            png_name,
            name,
        }));
    }

    render(isAuthorized) {
        const template = Handlebars.templates['header.hbs'];

        let login = this.items.find(item => item.key === "login");
        let basket = this.items.find(item => item.key === "basket");
        let profile = this.items.find(item => item.key === "profile");
        let selection = this.items.find(item => item.key === "selection");

        this.#parent.innerHTML = template({isAuthorized, login, basket, profile, selection} );

        const elements = this.#parent.querySelectorAll('[data-section]');
        elements.forEach((element, index) => {
            if (index === 0) {
                this.state.activeHeader = element;
            }
            this.state.headerElements[element.dataset.section] = element;
        })

    }
}