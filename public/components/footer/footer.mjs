export class Footer {
    #parent

    constructor(parent, config) {
        this.#parent = parent;

        // Инициализация состояния компонента
        this.state = {
            activeMenu: null,
            menuElements: {},
        }

    }

    renderTemplate() {
        // Чтобы это работало, нужно импортировать handlebars.runtime.js
        const template = Handlebars.templates['footer.hbs'];
        this.#parent.innerHTML = template();
    }
}