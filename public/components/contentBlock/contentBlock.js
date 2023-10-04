import {Footer} from "../footer/footer.js";
import {FilmSelection} from "../filmSelection/filmSelection.js";

export class ContentBlock {
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
        contentBlock.className = "contentBlock"

        this.#header.state.activeHeader = contentBlock;



        const footer = document.querySelector("footer");
        if (!footer){
            const footer = new Footer(this.#header)
            root.appendChild(contentBlock)
            footer.render();
        } else {
            footer.before(contentBlock);
        }

        contentBlock.innerHTML = Handlebars.templates['contentBlock.hbs']();
        const film = new FilmSelection(contentBlock);
        film.render();
    }
}
