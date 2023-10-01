import { Ajax } from "../../modules/ajax.js";
import {errorInputs, responseStatuses, urls} from "../../modules/config.js"
import { validateEmail } from "../../modules/validate.js";
import { returnError } from "../../modules/addError.js";

export class Signup {
    #header
    #ajax

    constructor() {
        this.#ajax = new Ajax();

        this.state = {
            activeHeader: null,
            headerElements: {},
        }
    }

    setHeader(header) {
        this.#header = header;
    }

    render() {
        const root = document.querySelector("#root");
        const contentBlock = document.querySelector(".contentBlock");
        const signupBox = document.createElement("div");
        signupBox.className = "signupBox";

        contentBlock.innerHTML = ""
        root.appendChild(signupBox);

        signupBox.innerHTML = Handlebars.templates['signup.hbs']();

        const signupForm = document.querySelector('.signupForm');
        this.#header.state.activeHeader = signupBox.className;

        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const login = document.querySelector(".loginInput").value.trim();
            const email = document.querySelector(".emailInput").value.trim();

            const password = document.querySelector(".passwordInputFirst").value;
            const passwordSecond = document.querySelector(".passwordInputSecond").value;

            if (!login || !email || !password || !passwordSecond) {
                returnError(signupBox, errorInputs.NotAllElements)
                return ;
            }

            if (password !== passwordSecond) {
                returnError(signupBox, errorInputs.PasswordsNoEqual)
                return;
            }
            if (!validateEmail(email)) {
                returnError(signupBox, errorInputs.EmailNoValid)
                return ;
            }

            this.#ajax.post({
                url: urls.signup,
                body: {password, email}
            }).then( response => {
                switch (response.status) {
                    case responseStatuses.success:
                        const template = Handlebars.templates['contentBlock.hbs'];
                        root.removeChild(signupBox);
                        root.appendChild(contentBlock);
                        contentBlock.innerHTML = Handlebars.templates['contentBlock.hbs']();
                        this.#header.render(true);
                        break;
                    case responseStatuses.alreadyExists:
                        returnError(signupBox, errorInputs.EmailOrPasswordError);
                        break;
                    default:
                        throw new Error(`Error ${response.status}`)
                }
            });
        });
    }
}