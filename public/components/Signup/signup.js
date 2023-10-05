import { errorInputs, responseStatuses, urls} from "../../utils/config.js"
import { validateEmail, validatePassword } from "../../utils/validate.js";
import { returnError } from "../../utils/addError.js";
import { goToPage } from "../../utils/goToPage.js";
import { post } from "../../utils/ajax.js";
import { Component } from '../component.js';

export class Signup extends Component{
    constructor() {
      super();
      this.state = {}
    }

    render() {
        const root = document.querySelector("#root");
        const contentBlock = document.createElement("div");
        const signupBox = document.createElement("div");
        signupBox.className = "signupBox";
        contentBlock.className = "contentBlock"

        contentBlock.innerHTML = ""
        root.appendChild(signupBox);

        signupBox.innerHTML = Handlebars.templates['signup.hbs']();

        const signupForm = document.querySelector('.signupForm');
        this.rootNode.state.activeHeader = signupBox;
        const redirectToLogin = document.querySelector(".redirectToLogin");
        redirectToLogin.addEventListener('click', (event) => {
            goToPage(this.rootNode, document.querySelector(".redirectToLogin"));
        });

        signupForm.addEventListener('submit', (e) => {
           e.preventDefault();
            const login = document.querySelector(".loginInputSignup").value.trim();
            const email = document.querySelector(".emailInput").value.trim();

            const password = document.querySelector(".passwordInputFirst").value;
            const passwordSecond = document.querySelector(".passwordInputSecond").value;

            if (!login || !email || !password || !passwordSecond) {
                returnError(errorInputs.NotAllElements)
                return ;
            }

            if (password !== passwordSecond) {
                returnError(errorInputs.PasswordsNoEqual)
                return;
            }

            const isValidate = validatePassword(password);
            if (!isValidate.result) {
                returnError(isValidate.error)
                return;
            }

            if (!validateEmail(email)) {
                returnError(errorInputs.EmailNoValid)
                return ;
            }

            post({
                url: urls.signup,
                body: {login, password}
            }).then( response => {
                switch (response.status) {
                    case responseStatuses.success:
                        goToPage(this.rootNode, document.querySelector(".brandHeader"));
                        break;
                    case responseStatuses.alreadyExists:
                        returnError(signupBox, errorInputs.LoginExists);
                        break;
                    default:
                        throw new Error(`Error ${response.status}`)
                }
            });
        });
    }
}
