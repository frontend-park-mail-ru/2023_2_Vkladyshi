import { Ajax } from "../../modules/ajax.js";
import { responseStatuses, urls, config, errorInputs} from "../../modules/config.js"
import { validateEmail } from "../../modules/validate.js";
import { returnError } from "../../modules/addError.js";


export class Login {
    #header
    #ajax

    constructor() {
        this.#ajax = new Ajax();

        this.state = {
            activeHeader: null,
            headerElement: null,
        }
    }

    setHeader(header) {
        this.#header = header;
    }

    render() {
        const contentBlock = document.querySelector(".contentBlock");
        const root = document.querySelector("#root");

        const loginBox = document.createElement("div");
        loginBox.className = "loginBox"

        root.appendChild(loginBox)

        contentBlock.innerHTML = ""
        loginBox.innerHTML = Handlebars.templates['login.hbs']();
        this.#header.state.activeHeader = loginBox.className;

        const redirectToSignup = document.querySelector(".redirectToSignup");
        redirectToSignup.addEventListener('click', (event) => {
            root.removeChild(document.querySelector(".loginBox"))


            this.#header.state.activeHeader = redirectToSignup.className;
            config.menu[redirectToSignup.dataset.section].renderObject.render();
        });

        loginBox.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = document.querySelector(".emailInput").value.trim();
            const password = document.querySelector(".passwordInput").value;

            if (!validateEmail(email)) {
                returnError(loginBox, errorInputs.EmailNoValid)
                return
            }

            if (!password) {
                returnError(loginBox, errorInputs.NotPassword)
                return
            }

            this.#ajax.post({
                url: urls.login,
                body: {password, email}
            }).then( response => {
                switch (response.status) {
                    case responseStatuses.success:
                        root.removeChild(loginBox);
                        root.appendChild(contentBlock);

                        config.menu["main"].renderObject.render();
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
