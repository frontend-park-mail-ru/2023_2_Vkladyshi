import * as template404 from '@router/Page404/page404.hbs';
import { ROOT } from '@utils/config';

export class Page404 {
  render = () => {
    ROOT!.innerHTML = template404();
  };
}

export const page404 = new Page404();
