import { responseStatuses, urls, errorInputs} from "../../modules/config.js"
import { post } from "../../modules/ajax.js";
import { validateEmail, validatePassword } from "../../modules/validate.js";
import { returnError } from "../../modules/addError.js";
import { goToPage } from "../../modules/goToPage.js";

export class Signin {
    #header

    constructor() {
        this.state = {
            activeHeader: null,
            headerElement: null,
        }
    }

    setHeader(header) {
        this.#header = header;
    }

    render() {
        const root = document.querySelector("#root");
        const loginBox = document.createElement("div");
        loginBox.className = "loginBox"
        root.appendChild(loginBox)
        if (document.querySelector(".footer")) {
            root.removeChild(document.querySelector(".footer"));
        }

        loginBox.innerHTML = Handlebars.templates['signin.hbs']();
        this.#header.state.activeHeader = loginBox;
        //this.#header = loginBox
        const redirectToSignup = document.querySelector(".redirectToSignup");
        redirectToSignup.addEventListener('click', (event) => {
            goToPage(this.#header, document.querySelector(".redirectToSignup"))
        });

        loginBox.addEventListener('submit', (event) => {
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
                        goToPage(this.#header, document.querySelector(".brandHeader"));
                        this.#header.render(true)
                        break;
                    case responseStatuses.notAuthorized:
                        returnError(errorInputs.LoginOrPasswordError);
                        break;
                    case responseStatuses.alreadyExists:
                        returnError(errorInputs.LoginExists);
                        break;
                    default:
                        throw new Error(`Error ${response.status}`)
                }
            });

        });
        }
}
