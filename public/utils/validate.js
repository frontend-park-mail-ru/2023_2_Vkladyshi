export function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

export function validatePassword(password)  {
    if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
        return {result: false, error:"Пароль должен содержать не менее 8 символов, иметь хотя бы одну заглавную букву, строчную букву и цифру"};
    }
    return {result: true};
}
