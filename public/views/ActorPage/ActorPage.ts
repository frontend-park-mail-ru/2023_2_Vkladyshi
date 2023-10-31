import { View } from '@views/view';
import {
  ROOT,
  header,
  contentBlock,
  footer,
  filmSelectionPage,
  desc,
} from '@utils/config';
import { store } from '@store/store';
import { actionAuth } from '@store/action/actionTemplates';

import { getActorDescrition } from '@utils/getCollection';

export interface ActorDescritionPage {}

/**
 * Класс формирования главной страницы
 * @class ActorDescritionPage
 * @typedef {ActorDescritionPage}
 */
export class ActorDescritionPage extends View {
  /**
   * Метод создания страницы
   */
  render() {
    const mainHTML = document.querySelector('main');
    const contentBlockHTML = document.querySelector('.contentBlock');
    if (document!.querySelector('.contentBlock') != null) {
      document!.querySelector('.contentBlock')!.innerHTML = '';
    }

    if (document.querySelector('.contentBlock') != null) {
      document
        ?.querySelector('.contentBlock')
        ?.insertAdjacentHTML('beforeend', desc.render(getActorDescrition()));
    }

    if (document.querySelector('.footer') == null) {
      mainHTML?.insertAdjacentHTML('beforeend', footer.render());
    }
  }
}