import { actionsUser } from '@store/action/actionsUser';
import { actionsFilm } from '@store/action/actionsFilm';
import { actionsSearch } from '@store/action/actionsSearch';

const handlers = [
  {
    type: 'getStatistics',
    method: actionsUser.getStatisticsCsat.bind(actionsUser),
  },
  { type: 'searchFilm', method: actionsSearch.searchFilm.bind(actionsSearch) },
  {
    type: 'searchActor',
    method: actionsSearch.searchActor.bind(actionsSearch),
  },
  { type: 'signin', method: actionsUser.signin.bind(actionsUser) },
  { type: 'signup', method: actionsUser.signup.bind(actionsUser) },
  { type: 'auth', method: actionsUser.auth.bind(actionsUser) },
  { type: 'logout', method: actionsUser.logout.bind(actionsUser) },
  { type: 'putSettings', method: actionsUser.updateSettings.bind(actionsUser) },
  {
    type: 'userComments',
    method: actionsUser.userComments.bind(actionsUser),
  },
  {
    type: 'addComment',
    method: actionsUser.addComment.bind(actionsUser),
  },
  {
    type: 'addCommentTwo',
    method: actionsUser.addCommentTwo.bind(actionsUser),
  },
  {
    type: 'favoriteFilms',
    method: actionsUser.favoriteFilms.bind(actionsUser),
  },
  {
    type: 'favoriteActors',
    method: actionsUser.favoriteActors.bind(actionsUser),
  },
  {
    type: 'filmComments',
    method: actionsUser.filmComments.bind(actionsUser),
  },
  {
    type: 'getSettings',
    method: actionsUser.getSettings.bind(actionsUser),
  },
  {
    type: 'csrf',
    method: actionsUser.getCsrf.bind(actionsUser),
  },
  {
    type: 'addFavoriteFilm',
    method: actionsUser.addFavoriteFilm.bind(actionsUser),
  },
  {
    type: 'addFavoriteActor',
    method: actionsUser.addFavoriteActor.bind(actionsUser),
  },
  {
    type: 'removeFavoriteFilm',
    method: actionsUser.removeFavoriteFilm.bind(actionsUser),
  },
  {
    type: 'removeFavoriteActor',
    method: actionsUser.removeFavoriteActor.bind(actionsUser),
  },
  {
    type: 'collectionMain',
    method: actionsFilm.getCollectionDataMain.bind(actionsFilm),
  },
  {
    type: 'collectionMenu',
    method: actionsFilm.getCollectionDataMenu.bind(actionsFilm),
  },
  {
    type: 'actor',
    method: actionsFilm.getActor.bind(actionsFilm),
  },
  {
    type: 'film',
    method: actionsFilm.getFilm.bind(actionsFilm),
  },
  {
    type: 'getCalendar',
    method: actionsFilm.getCalendar.bind(actionsFilm),
  },
  {
    type: 'addFilm',
    method: actionsUser.addFilm.bind(actionsUser),
  },
  {
    type: 'subscribeCalendar',
    method: actionsFilm.subscribeCalendar.bind(actionsFilm),
  },
  {
    type: 'checkSubscribeCalendar',
    method: actionsFilm.checkSubscribeCalendar.bind(actionsFilm),
  },
];

export { handlers };
