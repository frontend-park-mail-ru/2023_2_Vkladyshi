export class SelectCollection {
  #parent;

  constructor(parent) {
    this.#parent = parent;

    // Инициализация состояния компонента
    this.state = {
      activeMenu: null,
      menuElements: {},
    };
  }

  render() {
    // Чтобы это работало, нужно импортировать handlebars.runtime.js
    console.log("SelectCollection");
    const contentBlock = document.querySelector(".contentBlock");
    const referenceNode = document.querySelector(".footer");

    const insertionBlock = document.createElement("div");
    insertionBlock.className = "selectCollection";

    contentBlock.insertBefore(insertionBlock, referenceNode);

    const template = Handlebars.templates["selectCollection.hbs"];
    insertionBlock.innerHTML = template();
  }
}
