import { responseStatuses, urls, errorInputs} from "../../modules/config.js"
import { post } from "../../modules/ajax.js";
import { validateEmail, validatePassword } from "../../modules/validate.js";
import { returnError } from "../../modules/addError.js";
import { goToPage } from "../../modules/goToPage.js";

export class Login {
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

        loginBox.innerHTML = Handlebars.templates['login.hbs']();
        this.#header.state.activeHeader = loginBox;

        const redirectToSignup = document.querySelector(".redirectToSignup");
        redirectToSignup.addEventListener('click', (event) => {
            goToPage(this.#header, document.querySelector(".redirectToSignup"))
        });

        loginBox.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = document.querySelector(".emailInput").value.trim();
            const password = document.querySelector(".passwordInput").value;

            if (!validateEmail(email)) {
                returnError(loginBox, errorInputs.EmailNoValid)
                return
            }

            const isValidate = validatePassword(password);
            if (!isValidate.result) {
                returnError(loginBox, isValidate.error)
            }

            post({
                url: urls.login,
                body: {password, email}
            }).then( response => {
                switch (response.status) {
                    case responseStatuses.success:
                        goToPage(this.#header, document.querySelector(".brandHeader"));
                        this.#header.render(true)
                        break;
                    case responseStatuses.notAuthorized:
                        returnError(loginBox, errorInputs.EmailOrPasswordError);
                        break;
                    default:
                        throw new Error(`Error ${response.status}`)
                }
            });

        });
        }
}
