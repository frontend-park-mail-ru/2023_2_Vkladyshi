import { get, post } from "../../modules/ajax.js";
import { responseStatuses, urls } from "../../modules/config.js";

export class FilmSelection {
  #parent;

  constructor(parent) {
    this.#parent = parent;
  }

  render() {
    const genre_id = 1;
      post({
        url: urls.basket,
        body: { genre_id },
      })
      .then((response) => {
        if (response.status === response_statuses.success) {
          // console.log("sucess");
          // console.log(response.data.collection.collectionName);
          console.log("FilmSelection");

          const contentBlock = document.querySelector(".contentBlock");
          const referenceNode = document.querySelector(".footer");
          console.log(contentBlock);

          const insertionBlock = document.createElement("div");
          insertionBlock.className = "filmSelection";
          insertionBlock.style.display = "flex";
          insertionBlock.style.alignItems = "center";
          insertionBlock.style.flexDirection = "column";

          contentBlock.insertBefore(insertionBlock, referenceNode);

          const template = Handlebars.templates["filmSelection.hbs"];
          // this.#parent.innerHTML = template(response.data);
          insertionBlock.innerHTML = template(response.data);
        } else {
          console.log("fail");
          console.log(response.status);
        }
      });
  }
}
