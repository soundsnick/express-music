import { dispatchAction, getRoute, getView, renderView, routes } from "./core/router";
import bodyParser from 'body-parser';
import express from 'express';
import session from 'express-session';
import { pipe } from "fp-ts/pipeable";
import * as models from "./models";
import path from "path"
import fileUpload from "express-fileupload";

const app = express();

app.use('/assets', express.static('assets'));
app.use('/public', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    session({
        secret: 'blahblahsecret',
        resave: true,
        saveUninitialized: false
    })
);
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));
const filteredPaths = ['/favicon.ico'];

app.get("/logout", (request, response) => {
    request.session.auth = null;
    response.redirect("/");
});

app.get("*", (request, response) => {
    filteredPaths.includes(request.path) ?
        response.send('') :
        pipe(
            routes[request.path] && getRoute(request.path) && getView(getRoute(request.path)),
            (view) => view ? response.send(renderView(request, view, dispatchAction(request, response))) : response.redirect('/404')
        )
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

app.post("/add", (request, response) => {
    const title = request.body.title;
    const author = request.body.author;
    const artist = request.body.artist;
    const cover = request.files.cover;
    const track = request.files.track;
    cover.mv(path.resolve(__dirname, `./public/uploads/covers/${cover.name}`), (err) => {
        if(err) console.log(err);
    });
    track.mv(path.resolve(__dirname, `./public/uploads/tracks/${track.name}`), (err) => {
        if(err) console.log(err);
    });
    models.Track.create({
        title,
        author,
        artist,
        owner: request.session.auth,
        cover: cover.name,
        track: track.name
    }).then(track => {
        if(track){
            response.redirect("/");
        }else {
            response.redirect("/add?error=1")
        }
    })
});


app.listen(8080);