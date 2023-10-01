import { Ajax } from "../../modules/ajax.js";
import { response_statuses, urls} from "../../modules/config.js"
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
        const template = Handlebars.templates['signup.hbs'];
        const root = document.querySelector("#root");
        const contentBlock = document.querySelector(".contentBlock");
        const loginBox = document.createElement("div");
        loginBox.className = "signupBox";

        contentBlock.innerHTML = ""
        root.appendChild(loginBox);

        loginBox.innerHTML = template();

        const signupForm = document.querySelector('.signupForm');
        this.#header.state.activeMenu = "signup";

        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const login = document.querySelector(".loginInput").value.trim();
            const email = document.querySelector(".emailInput").value.trim();

            const password = document.querySelector(".passwordInputFirst").value;
            const passwordSecond = document.querySelector(".passwordInputSecond").value;

            if (!login || !email || !password || !passwordSecond) {
                returnError(loginBox, "Заполните все поля")
                return ;
            }

            if (password !== passwordSecond) {
                returnError(loginBox, "Пароли не совпадают")
                return;
            }
            if (!validateEmail(email)) {
                returnError(loginBox, "Email не валиден")
                return ;
            }

            this.#ajax.post({
                url: urls.signup,
                body: {password, email}
            }).then( response => {
                switch (response.status) {
                    case response_statuses.success:
                        const template = Handlebars.templates['contentBlock.hbs'];
                        root.removeChild(loginBox);
                        root.appendChild(contentBlock);
                        contentBlock.innerHTML = template();
                        this.#header.render(true);
                        break;
                    case response_statuses.already_exists:
                        returnError(loginBox, `Эта почта уже используется`);
                        break;
                    default:
                        throw new Error(`Error ${response.status}`)
                }
            });
        });
    }
}