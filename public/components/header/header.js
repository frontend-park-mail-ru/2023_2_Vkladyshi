import {goToPage} from "../../modules/goToPage.js";
import {cookie} from "../../modules/cookie.js";
import {FilmSelection} from "../filmSelection/filmSelection.js";
import {SelectCollection} from "../selectCollection/selectCollection.js";

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
                        cookie(current);
                        return;
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

                        const selectCollectionBlock = new SelectCollection(
                            current.state.activeHeader
                        );
                        //const lastPage = ;

                        let promisefilmSelectionBlock = new Promise((resolve, reject) => {
                            resolve("render filmSelectionBlock");
                        });

                        promisefilmSelectionBlock.then(
                            (result) => {
                                // первая функция-обработчик - запустится при вызове resolve
                                selectCollectionBlock.render();
                                console.log("Fulfilled: " + result); // result - аргумент resolve
                            },
                            (error) => {
                                // вторая функция - запустится при вызове reject
                                console.log("Rejected: " + error); // error - аргумент reject
                            }
                        );
                    }
                });

            })
        }
    }
}
