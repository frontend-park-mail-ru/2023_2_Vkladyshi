import { errorInputs, responseStatuses, urls} from "../../modules/config.js"
import { validateEmail, validatePassword } from "../../modules/validate.js";
import { returnError } from "../../modules/addError.js";
import {goToPage} from "../../modules/goToPage.js";
import {post} from "../../modules/ajax.js";

export class Signup {
    #header


    constructor() {

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
        const contentBlock = document.createElement("div");
        const signupBox = document.createElement("div");
        signupBox.className = "signupBox";
        contentBlock.className = "contentBlock"

        contentBlock.innerHTML = ""
        root.appendChild(signupBox);

        signupBox.innerHTML = Handlebars.templates['signup.hbs']();

        const signupForm = document.querySelector('.signupForm');
        this.#header.state.activeHeader = signupBox;
        const redirectToLogin = document.querySelector(".redirectToLogin");
        redirectToLogin.addEventListener('click', (event) => {
            goToPage(this.#header, document.querySelector(".redirectToLogin"));
        });

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

            const isValidate = validatePassword(password);
            if (!isValidate.result) {
                returnError(signupBox, isValidate.error)
                return;
            }

            if (!validateEmail(email)) {
                returnError(signupBox, errorInputs.EmailNoValid)
                return ;
            }

            post({
                url: urls.signup,
                body: {password, email}
            }).then( response => {
                switch (response.status) {
                    case responseStatuses.success:
                        goToPage(this.#header, document.querySelector(".brandHeader"));
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