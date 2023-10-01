import { Ajax } from "../../modules/ajax.js";
import { response_statuses, urls, config} from "../../modules/config.js"
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
        loginBox.innerHTML += Handlebars.templates['login.hbs']();
        this.#header.state.headerElement = loginBox;

        loginBox.addEventListener('click', (e) => {
            switch (e.target.className) {
                case "buttonLogin":
                    e.preventDefault();
                    const email = document.querySelector(".emailInput").value.trim();
                    const password = document.querySelector(".passwordInput").value;

                    if (!validateEmail(email)) {
                        returnError(loginBox, "Email не валиден")
                        return
                    }

                    if (!password) {
                        returnError(loginBox, "Введите пароль")
                        return
                    }

                    this.#ajax.post({
                        url: urls.login,
                        body: {password, email}
                    }).then( response => {
                        switch (response.status) {
                            case response_statuses.success:
                                root.removeChild(loginBox);
                                config.menu["signup"].render_object.render();
                                this.#header.render(true)
                                break;
                            case response_statuses.not_authorized:
                                returnError(loginBox, `Ошибка пароля или email`);
                                break;
                            default:
                                throw new Error(`Error ${response.status}`)
                        }
                    });
                    break;
                case "redirectToSignup":
                    e.preventDefault()
                    root.removeChild(loginBox)
                    config.menu["signup"].render_object.render();
                    break;
            }
        });
    }
}