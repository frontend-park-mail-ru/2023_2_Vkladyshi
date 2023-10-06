import { View } from '../view.js';
import {ROOT} from '../../utils/config.js';
import {FilmSelection} from '../../components/FilmSelection/filmSelection.js';
import {ContentBlock} from '../../components/ContentBlock/contentBlock.js';
import {Footer} from '../../components/Footer/footer.js';

export class FilmSelectionPage extends View {

  constructor() {
    super();
  }

  async render(content = null) {
    const contentBlock = new ContentBlock();
    const filmSelection = new FilmSelection();
    const footer = new Footer();
    let main;

    if (document.querySelector("main") || !document.querySelector(".filmSelection")) {
      ROOT.removeChild(document.querySelector("main"));
      main = document.createElement("main");
      ROOT.appendChild(main);

      main.insertAdjacentHTML('beforeend', contentBlock.render());
      if (content !== null) {
        document.querySelector(".contentBlock").insertAdjacentHTML('beforeend', filmSelection.renderTemplate(content));
      } else {
         filmSelection.render().then(value => {document.querySelector(".contentBlock").insertAdjacentHTML('beforeend', value);})
      }

      main.insertAdjacentHTML('beforeend', footer.render());
    }
  }
}
