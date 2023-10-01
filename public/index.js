import { Header } from "./components/header/header.mjs";
import { Login } from "./components/login/login.mjs";
import { ContentBlock } from "./components/contentBlock/contentBlock.mjs";
import { FilmSelection } from "./components/filmSelection/filmSelection.mjs";

import { Ajax } from "./modules/ajax.js";

import { config, response_statuses, urls } from "./modules/config.js";

const rootElement = document.querySelector("#root");
const contentBlockElement = document.createElement("div");

const headerElement = document.createElement("header");
contentBlockElement.className = "contentBlock";

rootElement.appendChild(headerElement);
rootElement.appendChild(contentBlockElement);

const login = new Login();
const header = new Header(headerElement, config.menu);
const contentBlock = new ContentBlock(contentBlockElement);
const filmSelectionBlock = new FilmSelection(contentBlockElement);

const ajax = new Ajax();
login.setHeader(header);

config.menu.login.render_object = login;

renderMain();

function renderMain() {
  ajax
    .get({ url: urls.content })
    .then(({ status, response }) => {
      let isAuthorized = false;

      if (status === response_statuses.success) {
        isAuthorized = true;
      }

      if (!isAuthorized) {
        contentBlock.render();
        header.render(false);
        filmSelectionBlock.render();
        return;
      }
      contentBlock.render();
      header.render(true);
    })
    .catch((err) => {
      console.log(err);
    });
}

function goToPage(menuLink) {
  if (menuLink === header.state.activeHeader) {
    return;
  }

  config.menu[menuLink.dataset.section].render_object.render();
}
headerElement.addEventListener("click", (e) => {
  const { target } = e;
  e.preventDefault();
  console.log(e);
  console.log(target);
  console.log(e.target);
  goToPage(e.target);
});
