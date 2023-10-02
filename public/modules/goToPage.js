import {config} from "./config.js";

export function goToPage(header, menuLink) {
    if (header.state.activeHeader === menuLink) {
        return
    }

    const lastPage = header.state.activeHeader;

    if (lastPage !== null) {
        const root = document.querySelector("#root");
        root.removeChild(document.querySelector(`.${lastPage.className}`));
    }

    header.state.activeHeader = menuLink;
    config.menu[menuLink.dataset.section].renderObject.render();
}
