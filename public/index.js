import { Header } from "./components/header/header.mjs";
import { Login } from "./components/login/login.mjs";
import { Signup } from "./components/signup/signup.mjs";
import { ContentBlock } from "./components/contentBlock/contentBlock.mjs";

import { Ajax } from "./modules/ajax.js";
import { config, response_statuses, urls } from  "./modules/config.js"

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

config.menu.login.render_object = login;
config.menu.signup.render_object = signup;

renderMain();

function renderMain() {
    addToHeaderEvent()

    ajax.get({url: urls.content})
        .then(({status, response}) => {
            let isAuthorized = false;

            if (status === response_statuses.success) {
                isAuthorized = true;
            }

            if (!isAuthorized) {
                contentBlock.render();
                header.render( false);
                return;
            }
            contentBlock.render();
            header.render(true);
        })
        .catch((err) => {
            console.log(err);
     })
}

function goToPage(menuLink) {
    if (header.state.activeMenu === menuLink) {
        return
    }

    header.state.activeMenu = menuLink;
    config.menu[menuLink.dataset.section].render_object.render();
}

function addToHeaderEvent() {
    headerElement.addEventListener('click', (e) => {
        const { target } = e;
        e.preventDefault();
        goToPage(e.target);
    });
}


