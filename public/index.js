

import { Header } from "./components/header/header.mjs";
import { Login } from "./components/login/login.mjs";
import { Signup } from "./components/signup/signup.mjs";
import { ContentBlock } from "./components/contentBlock/contentBlock.mjs";
import { FilmSelection } from "./components/filmSelection/filmSelection.mjs";
import {config, urls} from "./modules/config.js"

const rootElement = document.querySelector("#root");
const headerElement = document.createElement("header");
rootElement.appendChild(headerElement);

const login = new Login();
// const filmSelectionBlock = new FilmSelection(contentBlockElement);
const signup = new Signup();
const contentBlock = new ContentBlock()
const header = new Header(headerElement, contentBlock, config.menu);

login.setHeader(header);
contentBlock.setHeader(header);
signup.setHeader(header);

config.menu.login.renderObject = login;
config.menu.signup.renderObject = signup;
config.menu.main.renderObject = contentBlock;

header.render( false);
contentBlock.render();
const filmSelectionBlock = new FilmSelection(document.querySelector(".contentBlock"));
filmSelectionBlock.render();

if (document.cookie) {
    header.render(true);
}



