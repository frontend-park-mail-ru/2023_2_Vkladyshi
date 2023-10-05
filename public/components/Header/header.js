import {Component} from '../component.js';

export class Header extends Component{
    constructor(config) {
        super()
        this.config = config;
        this.state = {
            activeElements: null,
            headerElements: {},
        };
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
        let brand = this.items.find(item => item.key === "main");
        let signin = this.items.find(item => item.key === "signin");
        let basket = this.items.find(item => item.key === "basket");
        let profile = this.items.find(item => item.key === "profile");
        let selection = this.items.find(item => item.key === "selection");

        return Handlebars.templates['header.hbs']({
            isAuthorized,
            signin,
            basket,
            profile,
            selection,
            brand
        });
    }
    addToHeaderEvent(isAuth) {
        //     let current = this;
        //
        //     const loginHeader = document.querySelector(".loginHeader")
        //     if (loginHeader && !isAuth) {
        //         loginHeader.addEventListener('click', (event) => {
        //             event.composedPath().forEach(function(element) {
        //                 const classNames = element.className;
        //                 if (classNames === "loginHeader"){
        //                     goToPage(current, element);
        //                 }
        //             });
        //         })
        //     }
        //
        //     const brandHeader = document.querySelector(".brandHeader")
        //     brandHeader.addEventListener('click', (event) => {
        //         event.composedPath().forEach(function(element) {
        //             const classNames = element.className;
        //             if (classNames === "brandHeader"){
        //                 goToPage(current, element);
        //             }
        //         });
        //     })
        //
        //     const logoutHeader = document.querySelector(".logoutHeader")
        //     if (logoutHeader && isAuth) {
        //         logoutHeader.addEventListener('click', (event) => {
        //             event.composedPath().forEach(function(element) {
        //                 const classNames = element.className;
        //                 if (classNames === "logoutHeader"){
        //                     logout(current);
        //                 }
        //             });
        //         })
        //     }
        //
        //     const menuHeader = document.querySelector(".menuHeader")
        //     if (menuHeader) {
        //         menuHeader.addEventListener('click', (event) => {
        //             event.composedPath().forEach(function (element) {
        //                 const classNames = element.className;
        //                 if (classNames === "menuHeader") {
        //                     goToPage(current, element);
        //                 }
        //             });
        //
        //         })
        //     }
    }
}

// export const header = new Header(config.menu, {rootNode: document.querySelector("#root")});
