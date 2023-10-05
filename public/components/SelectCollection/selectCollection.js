import {get} from "../../utils/ajax.js";
import {collections, responseStatuses, urls} from "../../utils/config.js";
import {Footer} from "../Footer/footer.js";
import {Component} from '../component.js';

export class SelectCollection extends Component{
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const selection = document.querySelector(".selectCollection");
    if (selection) {
      return
    }

    const root = document.querySelector("#root");
    const contentBlock = document.createElement("div");
    contentBlock.className = "contentBlock"
    this.rootNode.state.activeHeader = contentBlock;

    const footer = document.querySelector("footer");
    if (!footer){
      root.appendChild(contentBlock)
    } else {
     root.removeChild(footer);
     root.appendChild(contentBlock);
    }

    contentBlock.innerHTML = Handlebars.templates['contentBlock.hbs']();

    const template = Handlebars.templates["selectCollection.hbs"];
    this.rootNode.state.activeHeader.innerHTML = template(collections);
    this.addToSelectEvent();
  }


  addToSelectEvent() {
    let current = this;
    const redirect = document.querySelector(".selectCollection-frame-img")
    if (redirect) {
      redirect.addEventListener('click', (event) => {
        event.composedPath().forEach(function(element) {
          const classNames = element.className;
          if (classNames === "selectCollection-frame-img"){
            current.rootNode.removeChild(document.querySelector(".selectCollection"));
          }
        });
      })
    }

    let buttons = document.getElementsByClassName("selectCollection-frame-list-item");

    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function() {
        let dataSection = this.getAttribute("data-section");

        const root = document.querySelector("#root");
        const contentBlock = document.createElement("div");
        contentBlock.className = "contentBlock";

        root.removeChild(current.rootNode.state.activeHeader);
        root.appendChild(contentBlock);
        current.rootNode.state.activeHeader = contentBlock;

        const footer = document.querySelector("footer");
        if (!footer){
          const footer = new Footer(current.rootNode)
          root.appendChild(contentBlock)
          footer.render();
        } else {
          root.removeChild(footer)
        }

        get({
          url: urls.basket,
          query: { collection_id : dataSection },
        })
            .then((response) => {
              if (response.status === responseStatuses.success) {
                const template = Handlebars.templates["filmSelection.hbs"];
                current.rootNode.state.activeHeader.innerHTML = template(response.data.body);
              } else {
                console.log(response.status);
              }
            });
      });
    }
  }
}

