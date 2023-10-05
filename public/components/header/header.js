import {goToPage} from "../../modules/goToPage.js";
import {logout} from "../../modules/logout.js";

export class Header {
    #parent
    #config

    constructor(parent , config) {
        this.#parent = parent;
        this.#config = config;

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
        const template = Handlebars.templates['header.hbs'];

        let brand = this.items.find(item => item.key === "main");
        let signin = this.items.find(item => item.key === "signin");
        let basket = this.items.find(item => item.key === "basket");
        let profile = this.items.find(item => item.key === "profile");
        let selection = this.items.find(item => item.key === "selection");

        this.#parent.innerHTML = template({isAuthorized, signin, basket, profile, selection, brand} );

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
                    }
                });
            })
        }

        const menuHeader = document.querySelector(".menuHeader")
        if (menuHeader) {
            menuHeader.addEventListener('click', (event) => {
                event.composedPath().forEach(function (element) {
                    const classNames = element.className;
                    if (classNames === "menuHeader") {
                        goToPage(current, element);
                    }
                });

            })
        }
    }
}