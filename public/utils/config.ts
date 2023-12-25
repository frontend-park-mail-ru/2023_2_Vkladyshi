import { SigninPage } from '@views/SigninPage/SigninPage';
import { SignupPage } from '@views/SignupPage/SignupPage';
import { MainPage } from '@views/MainPage/MainPage';
import { Header } from '@components/Header/header';
import { FilmSelectionPage } from '@views/FilmSelectionPage/FilmSelectionPage';
import { SelectCollectionPage } from '@views/SelectCollectionPage/SelectCollectionPage';
import { ActorDescritionPage } from '@views/ActorPage/ActorPage';
import { FilmPage } from '@views/FilmPage/FilmPage';
import { UserPage } from '@views/userPage/userPage';
import { CommentsPage } from '@views/CommentsPage/CommentsPage';
import { FavoritePage } from '@views/FavoritePage/FavoritePage';
import { AdminPage } from '@views/AdminPage/AdminPage';
import { UserStatisticPage } from '@views/UserStatisticPage/userStatisticPage';

export const ROOT = document.querySelector('#root');

// export const DOMAIN = 'http://localhost:8001';
export const DOMAIN = 'http://127.0.0.1:8001';

// export const DOMAIN = 'https://movie-hub.ru';
export const urls = {
  main: '/',
  findFilm: '/api/v1/films',
  basket: '/api/v1/films',
  film: '/api/v1/film',
  csrf: '/api/v1/csrf',
  actor: '/api/v1/actor',
  searchFilm: '/api/v1/find',
  calendarSub: '/api/v1/user/subscribePush',
  calendarCheck: '/api/v1/user/isSubscribed',
  searchActor: '/api/v1/search/actor',
  comments: '/api/v1/comment',
  addComment: '/api/v1/comment/add',
  addCommentTwo: '/api/v1/rating/add',
  favoriteFilms: '/api/v1/favorite/films',
  favoriteActors: '/api/v1/favorite/actors',
  addFavoriteFilm: '/api/v1/favorite/film/add',
  addFavoriteActor: '/api/v1/favorite/actor/add',
  removeFilm: '/api/v1/favorite/film/remove',
  removeActor: '/api/v1/favorite/actor/remove',
  settings: '/api/v1/settings',
  profile: '/profile',
  signin: '/signin',
  signup: '/signup',
  selection: '/selection',
  authorized: '/authcheck',
  logout: '/logout',
  calendar: '/api/v1/calendar',
  statisticsCsat: '/api/v1/admin/csat',
  addFilm: '/api/v1/add/film',
  subscribeCalendar: '/api/v1/subscribe/calendar',
  searchModerUser: '/api/v1/users/list',
  updateRole: '/api/v1/users/updateRole',
  deleteCommentFromServiceFilms: '/api/v1/rating/delete',
  deleteCommentFromServiceComments: '/api/v1/comment/delete',
  trends: '/api/v1/trends',
  userStatistic: '/api/v1/statistics',
  alreadyWatched: '/api/v1/lasts',
};

export const methods = {
  post: 'POST',
  get: 'GET',
  put: 'PUT',
  delete: 'DELETE',
};

export const responseStatuses = {
  success: 200,
  invalidError: 400,
  notAuthorized: 401,
  serverError: 500,
  notFound: 404,
  alreadyExists: 409,
  csrfError: 412,
};

export const errorInputs = {
  LoginNoValid: 'Логин не валиден',
  EmailNoValid: 'Email не валиден',
  LoginOrPasswordError: 'Ошибка пароля или логина',
  PasswordNoValid: 'Пароль не валиден',
  PasswordsNoEqual: 'Пароли не одинаковые',
  NotPassword: 'Нет пароля',
  NotAllElement: '* Обязательно поле',
  LoginExists: 'Логин уже используется',
  ServerError: 'Ошибка сервера',
  badRequest: 'Почта уже используется',
  repeatPassword: 'Тот же пароль',
  VariableError: 'Невалидное значение',
};

export const config = {
  menu: {
    basket: {
      href: urls.basket,
      png_name: 'myTags.svg',
      name: 'Мои фильмы',
      renderObject: '',
    },
    profile: {
      href: urls.profile,
      png_name: 'iconPerson.svg',
      name: 'Мой профиль',
      renderObject: '',
    },
    signin: {
      href: urls.signin,
      png_name: 'iconPerson.svg',
      name: 'Войти',
      renderObject: SigninPage,
    },
    signup: {
      href: urls.signup,
      png_name: 'iconPerson.svg',
      name: 'Зарегистрироваться',
      renderObject: SignupPage,
    },
    selection: {
      href: urls.selection,
      png_name: 'vectorTags.svg',
      name: 'Поиск',
      renderObject: SelectCollectionPage,
    },
    main: {
      href: urls.main,
      png_name: 'brandIcon.svg',
      name: 'MovieHub',
      renderObject: MainPage,
    },
  },
};

export const header = new Header(ROOT);

export const collections = {
  collection_name: 'Жанры',
  collection_items: [
    { key: 'Боевики', value: 5, color: '#a0b79b' },
    { key: 'Военные', value: 6, color: '#FCB72A' },
    { key: 'Детективы', value: 7, color: '#F8821A' },
    { key: 'Драмы', value: 8, color: '#E0393E' },
    { key: 'Комедии', value: 9, color: '#963D97' },
    { key: 'Криминальные', value: 10, color: '#069CDB' },
    { key: 'Аниме', value: 1, color: '#5EB344' },
    { key: 'Дорама', value: 2, color: '#9ec3d3' },
    { key: 'Мультфильм', value: 3, color: '#a476c4' },
    { key: 'Детские', value: 4, color: '#3c3e3f' },
    { key: 'Ужасы', value: 11, color: '#833675' },
    { key: 'Мелодрама', value: 12, color: '#b6b67f' },
    { key: 'Фантастика', value: 13, color: '#c2a467' },
    { key: 'Триллер', value: 14, color: '#b268af' },
    { key: 'Фэнтези', value: 15, color: '#95d782' },
  ],
};

export const routes = [
  { path: '/', view: MainPage },
  { path: '/login', view: SigninPage },
  { path: '/registration', view: SignupPage },
  { path: '/selection', view: SelectCollectionPage },
  { path: '/films', view: FilmSelectionPage },
  { path: '/actors', view: FilmSelectionPage },
  { path: '/actor', view: ActorDescritionPage },
  { path: '/film', view: FilmPage },
  { path: '/comments', view: CommentsPage },
];

export const privateRoutes = [
  { path: '/settings', view: UserPage },
  { path: '/userStatistic', view: UserStatisticPage },
  { path: '/watchlist/films', view: FavoritePage },
  { path: '/watchlist/actors', view: FavoritePage },
  { path: '/admin', view: AdminPage },
];
