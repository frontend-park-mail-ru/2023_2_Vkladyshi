export class Footer {
  #header;

  constructor(parent) {
    this.#header = parent;

    this.state = {
      activeHeader: null,
      headerElements: {},
    };
  }

  setHeader(header) {
    this.#header = header;
  }

  render() {
    const root = document.querySelector('#root');
    const footer = document.createElement('footer');

    footer.className = 'footer';
    root.appendChild(footer);

    footer.innerHTML = Handlebars.templates['footer.hbs']();
  }
}
