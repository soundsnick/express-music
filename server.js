import bodyParser from 'body-parser';
import express from 'express';
import session from 'express-session';
import fileUpload from "express-fileupload";
import { indexAction } from "./controllers/applicationController";
import { loginAction, loginPostAction, registerAction, registerPostAction } from "./controllers/userController";
import { addAction, addPostAction } from "./controllers/trackController";
import {addPlaylistAction, playlistAction, removePlaylistAction} from "./controllers/playlistController";

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

app.get("/", async (request, response) => {
    await indexAction(request, response);
});

app.get("/playlist", async (request, response) => {
    await playlistAction(request, response);
});

app.get("/logout", (request, response) => {
    request.session.auth = null;
    response.redirect("/");
});

app.get("/login", async (request, response) => {
    await loginAction(request, response);
});

app.get("/register", async (request, response) => {
    await registerAction(request, response);
});

app.get("/add/track", async (request, response) => {
    await addAction(request, response);
});

app.get("/add/favourite", async (request, response) => {
    await addPlaylistAction(request, response);
})

app.get("/remove/favourite", async (request, response) => {
    await removePlaylistAction(request, response);
})


app.post("/register", async (request, response) => {
    await registerPostAction(request, response);
});

app.post("/login", async (request, response) => {
    await loginPostAction(request, response);
});

app.post("/add", async (request, response) => {
    await addPostAction(request, response);
});


app.listen(8080);