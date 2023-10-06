import { SigninPage } from '../views/SigninPage/SigninPage.js';
import { SignupPage } from '../views/SignupPage/SignupPage.js';
import { MainPage } from '../views/MainPage/MainPage.js';
import { Header } from '../components/Header/header.js';
import { FilmSelectionPage } from '../views/FilmSelectionPage/FilmSelectionPage.js';
import { SelectCollectionPage } from '../views/SelectCollectionPage/SelectCollectionPage.js';

export const ROOT = document.querySelector('#root');

export const urls = {
  main: '/',
  basket: '/api/v1/films',
  profile: '/profile',
  signin: '/signin',
  signup: '/signup',
  selection: '/selection',
  authorized: '/authcheck',
  logout: '/logout',
};

export const methods = {
  post: 'POST',
  get: 'GET',
};

export const responseStatuses = {
  success: 200,
  invalidError: 400,
  notAuthorized: 401,
  serverError: 500,
  notFound: 404,
  alreadyExists: 409,
};

export const errorInputs = {
  LoginNoValid: 'Логин не валиден',
  EmailNoValid: 'Email не валиден',
  LoginOrPasswordError: 'Ошибка пароля или логина',
  PasswordNoValid: 'Пароль не валиден',
  PasswordsNoEqual: 'Пароли не одинаковые',
  NotPassword: 'Нет пароля',
  NotAllElements: 'Нет всех полей',
  LoginExists: 'Логин уже используется',
  ServerError: 'Ошибка сервера',
};

export const mainPage = new MainPage({
  rootNode: document.querySelector('#root'),
});
export const signin = new SigninPage({ ROOT });
export const signup = new SignupPage({ ROOT });
export const filmSelection = new FilmSelectionPage({ ROOT });
export const selectCollection = new SelectCollectionPage({ ROOT });

export const config = {
  menu: {
    basket: {
      href: urls.basket,
      png_name: 'VectorMyFilms.svg',
      name: 'Мои фильмы',
      renderObject: '',
    },
    profile: {
      href: urls.profile,
      png_name: 'profileIcon.svg',
      name: 'Мой профиль',
      renderObject: '',
    },
    signin: {
      href: urls.signin,
      png_name: 'profileIcon.svg',
      name: 'Войти',
      renderObject: signin,
    },
    signup: {
      href: urls.signup,
      png_name: 'profileIcon.svg',
      name: 'Зарегистрироваться',
      renderObject: signup,
    },
    selection: {
      href: urls.selection,
      png_name: 'VectorTags.svg',
      name: 'Меню',
      renderObject: selectCollection,
    },
    main: {
      href: urls.main,
      png_name: 'titleIcon.png',
      name: 'MovieHub',
      renderObject: mainPage,
    },
  },
};

export const header = new Header(config.menu, {
  rootNode: document.querySelector('#root'),
});

export const collections = {
  collections: {
    collection1: {
      collection_name: 'Жанры',
      collection_items: [
        { key: 'Боевики', value: 'action' },
        { key: 'Военные', value: 'war' },
        { key: 'Детские', value: 'kids' },
        { key: 'Детективы', value: 'detective' },
        { key: 'Драмы', value: 'drama' },
        { key: 'Комедии', value: 'comedy' },
        { key: 'Криминальные', value: 'crime' },
        { key: 'Ужасы', value: 'horror' },
        { key: 'Мелодрама', value: 'melodrama' },
      ],
    },
    collection2: {
      collection_name: 'Страны',
      collection_items: [
        { key: 'Российские', value: 'ru' },
        { key: 'Зарубежные', value: 'eu' },
      ],
    },
  },
};
