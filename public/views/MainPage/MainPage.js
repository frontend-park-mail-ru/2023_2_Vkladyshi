import { View } from '../view.js';
import { checkAuthorized } from '../../utils/checkAuthorized.js';
import { goToPageByEvent } from '../../utils/goToPage.js';
import {config, ROOT, header} from '../../utils/config.js';
import {ContentBlock} from '../../components/ContentBlock/contentBlock.js';
import {Footer} from '../../components/Footer/footer.js';
import {FilmSelection} from '../../components/FilmSelection/filmSelection.js';
import {Header} from '../../components/Header/header.js';

export class MainPage extends View {
  constructor() {
    super();

    this.state = {
      first : false,
      isExist : false,
      isAuth: false,
    }

  }

   async render() {
    const contentBlock = new ContentBlock();
    const footer = new Footer();
    const filmSelection = new FilmSelection();

    if (document.querySelector("main")) {
        ROOT.removeChild(document.querySelector("main"));
    }

    const main = document.createElement("main");
    ROOT.appendChild(main);

    if (!document.querySelector("header")) {
      ROOT.insertAdjacentHTML('afterbegin', header.render(false));
    }

     header.addToHeaderEvent(false)

     main.insertAdjacentHTML('beforeend', contentBlock.render());
     await filmSelection.render().then((response) => { document.querySelector(".contentBlock").insertAdjacentHTML("beforeend", response)} )
     main.insertAdjacentHTML('beforeend', footer.render());

    checkAuthorized().then(result => {
      if (result) {
        document.querySelector("header").innerHTML = header.render(true);
        header.addToHeaderEvent(false);

      }
    });

  }
}
