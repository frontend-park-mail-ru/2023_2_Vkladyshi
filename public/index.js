import { Footer } from "./components/footer/footer.mjs";
import { Header } from "./components/header/header.mjs";

const rootElement = document.querySelector("#root");
const contentBlockElement = document.querySelector("#contentBlock");
const headerElement = document.createElement("header");
const footerElement = document.createElement("footer");

rootElement.appendChild(headerElement);
rootElement.appendChild(contentBlockElement);
contentBlockElement.appendChild(footerElement)

const config = {
    menu: {
        basket: {
            href: '/basket',
            png_name: "Vector_MY_FILMS.png",
            name: 'Мои фильмы',
        },
        profile: {
            href: '/profile',
            png_name: "profile_icon.png",
            name: 'Мой профиль',
        },
        login: {
            href: '/login',
            png_name: "profile_icon.png",
            name: 'Войти',
            //render: renderLogin,
        },
        signup: {
            href: '/signup',
            png_name: "profile_icon.png",
            name: 'Зарегистрироваться',
        },
        selection: {
            href: '/selection',
            png_name: "Vector_TAGS.png",
            name: 'Меню',
        },
    }
};

const footer = new Footer(footerElement);
const header = new Header(headerElement, config.menu);
renderMain();

function renderMain() {
    Ajax.get({
        url: '/',
        callback: (status, responseString) => {
            let isAuthorized = false;

            if (status === 200) {
                isAuthorized = true;
            }

            if (isAuthorized) {
                footer.render();
                header.render( false);
                return;
            }

            footer.render();
            header.render(true);

        }
    })
}
