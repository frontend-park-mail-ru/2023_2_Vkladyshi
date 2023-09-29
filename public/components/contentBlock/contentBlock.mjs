export class ContentBlock {
    #parent

    constructor(parent) {
        this.#parent = parent;

        // Инициализация состояния компонента
        this.state = {
            activeMenu: null,
            menuElements: {},
        }

    }

    render() {
        // Чтобы это работало, нужно импортировать handlebars.runtime.js
        const template = Handlebars.templates['contentBlock.hbs'];
        this.#parent.innerHTML = template();
    }
}