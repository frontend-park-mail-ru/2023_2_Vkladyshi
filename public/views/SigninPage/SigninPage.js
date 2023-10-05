import { View } from '../view.js';
import { Signin } from '../../components/Signin/signin.js';
import { goToPage } from '../../utils/goToPage.js';

export class SigninPage extends View {
  render() {
    const signin = new Signin();
    console.log(1120)
    this.rootNode.insertAdjacentHTML("beforeend",  signin.render());

  }

  addToEvent() {
    const headerHTML = document.querySelector(".buttonLogin");
    
    headerHTML.addEventListener('click', (event) => {
      if (goToPage(event)) {
        this.componentWillUnmount();
      }
    })
  }

  componentWillUnmount() {
    this.rootNode.removeChild(document.querySelector(".login"));
  }
}
