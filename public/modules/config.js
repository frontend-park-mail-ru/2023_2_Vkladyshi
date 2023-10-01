export const urls = {
    basket: "/basket",
    profile: "/profile",
    login: "/login",
    signup: "/signup",
    selection: "/selection",
    content: "/content",
};

export const methods = {
    post: "POST",
    get: "GET",
}

export const response_statuses = {
    success: 200,
    invalid_error: 400,
    not_authorized: 401,
    server_error: 500,
    not_found: 404,
    already_exists: 409,

}
export const config = {
    menu: {
        basket: {
            href: urls.basket,
            png_name: "Vector_MY_FILMS.png",
            name: 'Мои фильмы',
            render_object: "",
        },
        profile: {
            href: urls.profile,
            png_name: "profile_icon.png",
            name: 'Мой профиль',
            render_object: "",
        },
        login: {
            href: urls.login,
            png_name: "profile_icon.png",
            name: 'Войти',
            render_object: "",
        },
        signup: {
            href: urls.signup,
            png_name: "profile_icon.png",
            name: 'Зарегистрироваться',
            render_object: "",
        },
        selection: {
            href: urls.selection,
            png_name: "Vector_TAGS.png",
            name: 'Меню',
            render_object: "",
        },
    }
};