export const urls = {
    main: "/",
    basket: "/api/v1/films",
    profile: "/profile",
    signin: "/signin",
    signup: "/signup",
    selection: "/selection",
    authorized: "/authcheck",
    logout: "/logout",
};

export const methods = {
  post: "POST",
  get: "GET",
};

export const responseStatuses = {
    success: 200,
    invalidError: 400,
    notAuthorized: 401,
    serverError: 500,
    notFound: 404,
    alreadyExists: 409,
}

export const errorInputs = {
    LoginNoValid: "Логин не валиден",
    EmailNoValid: "Email не валиден",
    LoginOrPasswordError: "Ошибка пароля или email",
    PasswordNoValid: "Пароль не валиден",
    PasswordsNoEqual : "Пароли не одинаковые",
    NotPassword: "Нет пароля",
    NotAllElements: "Нет всех полей",
    LoginExists: "Логин уже используется",
}

export const config = {
    menu: {
        basket: {
            href: urls.basket,
            png_name: "Vector_MY_FILMS.svg",
            name: 'Мои фильмы',
            renderObject: "",
        },
        profile: {
            href: urls.profile,
            png_name: "profile_icon.svg",
            name: 'Мой профиль',
            renderObject: "",
        },
        signin: {
            href: urls.signin,
            png_name: "profile_icon.svg",
            name: 'Войти',
            renderObject: "",
        },
        signup: {
            href: urls.signup,
            png_name: "profile_icon.svg",
            name: 'Зарегистрироваться',
            renderObject: "",
        },
        selection: {
            href: urls.selection,
            png_name: "Vector_TAGS.svg",
            name: 'Меню',
            renderObject: "",
        },
        main: {
            href: urls.main,
            png_name: "title_icon.png",
            name: 'MovieHub',
            renderObject: "",
        },
        footer: {
            renderObject: "",
        }
    }
};

export const collections = {
    collections: {
        collection1: {
            collection_name: "Жанры",
            collection_items: [
                {key: "Боевики", value: "action"},
                {key: "Военные", value: "war"},
                {key: "Детские", value: "kids"},
                {key: "Детективы", value: "detective"},
                {key: "Драмы", value: "drama"},
                {key: "Комедии", value: "comedy"},
                {key: "Криминальные", value: "crime"},
                {key: "Ужасы", value: "horror"},
                {key: "Мелодрама", value: "melodrama"},
            ],
        },
        collection2: {
            collection_name: "Страны",
            collection_items: [
                { key: "Российские", value: "ru" },
                { key: "Зарубежные", value: "eu" },
            ]
        },
    },
};

