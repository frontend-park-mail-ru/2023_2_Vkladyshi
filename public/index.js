console.log("hellow world");
import { Footer } from "./components/footer/footer.mjs";

// const rootElement = document.querySelector("#root");
const contentBlock = document.querySelector("#contentBlock");
const pageElement = document.createElement("footer");
// rootElement.appendChild(pageElement);
contentBlock.appendChild(pageElement);

const menu = new Footer(pageElement);
menu.renderTemplate();
