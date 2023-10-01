export class FilmSelection {
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
    const films = {
      collection: {
        collectionName: "Боевики",
        films: {
          film1: {
            poster_href: "../../icons/Poster.jpg",
            name: "film_1",
            rating: 4.5,
          },
          film2: {
            poster_href: "../../icons/Poster.jpg",
            name: "film_2",
            rating: 4.1,
          },
          film3: {
            poster_href: "../../icons/Poster.jpg",
            name: "film_3",
            rating: 4.5,
          },
          film4: {
            poster_href: "../../icons/Poster.jpg",
            name: "film_4",
            rating: 3,
          },
          film5: {
            poster_href: "../../icons/Poster.jpg",
            name: "film_5",
            rating: 2,
          },
        },
      },
    };

    console.log(films);

    const template = Handlebars.templates["filmSelection.hbs"];
    this.#parent.innerHTML = template(films);
  }
}
