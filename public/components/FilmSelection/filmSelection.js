import {get} from '../../utils/ajax.js';
import {responseStatuses, urls} from '../../utils/config.js';
import {Component} from '../component.js';

export class FilmSelection extends Component{

  constructor() {
    super()
    this.state = {
    }
  }

  async render() {
    return await get({
      url: urls.basket,
      query: {collection_id: "new"},
    })
      .then(async response => {
        if (response.data.status === responseStatuses.success) {
          return Handlebars.templates["filmSelection.hbs"](response.data.body);
        } else {
          return "ERROR";
        }
      });
  }
}
