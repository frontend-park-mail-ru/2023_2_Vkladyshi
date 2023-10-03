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
            "Исторические",
            "Комедии",
            "Крименальные",
            "Ужасы",
            "Фантастика",
          ],
        },
        collection2: {
          collection_name: "Эпохи",
          collection_items: ["Наша эпоха", "2000е", "90е", "80е", "70е", "60е"],
        },
        collection3: {
          collection_name: "Страны",
          collection_items: ["Российские", "Зарубежные", "Советские"],
        },
      },
    };

    console.log("SelectCollection");
    const template = Handlebars.templates["selectCollection.hbs"];
    this.#parent.insertAdjacentHTML("afterbegin", template(collections));
  }
}
