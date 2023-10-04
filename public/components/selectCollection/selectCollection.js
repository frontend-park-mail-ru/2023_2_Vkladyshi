
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
    const selection = document.querySelector(".selectCollection");
    if (selection) {
      return
    }

    const collections = {
      collections: {
        collection1: {
          collection_name: "Жанры",
          collection_items: [
            "Боевики",
            "Военные",
            "Детские",
            "Детективы",
            "Драмы",
            "Комедии",
            "Крименальные",
            "Ужасы",
            "Мелодрама",
          ],
        },
        collection2: {
          collection_name: "Страны",
          collection_items: ["Российские", "Зарубежные",],
        },
      },
    };

    const template = Handlebars.templates["selectCollection.hbs"];
    this.#parent.insertAdjacentHTML("afterbegin", template(collections));

    this.addToSelectEvent();
  }

  addToSelectEvent() {
    let current = this;
    const redirect = document.querySelector(".selectCollection-frame-img")
    if (redirect) {
      redirect.addEventListener('click', (event) => {
        event.composedPath().forEach(function(element) {
          const classNames = element.className;
          if (classNames === "selectCollection-frame-img"){
            current.#parent.removeChild(document.querySelector(".selectCollection"));
          }
        });
      })
    }
  }
}
