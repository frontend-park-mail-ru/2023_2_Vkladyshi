import { View } from '../view.js';
import {ROOT, header} from '../../utils/config.js';
import {
  SelectCollection
} from '../../components/SelectCollection/selectCollection.js';

export class SelectCollectionPage extends View {

  constructor() {
    super();
  }

  async render() {
    const selectCollection = new SelectCollection();
    let main;

    if (document.querySelector("main") || !document.querySelector(".selectCollection")) {
      ROOT.removeChild(document.querySelector("main"));
      main = document.createElement("main");
      ROOT.appendChild(main);
      main.insertAdjacentHTML('beforeend', selectCollection.render());
      selectCollection.addEvent().then();
    }
    header.addToHeaderEvent(false);
  }
}
