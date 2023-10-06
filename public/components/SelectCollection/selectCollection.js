import {get} from "../../utils/ajax.js";
import {
  collections,
  responseStatuses,
  urls,
  filmSelection,
  errorInputs,
} from '../../utils/config.js';
import {Footer} from "../Footer/footer.js";
import {Component} from '../component.js';

export class SelectCollection extends Component{
  constructor() {
    super();
  }

   render() {
     return Handlebars.templates['selectCollection.hbs'](collections);
   }
   async addEvent(){

    let buttons = document.getElementsByClassName("selectCollection-frame-list-item");

    for (let i = 0; i < buttons.length; i++) {
       buttons[i].addEventListener("click",   function() {
        let dataSection = this.getAttribute("data-section");

         get({
          url: urls.basket,
          query: { collection_id : dataSection },
        })
          .then( (response) => {

            if (response.status === responseStatuses.success) {
              filmSelection.render(response.data.body);
              return response;
            } else {
              return errorInputs.ServerError;
            }
          });
      });
    }
  }



}

