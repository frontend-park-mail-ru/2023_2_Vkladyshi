import { actionsUser } from '@store/action/actionsUser';
import { actionsFilm } from '@store/action/actionsFilm';

const handlers = [
  { type: 'signin', method: actionsUser.signin.bind(actionsUser) },
  { type: 'signup', method: actionsUser.signup.bind(actionsUser) },
  { type: 'auth', method: actionsUser.auth.bind(actionsUser) },
  { type: 'logout', method: actionsUser.logout.bind(actionsUser) },
  {
    type: 'putSettings',
    method: actionsUser.updateSettings.bind(actionsUser)
  },
  {
    type: 'userComments',
    method: actionsUser.userComments.bind(actionsUser)
  },
  {
    type: 'addComment',
    method: actionsUser.addComment.bind(actionsUser)
  },
  {
    type: 'filmComments',
    method: actionsUser.filmComments.bind(actionsUser)
  },
  {
    type: 'getSettings',
    method: actionsUser.getSettings.bind(actionsUser)
  },
  {
    type: 'csrf',
    method: actionsUser.getCsrf.bind(actionsUser)
  },
  {
    type: 'collectionMain',
    method: actionsFilm.getCollectionDataMain.bind(actionsFilm)
  },
  {
    type: 'collectionMenu',
    method: actionsFilm.getCollectionDataMenu.bind(actionsFilm)
  },
  {
    type: 'actor',
    method: actionsFilm.getActor.bind(actionsFilm)
  },
  {
    type: 'film',
    method: actionsFilm.getFilm.bind(actionsFilm)
  },
  {
    type: 'getCalendar',
    method: actionsFilm.getCalendar.bind(actionsFilm)
  }
];

export { handlers };
