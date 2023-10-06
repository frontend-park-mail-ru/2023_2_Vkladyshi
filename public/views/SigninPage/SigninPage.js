import { View } from '../view.js';
import { Signin } from '../../components/Signin/signin.js';
import {
  ROOT,
  header,
  urls,
  responseStatuses,
  errorInputs,
} from '../../utils/config.js';
import {goToPageByClassName} from '../../utils/goToPage.js';
import {returnError} from '../../utils/addError.js';
import {post} from '../../utils/ajax.js';
import {validatePassword} from '../../utils/validate.js';

export class SigninPage extends View {
  #isExist
  constructor() {
    super();

    this.state = {
      isExist: false
    }
  }

  render() {
    const signin = new Signin();
    let main;

    if (!document.querySelector("main") || !document.querySelector(".signin")) {
      this.state.isExist = true;
      ROOT.removeChild(document.querySelector("main"));
      main = document.createElement("main");
      ROOT.appendChild(main);
      main.innerHTML = signin.render()
    }

    header.addToHeaderEvent(false);

    document.querySelector(".signin").addEventListener('submit', (event) => {
      event.preventDefault();
      const login = document.querySelector(".loginInput").value.trim();
      const password = document.querySelector(".passwordInput").value;

      if (!login || !password ) {
        returnError(errorInputs.NotAllElements)
        return ;
      }

      const passwordValidate = validatePassword(password);
      if (!passwordValidate.result) {
        returnError(passwordValidate.error)
        return;
      }

      post({
        url:urls.signin,
        body: {login, password}
      }).then( response => {
        switch (response.status) {
          case responseStatuses.success:
            goToPageByClassName("main");
            header.render(true)
            break;
          case responseStatuses.notAuthorized:
            returnError(errorInputs.LoginOrPasswordError);
            break;
          default:
            returnError(response.status);
        }
      });
    });
  }
}
