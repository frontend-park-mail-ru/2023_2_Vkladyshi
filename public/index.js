import { Header } from "./components/header/header.mjs";
import { Login } from "./components/login/login.mjs";
import { Signup } from "./components/signup/signup.mjs";
import { ContentBlock } from "./components/contentBlock/contentBlock.mjs";
import { FilmSelection } from "./components/filmSelection/filmSelection.mjs";
import { SelectCollection } from "./components/selectCollection/selectCollection.mjs";
import { config } from "./modules/config.js";
import { goToPage } from "./modules/goToPage.js";
import { checkAuthorized } from "./modules/checkAuthorized.js";

const contentBlockElement = document.createElement("div");

const rootElement = document.querySelector("#root");

const headerElement = document.createElement("header");
contentBlockElement.className = "contentBlock";
const findContentBlock = document.querySelector(".contentBlock");
rootElement.appendChild(headerElement);

const login = new Login();
const signup = new Signup();
const contentBlock = new ContentBlock();
const header = new Header(headerElement, contentBlock, config.menu);

login.setHeader(header);
contentBlock.setHeader(header);
signup.setHeader(header);

config.menu.login.renderObject = login;
config.menu.signup.renderObject = signup;
config.menu.main.renderObject = contentBlock;

header.render(false);
contentBlock.render();
const filmSelectionBlock = new FilmSelection(
  document.querySelector(".contentBlock")
);
const selectCollectionBlock = new SelectCollection(
  document.querySelector(".contentBlock")
);

// filmSelectionBlock.render();

let promisefilmSelectionBlock = new Promise((resolve, reject) => {
  filmSelectionBlock.render();
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

addToHeaderEvent();

checkAuthorized().then((isAuthorized) => {
  if (isAuthorized) {
    header.render(true);
    addToHeaderEvent();
  }
});

function addToHeaderEvent() {
  const loginHeader = document.querySelector(".loginHeader");
  if (loginHeader) {
    loginHeader.addEventListener("click", (event) => {
      event.composedPath().forEach(function (element) {
        const classNames = element.className;
        if (classNames === "loginHeader") {
          goToPage(header, element);
          return;
        }
      });
    });
  }

  const brandHeader = document.querySelector(".brandHeader");
  brandHeader.addEventListener("click", (event) => {
    event.composedPath().forEach(function (element) {
      const classNames = element.className;
      if (classNames === "brandHeader") {
        goToPage(header, element);
        return;
      }
    });
  });

  const logoutHeader = document.querySelector(".logoutHeader");
  if (logoutHeader) {
    logoutHeader.addEventListener("click", (event) => {
      event.composedPath().forEach(function (element) {
        const classNames = element.className;
        if (classNames === "logoutHeader") {
          goToPage(header, element);
          return;
        }
      });
    });
  }
}
