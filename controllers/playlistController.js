import * as models from "../models";
import {getLastTracks} from "../models/track";
import {renderView} from "../core/helpers";
import {getPlaylistTracks} from "../models/playlist";

const addPlaylistAction = (req, res) => {
    const trackId = req.query.id;
    if(trackId){
        const userId = req.session.auth;
        models.Playlist.create({
            track: trackId,
            owner: userId
        })
        .then(playlist => {
            res.redirect("/?message=1");
        })
        .catch(err => console.error(err));
    }else {
        res.redirect('/?message=0')
    }
};

const removePlaylistAction = (req, res) => {
    const trackId = req.query.id;
    if(trackId){
        const userId = req.session.auth;
        models.Playlist.deleteOne({
            track: trackId,
            owner: userId
        }, err => {
            res.redirect("/playlist?message=2");
        });
    }else {
        res.redirect('/playlist?message=0')
    }
};

const playlistAction = async (req, res) => {
    const params = {
        lastTracks: await getPlaylistTracks(req.session.auth)
    }
    if(req.query.message){
        const message = ["Ошибка: данный трек не найден", "Трек успешно добавлен в ваш плейлист", "Трек удален из вашего плейлиста"];
        params.message = message[req.query.message];
    }
    res.send(renderView(req, 'myPlaylist', params));
};

export { addPlaylistAction, playlistAction, removePlaylistAction };