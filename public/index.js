import { Header } from "./components/header/header.js";
import { Signin } from "./components/signin/signin.js";
import { Signup } from "./components/signup/signup.js";
import { ContentBlock } from "./components/contentBlock/contentBlock.js";
import { FilmSelection } from "./components/filmSelection/filmSelection.js";
import {config, urls} from "./modules/config.js"

const rootElement = document.querySelector("#root");
const headerElement = document.createElement("header");
rootElement.appendChild(headerElement);

const signin = new Signin();
// const filmSelectionBlock = new FilmSelection(contentBlockElement);
const signup = new Signup();
const contentBlock = new ContentBlock()
const header = new Header(headerElement, contentBlock, config.menu);

signin.setHeader(header);
contentBlock.setHeader(header);
signup.setHeader(header);

config.menu.signin.renderObject = signin;
config.menu.signup.renderObject = signup;
config.menu.main.renderObject = contentBlock;

header.render(false);
contentBlock.render();
// const filmSelectionBlock = new FilmSelection(document.querySelector(".contentBlock"));
// filmSelectionBlock.render();

if (document.cookie) {
    header.render(true);
}



