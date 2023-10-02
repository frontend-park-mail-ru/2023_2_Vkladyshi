import { Header } from "./components/header/header.mjs";
import { Login } from "./components/login/login.mjs";
import { ContentBlock } from "./components/contentBlock/contentBlock.mjs";
import { FilmSelection } from "./components/filmSelection/filmSelection.mjs";
import { SelectCollection } from "./components/selectCollection/selectCollection.mjs";

import { Ajax } from "./modules/ajax.js";

import { config, response_statuses, urls } from "./modules/config.js";

const rootElement = document.querySelector("#root");
const contentBlockElement = document.createElement("div");

const headerElement = document.createElement("header");
contentBlockElement.className = "contentBlock";
const findContentBlock = document.querySelector(".contentBlock");

rootElement.appendChild(headerElement);
rootElement.appendChild(contentBlockElement);

const login = new Login();
const header = new Header(headerElement, config.menu);
const contentBlock = new ContentBlock(contentBlockElement);
//тут блок подборок собираеться на основе contentBlock
const filmSelectionBlock = new FilmSelection(findContentBlock);
const selectCollectionBlock = new SelectCollection(findContentBlock);

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
        header.render(false);
        contentBlock.render();
        //просто рендериться в главном окне
        //нужен обработчик чтобы на нужной кнопке был
        filmSelectionBlock.render();
        console.log("main");

        selectCollectionBlock.render();
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
  // console.log("goToPage");
  // console.log(menuLink);
  if (menuLink === header.state.activeHeader) {
    return;
  }

  config.menu[menuLink.dataset.section].render_object.render();
}
headerElement.addEventListener("click", (e) => {
  const { target } = e;
  e.preventDefault();
  // console.log("addEventListener");
  // console.log(e);
  // console.log(target);
  // console.log(e.target);
  goToPage(e.target);
});
