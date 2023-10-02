import {goToPage} from "../../modules/goToPage.js";
import {logout} from "../../modules/logout.js";

export class Header {
    #parent
    #content
    #config

    constructor(parent, content, config) {
        //console.log(this)
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
        return Object.entries(this.config).map(([key, { href, png_name, name }]) => ({
            key,
            href,
            png_name,
            name,
        }));
    }

    render(isAuthorized=false) {
        //console.log(this)
        const template = Handlebars.templates['header.hbs'];

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

        this.addToHeaderEvent(isAuthorized);
    }
    addToHeaderEvent(isAuth) {
        let current = this;

        const loginHeader = document.querySelector(".loginHeader")
        if (loginHeader && !isAuth) {
            loginHeader.addEventListener('click', (event) => {
                event.composedPath().forEach(function(element) {
                    const classNames = element.className;
                    if (classNames === "loginHeader"){
                        goToPage(current, element);
                        return;
                    }
                });
            })
        }

        const brandHeader = document.querySelector(".brandHeader")
        brandHeader.addEventListener('click', (event) => {
            event.composedPath().forEach(function(element) {
                const classNames = element.className;
                if (classNames === "brandHeader"){
                    goToPage(current, element);
                    return;
                }
            });
        })

        const logoutHeader = document.querySelector(".logoutHeader")
        if (logoutHeader && isAuth) {
            logoutHeader.addEventListener('click', (event) => {
                event.composedPath().forEach(function(element) {
                    const classNames = element.className;
                    if (classNames === "logoutHeader"){
                        logout(current);
                        return;
                    }
                });
            })
        }
    }
}