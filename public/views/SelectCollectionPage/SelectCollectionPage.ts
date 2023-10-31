import { View } from '@views/view'
import {
  contentBlock,
  filmSelection,
  footer,
  ROOT,
  selectCollection
} from '@utils/config'
import { router } from '@router/router'
import { store } from '@store/store'
import { actionCollectionMenu } from '@store/action/actionTemplates'
import { getCollection } from '@utils/getCollection'

export interface SelectCollectionPage {
  state: {
    dataSection: string;
  };
}

/**
 * Класс формирования окна выбора подборки фильмов
 * @class SelectCollectionPage
 * @typedef {SelectCollectionPage}
 */
export class SelectCollectionPage extends View {
  private popupEvent: (event) => void;
  /**
   * Конструктор класса
   * @param ROOT
   */
  constructor (ROOT) {
    super(ROOT)
    this.state = {
      dataSection: ''
    }

    this.componentWillUnmount = this.componentWillUnmount.bind(this)
    this.subscribeCollectionMenu = this.subscribeCollectionMenu.bind(this)
    store.subscribe('collectionMenu', this.subscribeCollectionMenu)
  }

  /**
   * Метод создания страницы
   */
  render () {
    if (!document.querySelector('.selectCollection-frame')) {
      const result = ROOT?.querySelector('main')

      result!.innerHTML = selectCollection.render()
      this.componentDidMount()
      store.subscribe('collectionMenu', this.componentWillUnmount)
    }
  }

  /**
   * Метод обработки нажатий на выбранную коллекцию
   * @returns {Promise} Promise ответа
   */
  componentDidMount () {
    const popup = document.querySelector('.popupSelectCollection')

    this.popupEvent = (event) => {
      switch (true) {
        case event.target.closest('.selectCollection-frame-img') !== null:
          router.go(
            {
              path: '/',
              props: '/'
            },
            { pushState: true, refresh: false }
          )
          break
        case event.target.closest('.selectCollection-frame-list-item') !== null:
          const dataSection = event.target.getAttribute('data-section')
          this.state.dataSection = dataSection
          store.dispatch(actionCollectionMenu({ collection_id: dataSection }))
          break
        default:
          break
      }
    }

    popup?.addEventListener('click', this.popupEvent)
  }

  componentWillUnmount () {
    const popup = document.querySelector('.popupSign')

    popup?.removeEventListener('click', this.popupEvent)
    store.unsubscribe('collectionMenu', this.componentWillUnmount)
  }

  subscribeCollectionMenu () {
    const result = filmSelection.render(
      getCollection(store.getState('collectionMenu'))
    )

    const main = document.querySelector('main')

    main!.innerHTML = contentBlock.render()
    main?.insertAdjacentHTML('beforeend', footer.render())
    const contentBlockHTML = document.querySelector('.contentBlock')
    contentBlockHTML?.insertAdjacentHTML('beforeend', result)
    router.navigate({
      path: `/api/v1/films?collection_id=${this.state.dataSection}`,
      props: '/'
    })
  }
}
