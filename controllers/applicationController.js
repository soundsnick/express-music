import { getLastTracks } from "../models/track";
import { renderView } from "../core/helpers";

const indexAction = async (req, res) => {
    const params = {
        lastTracks: await getLastTracks()
    }
    res.send(renderView(req, 'index', params));
};

export { indexAction };