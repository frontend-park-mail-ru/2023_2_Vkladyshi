import * as template404 from '@router/Page404/page404.hbs';

export class Page404 {
  render = () => {
    const main = document.querySelector('main') as HTMLElement;
    document.querySelector('header')?.remove();
    if (main) {
      main.innerHTML = template404();
    }
  };
}

export const page404 = new Page404();
