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
// kek
export const ROOT = document.querySelector('#root');

// export const DOMAIN = 'http://localhost:8001';
export const DOMAIN = 'http://127.0.0.1:8001';
// export const DOMAIN = 'https://movie-hub.ru';
export const DOMAIN_SW = '127.0.0.1:8003';

export const API = {
  ws: `ws://${DOMAIN_SW}/api/v1/notifications`
};

/// api/v1/find
/// api/v1/films
export const urls = {
  main: '/',
  findFilm: '/api/v1/films',
  basket: '/api/v1/films',
  film: '/api/v1/film',
  csrf: '/api/v1/csrf',
  actor: '/api/v1/actor',
  searchFilm: '/api/v1/find',
  searchActor: '/api/v1/search/actor',
  comments: '/api/v1/comment',
  addComment: '/api/v1/comment/add',
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
  statisticsCsat: '/api/v1/admin/csat'
};

export const methods = {
  post: 'POST',
  get: 'GET',
  put: 'PUT',
  delete: 'DELETE'
};

export const responseStatuses = {
  success: 200,
  invalidError: 400,
  notAuthorized: 401,
  serverError: 500,
  notFound: 404,
  alreadyExists: 409,
  csrfError: 412
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
  badRequest: 'Почта уже используется'
};

export const mainPage = MainPage;
export const signinPage = SigninPage;
export const signupPage = SignupPage;
export const filmSelectionPage = FilmSelectionPage;
export const selectCollectionPage = SelectCollectionPage;
export const actorPage = ActorDescritionPage;
export const filmPage = FilmPage;
export const userPage = UserPage;
export const commentsPage = CommentsPage;
export const favoritePage = FavoritePage;
export const adminPage = AdminPage;

export const config = {
  menu: {
    basket: {
      href: urls.basket,
      png_name: 'myTags.svg',
      name: 'Мои фильмы',
      renderObject: ''
    },
    profile: {
      href: urls.profile,
      png_name: 'iconPerson.svg',
      name: 'Мой профиль',
      renderObject: ''
    },
    signin: {
      href: urls.signin,
      png_name: 'iconPerson.svg',
      name: 'Войти',
      renderObject: signinPage
    },
    signup: {
      href: urls.signup,
      png_name: 'iconPerson.svg',
      name: 'Зарегистрироваться',
      renderObject: signupPage
    },
    selection: {
      href: urls.selection,
      png_name: 'vectorTags.svg',
      name: 'Поиск',
      renderObject: selectCollectionPage
    },
    main: {
      href: urls.main,
      png_name: 'brandIcon.svg',
      name: 'MovieHub',
      renderObject: mainPage
    }
  }
};

export const header = new Header(ROOT);

export const collections = {
  collection_name: 'Жанры',
  collection_items: [
    { key: 'Боевики', value: 5 },
    { key: 'Военные', value: 6 },
    { key: 'Детективы', value: 7 },
    { key: 'Драмы', value: 8 },
    { key: 'Комедии', value: 9 },
    { key: 'Криминальные', value: 10 },
    { key: 'Аниме', value: 1 },
    { key: 'Дорама', value: 2 },
    { key: 'Мультфильм', value: 3 },
    { key: 'Детские', value: 4 },
    { key: 'Ужасы', value: 11 },
    { key: 'Мелодрама', value: 12 },
    { key: 'Фантастика', value: 13 },
    { key: 'Триллер', value: 14 },
    { key: 'Фэнтези', value: 15 }
  ]
};

export const routes = [
  { path: '/', view: mainPage },
  { path: '/login', view: signinPage },
  { path: '/registration', view: signupPage },
  { path: '/selection', view: selectCollectionPage },
  { path: '/films', view: filmSelectionPage },
  { path: '/actors', view: filmSelectionPage },
  { path: '/actor', view: actorPage },
  { path: '/film', view: filmPage },
  { path: '/comments', view: commentsPage }
];

export const privateRoutes = [
  { path: '/settings', view: userPage },
  { path: '/watchlist/films', view: favoritePage },
  { path: '/watchlist/actors', view: favoritePage },
  { path: '/admin', view: adminPage }
];
