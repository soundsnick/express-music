const loginAction = (req, res) => req.query.error ? { message: "Неправильное имя пользователя или пароль" } : { message: null };

const registerAction = (req, res) => req.query.error ? { message: "Пользователь с таким именем пользователя уже зарегистрирован" } : { message: null };

export { loginAction, registerAction }