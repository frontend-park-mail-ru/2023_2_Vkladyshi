import { View } from '@views/view'
import { store } from '@store/store'
import { filmSelection } from '@utils/config'
import { actionCollectionMain } from '@store/action/actionTemplates'
import { getCollection } from '@utils/getCollection'

/**
 * Класс формирования подборки фильмов
 * @class FilmSelectionPage
 * @typedef {FilmSelectionPage}
 */

export class FilmSelectionPage extends View {
  /**
   * Конструктор для формирования родительского элемента
   * @param ROOT
   * @class
   */
  // eslint-disable-next-line no-useless-constructor
  constructor (ROOT) {
    super(ROOT)
  }

  /**
   * Метод рендеринга элемента
   * @param collectionName
   * @return {string} html авторизации
   */
  async render () {
    return store
      .dispatch(actionCollectionMain({ collection_id: 'new' }))
      .then((response) => {
        return filmSelection.render(
          getCollection(store.getState('collectionMain'))
        )
      })
  }
}
