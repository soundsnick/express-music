import { getLastTracks } from "../models/track";
import { renderView } from "../core/helpers";

const indexAction = async (req, res) => {
    const params = {
        lastTracks: await getLastTracks()
    }
    if(req.query.message){
        const message = ["Ошибка: данный трек не найден", "Трек успешно добавлен в ваш плейлист"];
        params.message = message[req.query.message];
    }
    res.send(renderView(req, 'index', params));
};

export { indexAction };