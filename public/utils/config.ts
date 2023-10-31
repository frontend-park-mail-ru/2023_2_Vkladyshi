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

export const ROOT = document.querySelector('#root');

export const DOMAIN = 'http://127.0.0.1:8001';

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

export const selectCollection = new SelectCollection(ROOT);
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
      renderObject: signinPage,
    },
    signup: {
      href: urls.signup,
      png_name: 'profileIcon.svg',
      name: 'Зарегистрироваться',
      renderObject: signupPage,
    },
    selection: {
      href: urls.selection,
      png_name: 'VectorTags.svg',
      name: 'Меню',
      renderObject: selectCollectionPage,
    },
    main: {
      href: urls.main,
      png_name: 'titleIcon.png',
      name: 'MovieHub',
      renderObject: mainPage,
    },
  },
};

export const header = new Header(ROOT);

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

export const routes = [
  { path: '/', view: mainPage },
  { path: '/signin', view: signinPage },
  { path: '/signup', view: signupPage },
  { path: '/selection', view: selectCollectionPage },
];
