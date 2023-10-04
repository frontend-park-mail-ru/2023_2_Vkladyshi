import { get, post } from "../../modules/ajax.js";
import { responseStatuses, urls } from "../../modules/config.js";

export class FilmSelection {
  #parent;

  constructor(parent) {
    this.#parent = parent;
  }

  render() {
      get({
        url: urls.basket,
        query: { collection_id : "new" },
      })
      .then((response) => {
        if (response.status === responseStatuses.success) {
          const template = Handlebars.templates["filmSelection.hbs"];
          this.#parent.insertAdjacentHTML("afterbegin", template(response.data));
        } else {
          console.log(response.status);
        }
      });

  }
}
