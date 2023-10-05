import { responseStatuses, urls } from '../../modules/config.js';

export class FilmSelection {
  #parent;

  constructor(parent) {
    this.#parent = parent;
  }

  render() {
    get({
      url: urls.basket,
      query: { collection_id: 'new' },
    }).then((response) => {
      if (response.status === responseStatuses.success) {
        const template = Handlebars.templates['filmSelection.hbs'];
        console.log(response);
        this.#parent.innerHTML = template(response.data.body);
      } else {
        console.log(response.status);
      }
    });
  }
}
