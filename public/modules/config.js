export const urls = {
    main: "/",
    basket: "/basket",
    profile: "/profile",
    login: "/login",
    signup: "/signup",
    selection: "/selection",
    content: "/content",
    authorized: "/authorized",
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
    LoginNoValid: "Email не валиден",
    LoginOrPasswordError: "Ошибка пароля или email",
    PasswordNoValid: "Пароль не валиден",
    PasswordsNoEqual : "Пароли не одинаковые",
    NotPassword: "Нет пароля",
    NotAllElements: "Нет всех полей",
    LoginExists: "Почта уже используется",
}

export const config = {
    menu: {
        basket: {
            href: urls.basket,
            png_name: "Vector_MY_FILMS.png",
            name: 'Мои фильмы',
            renderObject: "",
        },
        profile: {
            href: urls.profile,
            png_name: "profile_icon.png",
            name: 'Мой профиль',
            renderObject: "",
        },
        login: {
            href: urls.login,
            png_name: "profile_icon.png",
            name: 'Войти',
            renderObject: "",
        },
        signup: {
            href: urls.signup,
            png_name: "profile_icon.png",
            name: 'Зарегистрироваться',
            renderObject: "",
        },
        selection: {
            href: urls.selection,
            png_name: "Vector_TAGS.png",
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

