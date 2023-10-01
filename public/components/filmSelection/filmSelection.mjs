import { Ajax } from "../../modules/ajax.js";
import { response_statuses, urls } from "../../modules/config.js";

export class FilmSelection {
  #parent;
  #ajax;

  constructor(parent) {
    this.#parent = parent;
    this.#ajax = new Ajax();
  }

  render() {
    const genre_id = 1;
    this.#ajax
      .post({
        url: urls.basket,
        body: { genre_id },
      })
      .then((response) => {
        if (response.status === response_statuses.success) {
          // console.log("sucess");
          // console.log(response.data.collection.collectionName);
          const template = Handlebars.templates["filmSelection.hbs"];
          this.#parent.innerHTML = template(response.data);
        } else {
          console.log("fail");
          console.log(response.status);
        }
      });
  }
}
