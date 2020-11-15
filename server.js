import { dispatchAction, getRoute, getView, renderView, routes } from "./core/router";
import bodyParser from 'body-parser';
import express from 'express';
import session from 'express-session';
import { pipe } from "fp-ts/pipeable";
import * as models from "./models";

const app = express();

app.use('/assets', express.static('assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    session({
        secret: 'blahblahsecret',
        resave: true,
        saveUninitialized: false
    })
);
const filteredPaths = ['/favicon.ico'];

app.get("/logout", (request, response) => {
    request.session.auth = null;
    response.redirect("/");
});


app.post("/register", (request, response) => {
    const username = request.body.username;
    const password = request.body.password;
    models.User.findOne({
        username
    }).then(user => {
        if(!user) {
            models.User.create({
                username,
                password
            })
                .then(user => {
                    request.session.auth = user.id;
                    response.redirect("/");
                })
                .catch(err => console.error(err));
        }else {
            response.redirect("/register?error=1")
        }
    });
});

app.post("/login", (request, response) => {
    const username = request.body.username;
    const password = request.body.password;
    models.User.findOne({
        username,
        password
    }).then(user => {
        if(user) {
            request.session.auth = user.id;
            response.redirect("/");
        }else {
            response.redirect("/login?error=1")
        }
    })
});

app.get("*", (request, response) => {
    filteredPaths.includes(request.path) ?
    response.send('') :
    pipe(
        routes[request.path] && getRoute(request.path) && getView(getRoute(request.path)),
        (view) => view ? response.send(renderView(request, view, dispatchAction(request, response))) : response.redirect('/404')
    )
});


app.listen(8080);