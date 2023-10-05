import { View } from '../view.js';
import { checkAuthorized } from '../../utils/checkAuthorized.js';
import { goToPage } from '../../utils/goToPage.js';
import { config } from '../../utils/config.js';
import {ContentBlock} from '../../components/ContentBlock/contentBlock.js';
import {Footer} from '../../components/Footer/footer.js';
import {FilmSelection} from '../../components/FilmSelection/filmSelection.js';
import {Header} from '../../components/Header/header.js';

export class MainPage extends View {
  constructor() {
    super();

    this.state = {
      isExist : false,
      isAuth: false
    }
  }

  async render() {
    console.log(111)

    const contentBlock = new ContentBlock();
    const footer = new Footer();
    const filmSelection = new FilmSelection();
    const header = new Header(config.menu, {rootNode: document.querySelector("#root")});

    this.state.isExist = true;

    if (!document.querySelector("header")) {
      this.rootNode.insertAdjacentHTML('beforeend', header.render(false));
    }
    if (!document.querySelector(".contentBlock")) {
      this.rootNode.insertAdjacentHTML('beforeend', contentBlock.render());
      document.querySelector(".contentBlock").insertAdjacentHTML('beforeend', await filmSelection.render());
    }
    if (!document.querySelector(".footer")){
      this.rootNode.insertAdjacentHTML('beforeend', footer.render());
    }

    //this.rootNode.insertAdjacentHTML('beforeend', contentBlock.render());
    // document.querySelector(".contentBlock").insertAdjacentHTML('beforeend', await filmSelection.render());


    const headerHTML = document.querySelector(".header");
    headerHTML.addEventListener('click', (event) => {
      if (goToPage(event)) {
          this.componentWillUnmount();
      }
    })

    checkAuthorized().then(result => {
      console.log(1112)
      if (result) {
        document.querySelector("header").innerHTML = header.render(true);
        this.state.isAuth = true;
      }
    })
  }

  componentWillUnmount() {
    this.rootNode.removeChild(document.querySelector(".footer"))
   // document.querySelector("footer").innerHTML = "";
    document.querySelector(".contentBlock").removeChild(document.querySelector(".filmSelection"));
    //document.querySelector(".contentBlock").innerHTML = "";
  }
}

// export const mainPage = new MainPage({ rootNode: document.querySelector('#root') });
