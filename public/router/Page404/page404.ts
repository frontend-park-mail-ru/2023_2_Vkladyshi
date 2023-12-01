import * as template404 from '@router/Page404/page404.hbs';

export class Page404 {
  render = () => {
    document.querySelector('header')?.remove();
    document.querySelector('main')!.innerHTML = template404();
  };
}

export const page404 = new Page404();
