const loginAction = (req, res) => {
    const defaultParams = { pageTitle: "Авторизация" };
    return req.query.error ? { message: "Неправильное имя пользователя или пароль", ...defaultParams } : { message: null, ...defaultParams };
}

const registerAction = (req, res) => {
    const defaultParams = { pageTitle: "Регистрация" };
    return req.query.error ? { message: "Пользователь с таким именем пользователя уже зарегистрирован", ...defaultParams } : { message: null, ...defaultParams };
}

export { loginAction, registerAction };