import {Component} from '../component.js';
import {goToPageByEvent} from '../../utils/goToPage.js';
import {logout} from '../../utils/logout.js';

export class Header extends Component{

    constructor(config) {
        super()
        this.config = config;
        this.state = {};
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
    addToHeaderEvent(isAuth=false) {
        let current = this;

        const loginHeader = document.querySelector(".loginHeader");
        const brandHeader = document.querySelector(".brandHeader");
        const logoutHeader = document.querySelector(".logoutHeader");
        const menuHeader = document.querySelector(".menuHeader");
        const redirectToSignin = document.querySelector(".redirectToSignin");
        const redirectToSignup = document.querySelector(".redirectToSignup");

        const clickLogin = (event) => {
            event.composedPath().forEach(function(element) {
                const classNames = element.className;
                if (classNames === "loginHeader") {
                    Header.removeEvents(clickLogin, clickHandler, clickLogout, clickMenu, clickRedirectToSignin, clickRedirectToSignup);
                    goToPageByEvent(event);
                }
            });
        };

        const clickHandler = (event) => {
            event.composedPath().forEach(function(element) {
                const classNames = element.className;
                if (classNames === "brandHeader") {
                    brandHeader.removeEventListener('click', clickHandler);
                    current.rootNode.removeChild(document.querySelector("main"));
                    Header.removeEvents(clickLogin, clickHandler, clickLogout, clickMenu, clickRedirectToSignin, clickRedirectToSignup);
                    goToPageByEvent(event);
                }
            });
        };

        const clickLogout = (event) => {
            event.composedPath().forEach(function(element) {
                const classNames = element.className;
                if (classNames === "logoutHeader") {
                    Header.removeEvents(clickLogin, clickHandler, clickLogout, clickMenu, clickRedirectToSignin, clickRedirectToSignup);
                    logout();
                }
            });
        };

        const clickMenu = (event) => {
            event.composedPath().forEach(function(element) {
                const classNames = element.className;
                if (classNames === "menuHeader") {
                    Header.removeEvents(clickLogin, clickHandler, clickLogout, clickMenu, clickRedirectToSignin, clickRedirectToSignup);
                    goToPageByEvent(event);
                }
            });
        };

        const clickRedirectToSignin = (event) => {
            event.composedPath().forEach(function(element) {
                const classNames = element.className;
                if (classNames === "redirectToSignin") {
                    Header.removeEvents(clickLogin, clickHandler, clickLogout, clickMenu, clickRedirectToSignin, clickRedirectToSignup);
                    goToPageByEvent(event);
                }
            });
        };

        const clickRedirectToSignup = (event) => {
            event.composedPath().forEach(function(element) {
                const classNames = element.className;
                if (classNames === "redirectToSignup") {
                    Header.removeEvents(clickLogin, clickHandler, clickLogout, clickMenu, clickRedirectToSignin, clickRedirectToSignup);
                    goToPageByEvent(event);
                }
            });
        };

        if (redirectToSignin) {
            Header.removeEvents(clickLogin, clickHandler, clickLogout, clickMenu, clickRedirectToSignin);
            redirectToSignin.addEventListener('click', clickRedirectToSignin);
        }
        if (redirectToSignup) {
            Header.removeEvents(clickLogin, clickHandler, clickLogout, clickMenu, clickRedirectToSignin);
            redirectToSignup.addEventListener('click', clickRedirectToSignup);
        }
        if (loginHeader) {
            loginHeader.addEventListener('click', clickLogin);
        }
        if (logoutHeader) {
            logoutHeader.addEventListener('click', clickLogout);
        }

        menuHeader.addEventListener('click', clickMenu);
        brandHeader.addEventListener('click', clickHandler);
    }
    static removeEvents(clickLogin, clickBrand, clickLogout, clickMenu, redirectToSignin, redirectToSignup) {
        const menu = document.querySelector(".menuHeader");
        const brand = document.querySelector(".brandHeader");
        const login = document.querySelector(".loginHeader");
        const signup = document.querySelector(".redirectToSignup");

        menu.removeEventListener('click', clickMenu);
        brand.removeEventListener('click', clickBrand);

        if (login){
            login.removeEventListener('click', clickLogin);
        }
        if (signup) {
            signup.removeEventListener('click', redirectToSignin);
        }
        if (signup) {
            signup.removeEventListener('click', redirectToSignup);
        }
    }

}
