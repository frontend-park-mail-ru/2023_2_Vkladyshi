import { actionsUser } from '@store/action/actionsUser'
import { actionsFilm } from '@store/action/actionsFilm'

const handlers = [
  { type: 'signin', method: actionsUser.signin.bind(actionsUser) },
  { type: 'signup', method: actionsUser.signup.bind(actionsUser) },
  { type: 'auth', method: actionsUser.auth.bind(actionsUser) },
  { type: 'logout', method: actionsUser.logout.bind(actionsUser) },

  { type: 'collectionMain', method: actionsFilm.getCollectionDataMain.bind(actionsFilm) },
  { type: 'collectionMenu', method: actionsFilm.getCollectionDataMenu.bind(actionsFilm) }
]

export { handlers }
