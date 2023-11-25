import { actionsUser } from '@store/action/actionsUser';
import { actionsFilm } from '@store/action/actionsFilm';

const handlers = [
  { type: 'signin', method: actionsUser.signin.bind(actionsUser) },
  { type: 'signup', method: actionsUser.signup.bind(actionsUser) },
  { type: 'auth', method: actionsUser.auth.bind(actionsUser) },
  { type: 'logout', method: actionsUser.logout.bind(actionsUser) },
  { type: 'putSettings', method: actionsUser.updateSettings.bind(actionsUser) },
  {
    type: 'userComments',
    method: actionsUser.userComments.bind(actionsUser)
  },
  {
    type: 'addComment',
    method: actionsUser.addComment.bind(actionsUser)
  },
  {
    type: 'favoriteFilms',
    method: actionsUser.favoriteFilms.bind(actionsUser)
  },
  {
    type: 'favoriteActors',
    method: actionsUser.favoriteActors.bind(actionsUser)
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
    type: 'addFavoriteFilm',
    method: actionsUser.addFavoriteFilm.bind(actionsUser)
  },
  {
    type: 'addFavoriteActor',
    method: actionsUser.addFavoriteActor.bind(actionsUser)
  },
  {
    type: 'removeFavoriteFilm',
    method: actionsUser.removeFavoriteFilm.bind(actionsUser)
  },
  {
    type: 'removeFavoriteActor',
    method: actionsUser.removeFavoriteActor.bind(actionsUser)
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
  }
];

export { handlers };
