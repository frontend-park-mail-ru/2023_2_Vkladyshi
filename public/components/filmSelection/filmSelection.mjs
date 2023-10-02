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
        if (response.status === responseStatuses.success) {
          const template = Handlebars.templates["filmSelection.hbs"];
          this.#parent.innerHTML = template(response.data);
        } else {
          console.log("fail");
          console.log(response.status);
        }
      });
  }
}
