import { SigninPage } from '@views/SigninPage/SigninPage';
import { SignupPage } from '@views/SignupPage/SignupPage';
import { MainPage } from '@views/MainPage/MainPage';
import { Header } from '@components/Header/header';
import { FilmSelectionPage } from '@views/FilmSelectionPage/FilmSelectionPage';
import { SelectCollectionPage } from '@views/SelectCollectionPage/SelectCollectionPage';
import { ContentBlock } from '@components/ContentBlock/contentBlock';
import { FilmSelection } from '@components/FilmSelection/filmSelection';
import { Signin } from '@components/Signin/signin';
import { Footer } from '@components/Footer/footer';
import { Signup } from '@components/Signup/signup';
import { SelectCollection } from '@components/SelectCollection/selectCollection';
import { Description } from '@components/Description/description';
import { AddInfo } from '@components/AdditionalInfo/additionalInfo';
import { CountLikeActor } from '@components/countLikeActor/countLikeActor';
import { ActorDescritionPage } from '@views/ActorPage/ActorPage';

import { FilmPage } from '@views/FilmPage/FilmPage';
import { FilmRating } from '@components/FilmRating/filmRating';

import { СountLikeFilm } from '@components/countLikeFilm/countLikeFilm';

import { UserPage } from '@views/userPage/userPage';

import { ReviewForm } from '@components/ReviewForm/reviewForm';
import { CommentsPage } from '@views/CommentsPage/CommentsPage';
import { Review } from '@components/Review/review';
import { UserDataForm } from '@components/UserDataForm/userDataForm';
import { favoritePage } from '@views/FavoritePage/FavoritePage';

export const ROOT = document.querySelector('#root');
export const DOMAIN = 'http://127.0.0.1:8001';
//export const DOMAIN = 'https://movie-hub.ru';

export const urls = {
  main: '/',
  basket: '/api/v1/films',
  film: '/api/v1/film',
  csrf: '/api/v1/csrf',
  actor: '/api/v1/actor',
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
  logout: '/logout'
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

export const mainPage = new MainPage(ROOT);
export const signinPage = new SigninPage(ROOT);
export const signupPage = new SignupPage(ROOT);
export const filmSelectionPage = new FilmSelectionPage(ROOT);
export const selectCollectionPage = new SelectCollectionPage(ROOT);
export const contentBlock = new ContentBlock(ROOT);
export const signin = new Signin(ROOT);
export const desc = new Description(ROOT);
export const info = new AddInfo(ROOT);
export const signup = new Signup(ROOT);
export const footer = new Footer(ROOT);
export const filmSelection = new FilmSelection(ROOT);
export const LkStar = new CountLikeActor(ROOT);
export const selectCollection = new SelectCollection(ROOT);
export const actorPage = new ActorDescritionPage(ROOT);
export const filmPage = new FilmPage(ROOT);
export const filmRating = new FilmRating(ROOT);
export const userDataForm = new UserDataForm(ROOT);
export const userPage = new UserPage(ROOT);
export const countLikeFilm = new СountLikeFilm(ROOT);
export const reviewForm = new ReviewForm(ROOT);
export const review = new Review(ROOT);
export const commentsPage = new CommentsPage(ROOT);

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
      name: 'Меню',
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
  { path: '/actor', view: actorPage },
  { path: '/film', view: filmPage },
  { path: '/comments', view: commentsPage }
];

export const privateRoutes = [
  { path: '/settings', view: userPage },
  { path: '/watchlist/films', view: favoritePage },
  { path: '/watchlist/actors', view: favoritePage }
];
