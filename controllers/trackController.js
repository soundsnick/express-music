import { renderView } from "../core/helpers";
import path from "path";
import * as models from "../models";

const addAction = (req, res) => {
    const defaultParams = { pageTitle: "Добавить трек" };
    const params = req.query.error ? { message: "Ошибка сервера. Попробуйте позже", ...defaultParams } : { message: null, ...defaultParams };
    res.send(renderView(req, 'addTrack', params));
};

const addPostAction = (req, res) => {
    const title = req.body.title;
    const author = req.body.author;
    const artist = req.body.artist;
    const cover = req.files.cover;
    const track = req.files.track;
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
        owner: req.session.auth,
        cover: cover.name,
        track: track.name
    }).then(track => {
        if(track){
            res.redirect("/");
        }else {
            res.redirect("/add?error=1")
        }
    })
}

export { addAction, addPostAction };