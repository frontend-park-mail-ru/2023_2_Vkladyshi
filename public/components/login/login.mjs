import { Ajax } from "../../modules/ajax.js";
import { response_statuses, urls} from "../../modules/config.js"

export class Login {
    #header
    #ajax

    constructor() {
        this.#ajax = new Ajax();
    }

    setHeader(header) {
        this.#header = header;
    }

    render() {
        const template = Handlebars.templates['login.hbs'];
        const root = document.querySelector("#root");
        const contentBlock = document.querySelector(".contentBlock");
        const loginBox = document.createElement("div");
        loginBox.className = "login_box";

        root.removeChild(contentBlock);
        root.appendChild(loginBox);

        loginBox.innerHTML = template();

        const loginForm = document.querySelector('.login_form');

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.querySelector(".login_input").value.trim();
            const password = document.querySelector(".password_input").value;

            this.#ajax.post({
                url: urls.login,
                body: {password, email}
            }).then( response => {
                    if (response.status === response_statuses.success) {
                        const template = Handlebars.templates['contentBlock.hbs'];

                        root.removeChild(loginBox);
                        root.appendChild(contentBlock);
                        contentBlock.innerHTML = template();

                        this.#header.render(true)
                    } else {

                    }
            });
        });
    }
}