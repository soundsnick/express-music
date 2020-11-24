import {renderView} from "../core/helpers";
import * as models from "../models";

const loginAction = (req, res) => {
    const defaultParams = { pageTitle: "Авторизация" };
    const params = req.query.error ? { message: "Неправильное имя пользователя или пароль", ...defaultParams } : { message: null, ...defaultParams };
    res.send(renderView(req, 'login', params));
}

const loginPostAction = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    models.User.findOne({
        username,
        password
    }).then(user => {
        if(user) {
            req.session.auth = user.id;
            res.redirect("/");
        }else {
            res.redirect("/login?error=1")
        }
    })
}

const registerAction = (req, res) => {
    const defaultParams = { pageTitle: "Регистрация" };
    const params = req.query.error ? { message: "Пользователь с таким именем пользователя уже зарегистрирован", ...defaultParams } : { message: null, ...defaultParams };
    res.send(renderView(req, 'register', params));
}

const registerPostAction = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    models.User.findOne({
        username
    }).then(user => {
        if(!user) {
            models.User.create({
                username,
                password
            })
                .then(user => {
                    req.session.auth = user.id;
                    res.redirect("/");
                })
                .catch(err => console.error(err));
        }else {
            res.redirect("/register?error=1")
        }
    });
}

export { loginAction, loginPostAction, registerAction, registerPostAction };