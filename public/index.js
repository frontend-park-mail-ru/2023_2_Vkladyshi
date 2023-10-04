import { Header } from "./components/header/header.js";
import { Signin } from "./components/signin/signin.js";
import { Signup } from "./components/signup/signup.js";
import { ContentBlock } from "./components/contentBlock/contentBlock.js";
import {config} from "./modules/config.js"
import {SelectCollection} from "./components/selectCollection/selectCollection.js";
import {checkCookie} from "./modules/cookie.js";

const rootElement = document.querySelector("#root");
const headerElement = document.createElement("header");
rootElement.appendChild(headerElement);

const signin = new Signin();
const signup = new Signup();
const contentBlock = new ContentBlock()
const header = new Header(headerElement, contentBlock, config.menu);
const selectCollectionBlock = new SelectCollection(header);

signin.setHeader(header);
contentBlock.setHeader(header);
signup.setHeader(header);

config.menu.signin.renderObject = signin;
config.menu.signup.renderObject = signup;
config.menu.main.renderObject = contentBlock;
config.menu.selection.renderObject = selectCollectionBlock;

header.render(false);
contentBlock.render();

if (checkCookie("session_id")) {
    header.render(true);
}
