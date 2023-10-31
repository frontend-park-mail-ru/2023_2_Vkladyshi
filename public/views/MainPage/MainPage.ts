import { View } from '@views/view'
import {
  ROOT,
  header,
  contentBlock,
  footer,
  filmSelectionPage
} from '@utils/config'
import { store } from '@store/store'
import { actionAuth } from '@store/action/actionTemplates'

import { ActorDescritionPage } from '@views/ActorPage/ActorPage'

export interface MainPage {
  state: {
    isAuth: boolean;
    isCurrentView: boolean;
  };
}

/**
 * Класс формирования главной страницы
 * @class MainPage
 * @typedef {MainPage}
 */
export class MainPage extends View {
  /**
   * Конструктор для формирования родительского элемента
   * @param ROOT
   * @class
   */
  constructor (ROOT) {
    super(ROOT)
    this.state = {
      isAuth: false,
      isCurrentView: true
    }

    this.subscribeMainPageStatus = this.subscribeMainPageStatus.bind(this)

    store.subscribe('statusAuth', this.subscribeMainPageStatus)
    store.subscribe('logoutStatus', this.subscribeMainPageStatus)
    store.subscribe('statusLogin', this.subscribeMainPageStatus)
  }

  /**
   * Метод создания страницы
   */
  render () {
    let main = document.querySelector('main')

    this.state.isCurrentView = true

    if (main == null) {
      main = document.createElement('main')
      ROOT?.appendChild(main)
    }

    if (!document.querySelector('header')) {
      ROOT?.insertAdjacentHTML('afterbegin', header.render())
      header.componentDidMount()
    } else {
      main.innerHTML = ''
    }

    if (document.querySelector('.contentBlock') == null) {
      main.insertAdjacentHTML('beforeend', contentBlock.render())
      filmSelectionPage.render().then((response) => {
        if (this.state.isCurrentView) {
          // @ts-ignore
          document
            .querySelector('.contentBlock')
            ?.insertAdjacentHTML('beforeend', response)
        }
      })
    }

    if (document.querySelector('.footer') == null) {
      main.insertAdjacentHTML('beforeend', footer.render())
    }

    store.dispatch(actionAuth())

    this.state.isCurrentView = false
    const actorPage = new ActorDescritionPage(ROOT)
    actorPage.render()
  }

  subscribeMainPageStatus () {
    this.state.isAuth = store.getState('statusAuth') === 200
    const isLogout = store.getState('logoutStatus') === 200

    if (isLogout) {
      this.changeHeader(!isLogout)
      return
    }
    this.changeHeader(this.state.isAuth)
  }

  changeHeader (isAuth) {
    const headerHTML = document.querySelector('header')

    headerHTML!.innerHTML = header.render(isAuth)
    header.componentDidMount()
  }
}
