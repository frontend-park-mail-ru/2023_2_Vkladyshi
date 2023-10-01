import { Header } from "./components/header/header.mjs";
import { Login } from "./components/login/login.mjs";
import { Signup } from "./components/signup/signup.mjs";
import { ContentBlock } from "./components/contentBlock/contentBlock.mjs";

import { Ajax } from "./modules/ajax.js";
import { config, responseStatuses, urls } from  "./modules/config.js"

const rootElement = document.querySelector("#root");
const contentBlockElement = document.createElement("div");
const headerElement = document.createElement("header");

contentBlockElement.className = "contentBlock";

rootElement.appendChild(headerElement);
rootElement.appendChild(contentBlockElement);

const login = new Login(contentBlockElement);
const signup = new Signup(contentBlockElement);
const header = new Header(headerElement, config.menu);
const contentBlock = new ContentBlock(contentBlockElement)
const ajax = new Ajax();

login.setHeader(header)
signup.setHeader(header)

config.menu.login.renderObject = login;
config.menu.signup.renderObject = signup;
config.menu.main.renderObject = contentBlock;

renderMain();

function renderMain() {
    ajax.get({url: urls.main})
        .then(({status, response}) => {
            if (responseStatuses.success) {
                contentBlock.render();
                header.render( false);
            } else {
                contentBlock.render();
                header.render(true);
            }

            addToHeaderEvent()
        })
        .catch((err) => {
            console.log(err);
     })
}

function goToPage(menuLink) {
    if (header.state.activeHeader === menuLink) {
        return
    }

    const lastPage = header.state.activeHeader;
    if (lastPage !== null) {

        rootElement.removeChild(document.querySelector(`.${lastPage}`));
    }

    header.state.activeHeader = menuLink;
    config.menu[menuLink.dataset.section].renderObject.render();
}

function addToHeaderEvent() {
    const loginHeader = document.querySelector(".loginHeader")
    loginHeader.addEventListener('click', (event) => {

            event.composedPath().forEach(function(element) {
                const classNames = element.className;
                if (classNames === "loginHeader"){
                    goToPage(element);
                    return;
                }
            });

    })
}
