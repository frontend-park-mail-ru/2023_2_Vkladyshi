export function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

export function validatePassword(password)  {
    if (password.length < 8) {
        return {result: false, error:"Пароль должен содержать не менее 8 символов"};
    }

    if (!/[A-Z]/.test(password)) {
        return {result: false, error:"Пароль должен содержать хотя бы одну заглавную букву"};
    }

    if (!/[a-z]/.test(password)) {
        return {result: false, error:"Пароль должен содержать хотя бы одну строчную букву"};
    }

    if (!/[0-9]/.test(password)) {
        return {result: false, error: "Пароль должен содержать хотя бы одну цифру"};
    }

    return {result: true};
}
